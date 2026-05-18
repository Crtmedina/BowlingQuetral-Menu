import { unstable_cache } from "next/cache";
import { ADMIN_CACHE_TAGS } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import MenuSectionModel from "@/models/MenuSection";
import ProductModel from "@/models/Product";
import { SECTION_IDS } from "@/lib/carta/section-ids";
import { PRODUCTS_BY_SECTION, SECTION_INTROS } from "@/lib/carta/products";
import type { CartaProduct, SectionId } from "@/lib/carta/types";
import { bootstrapMenuStructureIfEmpty } from "@/lib/menu/menu-layout";
import { HAPPY_HOUR_CATEGORY_SLUG } from "@/lib/menu/happy-hour";
import { filterHappyHourProducts } from "@/lib/menu/filter-happy-hour-products";
import { getHappyHourSettings } from "@/lib/queries/happy-hour";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?q=80&w=400&auto=format&fit=crop";

/** Nombres del menú estático "Para peques"; en BD antigua iban bajo `papasFritas`. */
const PEQUES_PRODUCT_NAMES = new Set(
  (PRODUCTS_BY_SECTION.papasPeques ?? []).map((p) => p.name.trim())
);

const CANONICAL_SLUG_BY_LOWER = new Map<string, string>();
for (const id of SECTION_IDS) {
  CANONICAL_SLUG_BY_LOWER.set(id.toLowerCase(), id);
}

function canonicalSectionSlug(raw: string): string {
  const t = raw.trim();
  if (!t) return t;
  return CANONICAL_SLUG_BY_LOWER.get(t.toLowerCase()) ?? t;
}

function mapDbToCarta(product: {
  id?: string;
  name: string;
  description?: string | null;
  price: string;
  deal?: string | null;
  imageUrl?: string | null;
  happyHour2x1?: boolean | null;
}): CartaProduct {
  return {
    id: product.id,
    name: product.name,
    description: product.description ?? "",
    price: product.price,
    deal: product.deal || undefined,
    image: product.imageUrl?.trim() ? product.imageUrl.trim() : PLACEHOLDER_IMAGE,
    happyHour2x1: product.happyHour2x1 ?? false,
  };
}

export type PublicMenuCatalog = {
  productsBySection: Record<string, CartaProduct[]>;
  sectionIntros: Partial<Record<string, string>>;
  sourceBySection: Partial<Record<string, "database" | "file">>;
};

type DbRow = {
  id?: string;
  name: string;
  description?: string | null;
  price: string;
  deal?: string | null;
  imageUrl?: string | null;
  happyHour2x1?: boolean | null;
  order: number;
};

/**
 * Catálogo para /carta: productos activos en MongoDB por categoría (slug de categoría),
 * o respaldo desde lib/carta/products.ts si no hay filas en la base.
 * Incluye slugs dinámicos que solo existen en la base.
 */
async function fetchPublicMenuCatalog(): Promise<PublicMenuCatalog> {
  const productsBySection: Record<string, CartaProduct[]> = {};
  const sectionIntros: Partial<Record<string, string>> = {};
  const sourceBySection: Partial<Record<string, "database" | "file">> = {};

  const sectionMeta = new Map<string, { intro: string; active: boolean }>();

  const slugOrder: string[] = [...SECTION_IDS];
  const rememberSlug = (slug: string) => {
    if (!slugOrder.includes(slug)) slugOrder.push(slug);
  };

  let dbProductsBySection = new Map<string, DbRow[]>();

  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
      await bootstrapMenuStructureIfEmpty();

      const [menuSections, products] = await Promise.all([
        MenuSectionModel.find({}).lean(),
        ProductModel.find({ active: { $ne: false } })
          .sort({ sectionId: 1, order: 1, name: 1 })
          .lean(),
      ]);

      for (const s of menuSections) {
        sectionMeta.set(s.slug, {
          intro: s.intro ?? "",
          active: s.active ?? true,
        });
        rememberSlug(s.slug);
      }

      const ensureBucket = (slug: string) => {
        if (!dbProductsBySection.has(slug)) dbProductsBySection.set(slug, []);
      };

      for (const id of SECTION_IDS) ensureBucket(id);

      for (const p of products) {
        let sid = canonicalSectionSlug(String(p.sectionId ?? ""));
        if (sid === "papasFritas" && PEQUES_PRODUCT_NAMES.has(String(p.name).trim())) {
          sid = "papasPeques";
        }
        ensureBucket(sid);
        dbProductsBySection.get(sid)!.push({
          id: String(p._id),
          name: p.name,
          description: p.description,
          price: p.price,
          deal: p.deal,
          imageUrl: p.imageUrl,
          happyHour2x1: p.happyHour2x1,
          order: p.order ?? 0,
        });
        rememberSlug(sid);
      }
    } catch {
      dbProductsBySection = new Map();
    }
  }

  for (const sectionId of slugOrder) {
    const fromDb = dbProductsBySection.get(sectionId);
    const staticFallback = PRODUCTS_BY_SECTION[sectionId as SectionId] ?? [];
    productsBySection[sectionId] = fromDb?.length
      ? fromDb.map(mapDbToCarta)
      : [...staticFallback];
    sourceBySection[sectionId] = fromDb?.length ? "database" : "file";

    const meta = sectionMeta.get(sectionId);
    const defaultIntro = SECTION_INTROS[sectionId as SectionId];
    if (meta && !meta.active) {
      sectionIntros[sectionId] = undefined;
    } else if (meta?.intro?.trim()) {
      sectionIntros[sectionId] = meta.intro.trim();
    } else if (defaultIntro) {
      sectionIntros[sectionId] = defaultIntro;
    }
  }

  const hhSettings = await getHappyHourSettings();
  const hhProducts = productsBySection[HAPPY_HOUR_CATEGORY_SLUG];
  if (hhProducts?.length) {
    productsBySection[HAPPY_HOUR_CATEGORY_SLUG] = filterHappyHourProducts(
      hhProducts,
      hhSettings.applicableProductIds
    );
  }

  return { productsBySection, sectionIntros, sourceBySection };
}

const getPublicMenuCatalogCached = unstable_cache(fetchPublicMenuCatalog, ["public-carta-catalog-v2"], {
  revalidate: 30,
  tags: [ADMIN_CACHE_TAGS.publicCarta],
});

export async function getPublicMenuCatalog(): Promise<PublicMenuCatalog> {
  return getPublicMenuCatalogCached();
}

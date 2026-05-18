import { cache } from "react";
import { unstable_cache } from "next/cache";
import mongoose from "mongoose";
import { ADMIN_CACHE_TAGS } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import MenuHubModel from "@/models/MenuHub";
import MenuSectionModel from "@/models/MenuSection";
import { MENU_HUBS, SECTION_LABELS } from "@/lib/carta/navigation";
import { SECTION_INTROS } from "@/lib/carta/products";
import type { SectionId } from "@/lib/carta/types";
import { HAPPY_HOUR_BLOCK_SLUG } from "@/lib/menu/happy-hour";
import { DEFAULT_ICON_KEY_BY_HUB_ID } from "@/lib/menu/hub-icons";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "./menu-layout-dto";
import { sortHubsForCarta } from "./menu-layout-dto";

export type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "./menu-layout-dto";
export { compareHubsCartaOrder, sortHubsForCarta } from "./menu-layout-dto";

function groupSectionsByHub(
  sections: Array<{
    slug: string;
    label: string;
    hubSlug: string;
    intro: string;
    order: number;
    active: boolean;
  }>
): Map<string, MenuLayoutSectionDTO[]> {
  const map = new Map<string, MenuLayoutSectionDTO[]>();
  for (const s of sections) {
    const row: MenuLayoutSectionDTO = {
      slug: s.slug,
      label: s.label,
      intro: s.intro,
      active: s.active,
      order: s.order,
    };
    const list = map.get(s.hubSlug) ?? [];
    list.push(row);
    map.set(s.hubSlug, list);
  }
  for (const list of Array.from(map.values())) {
    list.sort((a: MenuLayoutSectionDTO, b: MenuLayoutSectionDTO) => a.order - b.order || a.slug.localeCompare(b.slug));
  }
  return map;
}

async function mergeLegacyCategoryIntros(): Promise<void> {
  const col = mongoose.connection.collection("categories");
  const n = await col.countDocuments().catch(() => 0);
  if (!n) return;
  const docs = await col.find({}).toArray();
  for (const doc of docs) {
    const sid = String(doc.sectionId ?? "").trim().toLowerCase();
    if (!sid) continue;
    await MenuSectionModel.updateOne(
      { slug: sid },
      {
        $set: {
          intro: String(doc.intro ?? ""),
          active: doc.active !== false,
        },
      }
    ).catch(() => null);
  }
}

/**
 * Primera vez en MongoDB: copia la carta por defecto del código y, si existía la colección
 * legacy `categories`, sincroniza intros y visibilidad.
 */
export async function bootstrapMenuStructureIfEmpty(): Promise<void> {
  if (!process.env.MONGODB_URI) return;
  await connectDB();

  const hubCount = await MenuHubModel.countDocuments();
  if (hubCount > 0) return;

  await MenuHubModel.insertMany(
    MENU_HUBS.map((hub, i) => ({
      slug: hub.id,
      label: hub.label,
      suffix: hub.suffix ?? "",
      menuGroup: hub.menuGroup,
      iconKey: DEFAULT_ICON_KEY_BY_HUB_ID[hub.id] ?? "Sparkles",
      order: i,
      active: true,
      isPromoHub: hub.id === HAPPY_HOUR_BLOCK_SLUG,
      isFeatured: hub.id === HAPPY_HOUR_BLOCK_SLUG,
      featuredOrder: hub.id === HAPPY_HOUR_BLOCK_SLUG ? 0 : 0,
    }))
  );

  let orderCounter = 0;
  const sectionRows = MENU_HUBS.flatMap((hub) =>
    hub.sections.map((sectionId) => {
      const sid = sectionId as SectionId;
      const intro = SECTION_INTROS[sid] ?? "";
      const row = {
        slug: sid,
        label: SECTION_LABELS[sid],
        hubSlug: hub.id,
        intro,
        order: orderCounter++,
        active: true,
      };
      return row;
    })
  );

  await MenuSectionModel.insertMany(sectionRows);
  await mergeLegacyCategoryIntros();
}

/** Actualiza etiquetas antiguas “PROMOS” en MongoDB sin cambiar slugs. */
async function syncHappyHourDisplayLabels(): Promise<void> {
  await MenuHubModel.updateMany(
    { slug: HAPPY_HOUR_BLOCK_SLUG, label: { $in: ["PROMOS", "Promos", "promos"] } },
    { $set: { label: "HAPPY HOUR", suffix: "2×1 en tragos seleccionados" } }
  );
  await MenuSectionModel.updateMany(
    { slug: HAPPY_HOUR_BLOCK_SLUG, label: { $in: ["Promos", "PROMOS", "promos"] } },
    { $set: { label: "Happy Hour" } }
  );
}

type GlobalMigrations = typeof globalThis & { __bqMenuMigrationsDone?: boolean };

/** Migraciones puntuales: una vez por proceso, no en cada navegación del panel. */
async function ensureMenuMigrationsOnce(): Promise<void> {
  const g = globalThis as GlobalMigrations;
  if (g.__bqMenuMigrationsDone) return;

  await connectDB();
  const hubCount = await MenuHubModel.countDocuments();
  if (hubCount === 0) {
    await bootstrapMenuStructureIfEmpty();
  } else {
    await syncHappyHourDisplayLabels();

    const hubs = await MenuHubModel.find({}).select("slug isPromoHub isFeatured featuredOrder").lean();
    const nonePromoInDb = !hubs.some((h) => (h as { isPromoHub?: boolean }).isPromoHub === true);
    if (nonePromoInDb && hubs.some((h) => h.slug === HAPPY_HOUR_BLOCK_SLUG)) {
      await MenuHubModel.updateMany({}, { $set: { isPromoHub: false } });
      await MenuHubModel.updateOne({ slug: HAPPY_HOUR_BLOCK_SLUG }, { $set: { isPromoHub: true } });
    }

    const missingFeaturedFields = hubs.some(
      (h) =>
        (h as { isFeatured?: boolean }).isFeatured === undefined ||
        (h as { featuredOrder?: number }).featuredOrder === undefined
    );
    if (missingFeaturedFields) {
      await MenuHubModel.updateMany(
        { isFeatured: { $exists: false } },
        { $set: { isFeatured: false, featuredOrder: 0 } }
      );
      await MenuHubModel.updateMany(
        { featuredOrder: { $exists: false } },
        { $set: { featuredOrder: 0 } }
      );
    }
  }

  g.__bqMenuMigrationsDone = true;
}

async function fetchMenuLayoutForAdminFromDb(): Promise<MenuLayoutHubDTO[]> {
  if (!process.env.MONGODB_URI) {
    return staticLayoutFallback();
  }

  try {
    await connectDB();
    await ensureMenuMigrationsOnce();

    const [hubs, sections] = await Promise.all([
      MenuHubModel.find({}).sort({ order: 1, slug: 1 }).lean(),
      MenuSectionModel.find({}).sort({ hubSlug: 1, order: 1, slug: 1 }).lean(),
    ]);

    const byHub = groupSectionsByHub(
      sections.map((s) => ({
        slug: s.slug,
        label: s.label,
        hubSlug: s.hubSlug,
        intro: s.intro ?? "",
        order: s.order ?? 0,
        active: s.active ?? true,
      }))
    );

    const mapped = hubs.map((h) => {
      const raw = h as { isPromoHub?: boolean; isFeatured?: boolean; featuredOrder?: number };
      return {
        slug: h.slug,
        label: h.label,
        suffix: h.suffix ?? "",
        menuGroup: h.menuGroup as "comida" | "barra",
        iconKey: h.iconKey,
        order: h.order ?? 0,
        active: h.active ?? true,
        isPromoHub: raw.isPromoHub === true,
        isFeatured: raw.isFeatured === true,
        featuredOrder: raw.featuredOrder ?? 0,
        sections: byHub.get(h.slug) ?? [],
      };
    });
    return sortHubsForCarta(mapped);
  } catch {
    return sortHubsForCarta(staticLayoutFallback());
  }
}

const getMenuLayoutForAdminCached = unstable_cache(
  fetchMenuLayoutForAdminFromDb,
  ["admin-menu-layout-v2"],
  { revalidate: 20, tags: [ADMIN_CACHE_TAGS.menuLayout] }
);

/** Layout del menú para el panel (cacheado entre peticiones). */
export const getMenuLayoutForAdmin = cache(async (): Promise<MenuLayoutHubDTO[]> => {
  return getMenuLayoutForAdminCached();
});

/** Carta pública: bloques y categorías activos; omite bloques sin categorías visibles. */
export async function getMenuLayoutForCarta(): Promise<MenuLayoutHubDTO[]> {
  const admin = await getMenuLayoutForAdmin();
  const filtered = admin
    .filter((h) => h.active)
    .map((h) => ({
      ...h,
      sections: h.sections.filter((s) => s.active),
    }))
    .filter((h) => h.sections.length > 0);
  return filtered.length > 0 ? sortHubsForCarta(filtered) : sortHubsForCarta(staticLayoutFallback());
}

export function staticLayoutFallback(): MenuLayoutHubDTO[] {
  const rows = MENU_HUBS.map((hub, i) => ({
    slug: hub.id,
    label: hub.label,
    suffix: hub.suffix ?? "",
    menuGroup: hub.menuGroup,
    iconKey: DEFAULT_ICON_KEY_BY_HUB_ID[hub.id] ?? "Sparkles",
    order: i,
    active: true,
    isPromoHub: hub.id === HAPPY_HOUR_BLOCK_SLUG,
    isFeatured: hub.id === HAPPY_HOUR_BLOCK_SLUG,
    featuredOrder: hub.id === HAPPY_HOUR_BLOCK_SLUG ? 0 : 0,
    sections: hub.sections.map((sectionId, j) => {
      const sid = sectionId as SectionId;
      return {
        slug: sid,
        label: SECTION_LABELS[sid],
        intro: SECTION_INTROS[sid] ?? "",
        active: true,
        order: j,
      };
    }),
  }));
  return sortHubsForCarta(rows);
}

export function resolveHubSlugForSection(
  sectionSlug: string,
  layout: Pick<MenuLayoutHubDTO, "slug" | "sections">[]
): string | null {
  const s = sectionSlug.trim().toLowerCase();
  for (const hub of layout) {
    if (hub.sections.some((sec) => sec.slug === s)) return hub.slug;
  }
  return null;
}

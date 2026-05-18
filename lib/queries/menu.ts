import { cache } from "react";
import { unstable_cache } from "next/cache";
import { ADMIN_CACHE_TAGS } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { SECTION_INTROS, PRODUCTS_BY_SECTION } from "@/lib/carta/products";
import type { SectionId } from "@/lib/carta/types";
import { getMenuLayoutForAdmin } from "@/lib/menu/menu-layout";

export type AdminProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  deal?: string;
  imageUrl: string;
  sectionId: string;
  hubId: string;
  order: number;
  active: boolean;
  happyHour2x1: boolean;
  isNovelty: boolean;
  showOnHome: boolean;
};

export type AdminSection = {
  sectionId: string;
  label: string;
  hubId: string;
  hubLabel: string;
  intro: string;
  defaultIntro: string;
  active: boolean;
  productCount: number;
};

function hubSlugForSectionSlug(
  layout: Awaited<ReturnType<typeof getMenuLayoutForAdmin>>,
  sectionSlug: string
): string {
  const hub = layout.find((h) => h.sections.some((s) => s.slug === sectionSlug));
  return hub?.slug ?? layout[0]?.slug ?? "";
}

export const isDatabaseConnected = cache(async (): Promise<boolean> => {
  if (!process.env.MONGODB_URI) return false;
  try {
    await connectDB();
    return true;
  } catch {
    return false;
  }
});

async function fetchAllAdminProducts(): Promise<AdminProduct[]> {
  if (!process.env.MONGODB_URI) return [];
  try {
    await connectDB();
    const layout = await getMenuLayoutForAdmin();
    const products = await ProductModel.find({})
      .sort({ sectionId: 1, order: 1, name: 1 })
      .lean();

    return products.map((product) => {
      const sid = String(product.sectionId);
      return {
        id: String(product._id),
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        deal: product.deal || undefined,
        imageUrl: product.imageUrl ?? "",
        sectionId: sid,
        hubId: hubSlugForSectionSlug(layout, sid),
        order: product.order ?? 0,
        active: product.active ?? true,
        happyHour2x1: product.happyHour2x1 ?? false,
        isNovelty: product.isNovelty ?? false,
        showOnHome: product.showOnHome ?? false,
      };
    });
  } catch {
    return [];
  }
}

const listAllAdminProductsCached = unstable_cache(fetchAllAdminProducts, ["admin-products-all-v1"], {
  revalidate: 20,
  tags: [ADMIN_CACHE_TAGS.products],
});

export const listAdminProducts = cache(async (sectionId?: string): Promise<AdminProduct[]> => {
  if (sectionId) {
    if (!(await isDatabaseConnected())) return [];
    const layout = await getMenuLayoutForAdmin();
    const products = await ProductModel.find({ sectionId })
      .sort({ order: 1, name: 1 })
      .lean();
    return products.map((product) => {
      const sid = String(product.sectionId);
      return {
        id: String(product._id),
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        deal: product.deal || undefined,
        imageUrl: product.imageUrl ?? "",
        sectionId: sid,
        hubId: hubSlugForSectionSlug(layout, sid),
        order: product.order ?? 0,
        active: product.active ?? true,
        happyHour2x1: product.happyHour2x1 ?? false,
        isNovelty: product.isNovelty ?? false,
        showOnHome: product.showOnHome ?? false,
      };
    });
  }
  return listAllAdminProductsCached();
});

async function fetchAdminSections(): Promise<AdminSection[]> {
  const connected = await isDatabaseConnected();
  const counts = new Map<string, number>();

  if (connected) {
    await connectDB();
    const rows = await ProductModel.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$sectionId", count: { $sum: 1 } } },
    ]);
    for (const row of rows) {
      counts.set(String(row._id), row.count);
    }
  }

  const layout = await getMenuLayoutForAdmin();

  return layout.flatMap((hub) =>
    hub.sections.map((section) => {
      const dbCount = counts.get(section.slug) ?? 0;
      const fallbackCount = PRODUCTS_BY_SECTION[section.slug as SectionId]?.length ?? 0;
      return {
        sectionId: section.slug,
        label: section.label,
        hubId: hub.slug,
        hubLabel: hub.label,
        intro: section.intro,
        defaultIntro: SECTION_INTROS[section.slug as SectionId] ?? "",
        active: section.active,
        productCount: dbCount > 0 ? dbCount : fallbackCount,
      };
    })
  );
}

const listAdminSectionsCached = unstable_cache(fetchAdminSections, ["admin-sections-v1"], {
  revalidate: 20,
  tags: [ADMIN_CACHE_TAGS.sections],
});

export const listAdminSections = cache(async (): Promise<AdminSection[]> => {
  return listAdminSectionsCached();
});

export async function getAdminProductById(id: string): Promise<AdminProduct | null> {
  if (!(await isDatabaseConnected())) return null;

  const layout = await getMenuLayoutForAdmin();
  const product = await ProductModel.findById(id).lean();
  if (!product) return null;

  const sid = String(product.sectionId);

  return {
    id: String(product._id),
    name: product.name,
    description: product.description ?? "",
    price: product.price,
    deal: product.deal || undefined,
    imageUrl: product.imageUrl ?? "",
    sectionId: sid,
    hubId: hubSlugForSectionSlug(layout, sid),
    order: product.order ?? 0,
    active: product.active ?? true,
    happyHour2x1: product.happyHour2x1 ?? false,
    isNovelty: product.isNovelty ?? false,
    showOnHome: product.showOnHome ?? false,
  };
}

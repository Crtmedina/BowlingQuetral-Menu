import { revalidatePath, revalidateTag } from "next/cache";

export const ADMIN_CACHE_TAGS = {
  menuLayout: "admin-menu-layout",
  products: "admin-products",
  sections: "admin-sections",
  publicCarta: "public-carta",
} as const;

/** Invalida caché de datos (navegación rápida tras mutaciones). */
export function revalidateAdminData() {
  revalidateTag(ADMIN_CACHE_TAGS.menuLayout);
  revalidateTag(ADMIN_CACHE_TAGS.products);
  revalidateTag(ADMIN_CACHE_TAGS.sections);
  revalidateTag(ADMIN_CACHE_TAGS.publicCarta);
}

/** Tras guardar en el panel: tags + rutas principales. */
export function revalidateAfterAdminMutation() {
  revalidateAdminData();
  revalidatePath("/admin/menu");
  revalidatePath("/admin/products");
  revalidatePath("/admin/happy-hour");
  revalidatePath("/admin");
  revalidatePath("/carta");
}

import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

/**
 * Identificadores internos del bloque/categoría Happy Hour (slug histórico: `promos`).
 * Los nombres visibles en carta y admin son "Happy Hour"; el slug no se cambia para no romper productos en BD.
 */
export const HAPPY_HOUR_BLOCK_SLUG = "promos";
export const HAPPY_HOUR_CATEGORY_SLUG = "promos";

/**
 * Happy Hour es una promo: el bloque 2×1 en carta depende del switch «Activado» en el panel.
 * Fuera del horario sigue visible (con horario en el banner); «En curso» solo cuando aplica el reloj.
 */
export function applyHappyHourVisibilityToCartaLayout(
  layout: MenuLayoutHubDTO[],
  promoEnabled: boolean
): MenuLayoutHubDTO[] {
  if (promoEnabled) return layout;
  return layout.filter((h) => !h.isPromoHub && h.slug !== HAPPY_HOUR_BLOCK_SLUG);
}

export function isHappyHourCategory(sectionSlug: string): boolean {
  return sectionSlug.trim().toLowerCase() === HAPPY_HOUR_CATEGORY_SLUG;
}

export function isHappyHourBlock(hubSlug: string): boolean {
  return hubSlug.trim().toLowerCase() === HAPPY_HOUR_BLOCK_SLUG;
}

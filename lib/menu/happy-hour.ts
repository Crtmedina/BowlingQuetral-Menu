/**
 * Identificadores internos del bloque/categoría Happy Hour (slug histórico: `promos`).
 * Los nombres visibles en carta y admin son "Happy Hour"; el slug no se cambia para no romper productos en BD.
 */
export const HAPPY_HOUR_BLOCK_SLUG = "promos";
export const HAPPY_HOUR_CATEGORY_SLUG = "promos";

export function isHappyHourCategory(sectionSlug: string): boolean {
  return sectionSlug.trim().toLowerCase() === HAPPY_HOUR_CATEGORY_SLUG;
}

export function isHappyHourBlock(hubSlug: string): boolean {
  return hubSlug.trim().toLowerCase() === HAPPY_HOUR_BLOCK_SLUG;
}

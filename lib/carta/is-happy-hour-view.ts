import { HAPPY_HOUR_BLOCK_SLUG, HAPPY_HOUR_CATEGORY_SLUG } from "@/lib/menu/happy-hour";

export function isHappyHourCartaView(
  hubSlug: string,
  sectionSlug: string,
  promoHubSlug: string | null
): boolean {
  if (promoHubSlug !== null) return hubSlug === promoHubSlug;
  return sectionSlug === HAPPY_HOUR_CATEGORY_SLUG || hubSlug === HAPPY_HOUR_BLOCK_SLUG;
}

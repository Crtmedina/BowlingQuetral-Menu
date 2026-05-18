import type { CartaProduct } from "@/lib/carta/types";

/**
 * Filtra productos de la vista Happy Hour.
 * - `applicableProductIds` vacío: solo productos con `happyHour2x1`.
 * - Con IDs: solo esos productos (deben tener `id` de MongoDB).
 */
export function filterHappyHourProducts(
  products: CartaProduct[],
  applicableProductIds: string[]
): CartaProduct[] {
  if (applicableProductIds.length === 0) {
    return products.filter((p) => p.happyHour2x1);
  }
  const allowed = new Set(applicableProductIds);
  return products.filter((p) => p.id != null && allowed.has(p.id));
}

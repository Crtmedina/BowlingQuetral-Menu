/** Corrige datos viejos donde "×" quedó como "?" (p. ej. "2? $7.500") */
export function formatHappyHourDealLine(dealOrPrice: string): string {
  return dealOrPrice.replace(/^2\s*\?\s*/, "2× ");
}

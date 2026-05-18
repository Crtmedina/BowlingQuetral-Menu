import type { ProductListVisibility } from "@/lib/admin/product-list-url";
import type { AdminProduct } from "@/lib/queries/menu";

export function filterAdminProducts(
  products: AdminProduct[],
  filterHubSlug: string,
  selectedSectionSlugs: string[],
  search: string,
  visibility: ProductListVisibility
): AdminProduct[] {
  const q = search.trim().toLowerCase();
  const hub = filterHubSlug.trim();
  return products.filter((product) => {
    if (visibility === "active" && !product.active) return false;
    if (visibility === "hidden" && product.active) return false;
    if (hub && product.hubId !== hub) return false;
    if (selectedSectionSlugs.length > 0 && !selectedSectionSlugs.includes(product.sectionId)) {
      return false;
    }
    if (q) {
      const name = product.name.toLowerCase();
      const desc = (product.description ?? "").toLowerCase();
      if (!name.includes(q) && !desc.includes(q)) return false;
    }
    return true;
  });
}

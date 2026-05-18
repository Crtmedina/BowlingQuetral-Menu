import type { ProductListUrlState } from "@/lib/admin/product-list-url";

const STORAGE_KEY = "bq-admin-product-list-views-v1";

export type StoredProductListView = {
  id: string;
  name: string;
  createdAt: number;
  snapshot: ProductListUrlState;
};

export function loadProductListViews(): StoredProductListView[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (v): v is StoredProductListView =>
        typeof v === "object" &&
        v !== null &&
        typeof (v as StoredProductListView).id === "string" &&
        typeof (v as StoredProductListView).name === "string" &&
        typeof (v as StoredProductListView).snapshot === "object" &&
        (v as StoredProductListView).snapshot !== null
    );
  } catch {
    return [];
  }
}

export function saveProductListViews(views: StoredProductListView[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  } catch {
    /* ignore quota */
  }
}

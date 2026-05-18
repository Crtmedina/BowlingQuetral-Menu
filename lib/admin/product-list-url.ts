export type ProductListVisibility = "all" | "active" | "hidden";

export type ProductListUrlState = {
  search: string;
  /** Slug de bloque (hub); vacío = todos los bloques */
  filterHubSlug: string;
  /** Slugs de categorías a mostrar; vacío = todas */
  selectedSectionSlugs: string[];
  /** Productos visibles en carta vs ocultos */
  visibility: ProductListVisibility;
};

function parseVisibility(raw: string | null): ProductListVisibility {
  if (raw === "active") return "active";
  if (raw === "hidden") return "hidden";
  return "all";
}

export function parseProductListSearchParams(searchParams: URLSearchParams): ProductListUrlState {
  const secRaw = searchParams.get("sec") ?? "";
  return {
    search: searchParams.get("q") ?? "",
    filterHubSlug: (searchParams.get("hub") ?? "").trim(),
    selectedSectionSlugs: secRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    visibility: parseVisibility(searchParams.get("vis")),
  };
}

export function serializeProductListSearchParams(state: ProductListUrlState): string {
  const p = new URLSearchParams();
  const q = state.search.trim();
  const hub = state.filterHubSlug.trim();
  if (q) p.set("q", q);
  if (hub) p.set("hub", hub);
  const sec = state.selectedSectionSlugs.join(",");
  if (sec) p.set("sec", sec);
  if (state.visibility === "active") p.set("vis", "active");
  if (state.visibility === "hidden") p.set("vis", "hidden");
  return p.toString();
}

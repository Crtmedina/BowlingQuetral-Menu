"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  parseProductListSearchParams,
  serializeProductListSearchParams,
  type ProductListVisibility,
} from "@/lib/admin/product-list-url";

export function useProductListUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const spKey = searchParams.toString();

  const [search, setSearch] = useState("");
  const [filterHubSlug, setFilterHubSlug] = useState("");
  const [selectedSectionSlugs, setSelectedSectionSlugs] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<ProductListVisibility>("all");

  useLayoutEffect(() => {
    const parsed = parseProductListSearchParams(searchParams);
    setSearch(parsed.search);
    setFilterHubSlug(parsed.filterHubSlug);
    setSelectedSectionSlugs(parsed.selectedSectionSlugs);
    setVisibility(parsed.visibility);
  }, [spKey, searchParams]);

  useEffect(() => {
    const next = serializeProductListSearchParams({
      search,
      filterHubSlug,
      selectedSectionSlugs,
      visibility,
    });
    if (next === spKey) return;
    const id = window.setTimeout(() => {
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 320);
    return () => window.clearTimeout(id);
  }, [search, filterHubSlug, selectedSectionSlugs, visibility, pathname, router, spKey]);

  return {
    search,
    setSearch,
    filterHubSlug,
    setFilterHubSlug,
    selectedSectionSlugs,
    setSelectedSectionSlugs,
    visibility,
    setVisibility,
  };
}

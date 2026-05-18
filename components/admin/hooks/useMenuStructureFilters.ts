"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildMenuStructureRows,
  matchesMenuStructureFilters,
  type MenuStructureActiveFilter,
  type MenuStructureLevelFilter,
} from "@/lib/menu/menu-structure-rows";
import { sortHubsForCarta, type MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

type UseMenuStructureFiltersParams = {
  menuLayout: MenuLayoutHubDTO[];
};

export function useMenuStructureFilters({ menuLayout }: UseMenuStructureFiltersParams) {
  const [filterQ, setFilterQ] = useState("");
  const [filterLevel, setFilterLevel] = useState<MenuStructureLevelFilter>("all");
  const [filterHub, setFilterHub] = useState("");
  const [filterActive, setFilterActive] = useState<MenuStructureActiveFilter>("all");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [expandedHubs, setExpandedHubs] = useState<Set<string>>(() => new Set());

  const expandedForDisplay = useMemo(() => {
    const set = new Set(expandedHubs);
    if (filterHub.trim()) set.add(filterHub.trim());
    const q = filterQ.trim().toLowerCase();
    if (q) {
      for (const hub of menuLayout) {
        const hubMatch =
          hub.label.toLowerCase().includes(q) ||
          hub.slug.toLowerCase().includes(q) ||
          (hub.suffix ?? "").toLowerCase().includes(q);
        const sectionMatch = hub.sections.some(
          (s) => s.label.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
        );
        if (hubMatch || sectionMatch) set.add(hub.slug);
      }
    }
    if (filterLevel === "section") {
      for (const hub of menuLayout) set.add(hub.slug);
    }
    return set;
  }, [expandedHubs, filterHub, filterQ, filterLevel, menuLayout]);

  const allRows = useMemo(
    () => buildMenuStructureRows(menuLayout, expandedForDisplay),
    [menuLayout, expandedForDisplay]
  );

  useEffect(() => {
    if (expandedHubs.size === 0 && menuLayout.length > 0 && menuLayout.length <= 4) {
      setExpandedHubs(new Set(menuLayout.map((h) => h.slug)));
    }
  }, [menuLayout, expandedHubs.size]);

  const allHubsExpanded = useMemo(
    () => menuLayout.length > 0 && menuLayout.every((h) => expandedHubs.has(h.slug)),
    [menuLayout, expandedHubs]
  );

  const filteredRows = useMemo(
    () => allRows.filter((r) => matchesMenuStructureFilters(r, filterQ, filterLevel, filterHub, filterActive)),
    [allRows, filterQ, filterLevel, filterHub, filterActive]
  );

  const sortedDisplayHubs = useMemo(() => sortHubsForCarta(menuLayout), [menuLayout]);
  const featuredHubs = useMemo(
    () => sortedDisplayHubs.filter((h) => h.isFeatured),
    [sortedDisplayHubs]
  );
  const normalHubs = useMemo(
    () => sortedDisplayHubs.filter((h) => !h.isFeatured),
    [sortedDisplayHubs]
  );

  const blockOrderNumberBySlug = useMemo(() => {
    const m = new Map<string, number>();
    sortedDisplayHubs.forEach((h, i) => m.set(h.slug, i + 1));
    return m;
  }, [sortedDisplayHubs]);

  const hasMenuStructureActiveFilters =
    filterQ.trim() !== "" ||
    filterLevel !== "all" ||
    filterHub !== "" ||
    filterActive !== "all";

  function clearFilters() {
    setFilterQ("");
    setFilterLevel("all");
    setFilterHub("");
    setFilterActive("all");
  }

  function toggleHubExpanded(slug: string) {
    setExpandedHubs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function toggleAllHubsExpanded() {
    setExpandedHubs(
      allHubsExpanded ? new Set() : new Set(menuLayout.map((h) => h.slug))
    );
  }

  function expandHub(slug: string) {
    setExpandedHubs((prev) => new Set(prev).add(slug));
  }

  return {
    filterQ,
    setFilterQ,
    filterLevel,
    setFilterLevel,
    filterHub,
    setFilterHub,
    filterActive,
    setFilterActive,
    showMoreFilters,
    setShowMoreFilters,
    expandedHubs,
    expandedForDisplay,
    allRows,
    filteredRows,
    sortedDisplayHubs,
    featuredHubs,
    normalHubs,
    blockOrderNumberBySlug,
    allHubsExpanded,
    hasMenuStructureActiveFilters,
    clearFilters,
    toggleHubExpanded,
    toggleAllHubsExpanded,
    expandHub,
  };
}

export type MenuStructureFiltersState = ReturnType<typeof useMenuStructureFilters>;

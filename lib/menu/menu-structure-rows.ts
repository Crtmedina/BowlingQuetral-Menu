import { sortHubsForCarta, type MenuLayoutHubDTO, type MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";

export type MenuStructureTableRow =
  | { kind: "hub"; hub: MenuLayoutHubDTO }
  | { kind: "section"; hub: MenuLayoutHubDTO; section: MenuLayoutSectionDTO };

export type MenuStructureLevelFilter = "all" | "hub" | "section";
export type MenuStructureActiveFilter = "all" | "yes" | "no";

export type MenuSectionStat = {
  slug: string;
  productCount: number;
  defaultIntro?: string;
};

export function buildMenuStructureRows(
  layout: MenuLayoutHubDTO[],
  expandedHubSlugs: Set<string>
): MenuStructureTableRow[] {
  const hubs = sortHubsForCarta(layout);
  const out: MenuStructureTableRow[] = [];
  for (const hub of hubs) {
    out.push({ kind: "hub", hub });
    if (!expandedHubSlugs.has(hub.slug)) continue;
    const secs = [...hub.sections].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
    for (const section of secs) {
      out.push({ kind: "section", hub, section });
    }
  }
  return out;
}

export function matchesMenuStructureFilters(
  row: MenuStructureTableRow,
  q: string,
  level: MenuStructureLevelFilter,
  hubSlug: string,
  active: MenuStructureActiveFilter
): boolean {
  if (level === "hub" && row.kind !== "hub") return false;
  if (level === "section" && row.kind !== "section") return false;
  if (hubSlug && row.hub.slug !== hubSlug) return false;

  const activeVal = row.kind === "hub" ? row.hub.active : row.section.active;
  if (active === "yes" && !activeVal) return false;
  if (active === "no" && activeVal) return false;

  const t = q.trim().toLowerCase();
  if (!t) return true;
  if (row.kind === "hub") {
    const h = row.hub;
    return (
      h.label.toLowerCase().includes(t) ||
      h.slug.toLowerCase().includes(t) ||
      (h.suffix ?? "").toLowerCase().includes(t)
    );
  }
  const s = row.section;
  return s.label.toLowerCase().includes(t) || s.slug.toLowerCase().includes(t);
}

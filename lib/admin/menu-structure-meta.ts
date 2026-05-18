import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

export function getHubPositionPool(
  hub: MenuLayoutHubDTO,
  featuredHubs: MenuLayoutHubDTO[],
  normalHubs: MenuLayoutHubDTO[]
): MenuLayoutHubDTO[] {
  return (hub.isFeatured ? featuredHubs : normalHubs).filter((h) => h.menuGroup === hub.menuGroup);
}

export function getHubPositionMeta(
  hub: MenuLayoutHubDTO,
  featuredHubs: MenuLayoutHubDTO[],
  normalHubs: MenuLayoutHubDTO[]
) {
  const pool = getHubPositionPool(hub, featuredHubs, normalHubs);
  const nHub = pool.length;
  const hubPos1 = pool.findIndex((h) => h.slug === hub.slug) + 1;
  const groupLabel = hub.menuGroup === "comida" ? "comida" : "barra";
  const hubPosTitle = hub.isFeatured
    ? `Posición ${hubPos1} de ${nHub} destacados (${groupLabel})`
    : `Posición ${hubPos1} de ${nHub} en ${groupLabel}`;
  return { pool, nHub, hubPos1, groupLabel, hubPosTitle };
}

export function countHubProducts(
  hub: MenuLayoutHubDTO,
  productCountBySlug: Map<string, number>
): number {
  return hub.sections.reduce((sum, sec) => sum + (productCountBySlug.get(sec.slug) ?? 0), 0);
}

export function getSortedSections(hub: MenuLayoutHubDTO): MenuLayoutSectionDTO[] {
  return [...hub.sections].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getSectionPositionMeta(
  hub: MenuLayoutHubDTO,
  section: MenuLayoutSectionDTO,
  productCountBySlug: Map<string, number>
) {
  const sortedSecs = getSortedSections(hub);
  const nSec = sortedSecs.length;
  const secPos1 = sortedSecs.findIndex((x) => x.slug === section.slug) + 1;
  const productCount = productCountBySlug.get(section.slug) ?? 0;
  const secPosTitle = `Posición ${secPos1} de ${nSec} en «${hub.label}»`;
  return { sortedSecs, nSec, secPos1, secPosTitle, productCount };
}

export function hubRowSurfaceClass(hub: MenuLayoutHubDTO, extra?: string) {
  return cn(
    hub.isFeatured && "border-l-4 border-l-amber-500/75 sm:border-l-2",
    hub.isPromoHub && "border-amber-500/35 bg-amber-500/[0.04]",
    !hub.active && "opacity-75 sm:opacity-100",
    extra
  );
}

export function hubTableRowClass(hub: MenuLayoutHubDTO) {
  return cn(
    "group border-b border-border bg-muted/30 hover:bg-muted/45",
    hub.isFeatured && "border-l-2 border-l-amber-500/75",
    hub.isPromoHub && "bg-amber-500/[0.04]"
  );
}

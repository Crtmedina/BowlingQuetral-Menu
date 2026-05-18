"use client";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { MenuStructureHubMobileCard } from "@/components/admin/menu-structure/MenuStructureHubMobileCard";
import { MenuStructureSectionMobileCard } from "@/components/admin/menu-structure/MenuStructureSectionMobileCard";
import { Button } from "@/components/ui/button";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import type { MenuStructureTableRow } from "@/lib/menu/menu-structure-rows";

export type MenuStructureMobileListProps = {
  rows: MenuStructureTableRow[];
  connected: boolean;
  isPending: boolean;
  expandedForDisplay: Set<string>;
  blockOrderNumberBySlug: Map<string, number>;
  productCountBySlug: Map<string, number>;
  featuredHubs: MenuLayoutHubDTO[];
  normalHubs: MenuLayoutHubDTO[];
  toggleHubExpanded: (slug: string) => void;
  requestToggleHubFeatured: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  toggleHubActive: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  toggleSectionActive: (hubSlug: string, section: MenuLayoutSectionDTO, checked: boolean) => void;
  openPromoConfirm: (hub: MenuLayoutHubDTO) => void;
  applyHubFeaturedRank: (slug: string, oneBasedPosition: number) => void;
  applyHubPosition: (slug: string, oneBasedPosition: number) => void;
  applySectionPosition: (hubSlug: string, sectionSlug: string, oneBasedPosition: number) => void;
  openNewSection: (hubSlug: string) => void;
  openEditHub: (hub: MenuLayoutHubDTO) => void;
  openEditSection: (hubSlug: string, section: MenuLayoutSectionDTO) => void;
  removeHub: (slug: string) => void | Promise<void>;
  removeSection: (slug: string) => void | Promise<void>;
  onClearFilters?: () => void;
};

export function MenuStructureMobileList(props: MenuStructureMobileListProps) {
  const {
    rows,
    connected,
    isPending,
    expandedForDisplay,
    blockOrderNumberBySlug,
    productCountBySlug,
    featuredHubs,
    normalHubs,
    onClearFilters,
    ...handlers
  } = props;
  const disabled = !connected || isPending;

  if (rows.length === 0) {
    return (
      <AdminEmptyState
        className="admin-menu-cards-view"
        title="Sin coincidencias"
        description="No hay bloques ni categorías que coincidan con los filtros activos."
        action={
          onClearFilters ? (
            <Button type="button" variant="outline" size="sm" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="admin-menu-cards-view space-y-2">
      {rows.map((row) =>
        row.kind === "hub" ? (
          <MenuStructureHubMobileCard
            key={`hub-${row.hub.slug}`}
            hub={row.hub}
            featuredHubs={featuredHubs}
            normalHubs={normalHubs}
            expandedForDisplay={expandedForDisplay}
            blockOrderNumberBySlug={blockOrderNumberBySlug}
            productCountBySlug={productCountBySlug}
            disabled={disabled}
            toggleHubExpanded={handlers.toggleHubExpanded}
            requestToggleHubFeatured={handlers.requestToggleHubFeatured}
            toggleHubActive={handlers.toggleHubActive}
            openPromoConfirm={handlers.openPromoConfirm}
            applyHubFeaturedRank={handlers.applyHubFeaturedRank}
            applyHubPosition={handlers.applyHubPosition}
            openNewSection={handlers.openNewSection}
            openEditHub={handlers.openEditHub}
            removeHub={handlers.removeHub}
          />
        ) : (
          <MenuStructureSectionMobileCard
            key={`sec-${row.section.slug}`}
            hub={row.hub}
            section={row.section}
            productCountBySlug={productCountBySlug}
            disabled={disabled}
            toggleSectionActive={handlers.toggleSectionActive}
            applySectionPosition={handlers.applySectionPosition}
            openEditSection={handlers.openEditSection}
            removeSection={handlers.removeSection}
          />
        )
      )}
    </div>
  );
}

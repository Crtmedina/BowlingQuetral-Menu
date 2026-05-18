"use client";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { MenuStructureHubTableRow } from "@/components/admin/menu-structure/MenuStructureHubTableRow";
import { MenuStructureSectionTableRow } from "@/components/admin/menu-structure/MenuStructureSectionTableRow";
import { Button } from "@/components/ui/button";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import type { MenuStructureTableRow } from "@/lib/menu/menu-structure-rows";

export const MENU_STRUCTURE_TABLE_COLS = 9;

export type MenuStructureDesktopTableProps = {
  filteredRows: MenuStructureTableRow[];
  connected: boolean;
  isPending: boolean;
  featuredHubs: MenuLayoutHubDTO[];
  normalHubs: MenuLayoutHubDTO[];
  expandedForDisplay: Set<string>;
  blockOrderNumberBySlug: Map<string, number>;
  productCountBySlug: Map<string, number>;
  onClearFilters: () => void;
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
};

export function MenuStructureDesktopTable(props: MenuStructureDesktopTableProps) {
  const {
    filteredRows,
    connected,
    isPending,
    featuredHubs,
    normalHubs,
    expandedForDisplay,
    blockOrderNumberBySlug,
    productCountBySlug,
    onClearFilters,
    toggleHubExpanded,
    requestToggleHubFeatured,
    toggleHubActive,
    toggleSectionActive,
    openPromoConfirm,
    applyHubFeaturedRank,
    applyHubPosition,
    applySectionPosition,
    openNewSection,
    openEditHub,
    openEditSection,
    removeHub,
    removeSection,
  } = props;

  const handlers = {
    connected,
    isPending,
    toggleHubExpanded,
    requestToggleHubFeatured,
    toggleHubActive,
    toggleSectionActive,
    openPromoConfirm,
    applyHubFeaturedRank,
    applyHubPosition,
    applySectionPosition,
    openNewSection,
    openEditHub,
    openEditSection,
    removeHub,
    removeSection,
  };

  return (
    <div className="admin-menu-table-view rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted/95 shadow-sm backdrop-blur-sm">
            <tr className="border-b border-border text-left text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              <th
                className="w-11 px-2 py-2.5 pl-3 text-center font-semibold"
                title="Orden del bloque en la carta (1 = el primero que ve el cliente)"
              >
                N.º
              </th>
              <th className="px-3 py-2.5">Bloque / categoría</th>
              <th className="w-16 px-2 py-2.5" title="Orden dentro del grupo">
                Pos.
              </th>
              <th className="w-14 px-2 py-2.5 text-center" title="Productos">
                Prod.
              </th>
              <th className="w-14 px-2 py-2.5 text-center" title="Comida o barra">
                Grupo
              </th>
              <th className="w-[4.25rem] px-1 py-2.5 text-center" title="Sale primero en la carta">
                Destac.
              </th>
              <th className="w-[4.25rem] px-1 py-2.5 text-center" title="Visible u oculto">
                Visible
              </th>
              <th className="w-[3.25rem] px-1 py-2.5 text-center" title="Plantilla Happy Hour 2×1">
                2×1
              </th>
              <th className="admin-table-sticky-actions-header w-[9.25rem] px-2 py-2.5 text-center">
                Acciones
              </th>
            </tr>
            <tr className="border-b border-border bg-muted/80 text-[0.6rem] font-normal normal-case tracking-normal text-muted-foreground">
              <th colSpan={5} className="hidden px-3 py-1 text-left font-normal sm:table-cell">
                Orden con el desplegable Pos.
              </th>
              <th className="px-1 py-1 text-center font-normal">Primero</th>
              <th className="px-1 py-1 text-center font-normal">En carta</th>
              <th className="px-1 py-1 text-center font-normal">HH</th>
              <th className="py-1" />
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={MENU_STRUCTURE_TABLE_COLS} className="p-4">
                  <AdminEmptyState
                    title="Sin coincidencias"
                    description="No hay bloques ni categorías que coincidan con los filtros activos."
                    action={
                      <Button type="button" variant="outline" size="sm" onClick={onClearFilters}>
                        Limpiar filtros
                      </Button>
                    }
                    className="border-0 bg-transparent py-8"
                  />
                </td>
              </tr>
            ) : (
              filteredRows.map((row) =>
                row.kind === "hub" ? (
                  <MenuStructureHubTableRow
                    key={`hub-${row.hub.slug}`}
                    hub={row.hub}
                    featuredHubs={featuredHubs}
                    normalHubs={normalHubs}
                    expandedForDisplay={expandedForDisplay}
                    blockOrderNumberBySlug={blockOrderNumberBySlug}
                    productCountBySlug={productCountBySlug}
                    {...handlers}
                  />
                ) : (
                  <MenuStructureSectionTableRow
                    key={`sec-${row.section.slug}`}
                    hub={row.hub}
                    section={row.section}
                    productCountBySlug={productCountBySlug}
                    connected={connected}
                    isPending={isPending}
                    toggleSectionActive={toggleSectionActive}
                    applySectionPosition={applySectionPosition}
                    openEditSection={openEditSection}
                    removeSection={removeSection}
                  />
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

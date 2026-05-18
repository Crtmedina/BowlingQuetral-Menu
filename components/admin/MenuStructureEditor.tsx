"use client";

import Link from "next/link";
import {
  LayoutGrid,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MenuOrderEditor } from "@/components/admin/MenuOrderEditor";
import { MenuStructureMobileList } from "@/components/admin/MenuStructureMobileList";
import { MenuStructureDesktopTable } from "@/components/admin/menu-structure/MenuStructureDesktopTable";
import { MenuStructureFilters } from "@/components/admin/menu-structure/MenuStructureFilters";
import { MenuHubDialog } from "@/components/admin/menu-structure/MenuHubDialog";
import { MenuPromoConfirmDialog } from "@/components/admin/menu-structure/MenuPromoConfirmDialog";
import { MenuSectionDialog } from "@/components/admin/menu-structure/MenuSectionDialog";
import { AdminMongoBanner } from "@/components/admin/AdminMongoBanner";
import { useMenuStructureEditor } from "@/components/admin/hooks/useMenuStructureEditor";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import type { MenuSectionStat } from "@/lib/menu/menu-structure-rows";

export type { MenuSectionStat };

type MenuStructureEditorProps = {
  menuLayout: MenuLayoutHubDTO[];
  connected: boolean;
  sectionStats: MenuSectionStat[];
  happyHourScheduleLabel: string;
  happyHourLabel: string;
};

export function MenuStructureEditor({
  menuLayout,
  connected,
  sectionStats,
  happyHourScheduleLabel,
  happyHourLabel,
}: MenuStructureEditorProps) {
  const {
    isPending,
    err,
    setErr,
    adminTab,
    setAdminTab,
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
    hubOpen,
    setHubOpen,
    promoConfirmHub,
    setPromoConfirmHub,
    hubEditingSlug,
    hubForm,
    setHubForm,
    sectionOpen,
    setSectionOpen,
    sectionEditingSlug,
    sectionForm,
    setSectionForm,
    filteredRows,
    allRows,
    featuredHubs,
    normalHubs,
    expandedForDisplay,
    blockOrderNumberBySlug,
    productCountBySlug,
    emptyVisibleSections,
    allHubsExpanded,
    hasPromoInDb,
    hubCanSave,
    hasMenuStructureActiveFilters,
    promoHubReplacing,
    clearFilters,
    toggleHubExpanded,
    toggleAllHubsExpanded,
    openNewHub,
    openEditHub,
    openNewSection,
    openEditSection,
    saveHub,
    saveSection,
    applyHubPosition,
    applyHubFeaturedRank,
    requestToggleHubFeatured,
    toggleHubActive,
    toggleSectionActive,
    applySectionPosition,
    removeHub,
    removeSection,
    openPromoConfirm,
    confirmSetPromoHub,
    clearPromoHub,
    requestHubFormFeatured,
    sortedDisplayHubs,
  } = useMenuStructureEditor({ menuLayout, connected, sectionStats });

  return (
    <>
      <section className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <AdminPageHeader
            title="Bloques y categorías"
            description={
              adminTab === "structure"
                ? "Organiza la carta en bloques y categorías. Edita nombre, texto introductorio y visibilidad."
                : "Mismo orden que la carta. Usa las flechas para bloques y categorías."
            }
            hint="Destacado = sale primero en la barra. Plantilla 2×1 = banner Happy Hour (un solo bloque). Tragos 2×1 en Productos."
            action={
              adminTab === "structure" ? (
                <Button
                  type="button"
                  variant="gold"
                  className="w-full gap-2 sm:w-auto"
                  onClick={openNewHub}
                  disabled={!connected || isPending}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden />
                  Nuevo bloque
                </Button>
              ) : undefined
            }
          />
          <div
            className="mt-4 inline-flex rounded-lg border border-border bg-muted/30 p-0.5"
            role="tablist"
            aria-label="Vista del menú"
          >
            <button
              type="button"
              role="tab"
              aria-selected={adminTab === "structure"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                adminTab === "structure"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setAdminTab("structure")}
            >
              <List className="h-4 w-4 shrink-0" aria-hidden />
              Estructura
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={adminTab === "order"}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                adminTab === "order"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setAdminTab("order")}
            >
              <ListOrdered className="h-4 w-4 shrink-0" aria-hidden />
              Orden
            </button>
          </div>
        </div>

        <div className="space-y-3 px-5 py-4 sm:px-6">
          {!connected && (
            <AdminMongoBanner>Conecta MongoDB para modificar la estructura.</AdminMongoBanner>
          )}
          {adminTab === "order" ? (
            <MenuOrderEditor
              menuLayout={menuLayout}
              connected={connected}
              isPending={isPending}
              onMoveHubFeatured={applyHubFeaturedRank}
              onMoveHubNormal={applyHubPosition}
              onMoveSection={applySectionPosition}
            />
          ) : (
            <>
              {emptyVisibleSections.length > 0 ? (
                <div className="rounded-lg border border-amber-500/35 bg-amber-500/[0.07] px-3 py-2.5 text-sm">
                  <p className="font-medium text-amber-950">
                    {emptyVisibleSections.length} categoría
                    {emptyVisibleSections.length === 1 ? "" : "s"} visible
                    {emptyVisibleSections.length === 1 ? "" : "s"} sin productos
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    {emptyVisibleSections.slice(0, 8).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/admin/products?sec=${encodeURIComponent(s.slug)}`}
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          {menuLayout.flatMap((h) => h.sections).find((x) => x.slug === s.slug)?.label ??
                            s.slug}
                        </Link>
                      </li>
                    ))}
                    {emptyVisibleSections.length > 8 ? (
                      <li className="text-muted-foreground">+{emptyVisibleSections.length - 8} más</li>
                    ) : null}
                  </ul>
                </div>
              ) : null}

              <MenuStructureFilters
                filterQ={filterQ}
                onFilterQChange={setFilterQ}
                filterLevel={filterLevel}
                onFilterLevelChange={setFilterLevel}
                filterHub={filterHub}
                onFilterHubChange={setFilterHub}
                filterActive={filterActive}
                onFilterActiveChange={setFilterActive}
                showMoreFilters={showMoreFilters}
                onToggleShowMoreFilters={() => setShowMoreFilters((v) => !v)}
                filteredCount={filteredRows.length}
                totalRows={allRows.length}
                sortedDisplayHubs={sortedDisplayHubs}
                hasActiveFilters={hasMenuStructureActiveFilters}
                onClearFilters={clearFilters}
                allHubsExpanded={allHubsExpanded}
                onToggleAllHubsExpanded={toggleAllHubsExpanded}
                hubCount={menuLayout.length}
                hasPromoInDb={hasPromoInDb}
                menuLayout={menuLayout}
                onClearPromoHub={clearPromoHub}
                connected={connected}
                isPending={isPending}
              />
              <MenuStructureMobileList
                rows={filteredRows}
                connected={connected}
                isPending={isPending}
                expandedForDisplay={expandedForDisplay}
                blockOrderNumberBySlug={blockOrderNumberBySlug}
                productCountBySlug={productCountBySlug}
                featuredHubs={featuredHubs}
                normalHubs={normalHubs}
                toggleHubExpanded={toggleHubExpanded}
                requestToggleHubFeatured={requestToggleHubFeatured}
                toggleHubActive={toggleHubActive}
                toggleSectionActive={toggleSectionActive}
                openPromoConfirm={openPromoConfirm}
                applyHubFeaturedRank={applyHubFeaturedRank}
                applyHubPosition={applyHubPosition}
                applySectionPosition={applySectionPosition}
                openNewSection={openNewSection}
                openEditHub={openEditHub}
                openEditSection={openEditSection}
                removeHub={removeHub}
                removeSection={removeSection}
                onClearFilters={clearFilters}
              />

              <MenuStructureDesktopTable
                filteredRows={filteredRows}
                connected={connected}
                isPending={isPending}
                featuredHubs={featuredHubs}
                normalHubs={normalHubs}
                expandedForDisplay={expandedForDisplay}
                blockOrderNumberBySlug={blockOrderNumberBySlug}
                productCountBySlug={productCountBySlug}
                onClearFilters={clearFilters}
                toggleHubExpanded={toggleHubExpanded}
                requestToggleHubFeatured={requestToggleHubFeatured}
                toggleHubActive={toggleHubActive}
                toggleSectionActive={toggleSectionActive}
                openPromoConfirm={openPromoConfirm}
                applyHubFeaturedRank={applyHubFeaturedRank}
                applyHubPosition={applyHubPosition}
                applySectionPosition={applySectionPosition}
                openNewSection={openNewSection}
                openEditHub={openEditHub}
                openEditSection={openEditSection}
                removeHub={removeHub}
                removeSection={removeSection}
              />

            </>
          )}
        </div>
      </section>

      <MenuHubDialog
        open={hubOpen}
        onOpenChange={(open) => {
          setHubOpen(open);
          if (!open) setErr(null);
        }}
        hubEditingSlug={hubEditingSlug}
        hubForm={hubForm}
        setHubForm={setHubForm}
        onRequestFeatured={requestHubFormFeatured}
        hubCanSave={hubCanSave}
        connected={connected}
        isPending={isPending}
        error={err}
        onSubmit={saveHub}
      />

      <MenuPromoConfirmDialog
        hub={promoConfirmHub}
        onOpenChange={(open) => {
          if (!open) {
            setPromoConfirmHub(null);
            setErr(null);
          }
        }}
        replacingHub={promoHubReplacing}
        connected={connected}
        isPending={isPending}
        error={err}
        onConfirm={confirmSetPromoHub}
        happyHourScheduleLabel={happyHourScheduleLabel}
        happyHourLabel={happyHourLabel}
      />

      <MenuSectionDialog
        open={sectionOpen}
        onOpenChange={setSectionOpen}
        sectionEditingSlug={sectionEditingSlug}
        sectionForm={sectionForm}
        setSectionForm={setSectionForm}
        connected={connected}
        isPending={isPending}
        error={err}
        onSave={saveSection}
      />
    </>
  );
}

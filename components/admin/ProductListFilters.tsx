"use client";

import { useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { adminChipClass } from "@/components/admin/admin-chip";
import { CategoryPickerDialog } from "@/components/admin/products/CategoryPickerDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HAPPY_HOUR_BLOCK_SLUG, HAPPY_HOUR_CATEGORY_SLUG } from "@/lib/menu/happy-hour";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import type { ProductListVisibility } from "@/lib/admin/product-list-url";
import { cn } from "@/lib/utils";

export type ProductFilterPreset = "all" | "happy-hour" | "hidden";

type ProductListFiltersProps = {
  menuLayout: MenuLayoutHubDTO[];
  search: string;
  onSearchChange: (value: string) => void;
  filterHubSlug: string;
  onFilterHubChange: (hubSlug: string) => void;
  selectedSectionSlugs: string[];
  onToggleSection: (sectionSlug: string) => void;
  onClearSections: () => void;
  visibility: ProductListVisibility;
  onVisibilityChange: (value: ProductListVisibility) => void;
  filteredCount: number;
  totalCount: number;
  countBySection: Map<string, number>;
  onClearAllFilters: () => void;
  onApplyPreset: (preset: ProductFilterPreset) => void;
  sectionLabel: (slug: string) => string;
  hubTitleForSlug: (hubSlug: string) => string;
};

export function ProductListFilters({
  menuLayout,
  search,
  onSearchChange,
  filterHubSlug,
  onFilterHubChange,
  selectedSectionSlugs,
  onToggleSection,
  onClearSections,
  visibility,
  onVisibilityChange,
  filteredCount,
  totalCount,
  countBySection,
  onClearAllFilters,
  onApplyPreset,
  sectionLabel,
  hubTitleForSlug,
}: ProductListFiltersProps) {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const hasActiveFilters =
    search.trim().length > 0 ||
    filterHubSlug.trim().length > 0 ||
    selectedSectionSlugs.length > 0 ||
    visibility !== "all";

  const activePreset: ProductFilterPreset | null =
    visibility === "hidden" &&
    !search.trim() &&
    !filterHubSlug &&
    selectedSectionSlugs.length === 0
      ? "hidden"
      : filterHubSlug === HAPPY_HOUR_BLOCK_SLUG &&
          selectedSectionSlugs.length === 1 &&
          selectedSectionSlugs[0] === HAPPY_HOUR_CATEGORY_SLUG &&
          visibility === "all" &&
          !search.trim()
        ? "happy-hour"
        : !hasActiveFilters
          ? "all"
          : null;

  const categoryButtonLabel =
    selectedSectionSlugs.length === 0
      ? "Todas las categorías"
      : selectedSectionSlugs.length === 1
        ? sectionLabel(selectedSectionSlugs[0])
        : `${selectedSectionSlugs.length} categorías`;

  const visibleSelectedChips = selectedSectionSlugs.slice(0, 4);
  const hiddenSelectedCount = Math.max(0, selectedSectionSlugs.length - visibleSelectedChips.length);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/15 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
            Filtros
          </div>
          <p className="text-sm tabular-nums">
            <span className="font-semibold text-gold">{filteredCount}</span>
            <span className="text-muted-foreground"> / {totalCount}</span>
          </p>
        </div>

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            className="h-10 rounded-lg border-border bg-background pl-9 pr-9"
            placeholder="Buscar producto…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar productos"
          />
          {search.trim() ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
              onClick={() => onSearchChange("")}
              aria-label="Borrar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "all" as const, label: "Todos" },
              { id: "happy-hour" as const, label: "Happy Hour" },
              { id: "hidden" as const, label: "Ocultos" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onApplyPreset(id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activePreset === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => setCategoryDialogOpen(true)}
          >
            {categoryButtonLabel}
            <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
          </Button>

          <div className="hidden h-6 w-px bg-border sm:block" aria-hidden />

          <div className="flex flex-wrap gap-1">
            {(
              [
                { value: "all" as const, label: "Visibles y ocultos" },
                { value: "active" as const, label: "Solo visibles" },
                { value: "hidden" as const, label: "Solo ocultos" },
              ] as const
            ).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onVisibilityChange(value)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.7rem] font-medium transition-colors",
                  visibility === value
                    ? "bg-secondary text-foreground ring-1 ring-border"
                    : "text-muted-foreground hover:bg-muted/60"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {selectedSectionSlugs.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleSelectedChips.map((slug) => (
              <Badge key={slug} variant="outline" className="gap-1 pr-1 font-normal">
                {sectionLabel(slug)}
                <button
                  type="button"
                  className="rounded-full p-0.5 hover:bg-muted"
                  onClick={() => onToggleSection(slug)}
                  aria-label={`Quitar ${sectionLabel(slug)}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {hiddenSelectedCount > 0 ? (
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => setCategoryDialogOpen(true)}
              >
                +{hiddenSelectedCount} más
              </button>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-dashed border-border/80 px-3 py-2 text-left text-xs text-muted-foreground hover:bg-muted/40 sm:w-auto sm:min-w-[12rem]"
          onClick={() => setShowMoreFilters((v) => !v)}
          aria-expanded={showMoreFilters}
        >
          <span>
            Bloque del menú
            {filterHubSlug.trim() ? ` · ${hubTitleForSlug(filterHubSlug)}` : ""}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition-transform", showMoreFilters && "rotate-180")}
            aria-hidden
          />
        </button>

        {showMoreFilters ? (
          <div className="space-y-2 rounded-lg border border-border/70 bg-background/80 p-2">
            {!filterHubSlug.trim() ? (
              <p className="px-1 text-[0.7rem] leading-snug text-amber-800">
                Elige un bloque para acotar la lista antes de buscar categorías.
              </p>
            ) : null}
            <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button type="button" onClick={() => onFilterHubChange("")} className={adminChipClass(!filterHubSlug.trim())}>
                Todos
              </button>
              {menuLayout.map((hub) => (
                <button
                  key={hub.slug}
                  type="button"
                  onClick={() => onFilterHubChange(hub.slug)}
                  className={adminChipClass(filterHubSlug === hub.slug)}
                >
                  {hub.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {hasActiveFilters ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-2">
            <span className="text-xs text-muted-foreground">Activos:</span>
            {search.trim() ? (
              <Badge variant="secondary" className="max-w-[10rem] truncate font-normal">
                “{search.trim()}”
              </Badge>
            ) : null}
            {filterHubSlug.trim() ? (
              <Badge variant="secondary" className="font-normal">
                {hubTitleForSlug(filterHubSlug)}
              </Badge>
            ) : null}
            <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={onClearAllFilters}>
              Limpiar
            </Button>
          </div>
        ) : null}
      </div>

      <CategoryPickerDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        menuLayout={menuLayout}
        filterHubSlug={filterHubSlug}
        selectedSectionSlugs={selectedSectionSlugs}
        onToggleSection={onToggleSection}
        onClearSections={onClearSections}
        countBySection={countBySection}
        sectionLabel={sectionLabel}
        hubTitleForSlug={hubTitleForSlug}
      />

      <p className="text-center text-xs text-muted-foreground">
        <a href="#lista-productos" className="text-primary hover:underline">
          Ir a la lista de productos ↓
        </a>
      </p>
    </div>
  );
}

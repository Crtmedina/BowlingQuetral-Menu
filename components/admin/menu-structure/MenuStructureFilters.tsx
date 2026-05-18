"use client";

import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { adminFilterChipClass } from "@/components/admin/admin-chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import type { MenuStructureActiveFilter, MenuStructureLevelFilter } from "@/lib/menu/menu-structure-rows";
import { cn } from "@/lib/utils";

export type MenuStructureFiltersProps = {
  filterQ: string;
  onFilterQChange: (value: string) => void;
  filterLevel: MenuStructureLevelFilter;
  onFilterLevelChange: (value: MenuStructureLevelFilter) => void;
  filterHub: string;
  onFilterHubChange: (value: string) => void;
  filterActive: MenuStructureActiveFilter;
  onFilterActiveChange: (value: MenuStructureActiveFilter) => void;
  showMoreFilters: boolean;
  onToggleShowMoreFilters: () => void;
  filteredCount: number;
  totalRows: number;
  sortedDisplayHubs: MenuLayoutHubDTO[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  allHubsExpanded: boolean;
  onToggleAllHubsExpanded: () => void;
  hubCount: number;
  hasPromoInDb: boolean;
  menuLayout: MenuLayoutHubDTO[];
  onClearPromoHub: () => void | Promise<void>;
  connected: boolean;
  isPending: boolean;
};

export function MenuStructureFilters({
  filterQ,
  onFilterQChange,
  filterLevel,
  onFilterLevelChange,
  filterHub,
  onFilterHubChange,
  filterActive,
  onFilterActiveChange,
  showMoreFilters,
  onToggleShowMoreFilters,
  filteredCount,
  totalRows,
  sortedDisplayHubs,
  hasActiveFilters,
  onClearFilters,
  allHubsExpanded,
  onToggleAllHubsExpanded,
  hubCount,
  hasPromoInDb,
  menuLayout,
  onClearPromoHub,
  connected,
  isPending,
}: MenuStructureFiltersProps) {
  return (
    <>
      <div className="space-y-3 rounded-xl border border-border bg-muted/15 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
            Filtros
          </div>
          <p className="text-sm tabular-nums">
            <span className="font-semibold text-gold">{filteredCount}</span>
            <span className="text-muted-foreground"> / {totalRows} filas</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[12rem] flex-1">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              className="h-9 rounded-lg border-border bg-background pl-8 pr-8"
              placeholder="Buscar bloque o categoría…"
              value={filterQ}
              onChange={(e) => onFilterQChange(e.target.value)}
              aria-label="Buscar en la tabla"
            />
            {filterQ.trim() ? (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
                onClick={() => onFilterQChange("")}
                aria-label="Borrar búsqueda"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 shrink-0"
            onClick={onToggleAllHubsExpanded}
            disabled={hubCount === 0}
          >
            {allHubsExpanded ? "Colapsar bloques" : "Expandir bloques"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 shrink-0 gap-1.5"
            onClick={onToggleShowMoreFilters}
          >
            Más filtros
            <ChevronDown
              className={cn("h-3.5 w-3.5 opacity-60 transition-transform", showMoreFilters && "rotate-180")}
              aria-hidden
            />
          </Button>
        </div>
        {showMoreFilters ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
            <select
              className="h-8 rounded-md border border-input bg-background px-2 text-xs shadow-sm"
              value={filterLevel}
              onChange={(e) => onFilterLevelChange(e.target.value as MenuStructureLevelFilter)}
              aria-label="Filtrar por tipo de fila"
            >
              <option value="all">Todos los tipos</option>
              <option value="hub">Solo bloques</option>
              <option value="section">Solo categorías</option>
            </select>
            <select
              className="h-8 min-w-[9rem] rounded-md border border-input bg-background px-2 text-xs shadow-sm"
              value={filterHub}
              onChange={(e) => onFilterHubChange(e.target.value)}
              aria-label="Filtrar por bloque"
            >
              <option value="">Todos los bloques</option>
              {sortedDisplayHubs.map((h) => (
                <option key={h.slug} value={h.slug}>
                  {h.label}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-1">
              {(
                [
                  { value: "all" as const, label: "Todos" },
                  { value: "yes" as const, label: "Visibles" },
                  { value: "no" as const, label: "Ocultos" },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onFilterActiveChange(value)}
                  className={adminFilterChipClass(filterActive === value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {hasActiveFilters ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {filterQ.trim() ? (
              <Badge variant="secondary" className="gap-1 pr-1 font-normal">
                «{filterQ.trim()}»
                <button
                  type="button"
                  className="rounded p-0.5 hover:bg-muted"
                  onClick={() => onFilterQChange("")}
                  aria-label="Quitar búsqueda"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null}
            {filterLevel !== "all" ? (
              <Badge variant="secondary" className="font-normal">
                {filterLevel === "hub" ? "Solo bloques" : "Solo categorías"}
              </Badge>
            ) : null}
            {filterHub ? (
              <Badge variant="secondary" className="font-normal">
                {sortedDisplayHubs.find((h) => h.slug === filterHub)?.label ?? filterHub}
              </Badge>
            ) : null}
            {filterActive !== "all" ? (
              <Badge variant="secondary" className="font-normal">
                {filterActive === "yes" ? "Visibles" : "Ocultos"}
              </Badge>
            ) : null}
            <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={onClearFilters}>
              Limpiar
            </Button>
          </div>
        ) : null}
      </div>
      {hasPromoInDb ? (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/[0.06] px-3 py-2 text-xs">
          <span className="font-medium text-foreground">Plantilla 2×1:</span>
          <Badge variant="secondary" className="font-normal">
            {menuLayout.find((h) => h.isPromoHub)?.label ?? "—"}
          </Badge>
          <span className="text-muted-foreground">Banner Happy Hour en la carta</span>
          <button
            type="button"
            className="ml-auto text-primary underline-offset-2 hover:underline disabled:opacity-50"
            onClick={() => void onClearPromoHub()}
            disabled={!connected || isPending}
          >
            Quitar
          </button>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
          Ningún bloque usa la <strong className="text-foreground">plantilla 2×1</strong>. Márcala en la tabla
          (escritorio) o en cada tarjeta (móvil).
        </p>
      )}
    </>
  );
}

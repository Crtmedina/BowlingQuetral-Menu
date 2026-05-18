"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { adminChipClass } from "@/components/admin/admin-chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

type HubSectionRow = { hub: MenuLayoutHubDTO; section: MenuLayoutSectionDTO };

export type CategoryPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuLayout: MenuLayoutHubDTO[];
  filterHubSlug: string;
  selectedSectionSlugs: string[];
  onToggleSection: (sectionSlug: string) => void;
  onClearSections: () => void;
  countBySection: Map<string, number>;
  sectionLabel: (slug: string) => string;
  hubTitleForSlug: (hubSlug: string) => string;
};

export function CategoryPickerDialog({
  open,
  onOpenChange,
  menuLayout,
  filterHubSlug,
  selectedSectionSlugs,
  onToggleSection,
  onClearSections,
  countBySection,
  sectionLabel,
  hubTitleForSlug,
}: CategoryPickerDialogProps) {
  const [query, setQuery] = useState("");

  const hubsInDialog = filterHubSlug.trim()
    ? menuLayout.filter((h) => h.slug === filterHubSlug.trim())
    : menuLayout;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hubsInDialog.flatMap((hub) =>
      hub.sections
        .filter((section) => {
          if (!q) return true;
          return (
            section.label.toLowerCase().includes(q) ||
            section.slug.toLowerCase().includes(q) ||
            hub.label.toLowerCase().includes(q)
          );
        })
        .map((section) => ({ hub, section }))
    );
  }, [hubsInDialog, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, HubSectionRow[]>();
    for (const row of rows) {
      const list = map.get(row.hub.slug) ?? [];
      list.push(row);
      map.set(row.hub.slug, list);
    }
    return map;
  }, [rows]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-dialog-surface flex max-h-[min(88dvh,640px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="space-y-1 border-b border-border px-5 pb-3 pt-5 pr-12">
          <DialogTitle>Elegir categorías</DialogTitle>
          <DialogDescription className="text-pretty">
            {filterHubSlug.trim()
              ? `Categorías del bloque ${hubTitleForSlug(filterHubSlug)}.`
              : "Consejo: primero elige un bloque arriba para ver menos opciones."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 border-b border-border px-5 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-9 pl-8"
              placeholder="Buscar categoría…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          {selectedSectionSlugs.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {selectedSectionSlugs.map((slug) => (
                <Badge key={slug} variant="secondary" className="gap-1 pr-1 font-normal">
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
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Ninguna categoría seleccionada = se muestran todas.</p>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
          {rows.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No hay categorías que coincidan con “{query.trim()}”.
            </p>
          ) : (
            <div className="space-y-4">
              {Array.from(grouped.entries()).map(([hubSlug, hubRows]) => (
                <div key={hubSlug}>
                  {!filterHubSlug.trim() ? (
                    <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
                      {hubRows[0]?.hub.label}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {hubRows.map(({ section }) => {
                      const active = selectedSectionSlugs.includes(section.slug);
                      const n = countBySection.get(section.slug) ?? 0;
                      return (
                        <button
                          key={section.slug}
                          type="button"
                          onClick={() => onToggleSection(section.slug)}
                          className={cn(adminChipClass(active), "inline-flex items-center gap-1")}
                          aria-pressed={active}
                        >
                          {section.label}
                          <span className="tabular-nums opacity-80">({n})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row gap-2 border-t border-border bg-muted/20 px-5 py-3 sm:justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={onClearSections}>
            Ver todas
          </Button>
          <Button type="button" size="sm" onClick={() => onOpenChange(false)}>
            Listo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHubIcon } from "@/lib/menu/hub-icons";
import {
  menuGroupLabel,
  sortFeaturedHubsInGroup,
  sortHubsForCarta,
  sortNormalHubsInGroup,
  type MenuLayoutHubDTO,
  type MenuLayoutSectionDTO,
} from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

type MenuOrderEditorProps = {
  menuLayout: MenuLayoutHubDTO[];
  connected: boolean;
  isPending: boolean;
  onMoveHubFeatured: (slug: string, oneBasedPosition: number) => void;
  onMoveHubNormal: (slug: string, oneBasedPosition: number) => void;
  onMoveSection: (hubSlug: string, sectionSlug: string, oneBasedPosition: number) => void;
};

function sortSections(sections: MenuLayoutSectionDTO[]) {
  return [...sections].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

function OrderRow({
  label,
  sublabel,
  position,
  canMoveUp,
  canMoveDown,
  active,
  badges,
  onMoveUp,
  onMoveDown,
  disabled,
  selected,
  onSelect,
}: {
  label: string;
  sublabel?: string;
  position: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  active: boolean;
  badges?: ReactNode;
  onMoveUp: () => void;
  onMoveDown: () => void;
  disabled: boolean;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border px-2 py-2 transition-colors sm:flex-row sm:items-center",
        selected ? "border-gold/50 bg-gold/10" : "border-border bg-background",
        !active && "opacity-55"
      )}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          disabled={disabled}
        >
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums",
              selected ? "bg-gold/20 text-foreground" : "bg-muted text-foreground"
            )}
          >
            {position}
          </span>
          <span className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{label}</p>
            {sublabel ? <p className="truncate text-xs text-muted-foreground">{sublabel}</p> : null}
            {badges ? <div className="mt-1.5 flex flex-wrap gap-1">{badges}</div> : null}
          </span>
          {selected ? <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold sm:mt-0" aria-hidden /> : null}
        </button>
      ) : (
        <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold tabular-nums text-foreground">
            {position}
          </span>
          <span className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{label}</p>
            {sublabel ? <p className="truncate text-xs text-muted-foreground">{sublabel}</p> : null}
            {badges ? <div className="mt-1.5 flex flex-wrap gap-1">{badges}</div> : null}
          </span>
        </div>
      )}
      <div className="flex shrink-0 flex-row justify-end gap-1 self-end sm:flex-col sm:gap-0.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          disabled={disabled || !canMoveUp}
          onClick={onMoveUp}
          aria-label="Subir"
        >
          <ArrowUp className="h-3.5 w-3.5" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          disabled={disabled || !canMoveDown}
          onClick={onMoveDown}
          aria-label="Bajar"
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function hubMovePool(hub: MenuLayoutHubDTO, layout: MenuLayoutHubDTO[]) {
  return hub.isFeatured
    ? sortFeaturedHubsInGroup(layout, hub.menuGroup)
    : sortNormalHubsInGroup(layout, hub.menuGroup);
}

function ListDivider({ children }: { children: string }) {
  return (
    <p className="border-t border-border/80 pt-3 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

export function MenuOrderEditor({
  menuLayout,
  connected,
  isPending,
  onMoveHubFeatured,
  onMoveHubNormal,
  onMoveSection,
}: MenuOrderEditorProps) {
  const sortedHubs = useMemo(() => sortHubsForCarta(menuLayout), [menuLayout]);

  const [selectedHubSlug, setSelectedHubSlug] = useState<string | null>(
    () => sortedHubs[0]?.slug ?? null
  );

  const selectedHub = useMemo(
    () => menuLayout.find((h) => h.slug === selectedHubSlug) ?? null,
    [menuLayout, selectedHubSlug]
  );

  const selectedSections = useMemo(
    () => (selectedHub ? sortSections(selectedHub.sections) : []),
    [selectedHub]
  );

  const disabled = !connected || isPending;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          El número de cada fila es el orden en la carta. Las flechas mueven el bloque dentro de su
          zona (destacado, comida o barra).
        </p>
        <Button type="button" variant="outline" size="sm" className="shrink-0 gap-1.5" asChild>
          <Link href="/carta" target="_blank" rel="noopener noreferrer">
            Ver carta
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Bloques ({sortedHubs.length})
          </h3>
          {sortedHubs.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted-foreground">
              No hay bloques. Créalos en la pestaña Estructura.
            </p>
          ) : (
            <div className="space-y-1.5 rounded-xl border border-border bg-muted/10 p-2 sm:p-3">
              {sortedHubs.map((hub, globalIndex) => {
                const pool = hubMovePool(hub, menuLayout);
                const localIndex = pool.findIndex((h) => h.slug === hub.slug);
                const prev = sortedHubs[globalIndex - 1];
                let divider: string | null = null;
                if (globalIndex > 0 && prev.isFeatured && !hub.isFeatured) {
                  divider = "Resto del menú";
                } else if (
                  globalIndex > 0 &&
                  !hub.isFeatured &&
                  prev.menuGroup === "comida" &&
                  hub.menuGroup === "barra"
                ) {
                  divider = menuGroupLabel("barra");
                }

                const Icon = getHubIcon(hub.iconKey);
                const tags: ReactNode[] = [];
                if (hub.isFeatured) {
                  tags.push(
                    <Badge
                      key="feat"
                      variant="outline"
                      className="border-amber-500/40 text-[0.65rem] font-normal text-amber-900"
                    >
                      Destacado
                    </Badge>
                  );
                }
                tags.push(
                  <Badge key="group" variant="outline" className="text-[0.65rem] font-normal capitalize">
                    {menuGroupLabel(hub.menuGroup)}
                  </Badge>
                );
                if (!hub.active) {
                  tags.push(
                    <Badge key="off" variant="secondary" className="text-[0.65rem] font-normal">
                      Oculto
                    </Badge>
                  );
                }
                if (hub.isPromoHub) {
                  tags.push(
                    <Badge
                      key="promo"
                      variant="outline"
                      className="border-amber-500/40 text-[0.65rem] font-normal text-amber-900"
                    >
                      2×1
                    </Badge>
                  );
                }

                return (
                  <div key={hub.slug} className="space-y-1.5">
                    {divider ? <ListDivider>{divider}</ListDivider> : null}
                    <OrderRow
                      label={hub.label}
                      sublabel={hub.suffix || undefined}
                      position={globalIndex + 1}
                      canMoveUp={localIndex > 0}
                      canMoveDown={localIndex >= 0 && localIndex < pool.length - 1}
                      active={hub.active}
                      badges={
                        <span className="inline-flex items-center gap-1">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                          {tags}
                        </span>
                      }
                      disabled={disabled}
                      selected={selectedHubSlug === hub.slug}
                      onSelect={() => setSelectedHubSlug(hub.slug)}
                      onMoveUp={() =>
                        hub.isFeatured
                          ? onMoveHubFeatured(hub.slug, localIndex)
                          : onMoveHubNormal(hub.slug, localIndex)
                      }
                      onMoveDown={() =>
                        hub.isFeatured
                          ? onMoveHubFeatured(hub.slug, localIndex + 2)
                          : onMoveHubNormal(hub.slug, localIndex + 2)
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="space-y-2 border-t border-border/80 pt-4 lg:sticky lg:top-4 lg:self-start lg:border-t-0 lg:pt-0">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {selectedHub ? `Categorías · ${selectedHub.label}` : "Categorías"}
          </h3>
          {selectedHub ? (
            <p className="text-xs text-muted-foreground lg:hidden">
              Ordena las categorías del bloque seleccionado.
            </p>
          ) : null}
          {!selectedHub ? (
            <p className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted-foreground">
              Haz clic en un bloque para ordenar sus categorías.
            </p>
          ) : selectedSections.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted-foreground">
              Sin categorías. Añádelas en Estructura.
            </p>
          ) : (
            <div className="space-y-1.5 rounded-xl border border-border bg-muted/15 p-3">
              {selectedSections.map((sec, i) => (
                <OrderRow
                  key={sec.slug}
                  label={sec.label}
                  position={i + 1}
                  canMoveUp={i > 0}
                  canMoveDown={i < selectedSections.length - 1}
                  active={sec.active}
                  badges={
                    !sec.active ? (
                      <Badge variant="secondary" className="text-[0.65rem] font-normal">
                        Oculta
                      </Badge>
                    ) : null
                  }
                  disabled={disabled}
                  onMoveUp={() => onMoveSection(selectedHub.slug, sec.slug, i)}
                  onMoveDown={() => onMoveSection(selectedHub.slug, sec.slug, i + 2)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

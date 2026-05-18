"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { MenuStructureHubBadges } from "@/components/admin/menu-structure/MenuStructureHubBadges";
import { MenuStructureHubMobileOptions } from "@/components/admin/menu-structure/MenuStructureHubMobileOptions";
import { MenuStructurePositionSelect } from "@/components/admin/menu-structure/MenuStructurePositionSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  countHubProducts,
  getHubPositionMeta,
  hubRowSurfaceClass,
} from "@/lib/admin/menu-structure-meta";
import { getHubIcon } from "@/lib/menu/hub-icons";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export type MenuStructureHubMobileCardProps = {
  hub: MenuLayoutHubDTO;
  featuredHubs: MenuLayoutHubDTO[];
  normalHubs: MenuLayoutHubDTO[];
  expandedForDisplay: Set<string>;
  blockOrderNumberBySlug: Map<string, number>;
  productCountBySlug: Map<string, number>;
  disabled: boolean;
  toggleHubExpanded: (slug: string) => void;
  requestToggleHubFeatured: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  toggleHubActive: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  openPromoConfirm: (hub: MenuLayoutHubDTO) => void;
  applyHubFeaturedRank: (slug: string, oneBased: number) => void;
  applyHubPosition: (slug: string, oneBased: number) => void;
  openNewSection: (hubSlug: string) => void;
  openEditHub: (hub: MenuLayoutHubDTO) => void;
  removeHub: (slug: string) => void | Promise<void>;
};

export function MenuStructureHubMobileCard({
  hub,
  featuredHubs,
  normalHubs,
  expandedForDisplay,
  blockOrderNumberBySlug,
  productCountBySlug,
  disabled,
  toggleHubExpanded,
  requestToggleHubFeatured,
  toggleHubActive,
  openPromoConfirm,
  applyHubFeaturedRank,
  applyHubPosition,
  openNewSection,
  openEditHub,
  removeHub,
}: MenuStructureHubMobileCardProps) {
  const { nHub, hubPos1, hubPosTitle } = getHubPositionMeta(hub, featuredHubs, normalHubs);
  const isExpanded = expandedForDisplay.has(hub.slug);
  const HubIcon = getHubIcon(hub.iconKey);
  const hubProductTotal = countHubProducts(hub, productCountBySlug);
  const cartaNum = blockOrderNumberBySlug.get(hub.slug);

  return (
    <Card className={hubRowSurfaceClass(hub, "overflow-hidden")}>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start gap-2">
          <span
            className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg bg-muted px-2 text-sm font-bold tabular-nums text-foreground ring-1 ring-border"
            title={cartaNum ? `Bloque ${cartaNum} en orden de carta` : undefined}
          >
            {cartaNum ?? "—"}
          </span>
          <button
            type="button"
            className="mt-1 shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted"
            onClick={() => toggleHubExpanded(hub.slug)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Ocultar categorías" : "Mostrar categorías"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" aria-hidden />
            ) : (
              <ChevronRight className="h-4 w-4" aria-hidden />
            )}
          </button>
          <HubIcon className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-snug text-foreground">
              {hub.label}
              {hub.suffix ? (
                <span className="ml-1 font-normal text-muted-foreground">· {hub.suffix}</span>
              ) : null}
            </p>
            <MenuStructureHubBadges hub={hub} sectionCount={hub.sections.length} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <MenuStructurePositionSelect
            value={hubPos1}
            total={nHub}
            title={hubPosTitle}
            disabled={disabled}
            label="Pos."
            className="h-8 min-w-[4.5rem] rounded-md border border-input bg-background px-2 text-center text-xs tabular-nums shadow-sm"
            onChange={(next) => {
              if (hub.isFeatured) applyHubFeaturedRank(hub.slug, next);
              else applyHubPosition(hub.slug, next);
            }}
          />
          <span className="text-muted-foreground">
            <strong className="text-foreground">{hubProductTotal}</strong> productos
          </span>
        </div>

        <MenuStructureHubMobileOptions
          hub={hub}
          disabled={disabled}
          onToggleFeatured={requestToggleHubFeatured}
          onToggleActive={toggleHubActive}
          onPromoSelect={openPromoConfirm}
        />

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={disabled}
            onClick={() => openNewSection(hub.slug)}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Categoría
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={disabled}
            onClick={() => openEditHub(hub)}
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Editar
          </Button>
          <Button type="button" variant="outline" size="sm" className="gap-1.5" asChild>
            <Link href={`/carta?hub=${encodeURIComponent(hub.slug)}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" aria-hidden />
              Carta
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
            disabled={disabled}
            onClick={() => void removeHub(hub.slug)}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

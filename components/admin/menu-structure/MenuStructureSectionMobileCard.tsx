"use client";

import Link from "next/link";
import { ExternalLink, List, Pencil, Trash2, UtensilsCrossed } from "lucide-react";
import { MenuStructurePositionSelect } from "@/components/admin/menu-structure/MenuStructurePositionSelect";
import { MenuStructureSectionBadges } from "@/components/admin/menu-structure/MenuStructureSectionBadges";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { getSectionPositionMeta } from "@/lib/admin/menu-structure-meta";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

export type MenuStructureSectionMobileCardProps = {
  hub: MenuLayoutHubDTO;
  section: MenuLayoutSectionDTO;
  productCountBySlug: Map<string, number>;
  disabled: boolean;
  toggleSectionActive: (hubSlug: string, section: MenuLayoutSectionDTO, checked: boolean) => void;
  applySectionPosition: (hubSlug: string, sectionSlug: string, oneBased: number) => void;
  openEditSection: (hubSlug: string, section: MenuLayoutSectionDTO) => void;
  removeSection: (slug: string) => void | Promise<void>;
};

export function MenuStructureSectionMobileCard({
  hub,
  section,
  productCountBySlug,
  disabled,
  toggleSectionActive,
  applySectionPosition,
  openEditSection,
  removeSection,
}: MenuStructureSectionMobileCardProps) {
  const { nSec, secPos1, secPosTitle, productCount } = getSectionPositionMeta(
    hub,
    section,
    productCountBySlug
  );

  return (
    <Card className={cn("ml-3 border-l-2 border-border/60", !section.active && "opacity-70")}>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start gap-2">
          <List className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/80" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{hub.label}</p>
            <p className="font-medium leading-snug text-foreground">{section.label}</p>
            <MenuStructureSectionBadges section={section} productCount={productCount} />
          </div>
        </div>

        <MenuStructurePositionSelect
          value={secPos1}
          total={nSec}
          title={secPosTitle}
          disabled={disabled}
          label="Posición"
          className="h-8 min-w-[4.5rem] rounded-md border border-input bg-background px-2 text-center text-xs tabular-nums shadow-sm"
          onChange={(next) => applySectionPosition(hub.slug, section.slug, next)}
        />

        <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/25 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">Visible en carta</span>
          <Switch
            checked={section.active}
            disabled={disabled}
            onCheckedChange={(checked) => toggleSectionActive(hub.slug, section, checked)}
            aria-label={section.active ? "Ocultar categoría" : "Mostrar categoría"}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" size="sm" className="gap-1.5" asChild>
            <Link
              href={`/admin/products?sec=${encodeURIComponent(section.slug)}&hub=${encodeURIComponent(hub.slug)}`}
            >
              <UtensilsCrossed className="h-4 w-4" aria-hidden />
              Productos
            </Link>
          </Button>
          <Button type="button" variant="outline" size="sm" className="gap-1.5" asChild>
            <Link
              href={`/carta?sec=${encodeURIComponent(section.slug)}&hub=${encodeURIComponent(hub.slug)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Carta
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={disabled}
            onClick={() => openEditSection(hub.slug, section)}
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Editar
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
            disabled={disabled}
            onClick={() => void removeSection(section.slug)}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

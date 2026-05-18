"use client";

import { ExternalLink, List, Pencil, Trash2, UtensilsCrossed } from "lucide-react";
import { MenuStructurePositionSelect } from "@/components/admin/menu-structure/MenuStructurePositionSelect";
import type { MenuStructureListHandlers } from "@/components/admin/menu-structure/menu-structure-list-handlers";
import {
  AdminTableActionsCell,
  AdminTableIconButton,
  AdminTableIconLink,
} from "@/components/admin/AdminTableActions";
import { Switch } from "@/components/ui/switch";
import { getSectionPositionMeta } from "@/lib/admin/menu-structure-meta";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

type MenuStructureSectionTableRowProps = Pick<
  MenuStructureListHandlers,
  | "connected"
  | "isPending"
  | "toggleSectionActive"
  | "applySectionPosition"
  | "openEditSection"
  | "removeSection"
> & {
  hub: MenuLayoutHubDTO;
  section: MenuLayoutSectionDTO;
  productCountBySlug: Map<string, number>;
};

export function MenuStructureSectionTableRow({
  hub,
  section,
  productCountBySlug,
  connected,
  isPending,
  toggleSectionActive,
  applySectionPosition,
  openEditSection,
  removeSection,
}: MenuStructureSectionTableRowProps) {
  const { nSec, secPos1, secPosTitle, productCount } = getSectionPositionMeta(
    hub,
    section,
    productCountBySlug
  );
  const disabled = !connected || isPending;

  return (
    <tr className="group border-b border-border bg-background/40 last:border-0 hover:bg-muted/25">
      <td className="px-2 py-2.5 pl-3 text-center align-top text-muted-foreground">
        <span className="inline-block min-h-8 min-w-8 pt-1.5 text-xs" title="Solo los bloques llevan número">
          —
        </span>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2 border-l-2 border-border/50 pl-3 sm:pl-4">
          <List className="h-4 w-4 shrink-0 text-muted-foreground/80" aria-hidden />
          <p className="text-sm font-medium leading-snug text-foreground">{section.label}</p>
        </div>
      </td>
      <td className="px-2 py-2.5 align-top">
        <MenuStructurePositionSelect
          value={secPos1}
          total={nSec}
          title={secPosTitle}
          disabled={disabled}
          onChange={(next) => applySectionPosition(hub.slug, section.slug, next)}
        />
      </td>
      <td className="px-3 py-2.5 align-top text-center">
        <span
          className={cn(
            "tabular-nums text-sm font-medium",
            section.active && productCount === 0 ? "text-amber-800" : "text-foreground"
          )}
        >
          {productCount}
        </span>
        {section.active && productCount === 0 ? (
          <p className="mt-0.5 text-[0.65rem] text-amber-800">Sin productos</p>
        ) : null}
      </td>
      <td className="px-3 py-2.5 align-top text-muted-foreground">—</td>
      <td className="px-3 py-2.5 align-top text-muted-foreground">—</td>
      <td className="px-3 py-2.5 align-top">
        <div className="flex justify-center">
          <Switch
            checked={section.active}
            disabled={disabled}
            onCheckedChange={(checked) => toggleSectionActive(hub.slug, section, checked)}
            aria-label={section.active ? "Ocultar categoría" : "Mostrar categoría"}
          />
        </div>
      </td>
      <td className="px-3 py-2.5 align-top text-muted-foreground">—</td>
      <AdminTableActionsCell>
        <AdminTableIconLink
          href={`/admin/products?sec=${encodeURIComponent(section.slug)}&hub=${encodeURIComponent(hub.slug)}`}
          label="Ver productos"
        >
          <UtensilsCrossed className="h-4 w-4" aria-hidden />
        </AdminTableIconLink>
        <AdminTableIconLink
          href={`/carta?sec=${encodeURIComponent(section.slug)}&hub=${encodeURIComponent(hub.slug)}`}
          label="Ver en carta"
          external
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
        </AdminTableIconLink>
        <AdminTableIconButton
          label="Editar categoría"
          onClick={() => openEditSection(hub.slug, section)}
          disabled={disabled}
        >
          <Pencil className="h-4 w-4" aria-hidden />
        </AdminTableIconButton>
        <AdminTableIconButton
          label="Eliminar categoría"
          onClick={() => void removeSection(section.slug)}
          disabled={disabled}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </AdminTableIconButton>
      </AdminTableActionsCell>
    </tr>
  );
}

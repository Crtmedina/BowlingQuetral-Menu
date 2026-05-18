"use client";

import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { MenuStructureHubBadges } from "@/components/admin/menu-structure/MenuStructureHubBadges";
import { MenuStructurePositionSelect } from "@/components/admin/menu-structure/MenuStructurePositionSelect";
import type { MenuStructureListHandlers } from "@/components/admin/menu-structure/menu-structure-list-handlers";
import {
  AdminTableActionsCell,
  AdminTableIconButton,
  AdminTableIconLink,
} from "@/components/admin/AdminTableActions";
import { Switch } from "@/components/ui/switch";
import {
  countHubProducts,
  getHubPositionMeta,
  hubTableRowClass,
} from "@/lib/admin/menu-structure-meta";
import { getHubIcon } from "@/lib/menu/hub-icons";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

type MenuStructureHubTableRowProps = MenuStructureListHandlers & {
  hub: MenuLayoutHubDTO;
  featuredHubs: MenuLayoutHubDTO[];
  normalHubs: MenuLayoutHubDTO[];
  expandedForDisplay: Set<string>;
  blockOrderNumberBySlug: Map<string, number>;
  productCountBySlug: Map<string, number>;
};

export function MenuStructureHubTableRow({
  hub,
  featuredHubs,
  normalHubs,
  expandedForDisplay,
  blockOrderNumberBySlug,
  productCountBySlug,
  connected,
  isPending,
  toggleHubExpanded,
  requestToggleHubFeatured,
  toggleHubActive,
  openPromoConfirm,
  applyHubFeaturedRank,
  applyHubPosition,
  openNewSection,
  openEditHub,
  removeHub,
}: MenuStructureHubTableRowProps) {
  const { nHub, hubPos1, hubPosTitle } = getHubPositionMeta(hub, featuredHubs, normalHubs);
  const isExpanded = expandedForDisplay.has(hub.slug);
  const HubRowIcon = getHubIcon(hub.iconKey);
  const hubProductTotal = countHubProducts(hub, productCountBySlug);
  const disabled = !connected || isPending;

  return (
    <tr className={hubTableRowClass(hub)}>
      <td className="px-2 py-2.5 pl-3 text-center align-top">
        <span
          className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md bg-background px-1.5 text-sm font-bold tabular-nums text-foreground shadow-sm ring-1 ring-border"
          title={`Bloque ${blockOrderNumberBySlug.get(hub.slug) ?? ""} en orden de carta`}
        >
          {blockOrderNumberBySlug.get(hub.slug) ?? "—"}
        </span>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex min-w-0 items-start gap-2">
          <button
            type="button"
            className="mt-0.5 shrink-0 rounded p-0.5 text-muted-foreground hover:bg-muted"
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
          <HubRowIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0">
            <p className="font-semibold leading-snug text-foreground">
              {hub.label}
              {hub.suffix ? (
                <span className="ml-1.5 font-normal text-muted-foreground">· {hub.suffix}</span>
              ) : null}
            </p>
            <MenuStructureHubBadges
              hub={hub}
              sectionCount={hub.sections.length}
              showFeatured={false}
              showHidden={false}
            />
          </div>
        </div>
      </td>
      <td className="px-2 py-2.5 align-top">
        <MenuStructurePositionSelect
          value={hubPos1}
          total={nHub}
          title={hubPosTitle}
          disabled={disabled}
          onChange={(next) => {
            if (hub.isFeatured) applyHubFeaturedRank(hub.slug, next);
            else applyHubPosition(hub.slug, next);
          }}
        />
      </td>
      <td
        className="px-2 py-2.5 align-top text-center text-sm font-medium tabular-nums text-foreground"
        title="Total de productos en todas las categorías del bloque"
      >
        {hubProductTotal}
      </td>
      <td className="px-2 py-2.5 align-top text-center text-muted-foreground">—</td>
      <td className="px-3 py-2.5 align-top">
        <div className="flex justify-center">
          <input
            type="checkbox"
            className="accent-primary h-4 w-4"
            checked={hub.isFeatured}
            title="Destacado en carta (sale primero)"
            aria-label="Destacado en carta"
            disabled={disabled}
            onChange={(e) => void requestToggleHubFeatured(hub, e.target.checked)}
          />
        </div>
      </td>
      <td className="px-3 py-2.5 align-top">
        <div className="flex justify-center">
          <Switch
            checked={hub.active}
            disabled={disabled}
            onCheckedChange={(checked) => toggleHubActive(hub, checked)}
            aria-label={hub.active ? "Ocultar bloque" : "Mostrar bloque"}
          />
        </div>
      </td>
      <td className="px-3 py-2.5 align-top">
        <div className="flex justify-center">
          <input
            type="radio"
            name="promo-hub"
            className="accent-primary h-4 w-4"
            checked={hub.isPromoHub}
            disabled={disabled}
            title="Usar plantilla Happy Hour 2×1"
            aria-label="Plantilla Happy Hour 2×1"
            onChange={() => openPromoConfirm(hub)}
          />
        </div>
      </td>
      <AdminTableActionsCell>
        <AdminTableIconButton
          label="Añadir categoría"
          onClick={() => openNewSection(hub.slug)}
          disabled={disabled}
          className="text-gold hover:bg-gold/10 hover:text-gold"
        >
          <Plus className="h-4 w-4" aria-hidden />
        </AdminTableIconButton>
        <AdminTableIconButton label="Editar bloque" onClick={() => openEditHub(hub)} disabled={disabled}>
          <Pencil className="h-4 w-4" aria-hidden />
        </AdminTableIconButton>
        <AdminTableIconButton
          label="Eliminar bloque"
          onClick={() => void removeHub(hub.slug)}
          disabled={disabled}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </AdminTableIconButton>
        <AdminTableIconLink
          href={`/carta?hub=${encodeURIComponent(hub.slug)}`}
          label="Ver en carta"
          external
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
        </AdminTableIconLink>
      </AdminTableActionsCell>
    </tr>
  );
}

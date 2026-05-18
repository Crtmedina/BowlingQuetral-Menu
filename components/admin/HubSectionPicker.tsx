"use client";

import { adminHubPickerChipClass } from "@/components/admin/admin-chip";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

type HubSectionPickerProps = {
  menuLayout: MenuLayoutHubDTO[];
  hubId: string;
  sectionId: string;
  onHubChange: (hubId: string) => void;
  onSectionChange: (sectionId: string) => void;
  className?: string;
};

export function HubSectionPicker({
  menuLayout,
  hubId,
  sectionId,
  onHubChange,
  onSectionChange,
  className,
}: HubSectionPickerProps) {
  const activeHub = menuLayout.find((hub) => hub.slug === hubId) ?? menuLayout[0];

  if (!menuLayout.length) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        No hay bloques configurados en la base de datos.
      </p>
    );
  }

  return (
    <div className={cn("min-w-0 space-y-4", className)}>
      <div className="rounded-lg border border-border bg-muted/25 p-3 sm:p-3.5">
        <p className="mb-2 text-sm font-medium text-foreground">Bloque de la carta</p>
        <div className="flex max-w-full flex-wrap gap-2">
          {menuLayout.map((hub) => {
            const active = hub.slug === hubId;
            return (
              <button
                key={hub.slug}
                type="button"
                onClick={() => {
                  onHubChange(hub.slug);
                  onSectionChange(hub.sections[0]?.slug ?? "");
                }}
                className={adminHubPickerChipClass(active)}
              >
                <span className="line-clamp-2">{hub.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 space-y-2">
        <label htmlFor="hub-section-picker-category" className="text-sm font-medium text-foreground">
          Categoría
        </label>
        <select
          id="hub-section-picker-category"
          className="flex h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={sectionId}
          onChange={(e) => onSectionChange(e.target.value)}
        >
          {(activeHub?.sections ?? []).map((section) => (
            <option key={section.slug} value={section.slug}>
              {section.label}
            </option>
          ))}
        </select>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Vitrina dentro del bloque elegido. El producto aparecerá en esa categoría en la carta.
        </p>
      </div>
    </div>
  );
}

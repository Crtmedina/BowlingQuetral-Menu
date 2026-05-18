"use client";

import { Badge } from "@/components/ui/badge";
import { HAPPY_HOUR_BANNER_IMAGE } from "@/lib/carta/happy-hour-assets";
import { DEFAULT_SCHEDULE_LABEL } from "@/lib/menu/happy-hour-schedule";
import { getHubIcon, HUB_ICON_KEYS, HUB_ICON_LABELS } from "@/lib/menu/hub-icons";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import { cn } from "@/lib/utils";

type HubFormPreviewProps = {
  label: string;
  suffix: string;
  iconKey: string;
  menuGroup: "comida" | "barra";
  active: boolean;
  isFeatured: boolean;
};

export function HubFormPreview({ label, suffix, iconKey, menuGroup, active, isFeatured }: HubFormPreviewProps) {
  const Icon = getHubIcon(iconKey);
  const displayLabel = label.trim() || "Nombre del bloque";
  return (
    <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-3">
      <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
        Vista previa en la carta
      </p>
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-zinc-100 shadow-sm",
          isFeatured
            ? "border-amber-500/35 bg-gradient-to-b from-amber-950/50 to-zinc-900/95"
            : "border-zinc-600/40 bg-gradient-to-b from-zinc-800/90 to-zinc-900/95",
          !active && "opacity-55"
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
            isFeatured ? "bg-amber-500/15 ring-amber-500/25" : "bg-zinc-700/90 ring-white/10"
          )}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.7rem] font-bold uppercase tracking-wide">{displayLabel}</p>
          {suffix.trim() ? (
            <p className="truncate text-[0.65rem] font-normal normal-case text-zinc-400">{suffix.trim()}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {isFeatured ? (
            <Badge className="border-amber-500/40 bg-amber-500/20 text-[0.6rem] font-normal text-amber-100">
              Destacado
            </Badge>
          ) : null}
          <Badge variant="outline" className="border-zinc-600/60 bg-zinc-900/50 text-[0.6rem] font-normal text-zinc-300">
            {menuGroup === "comida" ? "Comida" : "Barra"}
          </Badge>
        </div>
      </div>
      {!active ? (
        <p className="mt-2 text-xs text-amber-800">Oculto: no aparecerá en la carta pública.</p>
      ) : isFeatured ? (
        <p className="mt-2 text-xs text-amber-900/90">
          Aparecerá primero entre los bloques destacados en la carta.
        </p>
      ) : null}
    </div>
  );
}

export function PromoHubCartaPreview({
  hub,
  scheduleLabel = DEFAULT_SCHEDULE_LABEL,
  promoLabel = "Happy Hour",
}: {
  hub: MenuLayoutHubDTO;
  scheduleLabel?: string;
  promoLabel?: string;
}) {
  const Icon = getHubIcon(hub.iconKey);
  return (
    <div className="space-y-3 rounded-xl border border-dashed border-amber-500/35 bg-amber-500/[0.06] p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
        Vista previa en la carta
      </p>
      <div className="overflow-hidden rounded-lg border border-violet-500/35 bg-zinc-950 shadow-sm">
        <div className="relative h-[7.5rem] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HAPPY_HOUR_BANNER_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[58%_42%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/20"
            aria-hidden
          />
          <div className="relative z-10 px-3 py-3">
            <p className="text-[1.65rem] font-black leading-none tracking-tight text-amber-200">2×1</p>
            <p className="mt-1 font-sans text-sm font-black uppercase tracking-tight text-white">{promoLabel}</p>
            <p className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-violet-300/90">
              {scheduleLabel}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-zinc-600/45 bg-gradient-to-b from-zinc-800/95 to-zinc-900 px-2.5 py-2 text-zinc-100">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-700/90 ring-1 ring-white/10">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.65rem] font-bold uppercase tracking-wide">{hub.label}</p>
          {hub.suffix ? (
            <p className="truncate text-[0.6rem] text-zinc-400">{hub.suffix}</p>
          ) : (
            <p className="text-[0.6rem] text-zinc-500">Todas las categorías de este bloque</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 rounded-lg border border-zinc-700/50 bg-zinc-900/90 p-2 text-zinc-100">
        <div className="h-11 w-11 shrink-0 rounded-md bg-zinc-800 ring-1 ring-white/5" aria-hidden />
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-xs font-semibold">Trago de ejemplo</p>
          <p className="text-[0.65rem] text-violet-300/90">2×1 $7.500</p>
        </div>
        <span className="self-center rounded-full bg-red-600 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase text-white">
          2×1
        </span>
      </div>
    </div>
  );
}

export function HubIconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (iconKey: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5" role="radiogroup" aria-label="Icono del bloque">
      {HUB_ICON_KEYS.map((key) => {
        const Icon = getHubIcon(key);
        const selected = value === key;
        const label = HUB_ICON_LABELS[key] ?? key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            title={label}
            onClick={() => onChange(key)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-colors",
              selected
                ? "border-gold/55 bg-gold/15 text-gold ring-1 ring-gold/30"
                : "border-border bg-background text-muted-foreground hover:border-gold/25 hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="w-full truncate text-center text-[0.6rem] leading-tight">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
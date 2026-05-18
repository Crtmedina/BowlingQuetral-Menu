"use client";

import { getHubIcon } from "@/lib/menu/hub-icons";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export function HubQuickStrip({
  hubs,
  activeHubId,
  onSelect,
}: {
  hubs: MenuLayoutHubDTO[];
  activeHubId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="no-scrollbar flex gap-1.5 overflow-x-auto pb-2 pt-0.5 [-webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Bloques del menú"
    >
      {hubs.map((hub) => {
        const Icon = getHubIcon(hub.iconKey);
        const active = activeHubId === hub.slug;
        const featured = hub.isFeatured;
        return (
          <button
            key={hub.slug}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(hub.slug)}
            className={`flex min-w-0 max-w-[11rem] shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-[0.58rem] font-bold uppercase tracking-wide outline-none transition-[box-shadow,border-color,background-color] focus-visible:ring-2 focus-visible:ring-violet-500/45 sm:max-w-[13rem] sm:px-3 sm:text-[0.6rem] ${
              featured
                ? active
                  ? "border-amber-400/55 bg-gradient-to-b from-amber-950/50 to-zinc-900/90 text-amber-50 shadow-[0_0_22px_-8px_rgba(251,191,36,0.45)] ring-1 ring-amber-400/25"
                  : "border-amber-500/35 bg-zinc-900/50 text-amber-100/95 shadow-[0_0_18px_-10px_rgba(245,158,11,0.35)] hover:border-amber-400/50 hover:bg-zinc-800/60"
                : active
                  ? "border-violet-500/40 bg-zinc-800/90 text-white shadow-[0_0_16px_-8px_rgba(167,139,250,0.35)] ring-1 ring-violet-500/25"
                  : "border-zinc-600/40 bg-zinc-900/35 text-zinc-300 hover:border-zinc-500/55 hover:bg-zinc-800/45 hover:text-zinc-100"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                featured
                  ? active
                    ? "bg-amber-500/20 ring-1 ring-amber-400/35"
                    : "bg-amber-500/10 ring-1 ring-amber-500/20"
                  : active
                    ? "bg-zinc-700/90 ring-1 ring-violet-500/30"
                    : "bg-zinc-800/80 ring-1 ring-white/[0.06]"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 stroke-[1.65] text-current" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 truncate leading-tight">{hub.label}</span>
          </button>
        );
      })}
    </div>
  );
}


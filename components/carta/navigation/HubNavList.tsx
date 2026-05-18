"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { getHubIcon } from "@/lib/menu/hub-icons";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export function HubNavList({
  hubs,
  activeHubId,
  onSelect,
  omitHeading = false,
  unconstrainedListHeight = false,
  variant = "default",
}: {
  hubs: MenuLayoutHubDTO[];
  activeHubId: string;
  onSelect: (id: string) => void;
  omitHeading?: boolean;
  unconstrainedListHeight?: boolean;
  variant?: "default" | "dashboard";
}) {
  const isDashboard = variant === "dashboard";

  return (
    <nav
      className={
        isDashboard
          ? "mx-auto w-full max-w-sm px-0 pb-0 pt-0"
          : `mx-auto max-w-md px-2 pb-2 pt-1.5 sm:px-3 ${omitHeading ? "" : "border-t border-zinc-800/65"}`
      }
      aria-label="Categorías del menú"
    >
      {omitHeading || isDashboard ? null : (
        <p className="px-1 pb-1.5 text-[0.6rem] font-semibold uppercase tracking-wider text-zinc-500">Categorías</p>
      )}
      <ul
        className={`no-scrollbar flex flex-col overscroll-contain [-webkit-overflow-scrolling:touch] ${
          isDashboard ? "gap-2.5 py-1" : "gap-1"
        } ${
          unconstrainedListHeight
            ? isDashboard
              ? ""
              : "py-1"
            : "max-h-[min(52dvh,420px)] overflow-y-auto py-1 sm:max-h-[min(46dvh,400px)]"
        }`}
      >
        {hubs.map((hub, index) => {
          const { slug: id, label, suffix, menuGroup } = hub;
          const Icon = getHubIcon(hub.iconKey);
          const active = activeHubId === id;
          const featured = hub.isFeatured;
          const previousGroup = index > 0 ? hubs[index - 1].menuGroup : null;
          const showGroupLabel = previousGroup !== null && previousGroup !== menuGroup;
          const groupLabel = menuGroup === "comida" ? "Comida" : "Barra";

          return (
            <li key={id} className="min-w-0">
              {showGroupLabel ? (
                <p className="px-1 pb-2 pt-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {groupLabel}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => onSelect(id)}
                className={
                  isDashboard
                    ? featured
                      ? active
                        ? "flex w-full min-w-0 items-center gap-3 rounded-2xl border border-amber-400/55 bg-gradient-to-b from-amber-950/70 to-[#141210] px-3 py-3 text-left shadow-[0_0_36px_-8px_rgba(251,191,36,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none ring-1 ring-amber-400/35 transition-[box-shadow,transform,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-amber-400/50 active:scale-[0.99]"
                        : "flex w-full min-w-0 items-center gap-3 rounded-2xl border border-amber-500/35 bg-gradient-to-b from-[#2c2418] to-[#1a1612] px-3 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_22px_-12px_rgba(245,158,11,0.28)] outline-none transition-[box-shadow,transform,border-color] duration-200 hover:border-amber-400/50 hover:from-[#352a1c] hover:to-[#221c16] focus-visible:ring-2 focus-visible:ring-amber-400/45 active:scale-[0.99]"
                      : active
                        ? "flex w-full min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-left outline-none transition-[box-shadow,transform,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-[0.99] border-violet-500/55 bg-gradient-to-b from-zinc-800/98 to-[#141416] shadow-[0_0_32px_-6px_rgba(167,139,250,0.42),inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-violet-400/30"
                        : "flex w-full min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-left outline-none transition-[box-shadow,transform,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-[0.99] border-zinc-600/40 bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1d] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_18px_rgba(0,0,0,0.42)] hover:border-zinc-500/55 hover:from-[#303035] hover:to-[#1f1f22]"
                    : featured
                      ? active
                        ? "flex w-full min-w-0 items-center gap-3 rounded-xl border border-amber-400/45 bg-zinc-800/95 px-2.5 py-2.5 text-left shadow-[0_0_22px_-8px_rgba(251,191,36,0.38)] outline-none ring-1 ring-amber-400/30 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400/45 sm:px-3 sm:py-2.5"
                        : "flex w-full min-w-0 items-center gap-3 rounded-xl border border-amber-500/30 bg-zinc-900/45 px-2.5 py-2.5 text-left shadow-[0_0_16px_-12px_rgba(245,158,11,0.22)] outline-none transition-colors hover:border-amber-400/45 hover:bg-zinc-800/55 focus-visible:ring-2 focus-visible:ring-amber-400/40 sm:px-3 sm:py-2.5"
                      : active
                        ? "flex w-full min-w-0 items-center gap-3 rounded-xl border px-2.5 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-500/40 sm:px-3 sm:py-2.5 border-violet-500/35 bg-zinc-800/95 shadow-[0_0_18px_-8px_rgba(167,139,250,0.35)] ring-1 ring-violet-500/25"
                        : "flex w-full min-w-0 items-center gap-3 rounded-xl border px-2.5 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-500/40 sm:px-3 sm:py-2.5 border-transparent bg-zinc-900/30 hover:border-zinc-700/70 hover:bg-zinc-800/50"
                }
              >
                <span
                  className={
                    isDashboard
                      ? featured
                        ? active
                          ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-400/45 bg-gradient-to-b from-amber-600/25 via-[#1c1610] to-[#0f0d0a] shadow-[inset_0_2px_8px_rgba(0,0,0,0.55),0_0_14px_-4px_rgba(251,191,36,0.35)]"
                          : "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-600/35 bg-gradient-to-b from-amber-900/30 via-[#1a1612] to-[#11100e] shadow-[inset_0_2px_8px_rgba(0,0,0,0.52)]"
                        : active
                          ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-gradient-to-b from-zinc-600/35 via-[#16161c] to-[#0b0c0f] shadow-[inset_0_2px_8px_rgba(0,0,0,0.55),inset_0_-1px_0_rgba(255,255,255,0.1),0_0_14px_-3px_rgba(167,139,250,0.22)]"
                          : "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-600/50 bg-gradient-to-b from-zinc-700/55 via-[#1a1a22] to-[#111116] shadow-[inset_0_2px_8px_rgba(0,0,0,0.52),inset_0_-1px_0_rgba(255,255,255,0.06)]"
                      : featured
                        ? active
                          ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/25 ring-1 ring-amber-400/40"
                          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-900/20 ring-1 ring-amber-500/25"
                        : active
                          ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-700/95 ring-1 ring-violet-500/35"
                          : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800/90 ring-1 ring-white/[0.06]"
                  }
                >
                  <Icon
                    className={`shrink-0 stroke-[1.65] ${
                      isDashboard ? "h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" : "h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5"
                    } ${
                      active
                        ? featured
                          ? "text-amber-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
                          : "text-zinc-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
                        : featured
                          ? "text-amber-100/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                          : isDashboard
                            ? "text-zinc-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                            : "text-zinc-300"
                    }`}
                    aria-hidden
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-sans font-bold uppercase leading-snug ${
                      isDashboard ? "text-[0.8rem] tracking-[0.14em] sm:text-[0.825rem]" : "text-[0.8125rem] tracking-wide"
                    } ${featured && !active ? "text-amber-50/95" : "text-white"}`}
                  >
                    {label}
                  </span>
                  {suffix ? (
                    <span className="mt-0.5 block font-inter text-[0.65rem] font-normal leading-snug text-zinc-500">
                      {suffix}
                    </span>
                  ) : null}
                </span>
                {isDashboard ? (
                  active ? (
                    <ChevronRight
                      className={`h-[1.35rem] w-[1.35rem] shrink-0 sm:h-6 sm:w-6 ${
                        featured ? "text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]" : "text-violet-200 drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]"
                      }`}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  ) : (
                    <ChevronDown
                      className="h-[1.35rem] w-[1.35rem] shrink-0 text-zinc-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:h-6 sm:w-6"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  )
                ) : active ? (
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 ${featured ? "text-amber-300/95" : "text-violet-400/90"}`}
                    strokeWidth={2}
                    aria-hidden
                  />
                ) : (
                  <span className="w-4 shrink-0" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


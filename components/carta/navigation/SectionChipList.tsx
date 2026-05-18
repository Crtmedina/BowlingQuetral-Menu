"use client";

import { motion } from "framer-motion";
import type { MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";

export function SectionChipList({
  sections,
  activeSection,
  onSelect,
}: {
  sections: MenuLayoutSectionDTO[];
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  if (sections.length <= 1) return null;

  return (
    <motion.div
      layout
      className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Categorías del menú"
    >
      {sections.map((section) => {
        const sid = section.slug;
        const active = activeSection === sid;
        return (
          <button
            key={sid}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(sid)}
            className={`relative flex min-h-[2.75rem] shrink-0 items-center overflow-hidden rounded-xl border px-3.5 py-2 text-[0.625rem] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 ${
              active
                ? "border-violet-400/55 bg-white/[0.07] text-white shadow-[0_0_22px_-10px_rgba(139,92,246,0.55)] backdrop-blur-sm"
                : "border-zinc-600/55 bg-zinc-900/35 text-zinc-300 hover:border-zinc-500/65 hover:bg-white/[0.04] hover:text-zinc-100"
            }`}
          >
            <span className="relative z-[1]">{section.label}</span>
            {active ? (
              <span
                className="carta-chip-active-indicator absolute bottom-1.5 left-3 right-3 z-[1]"
                aria-hidden
              />
            ) : null}
          </button>
        );
      })}
    </motion.div>
  );
}


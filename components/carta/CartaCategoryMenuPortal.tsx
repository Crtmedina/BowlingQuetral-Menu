"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HubNavList } from "@/components/carta/navigation/HubNavList";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

type CartaCategoryMenuPortalProps = {
  ready: boolean;
  open: boolean;
  menuLayout: MenuLayoutHubDTO[];
  activeHubId: string;
  onClose: () => void;
  onSelectHub: (hubId: string) => void;
};

export function CartaCategoryMenuPortal({
  ready,
  open,
  menuLayout,
  activeHubId,
  onClose,
  onSelectHub,
}: CartaCategoryMenuPortalProps) {
  if (!ready) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="carta-categorias-fullscreen"
          id="carta-categorias-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="carta-categorias-panel-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="carta-menu-dashboard-canvas fixed inset-0 z-[100] flex flex-col pt-[env(safe-area-inset-top,0px)]"
        >
          <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-2">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.65rem] border border-violet-500/25 bg-zinc-950/90 shadow-[0_28px_90px_rgba(0,0,0,0.72),0_0_48px_-16px_rgba(109,40,217,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-violet-500/10 backdrop-blur-md">
              <div className="relative flex shrink-0 items-center justify-center border-b border-white/10 py-4">
                <h2
                  id="carta-categorias-panel-title"
                  className="font-sans text-[0.9375rem] font-black uppercase tracking-[0.22em] text-white"
                >
                  Menú
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-violet-300/95 transition-colors hover:bg-zinc-800/80 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 pt-2 [-webkit-overflow-scrolling:touch]">
                <HubNavList
                  hubs={menuLayout}
                  activeHubId={activeHubId}
                  omitHeading
                  unconstrainedListHeight
                  variant="dashboard"
                  onSelect={onSelectHub}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

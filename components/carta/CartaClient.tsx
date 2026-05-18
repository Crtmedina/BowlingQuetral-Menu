"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, ChevronDown } from "lucide-react";
import { CartaCategoryMenuPortal } from "@/components/carta/CartaCategoryMenuPortal";
import { CartaMainContent } from "@/components/carta/CartaMainContent";
import { HubQuickStrip } from "@/components/carta/navigation/HubQuickStrip";
import { SectionChipList } from "@/components/carta/navigation/SectionChipList";
import { isHappyHourCartaView } from "@/lib/carta/is-happy-hour-view";
import { pickHub } from "@/lib/carta/pick-hub";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import type { PublicMenuCatalog } from "@/lib/menu/public-catalog";
import type { HappyHourCartaDTO } from "@/lib/menu/happy-hour-schedule";
import { SITE } from "@/lib/site";

export type CartaClientProps = Pick<PublicMenuCatalog, "productsBySection" | "sectionIntros"> & {
  menuLayout: MenuLayoutHubDTO[];
  happyHour: HappyHourCartaDTO;
};

export function CartaClient({
  menuLayout,
  productsBySection,
  sectionIntros,
  happyHour,
}: CartaClientProps) {
  const searchParams = useSearchParams();
  const firstHub = menuLayout[0];
  const firstSectionSlug = firstHub?.sections[0]?.slug ?? "";

  const [hubId, setHubId] = useState(firstHub?.slug ?? "");
  const [sectionId, setSectionId] = useState(firstSectionSlug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPortalReady, setMenuPortalReady] = useState(false);

  useEffect(() => {
    setMenuPortalReady(true);
  }, []);

  useEffect(() => {
    if (!menuLayout.length) return;
    const hubParam = searchParams.get("hub")?.trim();
    const secParam = searchParams.get("sec")?.trim();
    if (secParam) {
      const hubForSec = menuLayout.find((h) => h.sections.some((s) => s.slug === secParam));
      if (hubForSec) {
        setHubId(hubForSec.slug);
        setSectionId(secParam);
        return;
      }
    }
    if (hubParam && menuLayout.some((h) => h.slug === hubParam)) {
      const hub = menuLayout.find((h) => h.slug === hubParam)!;
      setHubId(hubParam);
      const firstSec = hub.sections[0]?.slug;
      if (firstSec) setSectionId(firstSec);
    }
  }, [searchParams, menuLayout]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [sectionId]);

  useEffect(() => {
    setMenuOpen(false);
  }, [hubId, sectionId]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    };
  }, [menuOpen]);

  const currentHub = pickHub(menuLayout, hubId);
  const products = productsBySection[sectionId] ?? [];
  const promoHubSlug = menuLayout.find((h) => h.isPromoHub)?.slug ?? null;
  const isHappyHour = isHappyHourCartaView(currentHub.slug, sectionId, promoHubSlug);
  const sectionIntro = sectionIntros[sectionId];

  function selectHub(id: string) {
    const hub = pickHub(menuLayout, id);
    setHubId(id);
    setSectionId(hub.sections[0]?.slug ?? "");
  }

  if (!menuLayout.length) {
    return (
      <div className="carta-page-shell flex min-h-[50vh] items-center justify-center px-4 text-center text-sm text-zinc-400">
        No hay bloques de menú configurados. Conecta la base de datos o revisa el panel de administración.
      </div>
    );
  }

  return (
    <div className="carta-page-shell antialiased">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_12px_48px_-12px_rgba(0,0,0,0.65),0_0_60px_-20px_rgba(91,33,182,0.12)]">
        <div className="mx-auto max-w-md px-4 pb-3 pt-5 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <h1 className="carta-brand-silver font-sans text-lg font-black uppercase tracking-[0.22em]">
              {SITE.name.replace(/\s+/g, " ")}
            </h1>
            <span className="select-none text-[1.45rem] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]" aria-hidden>
              🎳
            </span>
          </div>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 stroke-[1.5]" aria-hidden />
            CASTRO, CHILE
          </p>
        </div>

        <div className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-md space-y-2 px-3 py-2 sm:px-4">
            <HubQuickStrip hubs={menuLayout} activeHubId={hubId} onSelect={selectHub} />
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[0.575rem] font-medium uppercase tracking-wider text-zinc-400">Sección</p>
                <p className="break-words font-sans text-[0.8125rem] font-bold uppercase leading-snug text-white sm:text-sm">
                  {currentHub.label}
                </p>
                {currentHub.suffix ? (
                  <p className="mt-0.5 font-inter text-[0.65rem] font-normal leading-snug text-zinc-400 sm:text-[0.68rem]">
                    {currentHub.suffix}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                id="carta-categorias-toggle"
                aria-expanded={menuOpen}
                aria-controls="carta-categorias-panel"
                onClick={() => setMenuOpen(true)}
                className="carta-categorias-btn inline-flex h-[2.875rem] shrink-0 items-center gap-1.5 self-start rounded-xl px-3 py-2 text-[0.65rem] font-bold uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45"
              >
                Categorías
                <ChevronDown className="h-4 w-4 text-violet-200/95" strokeWidth={2} aria-hidden />
              </button>
            </div>
            <SectionChipList
              sections={currentHub.sections}
              activeSection={sectionId}
              onSelect={setSectionId}
            />
          </div>
        </div>
      </header>

      <CartaCategoryMenuPortal
        ready={menuPortalReady}
        open={menuOpen}
        menuLayout={menuLayout}
        activeHubId={hubId}
        onClose={() => setMenuOpen(false)}
        onSelectHub={(id) => {
          selectHub(id);
          setMenuOpen(false);
        }}
      />

      <CartaMainContent
        sectionId={sectionId}
        sectionIntro={sectionIntro}
        products={products}
        isHappyHour={isHappyHour}
        happyHour={happyHour}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, MapPin, Heart, ChevronsDown, ChevronDown, ChevronRight, X } from "lucide-react";
import {
  FONDOS_ACOMPANAMIENTOS,
  HAPPY_HOUR_BANNER_IMAGE,
  MENU_HUBS,
  PAPAS_FRITAS_PEQUES,
  PRODUCTS_BY_SECTION,
  SECTION_INTROS,
  SECTION_LABELS,
  getHubById,
  type CartaProduct,
  type HubId,
  type SectionId,
} from "@/lib/carta";
import { SITE } from "@/lib/site";


function HappyHourNeonBanner() {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-950/20 shadow-2xl shadow-black/50">
      <motion.section
        aria-label="Promoción Happy Hour"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[220px] overflow-hidden rounded-3xl sm:min-h-[236px]"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={HAPPY_HOUR_BANNER_IMAGE}
            alt="Cócteles sobre barra oscura"
            fill
            priority
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover object-[58%_42%] scale-[1.06] sm:object-[55%_38%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] carta-hh-banner-overlay" aria-hidden />
        <div className="relative z-10 px-5 py-8 pr-4">
          <motion.p
            className="carta-hh-2x1-metallic font-sans text-[2.95rem] font-black leading-none tracking-tight"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            2×1
          </motion.p>
          <motion.h2
            className="carta-brand-silver mt-2 font-sans text-[1.75rem] font-black uppercase tracking-tight sm:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.4 }}
          >
            Happy Hour
          </motion.h2>
          <p className="mt-2 font-sans text-xs font-bold uppercase tracking-wide text-amber-400 sm:text-sm">
            Lun–Jue hasta 22:00
          </p>
          <p className="carta-brand-silver mt-4 max-w-[260px] font-inter text-[0.62rem] font-normal leading-relaxed opacity-90 sm:max-w-[280px]">
            Válido en tragos seleccionados. Consulta en barra. No acumulable con otras promociones.
          </p>
        </div>
      </motion.section>
    </div>
  );
}

function HappyHourProductRow({ product, index }: { product: CartaProduct; index: number }) {
  const line = product.deal ?? product.price;

  return (
    <li>
      <motion.div
        layout
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.985 }}
        className="carta-card-glow-outer group overflow-hidden rounded-3xl"
      >
        <article className="carta-card-surface flex gap-3.5 p-3 pr-3.5">
          <div className="relative h-[7.25rem] w-[7.25rem] shrink-0 overflow-hidden rounded-2xl bg-[#141414] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] sm:h-32 sm:w-32">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 116px, 128px"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority={index < 3}
            />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[0.55rem] font-bold uppercase leading-none text-white shadow-md ring-1 ring-red-400/40">
              2×1
            </span>
            <span
              className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/85 text-zinc-300 shadow-sm backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 group-hover:bg-zinc-900/95"
              aria-hidden
            >
              <Heart className="h-3.5 w-3.5 stroke-[1.5]" />
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-0.5">
            <div className="min-w-0">
              <h3 className="font-sans text-[0.8125rem] font-black uppercase leading-tight tracking-wider text-white">
                {product.name}
              </h3>
              <p className="carta-price-metallic mt-0.5 font-sans text-sm font-semibold tabular-nums">
                {line}
              </p>
              <p className="mt-1 line-clamp-2 font-inter text-xs font-normal leading-snug text-zinc-400">
                {product.description}
              </p>
            </div>
          </div>
        </article>
      </motion.div>
    </li>
  );
}

function HubNavList({
  activeHubId,
  onSelect,
  omitHeading = false,
  unconstrainedListHeight = false,
  variant = "default",
}: {
  activeHubId: HubId;
  onSelect: (id: HubId) => void;
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
        {MENU_HUBS.map((hub, index) => {
          const { id, label, icon: Icon, suffix, menuGroup } = hub;
          const active = activeHubId === id;
          const previousGroup = index > 0 ? MENU_HUBS[index - 1].menuGroup : null;
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
                    ? `flex w-full min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-left outline-none transition-[box-shadow,transform,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-amber-500/50 active:scale-[0.99] ${
                        active
                          ? "border-amber-500/55 bg-gradient-to-b from-zinc-800/98 to-[#141416] shadow-[0_0_32px_-6px_rgba(251,191,36,0.42),inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-amber-400/30"
                          : "border-zinc-600/40 bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1d] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_18px_rgba(0,0,0,0.42)] hover:border-zinc-500/55 hover:from-[#303035] hover:to-[#1f1f22]"
                      }`
                    : `flex w-full min-w-0 items-center gap-3 rounded-xl border px-2.5 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500/40 sm:px-3 sm:py-2.5 ${
                        active
                          ? "border-amber-500/35 bg-zinc-800/95 shadow-[0_0_18px_-8px_rgba(251,191,36,0.35)] ring-1 ring-amber-500/25"
                          : "border-transparent bg-zinc-900/30 hover:border-zinc-700/70 hover:bg-zinc-800/50"
                      }`
                }
              >
                <span
                  className={
                    isDashboard
                      ? `flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          active
                            ? "border border-amber-500/40 bg-gradient-to-b from-zinc-600/35 via-[#16161c] to-[#0b0c0f] shadow-[inset_0_2px_8px_rgba(0,0,0,0.55),inset_0_-1px_0_rgba(255,255,255,0.1),0_0_14px_-3px_rgba(251,191,36,0.22)]"
                            : "border border-zinc-600/50 bg-gradient-to-b from-zinc-700/55 via-[#1a1a22] to-[#111116] shadow-[inset_0_2px_8px_rgba(0,0,0,0.52),inset_0_-1px_0_rgba(255,255,255,0.06)]"
                        }`
                      : `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-zinc-700/95 ring-1 ring-amber-500/35"
                            : "bg-zinc-800/90 ring-1 ring-white/[0.06]"
                        }`
                  }
                >
                  <Icon
                    className={`shrink-0 stroke-[1.65] ${
                      isDashboard ? "h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" : "h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5"
                    } ${
                      active
                        ? "text-zinc-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
                        : isDashboard
                          ? "text-zinc-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                          : "text-zinc-300"
                    }`}
                    aria-hidden
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-sans font-bold uppercase leading-snug text-white ${
                      isDashboard ? "text-[0.8rem] tracking-[0.14em] sm:text-[0.825rem]" : "text-[0.8125rem] tracking-wide"
                    }`}
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
                      className="h-[1.35rem] w-[1.35rem] shrink-0 text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] sm:h-6 sm:w-6"
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
                  <ChevronRight className="h-4 w-4 shrink-0 text-amber-400/90" strokeWidth={2} aria-hidden />
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

function SectionChipList({
  sections,
  activeSection,
  onSelect,
}: {
  sections: SectionId[];
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  if (sections.length <= 1) return null;

  return (
    <motion.div
      layout
      className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Subcategorías"
    >
      {sections.map((sectionId) => {
        const active = activeSection === sectionId;
        return (
          <button
            key={sectionId}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(sectionId)}
            className={`shrink-0 rounded-xl border px-3 py-2 text-[0.625rem] font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 ${
              active
                ? "border-amber-500/45 bg-zinc-800/95 text-amber-100 shadow-[0_0_16px_-10px_rgba(251,191,36,0.4)]"
                : "border-zinc-700/50 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {SECTION_LABELS[sectionId]}
          </button>
        );
      })}
    </motion.div>
  );
}

function ProductTile({ product, priority }: { product: CartaProduct; priority?: boolean }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="carta-card-glow-outer group h-full overflow-hidden rounded-3xl"
    >
      <article className="carta-card-surface flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[calc(1.5rem-1px)] bg-[#141414] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 360px"
            className="object-cover transition duration-500 group-hover:scale-[1.06]"
            priority={priority}
          />
        </div>
        <div className="space-y-1.5 p-3.5 pt-3">
          <h3 className="font-sans text-[0.8125rem] font-black uppercase leading-snug tracking-wider text-white">
            {product.name}
          </h3>
          <p className="line-clamp-2 font-inter text-xs font-normal leading-relaxed text-zinc-400">
            {product.description}
          </p>
          <p className="carta-price-metallic pt-1 font-sans text-sm font-semibold tabular-nums">
            {product.price}
          </p>
        </div>
      </article>
    </motion.div>
  );
}

export default function CartaPage() {
  const [hubId, setHubId] = useState<HubId>("promos");
  const [sectionId, setSectionId] = useState<SectionId>("promos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPortalReady, setMenuPortalReady] = useState(false);

  useEffect(() => {
    setMenuPortalReady(true);
  }, []);

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

  const currentHub = getHubById(hubId);
  const products = PRODUCTS_BY_SECTION[sectionId];
  const isHappyHour = sectionId === "promos";
  const sectionIntro = SECTION_INTROS[sectionId];

  return (
    <div className="carta-page-shell antialiased">
      <header className="sticky top-0 z-30 border-b border-amber-500/25 bg-[#0d0d0d]/94 backdrop-blur-xl shadow-2xl shadow-black/40">
        <div className="mx-auto max-w-md px-4 pb-3 pt-5 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <h1 className="carta-brand-silver text-lg font-extrabold uppercase tracking-[0.2em]">
              {SITE.name.replace(/\s+/g, " ")}
            </h1>
            <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden>
              <span className="select-none text-[1.35rem] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                🎳
              </span>
              <Flame
                className="absolute -right-0.5 -top-0.5 h-[1.05rem] w-[1.05rem] text-red-500"
                fill="currentColor"
                strokeWidth={1.2}
                aria-hidden
              />
            </span>
          </div>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 stroke-[1.5]" aria-hidden />
            CASTRO, CHILE
          </p>
        </div>

        <div className="border-t border-zinc-800/65">
          <div className="mx-auto max-w-md space-y-2 px-3 py-2 sm:px-4">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1 text-left">
              <p className="text-[0.575rem] font-semibold uppercase tracking-wider text-zinc-500">Sección</p>
              <p className="break-words font-sans text-[0.8125rem] font-bold uppercase leading-snug text-white sm:text-sm">
                {currentHub.label}
              </p>
              {currentHub.suffix ? (
                <p className="mt-0.5 font-inter text-[0.65rem] font-normal leading-snug text-zinc-500 sm:text-[0.68rem]">
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
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-amber-500/35 bg-zinc-800/90 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-wide text-amber-100 shadow-[0_0_16px_-10px_rgba(251,191,36,0.4)] transition-colors hover:border-amber-400/45 hover:bg-zinc-700/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
            >
                Categorías
                <ChevronDown className="h-4 w-4 text-amber-400/95" strokeWidth={2} aria-hidden />
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

      {menuPortalReady
        ? createPortal(
            <AnimatePresence>
              {menuOpen ? (
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
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.65rem] border border-amber-500/30 bg-zinc-950/95 shadow-[0_28px_90px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-white/[0.06] backdrop-blur-md">
                      <div className="relative flex shrink-0 items-center justify-center border-b border-amber-500/20 py-4">
                        <h2
                          id="carta-categorias-panel-title"
                          className="font-sans text-[0.9375rem] font-black uppercase tracking-[0.22em] text-white"
                        >
                          Menú
                        </h2>
                        <button
                          type="button"
                          onClick={() => setMenuOpen(false)}
                          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-amber-400/95 transition-colors hover:bg-zinc-800/80 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/45"
                          aria-label="Cerrar menú"
                        >
                          <X className="h-5 w-5" strokeWidth={2} />
                        </button>
                      </div>
                      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4 pt-2 [-webkit-overflow-scrolling:touch]">
                        <HubNavList
                          activeHubId={hubId}
                          omitHeading
                          unconstrainedListHeight
                          variant="dashboard"
                          onSelect={(id) => {
                            const hub = getHubById(id);
                            setHubId(id);
                            setSectionId(hub.sections[0]);
                            setMenuOpen(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}

      <main className="relative mx-auto max-w-md space-y-5 px-4 pb-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={sectionId}
            initial={{ opacity: 0, x: 28, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -22, filter: "blur(3px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {isHappyHour ? (
              <>
                <HappyHourNeonBanner />
                <section aria-label="Tragos Happy Hour">
                  <ul className="flex flex-col gap-3">
                    {products.map((product, index) => (
                      <HappyHourProductRow key={product.name} product={product} index={index} />
                    ))}
                  </ul>
                </section>
              </>
            ) : (
              <section aria-label="Productos">
                {sectionIntro ? (
                  <p className="mb-4 text-center font-inter text-xs font-medium leading-relaxed text-zinc-400">
                    {sectionIntro}
                  </p>
                ) : null}
                {sectionId === "papasFritas" ? (
                  <>
                    <ul className="grid grid-cols-2 gap-4">
                      {products.map((product, index) => (
                        <li key={`${sectionId}-${product.name}`}>
                          <ProductTile product={product} priority={index < 2} />
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6">
                      <h3 className="mb-3 border-b border-amber-500/25 pb-2 text-center font-sans text-[0.7rem] font-black uppercase tracking-[0.2em] text-amber-200/95">
                        PARA PEQUES
                      </h3>
                      <ul className="grid grid-cols-2 gap-4">
                        {PAPAS_FRITAS_PEQUES.map((product, index) => (
                          <li key={`${sectionId}-peques-${product.name}`}>
                            <ProductTile product={product} priority={index < 2} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : sectionId === "fondos" ? (
                  <>
                    <ul className="grid grid-cols-2 gap-4">
                      {products.map((product, index) => (
                        <li key={`${sectionId}-${product.name}`}>
                          <ProductTile product={product} priority={index < 2} />
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6">
                      <h3 className="mb-3 border-b border-amber-500/25 pb-2 text-center font-sans text-[0.7rem] font-black uppercase tracking-[0.2em] text-amber-200/95">
                        Acompañamientos para el fondo
                      </h3>
                      <p className="mb-4 text-center font-inter text-xs font-medium leading-relaxed text-zinc-400">
                        A elección 2.
                      </p>
                      <ul className="grid grid-cols-2 gap-4">
                        {FONDOS_ACOMPANAMIENTOS.map((product, index) => (
                          <li key={`${sectionId}-acomp-${product.name}`}>
                            <ProductTile product={product} priority={index < 2} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <ul className="grid grid-cols-2 gap-4">
                    {products.map((product, index) => (
                      <li key={`${sectionId}-${product.name}`}>
                        <ProductTile product={product} priority={index < 2} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="pointer-events-none flex justify-center pb-2 pt-4 text-zinc-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 4, 0] }}
          transition={{
            opacity: { delay: 0.6, duration: 0.4 },
            y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          }}
          aria-hidden
        >
          <ChevronsDown className="h-6 w-6 opacity-60" strokeWidth={1.5} />
        </motion.div>
      </main>

    </div>
  );
}

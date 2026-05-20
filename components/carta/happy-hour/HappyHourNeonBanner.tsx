"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HAPPY_HOUR_BANNER_IMAGE } from "@/lib/carta";
import {
  DEFAULT_SCHEDULE_LABEL,
  type HappyHourCartaDTO,
} from "@/lib/menu/happy-hour-schedule";
import { cn } from "@/lib/utils";

type HappyHourNeonBannerProps = {
  happyHour: HappyHourCartaDTO;
};

/** Solo un indicador positivo para el comensal; el estado interno no se muestra en carta. */
function statusBadge(happyHour: HappyHourCartaDTO) {
  if (happyHour.promoStatus !== "active") return null;
  return (
    <span className="ml-2 inline-flex rounded-full bg-emerald-500/25 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-200">
      En curso
    </span>
  );
}

export function HappyHourNeonBanner({ happyHour }: HappyHourNeonBannerProps) {
  const scheduleLine = happyHour.scheduleLabel || DEFAULT_SCHEDULE_LABEL;
  const legalText = happyHour.promoDescription.trim();
  const muted = happyHour.promoStatus !== "active";

  return (
    <motion.div
      className={cn(
        "overflow-hidden rounded-[1.125rem] border border-violet-500/35 bg-zinc-950/25 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35),0_20px_50px_-20px_rgba(0,0,0,0.6)]",
        muted && "opacity-90 saturate-[0.85]"
      )}
    >
      <motion.section
        aria-label="Promoción Happy Hour"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[220px] overflow-hidden rounded-[1.125rem] sm:min-h-[236px]"
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
            {happyHour.label.trim() || "Happy Hour"}
          </motion.h2>
          <p className="mt-2 font-sans text-xs font-bold uppercase tracking-wide text-violet-300/95 sm:text-sm">
            {scheduleLine}
            {statusBadge(happyHour)}
          </p>
          {legalText ? (
            <p className="carta-brand-silver mt-4 max-w-[260px] font-inter text-[0.62rem] font-normal leading-relaxed opacity-90 sm:max-w-[280px]">
              {legalText}
            </p>
          ) : null}
        </div>
      </motion.section>
    </motion.div>
  );
}

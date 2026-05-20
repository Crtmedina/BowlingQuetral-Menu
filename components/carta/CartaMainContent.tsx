"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { FONDOS_ACOMPANAMIENTOS, type CartaProduct } from "@/lib/carta";
import { HappyHourNeonBanner } from "@/components/carta/happy-hour/HappyHourNeonBanner";
import { HappyHourProductRow } from "@/components/carta/happy-hour/HappyHourProductRow";
import { cn } from "@/lib/utils";
import { ProductTile } from "@/components/carta/ProductTile";
import type { HappyHourCartaDTO } from "@/lib/menu/happy-hour-schedule";

type CartaMainContentProps = {
  sectionId: string;
  sectionIntro?: string;
  products: CartaProduct[];
  isHappyHour: boolean;
  happyHour: HappyHourCartaDTO;
};

export function CartaMainContent({
  sectionId,
  sectionIntro,
  products,
  isHappyHour,
  happyHour,
}: CartaMainContentProps) {
  return (
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
              <HappyHourNeonBanner happyHour={happyHour} />
              <section
                aria-label="Tragos Happy Hour"
                className={cn(happyHour.promoStatus !== "active" && "opacity-95")}
              >
                <ul className="flex flex-col gap-3.5">
                  {products.map((product, index) => (
                    <HappyHourProductRow
                      key={`promos-${product.name}-${index}`}
                      product={product}
                      index={index}
                    />
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
              {sectionId === "fondos" ? (
                <>
                  <ul className="grid grid-cols-2 gap-x-3.5 gap-y-5">
                    {products.map((product, index) => (
                      <li key={`${sectionId}-${product.name}-${index}`} className="h-full min-h-0">
                        <ProductTile product={product} priority={index < 2} />
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6">
                    <h3 className="mb-3 border-b border-violet-500/25 pb-2 text-center font-sans text-[0.7rem] font-black uppercase tracking-[0.2em] text-violet-200/95">
                      Acompañamientos para el fondo
                    </h3>
                    <p className="mb-4 text-center font-inter text-xs font-medium leading-relaxed text-zinc-400">
                      A elección 2.
                    </p>
                    <ul className="grid grid-cols-2 gap-x-3.5 gap-y-5">
                      {FONDOS_ACOMPANAMIENTOS.map((product, index) => (
                        <li key={`${sectionId}-acomp-${product.name}-${index}`} className="h-full min-h-0">
                          <ProductTile product={product} priority={index < 2} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <ul className="grid grid-cols-2 gap-x-3.5 gap-y-5">
                  {products.map((product, index) => (
                    <li key={`${sectionId}-${product.name}-${index}`} className="h-full min-h-0">
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
  );
}

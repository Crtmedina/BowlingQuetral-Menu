"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { CartaProductImage } from "@/components/carta/CartaProductImage";
import type { CartaProduct } from "@/lib/carta";
import { formatHappyHourDealLine } from "@/lib/carta/happy-hour-format";

export function HappyHourProductRow({ product, index }: { product: CartaProduct; index: number }) {
  const line = formatHappyHourDealLine(product.deal ?? product.price);
  const showBadge = Boolean(product.deal) || Boolean(product.happyHour2x1);

  return (
    <li>
      <motion.div
        layout
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2, scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        className="carta-card-glow-outer group overflow-hidden"
      >
        <article className="carta-card-surface flex gap-3.5 p-3 pr-3.5">
          <div className="relative h-[7.25rem] w-[7.25rem] shrink-0 overflow-hidden rounded-2xl bg-[#141414] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] sm:h-32 sm:w-32">
            <CartaProductImage
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 116px, 128px"
              className="transition duration-500 group-hover:scale-105"
              priority={index < 3}
            />
            <div
              className="carta-product-image-fade pointer-events-none absolute inset-x-0 bottom-0 top-1/3 z-[1]"
              aria-hidden
            />
            {showBadge ? (
              <span className="absolute bottom-1.5 left-1.5 z-[2] rounded-full bg-red-600 px-2 py-0.5 text-[0.55rem] font-bold uppercase leading-none text-white shadow-md ring-1 ring-red-400/40">
                2×1
              </span>
            ) : null}
            <span
              className="absolute right-1 top-1 z-[2] flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/85 text-zinc-300 shadow-sm backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 group-hover:bg-zinc-900/95"
              aria-hidden
            >
              <Heart className="h-3.5 w-3.5 stroke-[1.5]" />
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-0.5">
            <div className="min-w-0">
              <h3 className="font-sans text-[0.8125rem] font-black uppercase leading-tight tracking-wide text-white">
                {product.name}
              </h3>
              <p className="carta-price-metallic mt-0.5 font-sans text-sm tabular-nums">
                {line}
              </p>
              <p className="mt-1 break-words font-inter text-[0.8125rem] font-normal leading-relaxed text-zinc-400">
                {product.description}
              </p>
            </div>
          </div>
        </article>
      </motion.div>
    </li>
  );
}


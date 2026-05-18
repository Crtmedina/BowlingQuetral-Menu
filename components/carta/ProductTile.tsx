"use client";

import { motion } from "framer-motion";
import { CartaProductImage } from "@/components/carta/CartaProductImage";
import type { CartaProduct } from "@/lib/carta";

export function ProductTile({ product, priority }: { product: CartaProduct; priority?: boolean }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="carta-card-glow-outer group h-full overflow-hidden"
    >
      <article className="carta-card-surface flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[calc(1.125rem-2px)] bg-[#141414] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <CartaProductImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 360px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
            priority={priority}
          />
          <div
            className="carta-product-image-fade pointer-events-none absolute inset-x-0 bottom-0 top-[42%] z-[1]"
            aria-hidden
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3.5">
          <h3 className="font-sans text-[0.8125rem] font-black uppercase leading-snug tracking-wide text-white">
            {product.name}
          </h3>
          <p className="mt-1.5 break-words font-inter text-[0.8125rem] font-normal leading-relaxed text-zinc-400">
            {product.description}
          </p>
          <p className="carta-price-metallic mt-auto pt-3 font-sans text-sm tabular-nums">
            {product.price}
          </p>
        </div>
      </article>
    </motion.div>
  );
}


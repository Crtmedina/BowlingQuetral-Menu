"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_ROUTES = ["/admin", "/admin/menu", "/admin/products", "/admin/happy-hour"] as const;

/** Precarga rutas del panel en segundo plano para que el cambio de módulo sea más inmediato. */
export function AdminRoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    for (const href of ADMIN_ROUTES) {
      router.prefetch(href);
    }
  }, [router]);

  return null;
}

"use client";

import { Plus } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Button } from "@/components/ui/button";

export type ProductListEmptyProps = {
  totalProducts: number;
  search: string;
  connected: boolean;
  isPending: boolean;
  onClearFilters: () => void;
  onCreate: () => void;
  onCreateWithName: (name: string) => void;
  seedHint?: { slug: string; staticCount: number } | null;
};

export function ProductListEmpty({
  totalProducts,
  search,
  connected,
  isPending,
  onClearFilters,
  onCreate,
  onCreateWithName,
  seedHint,
}: ProductListEmptyProps) {
  return (
    <>
      <AdminEmptyState
        title={totalProducts === 0 ? "Sin productos" : "Sin coincidencias"}
        description={
          totalProducts === 0
            ? "Aún no hay productos en la base de datos."
            : "Ningún producto coincide con los filtros o la búsqueda."
        }
        action={
          <div className="flex flex-col items-center gap-2">
            {totalProducts > 0 ? (
              <Button type="button" variant="outline" size="sm" onClick={onClearFilters}>
                Limpiar filtros
              </Button>
            ) : null}
            <Button onClick={onCreate} disabled={!connected || isPending} variant="outline">
              <Plus className="h-4 w-4" aria-hidden />
              Agregar producto
            </Button>
            {totalProducts > 0 && search.trim().length > 0 ? (
              <Button
                type="button"
                onClick={() => onCreateWithName(search.trim())}
                disabled={!connected || isPending}
              >
                <Plus className="h-4 w-4" aria-hidden />
                Crear “{search.trim()}”
              </Button>
            ) : null}
          </div>
        }
      />
      {seedHint ? (
        <p className="mx-auto mt-3 max-w-md text-center text-xs text-amber-800">
          La carta pública puede mostrar {seedHint.staticCount} ítem(s) desde el archivo hasta que
          importes o crees productos aquí (
          <code className="rounded bg-muted px-1">npm run seed:carta</code>
          ).
        </p>
      ) : null}
    </>
  );
}

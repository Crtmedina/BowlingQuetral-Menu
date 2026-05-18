"use client";

import type { AdminProduct } from "@/lib/queries/menu";
import { cn } from "@/lib/utils";

type HappyHourProductPickerProps = {
  products: AdminProduct[];
  selectedIds: string[];
  disabled: boolean;
  onChange: (ids: string[]) => void;
};

export function HappyHourProductPicker({
  products,
  selectedIds,
  disabled,
  onChange,
}: HappyHourProductPickerProps) {
  const explicit = selectedIds.length > 0;

  function toggle(id: string) {
    if (!explicit) {
      onChange([id]);
      return;
    }
    const has = selectedIds.includes(id);
    if (has) {
      const next = selectedIds.filter((x) => x !== id);
      onChange(next);
    } else {
      onChange([...selectedIds, id]);
    }
  }

  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
        No hay productos en la categoría Happy Hour. Añádelos en Productos.
      </p>
    );
  }

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="text-sm font-medium text-foreground">Tragos en la carta (Happy Hour)</legend>
      <p className="text-xs text-muted-foreground">
        Sin selección manual, la carta lista todos los productos con «Trago 2×1» activo en Productos.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            "rounded-md border px-2.5 py-1 text-xs font-medium",
            !explicit ? "border-gold/50 bg-gold/10" : "border-border hover:bg-muted/50"
          )}
          onClick={() => onChange([])}
        >
          Automático (2×1)
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted/50"
          onClick={() => onChange(products.filter((p) => p.happyHour2x1).map((p) => p.id))}
        >
          Lista manual
        </button>
      </div>
      <ul className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
        {products.map((p) => {
          const included = explicit ? selectedIds.includes(p.id) : p.happyHour2x1;
          return (
            <li key={p.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/40",
                  !p.active && "opacity-60"
                )}
              >
                <input
                  type="checkbox"
                  className="accent-primary h-4 w-4"
                  checked={included}
                  disabled={disabled || (!explicit && !p.happyHour2x1)}
                  onChange={() => toggle(p.id)}
                />
                <span className="min-w-0 flex-1 truncate font-medium">{p.name}</span>
                {p.happyHour2x1 ? (
                  <span className="shrink-0 text-[0.65rem] font-semibold uppercase text-amber-800">
                    2×1
                  </span>
                ) : null}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

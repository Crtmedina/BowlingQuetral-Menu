"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { AdminProductImagePreview } from "@/components/admin/AdminProductImagePreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hubLabelForSection, sectionLabel } from "@/lib/menu/menu-layout-lookup";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import type { AdminProduct } from "@/lib/queries/menu";
import { cn } from "@/lib/utils";

export type ProductListProps = {
  products: AdminProduct[];
  menuLayout: MenuLayoutHubDTO[];
  knownSectionSlugs: Set<string>;
  connected: boolean;
  isPending: boolean;
  onEdit: (product: AdminProduct) => void;
  onDelete: (productId: string) => void;
};

export function ProductList({
  products,
  menuLayout,
  knownSectionSlugs,
  connected,
  isPending,
  onEdit,
  onDelete,
}: ProductListProps) {
  return (
    <>
      <div className="admin-products-table-view rounded-xl border border-border/80 bg-card/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-3 pl-4">Producto</th>
                <th className="px-3 py-3">Bloque</th>
                <th className="px-3 py-3">Categoría</th>
                <th className="px-3 py-3">Precio</th>
                <th className="px-3 py-3">Estado</th>
                <th className="admin-table-sticky-actions-header px-3 py-3 pr-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={cn(
                    "border-b border-border/80 transition-colors hover:bg-muted/30",
                    !product.active && "opacity-70"
                  )}
                >
                  <td className="px-3 py-3 pl-4">
                    <div className="flex gap-3">
                      {product.imageUrl ? (
                        <AdminProductImagePreview src={product.imageUrl} alt={product.name}>
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        </AdminProductImagePreview>
                      ) : (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                          <div className="flex h-full items-center justify-center text-[0.65rem] text-muted-foreground">
                            —
                          </div>
                        </div>
                      )}
                      <div className="min-w-0 max-w-[280px]">
                        <p className="font-semibold leading-snug">{product.name}</p>
                        <p
                          className="mt-0.5 line-clamp-2 text-xs text-muted-foreground"
                          title={product.description || undefined}
                        >
                          {product.description || "—"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-muted-foreground">
                    {hubLabelForSection(menuLayout, product.sectionId)}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <span>{sectionLabel(menuLayout, product.sectionId)}</span>
                    {!knownSectionSlugs.has(product.sectionId) && (
                      <Badge
                        variant="outline"
                        className="ml-2 border-red-200 bg-red-50 text-[0.65rem] text-red-700"
                      >
                        Sin categoría en el menú
                      </Badge>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top font-medium text-gold tabular-nums">{product.price}</td>
                  <td className="px-3 py-3 align-top">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {!product.active ? (
                        <Badge variant="secondary">Oculto en carta</Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
                          Visible
                        </Badge>
                      )}
                      {product.active && product.happyHour2x1 ? (
                        <Badge variant="gold">2×1 Happy Hour</Badge>
                      ) : null}
                    </div>
                  </td>
                  <td className="admin-table-sticky-actions px-3 py-3 pr-4 text-right align-middle">
                    <div className="inline-flex gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => onEdit(product)}
                        disabled={!connected || isPending}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Editar {product.name}</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => void onDelete(product.id)}
                        disabled={!connected || isPending}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Eliminar {product.name}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-products-cards-view gap-3">
        {products.map((product) => (
          <Card key={product.id} className={cn(!product.active && "opacity-70")}>
            <CardContent className="space-y-3 p-4">
              <div className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {product.imageUrl ? (
                    <AdminProductImagePreview src={product.imageUrl} alt={product.name}>
                      <div className="relative h-16 w-16">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </AdminProductImagePreview>
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Sin foto
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                    {hubLabelForSection(menuLayout, product.sectionId)}
                  </p>
                  <p className="text-[0.65rem] text-muted-foreground/90">
                    {sectionLabel(menuLayout, product.sectionId)}
                  </p>
                  <h4 className="mt-0.5 font-semibold leading-snug">{product.name}</h4>
                  <p className="text-sm font-medium text-gold">{product.price}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{product.description}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {!product.active ? (
                  <Badge variant="secondary">Oculto en carta</Badge>
                ) : (
                  <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
                    Visible
                  </Badge>
                )}
                {product.active && product.happyHour2x1 ? (
                  <Badge variant="gold">2×1 Happy Hour</Badge>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit(product)}
                  disabled={!connected || isPending}
                >
                  <Pencil className="h-4 w-4" />
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void onDelete(product.id)}
                  disabled={!connected || isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

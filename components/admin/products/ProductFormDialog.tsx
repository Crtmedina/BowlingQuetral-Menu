"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { AdminProductImagePreview } from "@/components/admin/AdminProductImagePreview";
import { HubSectionPicker } from "@/components/admin/HubSectionPicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { isHttpImageUrl } from "@/lib/admin/image-url";
import type { ProductFormValues } from "@/lib/admin/product-form";
import { isHappyHourCategory } from "@/lib/menu/happy-hour";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: string | null;
  form: ProductFormValues;
  setForm: Dispatch<SetStateAction<ProductFormValues>>;
  hubId: string;
  sectionId: string;
  onHubChange: (hubId: string) => void;
  onSectionChange: (sectionId: string) => void;
  menuLayout: MenuLayoutHubDTO[];
  connected: boolean;
  isPending: boolean;
  error: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ProductFormDialog({
  open,
  onOpenChange,
  editingId,
  form,
  setForm,
  hubId,
  sectionId,
  onHubChange,
  onSectionChange,
  menuLayout,
  connected,
  isPending,
  error,
  onSubmit,
}: ProductFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-dialog-surface flex max-h-[min(92dvh,720px)] w-[calc(100%-1.5rem)] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:w-full">
        <DialogHeader className="shrink-0 space-y-1.5 border-b border-border px-5 pb-4 pt-5 pr-12">
          <DialogTitle>{editingId ? "Editar producto" : "Nuevo producto"}</DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            Elige bloque y categoría en la carta. El precio se muestra tal como lo escribas.
          </DialogDescription>
        </DialogHeader>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-4">
            <HubSectionPicker
              menuLayout={menuLayout}
              hubId={hubId}
              sectionId={sectionId}
              onHubChange={onHubChange}
              onSectionChange={onSectionChange}
            />

            <div className="grid min-w-0 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Nombre</Label>
                <Input
                  id="product-name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Ej. Pisco sour"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Descripción</Label>
                <Textarea
                  id="product-description"
                  className="min-h-[4.5rem] resize-y"
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, description: event.target.value }))
                  }
                  placeholder="Ingredientes o detalle breve"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="product-price">Precio</Label>
                  <Input
                    id="product-price"
                    value={form.price}
                    onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                    placeholder="$6.500"
                    required
                  />
                </div>
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="product-deal">
                    {isHappyHourCategory(sectionId) ? "Precio promo 2×1" : "Oferta (opcional)"}
                  </Label>
                  <Input
                    id="product-deal"
                    value={form.deal}
                    onChange={(event) => setForm((current) => ({ ...current, deal: event.target.value }))}
                    placeholder={isHappyHourCategory(sectionId) ? "Ej. 2×1 $7.500" : "Ej. precio especial"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-image">Enlace de la imagen</Label>
                <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center">
                  <Input
                    id="product-image"
                    className="min-w-0 flex-1"
                    value={form.imageUrl}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, imageUrl: event.target.value }))
                    }
                    placeholder="https://..."
                  />
                  {isHttpImageUrl(form.imageUrl) ? (
                    <AdminProductImagePreview src={form.imageUrl.trim()} alt="Vista previa del producto">
                      <button
                        type="button"
                        className="relative h-14 w-14 shrink-0 self-start overflow-hidden rounded-md border border-border bg-muted"
                        aria-label="Clic para ver la imagen"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form.imageUrl.trim()}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    </AdminProductImagePreview>
                  ) : null}
                </div>
              </div>
              <div className="space-y-2 min-[480px]:max-w-[12rem]">
                <Label htmlFor="product-order">Orden en la categoría</Label>
                <Input
                  id="product-order"
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, order: Number(event.target.value) || 0 }))
                  }
                />
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
              <label className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium">Visible en la carta</span>
                <Switch
                  checked={form.active}
                  onCheckedChange={(checked) => setForm((current) => ({ ...current, active: checked }))}
                />
              </label>
              <p className="text-xs text-muted-foreground">
                Si lo apagas, el producto no aparece en la carta pública (sigue guardado aquí).
              </p>

              {isHappyHourCategory(sectionId) ? (
                <div className="space-y-2 border-t border-border/60 pt-3">
                  <label className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">Trago 2×1 en Happy Hour</span>
                    <Switch
                      checked={form.happyHour2x1}
                      onCheckedChange={(checked) =>
                        setForm((current) => ({ ...current, happyHour2x1: checked }))
                      }
                    />
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Muestra el badge 2×1 en la carta dentro del bloque Happy Hour.
                  </p>
                </div>
              ) : (
                <p className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  Para un trago 2×1, elige bloque y categoría{" "}
                  <strong className="font-medium text-foreground">Happy Hour</strong> arriba.
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 space-y-3 border-t border-border bg-muted/15 px-5 py-4">
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!connected || isPending}>
                {editingId ? "Guardar cambios" : "Crear producto"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

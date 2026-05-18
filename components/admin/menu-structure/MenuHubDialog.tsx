"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { adminGroupChipClass } from "@/components/admin/admin-chip";
import { HubFormPreview, HubIconPicker } from "@/components/admin/menu-structure/HubFormBits";
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

export type HubFormState = {
  label: string;
  suffix: string;
  menuGroup: "comida" | "barra";
  iconKey: string;
  active: boolean;
  isFeatured: boolean;
};

export type MenuHubDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hubEditingSlug: string | null;
  hubForm: HubFormState;
  setHubForm: Dispatch<SetStateAction<HubFormState>>;
  onRequestFeatured: (checked: boolean) => void | Promise<void>;
  hubCanSave: boolean;
  connected: boolean;
  isPending: boolean;
  error: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function MenuHubDialog(props: MenuHubDialogProps) {
  const {
    open,
    onOpenChange,
    hubEditingSlug,
    hubForm,
    setHubForm,
    onRequestFeatured,
    hubCanSave,
    connected,
    isPending,
    error,
    onSubmit,
  } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-dialog-surface flex max-h-[min(92dvh,640px)] w-[calc(100%-1.5rem)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:w-full">
        <DialogHeader className="shrink-0 space-y-1.5 border-b border-border px-5 pb-4 pt-5 pr-12">
          <DialogTitle>{hubEditingSlug ? "Editar bloque" : "Nuevo bloque"}</DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            {hubEditingSlug ? (
              <>
                Identificador interno:{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">{hubEditingSlug}</code>. La plantilla 2×1
                y el orden entre bloques se gestionan en la tabla.
              </>
            ) : (
              "Crea un bloque para agrupar categorías en la carta. Después podrás añadir categorías desde la tabla."
            )}
          </DialogDescription>
        </DialogHeader>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4">
            <HubFormPreview
              label={hubForm.label}
              suffix={hubForm.suffix}
              iconKey={hubForm.iconKey}
              menuGroup={hubForm.menuGroup}
              active={hubForm.active}
              isFeatured={hubForm.isFeatured}
            />

            <div className="space-y-2">
              <Label htmlFor="hub-label">Nombre visible</Label>
              <Input
                id="hub-label"
                value={hubForm.label}
                onChange={(e) => setHubForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="Ej. BEBESTIBLES"
                autoFocus
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hub-suffix">Subtítulo (opcional)</Label>
              <Input
                id="hub-suffix"
                value={hubForm.suffix}
                onChange={(e) => setHubForm((f) => ({ ...f, suffix: e.target.value }))}
                placeholder="Texto secundario bajo el título"
              />
            </div>

            <div className="space-y-2">
              <Label>Grupo en la carta</Label>
              <p className="text-xs text-muted-foreground">
                Separa bloques de comida y barra en la navegación lateral.
              </p>
              <div className="flex gap-2" role="group" aria-label="Grupo del bloque">
                {(["comida", "barra"] as const).map((group) => (
                  <button
                    key={group}
                    type="button"
                    className={adminGroupChipClass(hubForm.menuGroup === group)}
                    onClick={() => setHubForm((f) => ({ ...f, menuGroup: group }))}
                  >
                    {group === "comida" ? "Comida" : "Barra"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Icono</Label>
              <HubIconPicker
                value={hubForm.iconKey}
                onChange={(iconKey) => setHubForm((f) => ({ ...f, iconKey }))}
              />
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
              <label className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium">Destacado en la carta</span>
                <Switch
                  checked={hubForm.isFeatured}
                  onCheckedChange={(checked) => onRequestFeatured(checked)}
                />
              </label>
              <p className="text-xs text-muted-foreground">
                Los bloques destacados salen primero en la navegación (puede haber varios). El orden entre
                destacados se ajusta con <strong className="font-medium">Pos.</strong> en la tabla.
              </p>
              <label className="flex items-center justify-between gap-3 border-t border-border/60 pt-3 text-sm">
                <span className="font-medium">Visible en la carta</span>
                <Switch
                  checked={hubForm.active}
                  onCheckedChange={(checked) => setHubForm((f) => ({ ...f, active: checked }))}
                />
              </label>
              <p className="text-xs text-muted-foreground">
                Si lo apagas, el bloque y sus categorías dejan de mostrarse en la carta pública.
              </p>
              {!hubForm.isFeatured ? (
                <p className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  Los bloques normales usan el desplegable <strong className="font-medium">Pos.</strong> en la
                  tabla para ordenarse entre sí.
                </p>
              ) : null}
            </div>
          </div>

          <div className="shrink-0 space-y-3 border-t border-border bg-muted/15 px-5 py-4">
            {error && open ? <p className="text-sm text-red-600">{error}</p> : null}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!connected || isPending || !hubCanSave}>
                {isPending
                  ? "Guardando…"
                  : hubEditingSlug
                    ? "Guardar cambios"
                    : "Crear bloque"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

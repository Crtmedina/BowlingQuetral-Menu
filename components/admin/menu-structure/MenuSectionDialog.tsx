"use client";

import type { Dispatch, SetStateAction } from "react";
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

export type SectionFormState = {
  label: string;
  slug: string;
  intro: string;
  active: boolean;
};

export type MenuSectionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionEditingSlug: string | null;
  sectionForm: SectionFormState;
  setSectionForm: Dispatch<SetStateAction<SectionFormState>>;
  connected: boolean;
  isPending: boolean;
  error: string | null;
  onSave: () => void | Promise<void>;
};

export function MenuSectionDialog({
  open,
  onOpenChange,
  sectionEditingSlug,
  sectionForm,
  setSectionForm,
  connected,
  isPending,
  error,
  onSave: saveSection,
}: MenuSectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-dialog-surface w-[calc(100%-1.5rem)] max-h-[min(90dvh,32rem)] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{sectionEditingSlug ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
          <DialogDescription>
            {sectionEditingSlug
              ? `Slug fijo: ${sectionEditingSlug}`
              : "Puedes indicar un slug o dejarlo vacío para generarlo."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              value={sectionForm.label}
              onChange={(e) => setSectionForm((f) => ({ ...f, label: e.target.value }))}
              placeholder="Ej. Pizzas"
            />
          </div>
          {!sectionEditingSlug ? (
            <div className="space-y-2">
              <Label>Slug (opcional)</Label>
              <Input
                value={sectionForm.slug}
                onChange={(e) => setSectionForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="pizzas"
              />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label>Texto introductorio</Label>
            <Textarea
              value={sectionForm.intro}
              onChange={(e) => setSectionForm((f) => ({ ...f, intro: e.target.value }))}
              placeholder="Aparece debajo del título en la carta"
              rows={3}
            />
          </div>
          <label className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 text-sm">
            <span>Visible en la carta</span>
            <Switch
              checked={sectionForm.active}
              onCheckedChange={(checked) => setSectionForm((f) => ({ ...f, active: checked }))}
            />
          </label>
          <p className="text-xs text-muted-foreground">
            El orden de la categoría se cambia en la pestaña Orden o con el desplegable de posición en la tabla.
          </p>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex justify-end gap-2 border-t border-border pt-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => void saveSection()} disabled={!connected || isPending}>
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

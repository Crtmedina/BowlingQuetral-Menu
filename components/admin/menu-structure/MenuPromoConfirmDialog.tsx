"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PromoHubCartaPreview } from "@/components/admin/menu-structure/HubFormBits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export type MenuPromoConfirmDialogProps = {
  hub: MenuLayoutHubDTO | null;
  onOpenChange: (open: boolean) => void;
  replacingHub: MenuLayoutHubDTO | null | undefined;
  connected: boolean;
  isPending: boolean;
  error: string | null;
  onConfirm: () => void | Promise<void>;
  happyHourScheduleLabel: string;
  happyHourLabel: string;
};

export function MenuPromoConfirmDialog({
  hub: promoConfirmHub,
  onOpenChange,
  replacingHub: promoHubReplacing,
  connected,
  isPending,
  error,
  onConfirm: confirmSetPromoHub,
  happyHourScheduleLabel,
  happyHourLabel,
}: MenuPromoConfirmDialogProps) {
  return (
    <Dialog
      open={promoConfirmHub !== null}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="admin-dialog-surface flex max-h-[min(92dvh,640px)] w-[calc(100%-1.5rem)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:w-full">
        <DialogHeader className="shrink-0 space-y-1.5 border-b border-border px-5 pb-4 pt-5 pr-12">
          <DialogTitle>Plantilla 2×1 en la carta</DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            {promoConfirmHub ? (
              <>
                El bloque <strong className="text-foreground">«{promoConfirmHub.label}»</strong> usará el
                diseño Happy Hour (banner y listado especial) para todas sus categorías.
              </>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        {promoConfirmHub ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4">
              <PromoHubCartaPreview
                hub={promoConfirmHub}
                scheduleLabel={happyHourScheduleLabel}
                promoLabel={happyHourLabel}
              />

              {promoHubReplacing ? (
                <p className="rounded-lg border border-amber-500/35 bg-amber-500/[0.08] px-3 py-2.5 text-sm text-amber-950">
                  Sustituirá a <strong>«{promoHubReplacing.label}»</strong>, que dejará de usar esta
                  plantilla. Solo un bloque puede tenerla activa.
                </p>
              ) : (
                <p className="rounded-lg border border-border bg-muted/25 px-3 py-2.5 text-sm text-muted-foreground">
                  Solo un bloque puede usar la plantilla 2×1. Los tragos con badge 2×1 se configuran en{" "}
                  <strong className="font-medium text-foreground">Productos</strong>.
                </p>
              )}

              <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                <li>Ideal para bloques de barra, coctelería o Happy Hour.</li>
                <li>No cambia precios ni productos; solo la presentación en la carta.</li>
              </ul>
            </div>

            <div className="shrink-0 space-y-3 border-t border-border bg-muted/15 px-5 py-4">
              {error && promoConfirmHub ? <p className="text-sm text-red-600">{error}</p> : null}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <Button type="button" variant="ghost" size="sm" className="h-9 justify-center" asChild>
                  <Link
                    href={`/carta?hub=${encodeURIComponent(promoConfirmHub.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver carta actual
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Button>
                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    variant="gold"
                    onClick={() => void confirmSetPromoHub()}
                    disabled={!connected || isPending}
                  >
                    {isPending ? "Aplicando…" : "Activar plantilla 2×1"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

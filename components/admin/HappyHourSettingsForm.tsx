"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { Clock, ExternalLink, Save } from "lucide-react";
import { saveHappyHourSettingsAction } from "@/lib/actions/happy-hour";
import {
  formatHappyHourScheduleLabel,
  type HappyHourScheduleDTO,
} from "@/lib/menu/happy-hour-schedule";
import { HappyHourProductPicker } from "@/components/admin/HappyHourProductPicker";
import { AdminMongoBanner } from "@/components/admin/AdminMongoBanner";
import type { AdminProduct } from "@/lib/queries/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const DAY_OPTIONS = [
  { value: 1, label: "Lun" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Mié" },
  { value: 4, label: "Jue" },
  { value: 5, label: "Vie" },
  { value: 6, label: "Sáb" },
  { value: 0, label: "Dom" },
] as const;

type HappyHourSettingsFormProps = {
  initial: HappyHourScheduleDTO;
  connected: boolean;
  hhProducts: AdminProduct[];
};

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-border/80 bg-muted/20 p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function HappyHourSettingsForm({ initial, connected, hhProducts }: HappyHourSettingsFormProps) {
  const [baseline, setBaseline] = useState(initial);
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const previewLabel = formatHappyHourScheduleLabel(form);
  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(baseline),
    [form, baseline]
  );

  function patchForm(patch: Partial<HappyHourScheduleDTO>) {
    setSavedAt(null);
    setForm((f) => ({ ...f, ...patch }));
  }

  function toggleDay(day: number) {
    const has = form.daysOfWeek.includes(day);
    const days = has ? form.daysOfWeek.filter((d) => d !== day) : [...form.daysOfWeek, day];
    patchForm({ daysOfWeek: days.sort((a, b) => a - b) });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSavedAt(null);
    if (form.daysOfWeek.length === 0) {
      setError("Selecciona al menos un día de la semana.");
      return;
    }
    startTransition(async () => {
      const res = await saveHappyHourSettingsAction(form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      const next = res.data ?? form;
      setForm(next);
      setBaseline(next);
      setSavedAt(Date.now());
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!connected ? (
        <AdminMongoBanner>Conecta MongoDB para guardar la configuración de Happy Hour.</AdminMongoBanner>
      ) : null}

      <Section
        title="1. Visibilidad en la carta"
        description="Controla si el bloque Happy Hour aparece para los clientes. Los tragos siguen en Productos aunque esté desactivado."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {form.enabled
              ? "El bloque se muestra en la carta. «En curso» solo dentro del horario."
              : "El bloque no se muestra; los tragos se ven en Barra u otras categorías."}
          </p>
          <div className="flex items-center gap-2">
            <Label htmlFor="hh-enabled" className="text-sm font-medium">
              {form.enabled ? "Activado" : "Desactivado"}
            </Label>
            <Switch
              id="hh-enabled"
              checked={form.enabled}
              disabled={!connected || isPending}
              onCheckedChange={(enabled) => patchForm({ enabled })}
            />
          </div>
        </div>
      </Section>

      <Section
        title="2. Texto en la carta"
        description="Título del bloque y letra chica bajo el banner 2×1."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hh-label">Nombre del bloque</Label>
            <Input
              id="hh-label"
              value={form.label}
              disabled={!connected || isPending}
              onChange={(e) => patchForm({ label: e.target.value })}
              placeholder="Ej. Happy Hour"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hh-legal">Descripción / condiciones</Label>
            <textarea
              id="hh-legal"
              rows={3}
              disabled={!connected || isPending}
              value={form.promoDescription}
              onChange={(e) => patchForm({ promoDescription: e.target.value })}
              placeholder="Ej. Válido en tragos seleccionados. Consulta en barra."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </Section>

      <Section
        title="3. Horario"
        description="Días y franja horaria. Define cuándo aparece el badge «En curso» en la carta."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hh-start">Desde</Label>
            <Input
              id="hh-start"
              type="time"
              value={form.startTime}
              disabled={!connected || isPending}
              onChange={(e) => patchForm({ startTime: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hh-end">Hasta</Label>
            <Input
              id="hh-end"
              type="time"
              value={form.endTime}
              disabled={!connected || isPending}
              onChange={(e) => patchForm({ endTime: e.target.value })}
            />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-foreground">Días</legend>
          <div className="flex flex-wrap gap-2">
            {DAY_OPTIONS.map(({ value, label }) => {
              const on = form.daysOfWeek.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  disabled={!connected || isPending}
                  onClick={() => toggleDay(value)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                    on
                      ? "border-gold/50 bg-gold/15 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-border/80"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <p className="flex items-center gap-2 rounded-lg border border-violet-500/25 bg-violet-500/[0.06] px-3 py-2 text-sm text-violet-950 dark:text-violet-100">
          <Clock className="h-4 w-4 shrink-0 text-violet-600" aria-hidden />
          Vista previa: <strong className="font-semibold">{previewLabel}</strong>
        </p>
      </Section>

      <Section
        title="4. Tragos en promoción"
        description="Qué productos de la categoría Happy Hour entran en la promo. Vacío = todos los marcados como 2×1 en Productos."
      >
        <HappyHourProductPicker
          products={hhProducts}
          selectedIds={form.applicableProductIds}
          disabled={!connected || isPending}
          onChange={(applicableProductIds) => patchForm({ applicableProductIds })}
        />
      </Section>

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-20 -mx-1 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        {error ? (
          <p
            role="alert"
            className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-900 dark:text-red-100"
          >
            {error}
          </p>
        ) : null}
        {savedAt && !isDirty ? (
          <p className="mb-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-900 dark:text-emerald-100">
            Configuración guardada. La carta se actualiza en unos segundos.
          </p>
        ) : isDirty ? (
          <p className="mb-3 text-sm text-amber-800 dark:text-amber-200">
            Tienes cambios sin guardar.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="submit"
            variant="gold"
            className="gap-2"
            disabled={!connected || isPending || (!isDirty && savedAt !== null)}
          >
            <Save className="h-4 w-4" aria-hidden />
            {isPending ? "Guardando…" : "Guardar configuración"}
          </Button>
          <Button type="button" variant="outline" className="gap-2" asChild>
            <Link href="/carta" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" aria-hidden />
              Ver carta
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState, useTransition } from "react";
import { Clock, Save } from "lucide-react";
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

export function HappyHourSettingsForm({ initial, connected, hhProducts }: HappyHourSettingsFormProps) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const previewLabel = formatHappyHourScheduleLabel(form);

  function toggleDay(day: number) {
    setSaved(false);
    setForm((f) => {
      const has = f.daysOfWeek.includes(day);
      const days = has ? f.daysOfWeek.filter((d) => d !== day) : [...f.daysOfWeek, day];
      return { ...f, daysOfWeek: days.sort((a, b) => a - b) };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
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
      if (res.data) setForm(res.data);
      setSaved(true);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      {!connected ? (
        <AdminMongoBanner>Conecta MongoDB para guardar el horario global.</AdminMongoBanner>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">Horario activo en carta</p>
          <p className="text-xs text-muted-foreground">
            Si está desactivado, el banner sigue mostrando el texto configurado pero la promo no
            cuenta como «en curso».
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="hh-enabled" className="text-sm text-muted-foreground">
            {form.enabled ? "Activado" : "Desactivado"}
          </Label>
          <Switch
            id="hh-enabled"
            checked={form.enabled}
            disabled={!connected || isPending}
            onCheckedChange={(enabled) => {
              setSaved(false);
              setForm((f) => ({ ...f, enabled }));
            }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="hh-label">Nombre en carta</Label>
          <Input
            id="hh-label"
            value={form.label}
            disabled={!connected || isPending}
            onChange={(e) => {
              setSaved(false);
              setForm((f) => ({ ...f, label: e.target.value }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hh-start">Desde</Label>
          <Input
            id="hh-start"
            type="time"
            value={form.startTime}
            disabled={!connected || isPending}
            onChange={(e) => {
              setSaved(false);
              setForm((f) => ({ ...f, startTime: e.target.value }));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hh-end">Hasta</Label>
          <Input
            id="hh-end"
            type="time"
            value={form.endTime}
            disabled={!connected || isPending}
            onChange={(e) => {
              setSaved(false);
              setForm((f) => ({ ...f, endTime: e.target.value }));
            }}
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-foreground">Días de la semana</legend>
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

      <HappyHourProductPicker
        products={hhProducts}
        selectedIds={form.applicableProductIds}
        disabled={!connected || isPending}
        onChange={(applicableProductIds) => {
          setSaved(false);
          setForm((f) => ({ ...f, applicableProductIds }));
        }}
      />

      <div className="space-y-2">
        <Label htmlFor="hh-legal">Texto legal / descripción</Label>
        <textarea
          id="hh-legal"
          rows={3}
          disabled={!connected || isPending}
          value={form.promoDescription}
          onChange={(e) => {
            setSaved(false);
            setForm((f) => ({ ...f, promoDescription: e.target.value }));
          }}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <p className="flex items-center gap-2 rounded-lg border border-violet-500/25 bg-violet-500/[0.06] px-3 py-2 text-sm text-violet-950 dark:text-violet-100">
        <Clock className="h-4 w-4 shrink-0 text-violet-600" aria-hidden />
        Vista previa en carta: <strong className="font-semibold">{previewLabel}</strong>
      </p>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      {saved ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Horario guardado. La carta pública se actualizará en unos segundos.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gold"
        className="gap-2"
        disabled={!connected || isPending}
      >
        <Save className="h-4 w-4" aria-hidden />
        {isPending ? "Guardando…" : "Guardar horario"}
      </Button>
    </form>
  );
}

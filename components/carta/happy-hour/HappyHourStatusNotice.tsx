import type { HappyHourCartaDTO } from "@/lib/menu/happy-hour-schedule";

export function HappyHourStatusNotice({ happyHour }: { happyHour: HappyHourCartaDTO }) {
  if (happyHour.promoStatus === "active") return null;

  const message =
    happyHour.promoStatus === "disabled"
      ? "La promoción Happy Hour está desactivada en el panel. Los precios mostrados son orientativos; consulta en barra."
      : `Fuera del horario de Happy Hour (${happyHour.scheduleLabel}). Los tragos pueden tener otras condiciones en barra.`;

  return (
    <p
      role="status"
      className="rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2.5 text-center font-inter text-xs font-medium leading-relaxed text-amber-100/95"
    >
      {message}
    </p>
  );
}

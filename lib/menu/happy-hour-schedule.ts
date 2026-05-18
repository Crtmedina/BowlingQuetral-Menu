/** DTO seguro para cliente y carta (sin ObjectIds). */
export type HappyHourScheduleDTO = {
  label: string;
  enabled: boolean;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  promoDescription: string;
  /** Vacío = todos los productos con happyHour2x1 en la categoría HH */
  applicableProductIds: string[];
};

export type HappyHourPromoStatus = "active" | "outside_hours" | "disabled";

export type HappyHourCartaDTO = HappyHourScheduleDTO & {
  scheduleLabel: string;
  isActiveNow: boolean;
  promoStatus: HappyHourPromoStatus;
};

export const DEFAULT_HAPPY_HOUR_SCHEDULE: HappyHourScheduleDTO = {
  label: "Happy Hour",
  enabled: false,
  daysOfWeek: [1, 2, 3, 4],
  startTime: "18:00",
  endTime: "22:00",
  promoDescription:
    "Válido en tragos seleccionados. Consulta en barra. No acumulable con otras promociones.",
  applicableProductIds: [],
};

export const DEFAULT_SCHEDULE_LABEL = "Lun–Jue hasta 22:00";

const DAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

export function parseTimeToMinutes(time: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

export function formatTimeDisplay(time: string): string {
  const parts = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!parts) return time;
  return `${parts[1]}:${parts[2]}`;
}

/** Partes locales en zona IANA (0=domingo … 6=sábado). */
export function getLocalDayAndMinutes(now: Date, timeZone: string): { day: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return { day: dayMap[weekday] ?? 0, minutes: hour * 60 + minute };
}

function isMinutesInRange(nowMin: number, startMin: number, endMin: number): boolean {
  if (startMin <= endMin) return nowMin >= startMin && nowMin < endMin;
  return nowMin >= startMin || nowMin < endMin;
}

export function isHappyHourActive(
  settings: Pick<HappyHourScheduleDTO, "enabled" | "daysOfWeek" | "startTime" | "endTime">,
  now: Date = new Date(),
  timeZone = process.env.TZ?.trim() || "America/Santiago"
): boolean {
  if (!settings.enabled) return false;
  const days = Array.from(new Set(settings.daysOfWeek)).filter((d) => d >= 0 && d <= 6);
  if (days.length === 0) return false;
  const startMin = parseTimeToMinutes(settings.startTime);
  const endMin = parseTimeToMinutes(settings.endTime);
  if (startMin === null || endMin === null) return false;
  const { day, minutes } = getLocalDayAndMinutes(now, timeZone);
  if (!days.includes(day)) return false;
  return isMinutesInRange(minutes, startMin, endMin);
}

function groupConsecutiveDays(sorted: number[]): string[] {
  if (sorted.length === 0) return [];
  const groups: number[][] = [];
  let current: number[] = [sorted[0]!];
  for (let i = 1; i < sorted.length; i++) {
    const d = sorted[i]!;
    if (d === current[current.length - 1]! + 1) current.push(d);
    else {
      groups.push(current);
      current = [d];
    }
  }
  groups.push(current);
  return groups.map((g) => {
    if (g.length === 1) return DAY_SHORT[g[0]!]!;
    return `${DAY_SHORT[g[0]!]!}–${DAY_SHORT[g[g.length - 1]!]!}`;
  });
}

export function formatHappyHourScheduleLabel(
  settings: Pick<HappyHourScheduleDTO, "daysOfWeek" | "endTime">
): string {
  const days = Array.from(new Set(settings.daysOfWeek))
    .filter((d) => d >= 0 && d <= 6)
    .sort((a, b) => a - b);
  if (days.length === 0) return DEFAULT_SCHEDULE_LABEL;
  const dayPart = groupConsecutiveDays(days).join(" y ");
  const end = formatTimeDisplay(settings.endTime);
  return `${dayPart} hasta ${end}`;
}

export function getHappyHourPromoStatus(
  settings: Pick<HappyHourScheduleDTO, "enabled" | "daysOfWeek" | "startTime" | "endTime">,
  now: Date = new Date(),
  timeZone?: string
): HappyHourPromoStatus {
  if (!settings.enabled) return "disabled";
  const tz = timeZone ?? (process.env.TZ?.trim() || "America/Santiago");
  if (isHappyHourActive(settings, now, tz)) return "active";
  return "outside_hours";
}

export function toHappyHourCartaDTO(
  settings: HappyHourScheduleDTO,
  now: Date = new Date(),
  timeZone?: string
): HappyHourCartaDTO {
  const tz = timeZone ?? (process.env.TZ?.trim() || "America/Santiago");
  const isActiveNow = isHappyHourActive(settings, now, tz);
  return {
    ...settings,
    scheduleLabel: formatHappyHourScheduleLabel(settings),
    isActiveNow,
    promoStatus: getHappyHourPromoStatus(settings, now, tz),
  };
}

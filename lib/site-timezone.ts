/** Zona IANA del local (Happy Hour). No usar `TZ`: está reservada en Vercel y puede ser `:UTC`. */
export const DEFAULT_APP_TIMEZONE = "America/Santiago";

const ENV_KEY = "APP_TIMEZONE";

function isValidIanaTimeZone(timeZone: string): boolean {
  try {
    Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

/** Zona horaria del negocio desde `APP_TIMEZONE` (fallback: America/Santiago). */
export function getAppTimeZone(): string {
  const raw = process.env[ENV_KEY]?.trim();
  if (!raw) return DEFAULT_APP_TIMEZONE;
  if (!isValidIanaTimeZone(raw)) {
    console.warn(
      `[${ENV_KEY}] valor inválido "${raw}"; usando ${DEFAULT_APP_TIMEZONE}. Usa un nombre IANA (ej. America/Santiago).`
    );
    return DEFAULT_APP_TIMEZONE;
  }
  return raw;
}

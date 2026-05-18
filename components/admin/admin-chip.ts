import { cn } from "@/lib/utils";

/** Chip compacto en filtros (menú). */
export function adminFilterChipClass(active: boolean) {
  return cn(
    "shrink-0 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium transition-colors",
    active
      ? "border-gold/50 bg-gold/15 text-gold"
      : "border-border bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground"
  );
}

/** Chip en filtros de productos y picker de categorías. */
export function adminChipClass(active: boolean) {
  return cn(
    "shrink-0 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
    active
      ? "border-gold/50 bg-gold/15 text-gold shadow-sm"
      : "border-border bg-card text-muted-foreground hover:border-gold/25 hover:bg-muted/50 hover:text-foreground"
  );
}

/** Botón de grupo (comida / barra) en formulario de bloque. */
export function adminGroupChipClass(active: boolean) {
  return cn(
    "flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
    active
      ? "border-gold/50 bg-gold/15 text-foreground shadow-sm"
      : "border-border bg-background text-muted-foreground hover:border-gold/25 hover:bg-muted/40"
  );
}

/** Botón de bloque en HubSectionPicker. */
export function adminHubPickerChipClass(active: boolean) {
  return cn(
    "max-w-full rounded-lg border px-2.5 py-1.5 text-left text-[0.65rem] font-semibold uppercase leading-snug tracking-wide transition sm:text-xs",
    active
      ? "border-gold/50 bg-gold/15 text-gold shadow-sm"
      : "border-border bg-card text-muted-foreground hover:border-gold/30 hover:bg-card hover:text-foreground"
  );
}

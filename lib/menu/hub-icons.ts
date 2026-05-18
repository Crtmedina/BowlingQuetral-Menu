import type { LucideIcon } from "lucide-react";
import {
  ChefHat,
  Circle,
  Citrus,
  CupSoda,
  Flame,
  HandPlatter,
  Martini,
  Sandwich,
  Sparkles,
  Wine,
} from "lucide-react";

/** Claves guardadas en `MenuHub.iconKey` (persistencia) → componente Lucide en la carta */
export const HUB_ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  HandPlatter,
  Citrus,
  Flame,
  Sandwich,
  ChefHat,
  CupSoda,
  Martini,
  Wine,
};

export function getHubIcon(iconKey: string): LucideIcon {
  return HUB_ICON_MAP[iconKey] ?? Circle;
}

/** Etiquetas legibles para el admin (selector de iconos) */
export const HUB_ICON_LABELS: Record<string, string> = {
  Sparkles: "Promos",
  HandPlatter: "Para picar",
  Citrus: "Mexicano",
  Flame: "Papas",
  Sandwich: "Clásicos",
  ChefHat: "Platos",
  CupSoda: "Bebestibles",
  Martini: "Coctelería",
  Wine: "Barra",
};

export const HUB_ICON_KEYS = Object.keys(HUB_ICON_MAP).sort();

/** `hub.id` estático (navigation) → clave persistible */
export const DEFAULT_ICON_KEY_BY_HUB_ID: Record<string, string> = {
  promos: "Sparkles",
  paraPicar: "HandPlatter",
  mexicano: "Citrus",
  papasFritas: "Flame",
  panYClasicos: "Sandwich",
  platosFuertes: "ChefHat",
  bebestibles: "CupSoda",
  cocteleria: "Martini",
  barra: "Wine",
};

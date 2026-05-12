import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  HandPlatter,
  Citrus,
  Flame,
  Sandwich,
  ChefHat,
  Martini,
  CupSoda,
  Wine,
} from "lucide-react";
import type { HubId, SectionId } from "./types";

export type MenuHub = {
  id: HubId;
  label: string;
  suffix?: string;
  icon: LucideIcon;
  sections: SectionId[];
  menuGroup: "comida" | "barra";
};

export const SECTION_LABELS: Record<SectionId, string> = {
  promos: "Promos",
  tablas: "Tablas",
  tacos: "Tacos",
  wraps: "Wraps",
  quesadillas: "Quesadillas",
  nachos: "Nachos",
  porciones: "Porciones",
  papasFritas: "Papas fritas",
  completos: "Completos",
  hamburguesas: "Hamburguesas",
  pizzas: "Pizzas",
  fondos: "Fondos",
  sandwiches: "Sandwiches",
  coctelSpritz: "Spritz",
  coctelGin: "Gin",
  coctelInternacional: "Internacional",
  tragosCasa: "Tragos de la casa",
  destilados: "Destilados",
  jarrasVerano: "Jarras de verano",
  fentimans: "Fentimans",
  cafeteria: "Cafetería",
  schopCerveza: "Schop",
  cervezaBotella: "Cerveza",
  sinAlcohol: "Sin alcohol",
};

export const MENU_HUBS: MenuHub[] = [
  {
    id: "promos",
    label: "PROMOS",
    suffix: "Happy Hour 2×1",
    icon: Sparkles,
    sections: ["promos"],
    menuGroup: "barra",
  },
  {
    id: "paraPicar",
    label: "PARA PICAR",
    suffix: "Tablas · Porciones · Nachos",
    icon: HandPlatter,
    sections: ["tablas", "porciones", "nachos"],
    menuGroup: "comida",
  },
  {
    id: "mexicano",
    label: "MEXICANO",
    suffix: "Tacos · Wraps · Quesadillas",
    icon: Citrus,
    sections: ["tacos", "wraps", "quesadillas"],
    menuGroup: "comida",
  },
  {
    id: "papasFritas",
    label: "PAPAS FRITAS",
    suffix: "Cargadas · Para peques",
    icon: Flame,
    sections: ["papasFritas"],
    menuGroup: "comida",
  },
  {
    id: "panYClasicos",
    label: "PAN Y CLÁSICOS",
    suffix: "Completos · Hamburguesas · Sandwiches",
    icon: Sandwich,
    sections: ["completos", "hamburguesas", "sandwiches"],
    menuGroup: "comida",
  },
  {
    id: "platosFuertes",
    label: "PLATOS FUERTES",
    suffix: "Pizzas · Fondos",
    icon: ChefHat,
    sections: ["pizzas", "fondos"],
    menuGroup: "comida",
  },
  {
    id: "bebestibles",
    label: "BEBESTIBLES",
    suffix: "Jarras · Fentimans · Cafetería · Schop · Cerveza · Sin alcohol",
    icon: CupSoda,
    sections: [
      "jarrasVerano",
      "fentimans",
      "cafeteria",
      "schopCerveza",
      "cervezaBotella",
      "sinAlcohol",
    ],
    menuGroup: "barra",
  },
  {
    id: "cocteleria",
    label: "COCTELERÍA",
    suffix: "Spritz · Gin · Internacional · Casa",
    icon: Martini,
    sections: [
      "coctelSpritz",
      "coctelGin",
      "coctelInternacional",
      "tragosCasa",
    ],
    menuGroup: "barra",
  },
  {
    id: "barra",
    label: "BARRA",
    suffix: "Destilados",
    icon: Wine,
    sections: ["destilados"],
    menuGroup: "barra",
  },
];

export function getHubById(hubId: HubId): MenuHub {
  const hub = MENU_HUBS.find((item) => item.id === hubId);
  if (!hub) return MENU_HUBS[0];
  return hub;
}

export function getHubForSection(sectionId: SectionId): MenuHub {
  const hub = MENU_HUBS.find((item) => item.sections.includes(sectionId));
  if (!hub) return MENU_HUBS[0];
  return hub;
}

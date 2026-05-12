/**
 * Copia de referencia de la carta plana (15 categorías de primer nivel)
 * antes de agrupar en hubs. No usar en la UI: sirve para comparar o revertir.
 */
import type { SectionId } from "./types";
import {
  FONDOS_ACOMPANAMIENTOS,
  PAPAS_FRITAS_PEQUES,
  PRODUCTS_BY_SECTION,
  SECTION_INTROS,
} from "./products";

export const SNAPSHOT_CAPTURED_AT = "2026-05-11";

export const FLAT_CATEGORY_NAV: { id: SectionId; label: string }[] = [
  { id: "promos", label: "PROMOS" },
  { id: "tablas", label: "TABLAS" },
  { id: "tacos", label: "TACOS" },
  { id: "wraps", label: "WRAPS" },
  { id: "quesadillas", label: "QUESADILLAS" },
  { id: "nachos", label: "NACHOS" },
  { id: "porciones", label: "PORCIONES" },
  { id: "papasFritas", label: "PAPAS FRITAS" },
  { id: "completos", label: "COMPLETOS" },
  { id: "hamburguesas", label: "HAMBURGUESAS" },
  { id: "pizzas", label: "PIZZAS" },
  { id: "fondos", label: "FONDOS" },
  { id: "sandwiches", label: "SANDWICHES" },
  { id: "coctelSpritz", label: "SPRITZ" },
  { id: "coctelGin", label: "GIN" },
  { id: "coctelInternacional", label: "INTERNACIONAL" },
  { id: "tragosCasa", label: "TRAGOS DE LA CASA" },
  { id: "destilados", label: "DESTILADOS" },
];

export const FLAT_PRODUCTS_BY_SECTION = PRODUCTS_BY_SECTION;
export const FLAT_SECTION_INTROS = SECTION_INTROS;
export const FLAT_PAPAS_FRITAS_PEQUES = PAPAS_FRITAS_PEQUES;
export const FLAT_FONDOS_ACOMPANAMIENTOS = FONDOS_ACOMPANAMIENTOS;

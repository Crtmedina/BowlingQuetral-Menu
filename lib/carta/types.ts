export type SectionId =
  | "promos"
  | "tablas"
  | "tacos"
  | "wraps"
  | "quesadillas"
  | "nachos"
  | "porciones"
  | "papasFritas"
  | "papasPeques"
  | "completos"
  | "hamburguesas"
  | "pizzas"
  | "fondos"
  | "sandwiches"
  | "coctelSpritz"
  | "coctelGin"
  | "coctelInternacional"
  | "tragosCasa"
  | "destilados"
  | "jarrasVerano"
  | "fentimans"
  | "cafeteria"
  | "schopCerveza"
  | "cervezaBotella"
  | "sinAlcohol";

export type HubId =
  | "promos"
  | "paraPicar"
  | "mexicano"
  | "papasFritas"
  | "panYClasicos"
  | "platosFuertes"
  | "bebestibles"
  | "cocteleria"
  | "barra";

export type CartaProduct = {
  /** Presente cuando el producto viene de MongoDB */
  id?: string;
  name: string;
  description: string;
  price: string;
  deal?: string;
  image: string;
  /** Badge 2×1 en el bloque Happy Hour cuando viene de la base de datos */
  happyHour2x1?: boolean;
};

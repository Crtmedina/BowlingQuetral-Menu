export type SectionId =
  | "promos"
  | "tablas"
  | "tacos"
  | "wraps"
  | "quesadillas"
  | "nachos"
  | "porciones"
  | "papasFritas"
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
  name: string;
  description: string;
  price: string;
  deal?: string;
  image: string;
};

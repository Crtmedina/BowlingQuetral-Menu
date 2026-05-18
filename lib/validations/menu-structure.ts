import { z } from "zod";

export const menuHubUpsertSchema = z.object({
  slug: z.string().trim().max(48).optional(),
  label: z.string().trim().min(1, "Indica el nombre del bloque."),
  suffix: z.string().trim().optional().default(""),
  menuGroup: z.enum(["comida", "barra"]),
  iconKey: z.string().trim().min(1).default("Sparkles"),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const menuHubDeleteSchema = z.object({
  slug: z.string().trim().min(1),
});

export const menuSectionUpsertSchema = z.object({
  slug: z.string().trim().max(48).optional(),
  label: z.string().trim().min(1, "Indica el nombre de la categoría."),
  hubSlug: z.string().trim().min(1, "Elige un bloque."),
  intro: z.string().trim().optional().default(""),
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const menuSectionDeleteSchema = z.object({
  slug: z.string().trim().min(1),
});

export const menuHubMoveSchema = z.object({
  slug: z.string().trim().min(1),
  direction: z.enum(["up", "down"]),
});

export const menuHubPromoSchema = z.object({
  slug: z.string().trim().min(1, "Indica el bloque."),
});

export const menuSectionMoveSchema = z.object({
  hubSlug: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  direction: z.enum(["up", "down"]),
});

/** `index` = posición 0-based en la lista ordenada (bloques o categorías del bloque). */
export const menuHubSetPositionSchema = z.object({
  slug: z.string().trim().min(1),
  index: z.coerce.number().int().min(0),
});

/** Reordenar solo entre bloques con “Destacado en carta”. */
export const menuHubSetFeaturedRankSchema = z.object({
  slug: z.string().trim().min(1),
  index: z.coerce.number().int().min(0),
});

export const menuHubFeaturedToggleSchema = z.object({
  slug: z.string().trim().min(1),
  isFeatured: z.boolean(),
});

export const menuSectionSetPositionSchema = z.object({
  hubSlug: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  index: z.coerce.number().int().min(0),
});

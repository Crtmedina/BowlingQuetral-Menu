import { z } from "zod";

const sectionIdSchema = z
  .string()
  .trim()
  .min(1, "Elige una categoría del menú en la que guardar el producto.");

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Escribe el nombre del producto."),
  description: z.string().trim().optional().default(""),
  price: z.string().trim().min(1, "Indica el precio, por ejemplo $6.500."),
  deal: z.string().trim().optional().default(""),
  imageUrl: z.string().trim().optional().default(""),
  sectionId: sectionIdSchema,
  order: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
  happyHour2x1: z.boolean().default(false),
  isNovelty: z.boolean().default(false),
  showOnHome: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const sectionIntroSchema = z.object({
  sectionId: sectionIdSchema,
  intro: z.string().trim().optional().default(""),
  active: z.boolean().default(true),
});

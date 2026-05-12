import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Nombre obligatorio").max(120),
  description: z.string().max(2000).optional().default(""),
  price: z.coerce.number().min(0),
  offerPrice: z.coerce.number().min(0).optional().nullable(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  stock: z.boolean().default(true),
  tags: z.array(z.string().max(40)).default([]),
  categoryId: z.string().min(1, "Elige una categoría"),
  order: z.coerce.number().int().default(0),
  showOnHome: z.boolean().default(false),
  isDailyOffer: z.boolean().default(false),
  isNovelty: z.boolean().default(false),
  happyHour2x1: z.boolean().default(false),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;

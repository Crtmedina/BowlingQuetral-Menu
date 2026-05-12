import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1).max(80),
  coverImage: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
});

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;

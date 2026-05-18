import { z } from "zod";

const timeSchema = z
  .string()
  .trim()
  .regex(/^\d{1,2}:\d{2}$/, "Usa formato HH:mm (ej. 18:00).");

export const happyHourSettingsSchema = z.object({
  label: z.string().trim().min(1, "Escribe un nombre para la promo.").max(80),
  enabled: z.boolean(),
  daysOfWeek: z
    .array(z.coerce.number().int().min(0).max(6))
    .min(1, "Selecciona al menos un día."),
  startTime: timeSchema,
  endTime: timeSchema,
  promoDescription: z.string().trim().max(600).optional().default(""),
  applicableProductIds: z.array(z.string().trim().min(1)).optional().default([]),
});

export type HappyHourSettingsInput = z.infer<typeof happyHourSettingsSchema>;

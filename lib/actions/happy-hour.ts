"use server";

import { revalidateAfterAdminMutation } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/auth/guard";
import type { HappyHourScheduleDTO } from "@/lib/menu/happy-hour-schedule";
import { happyHourSettingsSchema } from "@/lib/validations/happy-hour";
import HappyHourSettingsModel from "@/models/HappyHourSettings";

type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

function requireDatabase(): ActionResult {
  if (!process.env.MONGODB_URI) {
    return {
      ok: false,
      error: "Falta configurar MONGODB_URI en .env.local para guardar cambios.",
    };
  }
  return { ok: true };
}

export async function saveHappyHourSettingsAction(
  input: unknown
): Promise<ActionResult<HappyHourScheduleDTO>> {
  const auth = await requireAdminSession();
  if (auth) return auth;
  const dbCheck = requireDatabase();
  if (!dbCheck.ok) return dbCheck;

  const parsed = happyHourSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa el formulario." };
  }

  const payload = parsed.data;
  const days = Array.from(new Set(payload.daysOfWeek)).sort((a, b) => a - b);

  try {
    await connectDB();
    const doc = await HappyHourSettingsModel.findOneAndUpdate(
      {},
      {
        label: payload.label,
        enabled: payload.enabled,
        daysOfWeek: days,
        startTime: payload.startTime,
        endTime: payload.endTime,
        promoDescription: payload.promoDescription,
        applicableProductIds: payload.applicableProductIds,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    revalidateAfterAdminMutation();

    return {
      ok: true,
      data: {
        label: doc?.label ?? payload.label,
        enabled: doc?.enabled ?? payload.enabled,
        daysOfWeek: (doc?.daysOfWeek as number[] | undefined) ?? days,
        startTime: doc?.startTime ?? payload.startTime,
        endTime: doc?.endTime ?? payload.endTime,
        promoDescription: doc?.promoDescription ?? payload.promoDescription,
        applicableProductIds:
          (doc?.applicableProductIds as { toString(): string }[] | undefined)?.map((id) =>
            String(id)
          ) ?? payload.applicableProductIds,
      },
    };
  } catch {
    return { ok: false, error: "No se pudo guardar la configuración. Intenta de nuevo." };
  }
}

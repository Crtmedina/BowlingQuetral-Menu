import { unstable_cache } from "next/cache";
import { ADMIN_CACHE_TAGS } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import {
  DEFAULT_HAPPY_HOUR_SCHEDULE,
  type HappyHourScheduleDTO,
  toHappyHourCartaDTO,
  type HappyHourCartaDTO,
} from "@/lib/menu/happy-hour-schedule";
import HappyHourSettingsModel from "@/models/HappyHourSettings";

function mapDocToDto(doc: {
  label?: string;
  enabled?: boolean;
  daysOfWeek?: number[];
  startTime?: string;
  endTime?: string;
  promoDescription?: string;
  applicableProductIds?: { toString(): string }[];
}): HappyHourScheduleDTO {
  return {
    label: doc.label?.trim() || DEFAULT_HAPPY_HOUR_SCHEDULE.label,
    enabled: doc.enabled ?? DEFAULT_HAPPY_HOUR_SCHEDULE.enabled,
    daysOfWeek: Array.isArray(doc.daysOfWeek) && doc.daysOfWeek.length > 0
      ? Array.from(new Set(doc.daysOfWeek.filter((d) => d >= 0 && d <= 6))).sort((a, b) => a - b)
      : [...DEFAULT_HAPPY_HOUR_SCHEDULE.daysOfWeek],
    startTime: doc.startTime?.trim() || DEFAULT_HAPPY_HOUR_SCHEDULE.startTime,
    endTime: doc.endTime?.trim() || DEFAULT_HAPPY_HOUR_SCHEDULE.endTime,
    promoDescription:
      doc.promoDescription?.trim() || DEFAULT_HAPPY_HOUR_SCHEDULE.promoDescription,
    applicableProductIds: Array.isArray(doc.applicableProductIds)
      ? doc.applicableProductIds.map((id) => String(id))
      : [],
  };
}

async function fetchHappyHourSettings(): Promise<HappyHourScheduleDTO> {
  if (!process.env.MONGODB_URI) return { ...DEFAULT_HAPPY_HOUR_SCHEDULE };
  try {
    await connectDB();
    const doc = await HappyHourSettingsModel.findOne({}).sort({ updatedAt: -1 }).lean();
    if (!doc) return { ...DEFAULT_HAPPY_HOUR_SCHEDULE };
    return mapDocToDto(doc);
  } catch {
    return { ...DEFAULT_HAPPY_HOUR_SCHEDULE };
  }
}

const getHappyHourSettingsCached = unstable_cache(fetchHappyHourSettings, ["happy-hour-settings-v2"], {
  revalidate: 30,
  tags: [ADMIN_CACHE_TAGS.publicCarta],
});

export async function getHappyHourSettings(): Promise<HappyHourScheduleDTO> {
  return getHappyHourSettingsCached();
}

export async function getHappyHourForCarta(): Promise<HappyHourCartaDTO> {
  const settings = await getHappyHourSettings();
  return toHappyHourCartaDTO(settings);
}

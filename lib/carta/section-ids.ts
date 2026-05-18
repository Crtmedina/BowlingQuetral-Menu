import type { SectionId } from "./types";
import { SECTION_LABELS } from "./navigation";

export const SECTION_IDS = Object.keys(SECTION_LABELS) as SectionId[];

export function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId);
}

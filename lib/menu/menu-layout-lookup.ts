import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export function sectionLabel(layout: MenuLayoutHubDTO[], slug: string): string {
  for (const h of layout) {
    const hit = h.sections.find((s) => s.slug === slug);
    if (hit) return hit.label;
  }
  return slug;
}

export function hubLabelForSection(layout: MenuLayoutHubDTO[], sectionSlug: string): string {
  const hub = layout.find((h) => h.sections.some((s) => s.slug === sectionSlug));
  return hub?.label ?? "—";
}

export function allSectionSlugs(layout: MenuLayoutHubDTO[]): string[] {
  return layout.flatMap((h) => h.sections.map((s) => s.slug));
}

export function hubTitleForSlug(layout: MenuLayoutHubDTO[], hubSlug: string): string {
  return layout.find((h) => h.slug === hubSlug)?.label ?? hubSlug;
}

export function findHubForSection(
  layout: MenuLayoutHubDTO[],
  sectionSlug: string
): MenuLayoutHubDTO | undefined {
  return layout.find((h) => h.sections.some((s) => s.slug === sectionSlug));
}

import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

export function pickHub(layout: MenuLayoutHubDTO[], hubSlug: string): MenuLayoutHubDTO {
  return layout.find((h) => h.slug === hubSlug) ?? layout[0];
}

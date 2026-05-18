/**
 * DTOs y ordenación de bloques sin dependencias de Node/Mongoose.
 * Los componentes cliente deben importar solo desde este archivo, nunca desde `menu-layout.ts`.
 */

/** Categoría del menú (vitrina de productos) bajo un bloque; `slug` = sectionId en productos */
export type MenuLayoutSectionDTO = {
  slug: string;
  label: string;
  intro: string;
  active: boolean;
  order: number;
};

/** Bloque de la carta (ej. PARA PICAR); agrupa categorías (`sections`) */
export type MenuLayoutHubDTO = {
  slug: string;
  label: string;
  suffix: string;
  menuGroup: "comida" | "barra";
  iconKey: string;
  order: number;
  active: boolean;
  /** Bloque con plantilla visual Happy Hour (banner 2×1; solo uno en la carta). */
  isPromoHub: boolean;
  /** Aparece al inicio de la carta (antes que el resto) y con mayor énfasis. */
  isFeatured: boolean;
  /** Orden entre bloques destacados (ignorado si `isFeatured` es falso). */
  featuredOrder: number;
  sections: MenuLayoutSectionDTO[];
};

export type MenuGroup = MenuLayoutHubDTO["menuGroup"];

export const MENU_GROUPS: MenuGroup[] = ["comida", "barra"];

export function menuGroupLabel(group: MenuGroup): string {
  return group === "comida" ? "Comida" : "Barra";
}

function menuGroupRank(group: MenuGroup): number {
  return group === "comida" ? 0 : 1;
}

/** Orden en carta: destacados primero; luego comida y barra por separado (`order` / `featuredOrder`). */
export function compareHubsCartaOrder(
  a: Pick<MenuLayoutHubDTO, "slug" | "order" | "isFeatured" | "featuredOrder" | "menuGroup">,
  b: Pick<MenuLayoutHubDTO, "slug" | "order" | "isFeatured" | "featuredOrder" | "menuGroup">
): number {
  if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
  if (a.isFeatured) {
    return (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0) || a.slug.localeCompare(b.slug);
  }
  const groupCmp = menuGroupRank(a.menuGroup) - menuGroupRank(b.menuGroup);
  if (groupCmp !== 0) return groupCmp;
  return a.order - b.order || a.slug.localeCompare(b.slug);
}

/** Bloques destacados de un grupo (comida o barra), ordenados para la carta. */
export function sortFeaturedHubsInGroup(hubs: MenuLayoutHubDTO[], group: MenuGroup): MenuLayoutHubDTO[] {
  return hubs
    .filter((h) => h.isFeatured && h.menuGroup === group)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0) || a.slug.localeCompare(b.slug));
}

/** Bloques normales de un grupo (comida o barra), ordenados para la carta. */
export function sortNormalHubsInGroup(hubs: MenuLayoutHubDTO[], group: MenuGroup): MenuLayoutHubDTO[] {
  return hubs
    .filter((h) => !h.isFeatured && h.menuGroup === group)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function sortHubsForCarta(hubs: MenuLayoutHubDTO[]): MenuLayoutHubDTO[] {
  return [...hubs].sort(compareHubsCartaOrder);
}

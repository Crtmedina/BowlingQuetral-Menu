import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";

/** Handlers compartidos entre tabla escritorio y cards móvil. */
export type MenuStructureListHandlers = {
  connected: boolean;
  isPending: boolean;
  requestToggleHubFeatured: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  toggleHubActive: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  toggleSectionActive: (hubSlug: string, section: MenuLayoutSectionDTO, checked: boolean) => void;
  openPromoConfirm: (hub: MenuLayoutHubDTO) => void;
  applyHubFeaturedRank: (slug: string, oneBased: number) => void;
  applyHubPosition: (slug: string, oneBased: number) => void;
  applySectionPosition: (hubSlug: string, sectionSlug: string, oneBased: number) => void;
  openNewSection: (hubSlug: string) => void;
  openEditHub: (hub: MenuLayoutHubDTO) => void;
  openEditSection: (hubSlug: string, section: MenuLayoutSectionDTO) => void;
  removeHub: (slug: string) => void | Promise<void>;
  removeSection: (slug: string) => void | Promise<void>;
  toggleHubExpanded: (slug: string) => void;
};

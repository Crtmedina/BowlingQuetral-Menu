import { Badge } from "@/components/ui/badge";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

type MenuStructureHubBadgesProps = {
  hub: MenuLayoutHubDTO;
  sectionCount: number;
  showFeatured?: boolean;
  showHidden?: boolean;
};

export function MenuStructureHubBadges({
  hub,
  sectionCount,
  showFeatured = true,
  showHidden = true,
}: MenuStructureHubBadgesProps) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      <Badge variant="secondary" className="text-[0.65rem] font-normal">
        {sectionCount} cat.
      </Badge>
      <Badge variant="outline" className="text-[0.65rem] font-normal capitalize">
        {hub.menuGroup}
      </Badge>
      {showFeatured && hub.isFeatured ? (
        <Badge variant="outline" className="border-amber-500/40 text-[0.65rem] font-normal text-amber-900">
          Destacado
        </Badge>
      ) : null}
      {hub.isPromoHub ? (
        <Badge variant="outline" className="border-amber-500/40 text-[0.65rem] font-normal text-amber-900">
          2×1
        </Badge>
      ) : null}
      {showHidden && !hub.active ? (
        <Badge variant="secondary" className="text-[0.65rem] font-normal">
          Oculto
        </Badge>
      ) : null}
    </div>
  );
}

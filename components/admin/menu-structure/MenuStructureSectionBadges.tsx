import { Badge } from "@/components/ui/badge";
import type { MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";

type MenuStructureSectionBadgesProps = {
  section: MenuLayoutSectionDTO;
  productCount: number;
};

export function MenuStructureSectionBadges({ section, productCount }: MenuStructureSectionBadgesProps) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      <Badge variant="outline" className="text-[0.65rem] font-normal tabular-nums">
        {productCount} prod.
      </Badge>
      {!section.active ? (
        <Badge variant="secondary" className="text-[0.65rem] font-normal">
          Oculta
        </Badge>
      ) : productCount === 0 ? (
        <Badge variant="outline" className="border-amber-500/40 text-[0.65rem] font-normal text-amber-900">
          Sin productos
        </Badge>
      ) : null}
    </div>
  );
}

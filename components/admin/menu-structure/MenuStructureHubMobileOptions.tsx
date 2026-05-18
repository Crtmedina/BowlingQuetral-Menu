import { Switch } from "@/components/ui/switch";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

type MenuStructureHubMobileOptionsProps = {
  hub: MenuLayoutHubDTO;
  disabled: boolean;
  onToggleFeatured: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  onToggleActive: (hub: MenuLayoutHubDTO, checked: boolean) => void;
  onPromoSelect: (hub: MenuLayoutHubDTO) => void;
};

export function MenuStructureHubMobileOptions({
  hub,
  disabled,
  onToggleFeatured,
  onToggleActive,
  onPromoSelect,
}: MenuStructureHubMobileOptionsProps) {
  return (
    <details className="rounded-lg border border-border/80 bg-muted/25 text-sm">
      <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground">
        Opciones de carta
      </summary>
      <div className="grid grid-cols-3 gap-2 border-t border-border/60 p-2 text-center text-[0.65rem]">
        <label className="flex flex-col items-center gap-1.5">
          <span className="font-medium text-muted-foreground">Destacado</span>
          <input
            type="checkbox"
            className="accent-primary h-4 w-4"
            checked={hub.isFeatured}
            disabled={disabled}
            aria-label="Destacado en carta"
            onChange={(e) => void onToggleFeatured(hub, e.target.checked)}
          />
        </label>
        <label className="flex flex-col items-center gap-1.5">
          <span className="font-medium text-muted-foreground">Visible</span>
          <Switch
            checked={hub.active}
            disabled={disabled}
            onCheckedChange={(checked) => onToggleActive(hub, checked)}
            aria-label={hub.active ? "Ocultar bloque" : "Mostrar bloque"}
          />
        </label>
        <label className="flex flex-col items-center gap-1.5">
          <span className="font-medium text-muted-foreground">2×1 HH</span>
          <input
            type="radio"
            name="promo-hub-mobile"
            className="accent-primary h-4 w-4"
            checked={hub.isPromoHub}
            disabled={disabled}
            aria-label="Plantilla Happy Hour 2×1"
            onChange={() => onPromoSelect(hub)}
          />
        </label>
      </div>
    </details>
  );
}

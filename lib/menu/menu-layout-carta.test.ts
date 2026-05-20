import { describe, expect, it } from "vitest";
import { applyHappyHourVisibilityToCartaLayout } from "@/lib/menu/happy-hour";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

const hub = (slug: string, isPromoHub: boolean): MenuLayoutHubDTO => ({
  slug,
  label: slug,
  suffix: "",
  menuGroup: "barra",
  iconKey: "Sparkles",
  order: 0,
  active: true,
  isFeatured: false,
  featuredOrder: 0,
  isPromoHub,
  sections: [{ slug: `${slug}-s`, label: "S", intro: "", order: 0, active: true }],
});

describe("applyHappyHourVisibilityToCartaLayout", () => {
  const layout = [hub("barra", false), hub("promos", true)];

  it("oculta el bloque promo si está desactivado en el panel", () => {
    expect(applyHappyHourVisibilityToCartaLayout(layout, false)).toEqual([hub("barra", false)]);
  });

  it("muestra el bloque promo si está activado (aunque sea fuera de horario)", () => {
    expect(applyHappyHourVisibilityToCartaLayout(layout, true)).toHaveLength(2);
  });
});

import { describe, expect, it } from "vitest";
import {
  buildMenuStructureRows,
  matchesMenuStructureFilters,
} from "@/lib/menu/menu-structure-rows";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";

const hub = (slug: string, label: string): MenuLayoutHubDTO => ({
  slug,
  label,
  suffix: "",
  menuGroup: "comida",
  iconKey: "Sparkles",
  order: 0,
  active: true,
  isFeatured: false,
  featuredOrder: 0,
  isPromoHub: false,
  sections: [
    {
      slug: `${slug}-sec`,
      label: `${label} cat`,
      intro: "",
      order: 0,
      active: true,
    },
  ],
});

describe("buildMenuStructureRows", () => {
  it("includes sections when hub is expanded", () => {
    const layout = [hub("a", "Alpha")];
    const rows = buildMenuStructureRows(layout, new Set(["a"]));
    expect(rows).toHaveLength(2);
    expect(rows[0]?.kind).toBe("hub");
    expect(rows[1]?.kind).toBe("section");
  });
});

describe("matchesMenuStructureFilters", () => {
  it("filters by search on hub label", () => {
    const layout = [hub("a", "Cervezas"), hub("b", "Comida")];
    const rows = buildMenuStructureRows(layout, new Set(["a", "b"]));
    const hubRow = rows.find((r) => r.kind === "hub" && r.hub.slug === "a");
    expect(hubRow && matchesMenuStructureFilters(hubRow, "cerve", "all", "", "all")).toBe(true);
    const other = rows.find((r) => r.kind === "hub" && r.hub.slug === "b");
    expect(other && matchesMenuStructureFilters(other, "cerve", "all", "", "all")).toBe(false);
  });
});

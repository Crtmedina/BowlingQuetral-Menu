import { describe, expect, it } from "vitest";
import { filterAdminProducts } from "@/lib/admin/filter-products";
import type { AdminProduct } from "@/lib/queries/menu";

const product = (overrides: Partial<AdminProduct>): AdminProduct => ({
  id: "1",
  name: "Mojito",
  description: "Ron y menta",
  price: "$6.500",
  deal: "",
  imageUrl: "",
  sectionId: "promos",
  hubId: "promos",
  order: 0,
  active: true,
  happyHour2x1: true,
  isNovelty: false,
  showOnHome: false,
  ...overrides,
});

describe("filterAdminProducts", () => {
  const list = [
    product({ id: "1", name: "Mojito", active: true, hubId: "bar" }),
    product({ id: "2", name: "Pizza", active: false, hubId: "comida" }),
  ];

  it("filters by search text", () => {
    expect(filterAdminProducts(list, "", [], "mojito", "all")).toHaveLength(1);
  });

  it("filters by visibility", () => {
    expect(filterAdminProducts(list, "", [], "", "hidden")).toHaveLength(1);
    expect(filterAdminProducts(list, "", [], "", "active")).toHaveLength(1);
  });

  it("filters by hub", () => {
    expect(filterAdminProducts(list, "comida", [], "", "all")).toHaveLength(1);
  });
});

import { describe, expect, it } from "vitest";
import { filterHappyHourProducts } from "@/lib/menu/filter-happy-hour-products";
import type { CartaProduct } from "@/lib/carta/types";

const p = (overrides: Partial<CartaProduct> & { name: string }): CartaProduct => ({
  description: "",
  price: "$1",
  image: "/x.jpg",
  ...overrides,
});

describe("filterHappyHourProducts", () => {
  const list = [
    p({ id: "a", name: "Mojito", happyHour2x1: true }),
    p({ id: "b", name: "Cerveza", happyHour2x1: false }),
    p({ name: "Sin id", happyHour2x1: true }),
  ];

  it("filters by happyHour2x1 when no explicit ids", () => {
    const out = filterHappyHourProducts(list, []);
    expect(out.map((x) => x.name)).toEqual(["Mojito", "Sin id"]);
  });

  it("filters by explicit ids", () => {
    const out = filterHappyHourProducts(list, ["a"]);
    expect(out.map((x) => x.name)).toEqual(["Mojito"]);
  });
});

import { describe, expect, it } from "vitest";
import { isHappyHourCartaView } from "@/lib/carta/is-happy-hour-view";

describe("isHappyHourCartaView", () => {
  it("uses promo hub when set", () => {
    expect(isHappyHourCartaView("bar", "otros", "promos")).toBe(false);
    expect(isHappyHourCartaView("promos", "otros", "promos")).toBe(true);
  });

  it("falls back to legacy slugs", () => {
    expect(isHappyHourCartaView("promos", "promos", null)).toBe(true);
    expect(isHappyHourCartaView("comida", "promos", null)).toBe(true);
  });
});

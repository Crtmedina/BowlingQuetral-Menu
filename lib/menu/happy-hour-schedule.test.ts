import { describe, expect, it } from "vitest";
import {
  formatHappyHourScheduleLabel,
  getHappyHourPromoStatus,
  isHappyHourActive,
  parseTimeToMinutes,
} from "@/lib/menu/happy-hour-schedule";

describe("parseTimeToMinutes", () => {
  it("parses HH:mm", () => {
    expect(parseTimeToMinutes("18:00")).toBe(18 * 60);
    expect(parseTimeToMinutes("22:30")).toBe(22 * 60 + 30);
  });

  it("rejects invalid times", () => {
    expect(parseTimeToMinutes("25:00")).toBeNull();
    expect(parseTimeToMinutes("abc")).toBeNull();
  });
});

describe("formatHappyHourScheduleLabel", () => {
  it("formats consecutive weekdays", () => {
    expect(
      formatHappyHourScheduleLabel({ daysOfWeek: [1, 2, 3, 4], endTime: "22:00" })
    ).toBe("Lun–Jue hasta 22:00");
  });

  it("joins non-consecutive days", () => {
    expect(
      formatHappyHourScheduleLabel({ daysOfWeek: [1, 5], endTime: "21:00" })
    ).toBe("Lun y Vie hasta 21:00");
  });
});

describe("getHappyHourPromoStatus", () => {
  const base = {
    enabled: true,
    daysOfWeek: [1],
    startTime: "18:00",
    endTime: "22:00",
  };

  it("returns disabled when promo off", () => {
    expect(getHappyHourPromoStatus({ ...base, enabled: false }, new Date(), "UTC")).toBe(
      "disabled"
    );
  });
});

describe("isHappyHourActive", () => {
  const base = {
    enabled: true,
    daysOfWeek: [1],
    startTime: "18:00",
    endTime: "22:00",
  };

  it("is false when disabled", () => {
    expect(
      isHappyHourActive({ ...base, enabled: false }, new Date("2026-05-18T20:00:00Z"), "UTC")
    ).toBe(false);
  });

  it("is true inside window on configured day", () => {
    // 2026-05-18 is Monday (UTC); use UTC for predictable test
    expect(
      isHappyHourActive(base, new Date("2026-05-18T19:00:00Z"), "UTC")
    ).toBe(true);
  });
});

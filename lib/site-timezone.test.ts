import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_APP_TIMEZONE, getAppTimeZone } from "./site-timezone";

describe("getAppTimeZone", () => {
  const prev = process.env.APP_TIMEZONE;

  afterEach(() => {
    if (prev === undefined) delete process.env.APP_TIMEZONE;
    else process.env.APP_TIMEZONE = prev;
  });

  it("usa America/Santiago si no hay APP_TIMEZONE", () => {
    delete process.env.APP_TIMEZONE;
    expect(getAppTimeZone()).toBe(DEFAULT_APP_TIMEZONE);
  });

  it("usa APP_TIMEZONE cuando es IANA válida", () => {
    process.env.APP_TIMEZONE = "UTC";
    expect(getAppTimeZone()).toBe("UTC");
  });

  it("ignora valores inválidos como :UTC (reservado en Vercel)", () => {
    process.env.APP_TIMEZONE = ":UTC";
    expect(getAppTimeZone()).toBe(DEFAULT_APP_TIMEZONE);
  });
});

import { describe, expect, it } from "vite-plus/test";

import {
  isoToLocalDate,
  localDateToIso,
  parseIsoDate,
  toIsoDate,
  todayIsoDate,
} from "./event-date-picker.logic";

describe("event-date-picker.logic", () => {
  it("toIsoDate pads month and day", () => {
    expect(toIsoDate(2027, 2, 5)).toBe("2027-03-05");
  });

  it("parseIsoDate reads parts", () => {
    expect(parseIsoDate("2027-03-15")).toEqual({ year: 2027, monthIndex: 2, day: 15 });
    expect(parseIsoDate("bad")).toBeNull();
  });

  it("todayIsoDate matches local calendar day", () => {
    const now = new Date(2026, 10, 24);
    expect(todayIsoDate(now)).toBe("2026-11-24");
  });

  it("round-trips ISO through local Date", () => {
    const date = isoToLocalDate("2027-03-15");
    expect(date).toBeInstanceOf(Date);
    expect(localDateToIso(date!)).toBe("2027-03-15");
  });
});

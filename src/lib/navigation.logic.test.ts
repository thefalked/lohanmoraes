import { describe, expect, it } from "vite-plus/test";

import { hashFromHref, HEADER_SCROLL_OFFSET, shouldHandleHashNavigation } from "./navigation.logic";

describe("navigation.logic", () => {
  it("hashFromHref strips leading hash", () => {
    expect(hashFromHref("#contato")).toBe("contato");
    expect(hashFromHref("sobre")).toBe("sobre");
  });

  it("shouldHandleHashNavigation allows plain left click only", () => {
    expect(
      shouldHandleHashNavigation({
        button: 0,
        metaKey: false,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
      }),
    ).toBe(true);

    expect(
      shouldHandleHashNavigation({
        button: 0,
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
      }),
    ).toBe(false);
  });

  it("exports header offset constant", () => {
    expect(HEADER_SCROLL_OFFSET).toBe(72);
  });
});

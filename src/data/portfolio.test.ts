import { describe, expect, it } from "vite-plus/test";

import { showPackages, showQuoteUrl, whatsappUrl } from "./portfolio";

describe("portfolio", () => {
  it("whatsappUrl encodes message", () => {
    const url = whatsappUrl("Olá teste");
    expect(url).toContain("https://wa.me/5567996314355");
    expect(url).toContain(encodeURIComponent("Olá teste"));
  });

  it("showQuoteUrl includes package title", () => {
    const url = showQuoteUrl("Acústico");
    expect(url).toContain(encodeURIComponent("Acústico"));
  });

  it("defines five show packages", () => {
    expect(showPackages).toHaveLength(5);
    expect(showPackages.map((item) => item.id)).toEqual([
      "acustico",
      "banda-premium",
      "acustico-som",
      "semiacustico",
      "banda-completa",
    ]);
  });
});

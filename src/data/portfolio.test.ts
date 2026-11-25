import { describe, expect, it } from "vite-plus/test";

import {
  bookingMessage,
  bookingWhatsAppUrl,
  formatEventDatePtBr,
  proofCredits,
  showPackages,
  showQuoteUrl,
  videos,
  whatsappUrl,
} from "./portfolio";

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

  it("formatEventDatePtBr formats ISO dates", () => {
    expect(formatEventDatePtBr("2027-03-15")).toBe("15/03/2027");
  });

  it("bookingMessage includes package and date", () => {
    const message = bookingMessage({
      packageTitle: "Banda completa premium",
      eventDate: "2027-03-15",
    });
    expect(message).toContain("Pacote: Banda completa premium");
    expect(message).toContain("Data do evento: 15/03/2027");
  });

  it("bookingMessage marks unknown package", () => {
    const message = bookingMessage({ eventDate: "2027-03-15" });
    expect(message).toContain("Pacote: ainda não sei");
  });

  it("bookingWhatsAppUrl encodes booking fields", () => {
    const url = bookingWhatsAppUrl({
      packageTitle: "Acústico",
      eventDate: "2027-03-15",
    });
    expect(url).toContain(encodeURIComponent("Pacote: Acústico"));
    expect(url).toContain(encodeURIComponent("15/03/2027"));
  });

  it("defines five show packages in hire ladder order", () => {
    expect(showPackages).toHaveLength(5);
    expect(showPackages.map((item) => item.id)).toEqual([
      "acustico",
      "banda-premium",
      "acustico-som",
      "semiacustico",
      "banda-completa",
    ]);
    expect(showPackages.every((item) => item.forWhom.length > 0)).toBe(true);
  });

  it("defines videos and proof credits", () => {
    expect(videos.items.length).toBeGreaterThanOrEqual(5);
    expect(videos.featuredId).toBe("modao-ao-vivo");
    expect(proofCredits.length).toBeGreaterThanOrEqual(2);
  });
});

import { site } from "../../data/portfolio";

export const contactSectionContent = {
  headingLines: ["Contato", "Vamos conversar sobre seu evento"] as const,
  srHeading: "Contato",
  intro: (brand: string) => `Show, aula ou produção? Fale com a ${brand} pelo canal que preferir.`,
  whatsappLabel: "WhatsApp",
  instagramLabel: "Instagram",
} as const;

export const contactSectionBrand = site.brand;

import { site } from "../../data/portfolio";

export const contactSectionContent = {
  headingLines: ["Contato", "Vamos conversar sobre seu evento"] as const,
  srHeading: "Contato",
  intro: (brand: string) =>
    `Orçamentos de shows, aulas e produção: entre em contato com a ${brand} pelos canais abaixo.`,
  whatsappLabel: "WhatsApp",
  instagramLabel: "Instagram",
} as const;

export const contactSectionBrand = site.brand;

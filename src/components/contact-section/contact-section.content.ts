import { site } from "../../data/portfolio";

export const contactSectionContent = {
  headingLines: ["Contato", "Vamos fechar o show do seu evento"] as const,
  srHeading: "Contato",
  intro: (brand: string) =>
    `Conte a data e o formato. A ${brand} responde com o orçamento do show.`,
  whatsappLabel: "Contratar pelo WhatsApp",
  instagramLabel: "Instagram",
} as const;

export const contactSectionBrand = site.brand;

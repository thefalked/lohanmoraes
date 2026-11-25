import { site } from "../../data/portfolio";

export const contactSectionContent = {
  headingLines: ["Contato", "Peça o orçamento do show"] as const,
  srHeading: "Contato",
  intro: (brand: string) =>
    `Envie a data e o formato desejado. A ${brand} retorna com o orçamento completo.`,
  whatsappLabel: "Contratar pelo WhatsApp",
  instagramLabel: "Instagram",
} as const;

export const contactSectionBrand = site.brand;

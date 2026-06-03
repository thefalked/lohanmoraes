import { site } from "../../data/portfolio";

export const heroSectionContent = {
  ariaLabel: "Início",
  imageAlt: "Lohan Moraes ao vivo no palco",
  imageSrc: site.heroImage,
  imageWidth: 1920,
  imageHeight: 1080,
  scrollHint: "Role para explorar",
  taglineSuffix: (brand: string) =>
    `${site.tagline}. Shows para eventos e aulas de instrumentos com a equipe ${brand}.`,
} as const;

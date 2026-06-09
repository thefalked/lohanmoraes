import { contact, site, whatsappUrl } from "../../data/portfolio";

export const heroSectionContent = {
  ariaLabel: "Início",
  imageAlt: "Lohan Moraes ao vivo no palco",
  imageSrc: site.heroImage,
  imageWidth: 1920,
  imageHeight: 1080,
  scrollHint: "Role para entrar no show",
  ctaPrimaryLabel: "Pedir orçamento",
  ctaSecondaryLabel: "Ver formatos",
  ctaSecondaryHref: "#shows",
  whatsappHref: whatsappUrl(contact.whatsappMessage),
  tagline:
    "Do acústico intimista à banda completa com efeitos de palco. Shows para eventos e aulas de instrumentos.",
} as const;

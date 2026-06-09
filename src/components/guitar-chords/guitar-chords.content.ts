import { bio, contact, showPackages, site, teaching, whatsappUrl } from "../../data/portfolio";
import { contactSectionContent } from "../contact-section/contact-section.content";
import { showsSectionContent } from "../shows-section/shows-section.content";

export type GuitarChapterKind =
  | "intro"
  | "text"
  | "show-package"
  | "instruments"
  | "production"
  | "contact";

export type GuitarChapter = {
  id: string;
  navId?: string;
  title: string;
  subtitle?: string;
  body?: string;
  kind: GuitarChapterKind;
  showPackageIndex?: number;
  images: readonly { src: string; alt: string }[];
};

export const guitarChordsVisual = {
  fogColor: "#0a0a0a",
  accent: "#e022b7",
  accentSecondary: "#8a2be2",
  accentChroma: "#22d3ee",
} as const;

/** Unsplash — 3377×6002, black background */
export const guitarPhotoAsset = {
  path: "/photos/guitar-unsplash.jpg",
  alt: "Violão acústico",
  nativeWidth: 3377,
  nativeHeight: 6002,
  sceneHeight: 3,
  /** Guitar content bounds in source image (px → normalized) */
  contentTop: 701 / 6002,
  contentBottom: 5743 / 6002,
  /** Where the body sits between content top and bottom */
  bodyFocusRatio: 0.62,
} as const;

export const guitarChapters: GuitarChapter[] = [
  {
    id: "intro",
    title: site.name,
    subtitle: site.tagline,
    body: `${site.roles.join(" · ")} · ${site.brandLegal}`,
    kind: "intro",
    images: [{ src: site.heroImage, alt: "Lohan Moraes" }],
  },
  {
    id: "about-headline",
    navId: "sobre",
    title: "História",
    subtitle: bio.headline,
    kind: "text",
    images: [bio.photos[0]],
  },
  {
    id: "about-journey",
    title: "Trajetória & ensino",
    body: `${bio.paragraphs[0]}\n\n${bio.paragraphs[1]}`,
    kind: "text",
    images: [bio.photos[1]],
  },
  {
    id: "about-lmart",
    title: "LMart & produção",
    body: `${bio.paragraphs[2]}\n\n${bio.paragraphs[3]}`,
    kind: "text",
    images: [{ src: "/stage/FOTO-LOHAN-2.jpeg", alt: "Momento de palco" }],
  },
  {
    id: "shows-intro",
    navId: "shows",
    title: showsSectionContent.headingLines[0],
    subtitle: "Formatos do acústico intimista à banda completa.",
    kind: "text",
    images: [bio.photos[2]],
  },
  {
    id: "show-acustico",
    title: showPackages[0]?.title ?? "Acústico",
    kind: "show-package",
    showPackageIndex: 0,
    images: [{ src: "/stage/DSC09078.jpeg", alt: "Ambiente de show" }],
  },
  {
    id: "show-semiacustico",
    title: showPackages[2]?.title ?? "Semiacústico",
    kind: "show-package",
    showPackageIndex: 2,
    images: [{ src: "/stage/DSC09046.jpeg", alt: "Palco e luzes" }],
  },
  {
    id: "show-premium",
    title: showPackages[4]?.title ?? "Premium",
    kind: "show-package",
    showPackageIndex: 4,
    images: [{ src: "/stage/DSC09078.jpeg", alt: "Ambiente de show" }],
  },
  {
    id: "teaching",
    navId: "ensino",
    title: teaching.headline,
    subtitle: `${teaching.description} ${teaching.lessonsLabel}: ${teaching.instruments.join(", ")}.`,
    body: teaching.production.items.join("\n\n"),
    kind: "text",
    images: [bio.photos[0]],
  },
  {
    id: "contact",
    navId: "contato",
    title: contactSectionContent.headingLines[0],
    subtitle: contactSectionContent.intro(site.brand),
    kind: "contact",
    images: [{ src: "/stage/DSC09078.jpeg", alt: "Ambiente de show" }],
  },
];

export const guitarStoryContent = {
  scrollHint: "Role para percorrer o violão",
  showPackages,
  teaching,
  contact,
  whatsappUrl,
  contactWhatsAppLabel: contactSectionContent.whatsappLabel,
  quoteLabel: "Solicitar orçamento",
} as const;

export const guitarSectionLabels: Record<string, string> = {
  sobre: "Sobre",
  shows: "Shows",
  ensino: "Ensino",
  contato: "Contato",
};

export type ShowPackage = {
  id: string;
  title: string;
  duration: string;
  forWhom: string;
  highlights: string[];
  instruments: string[];
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type Award = {
  id: string;
  place: string;
  category: string;
  event: string;
  location: string;
  year: string;
  description: string;
  photo: { src: string; alt: string };
};

export type PortfolioVideo = {
  id: string;
  youtubeId: string;
  title: string;
};

export type ProofCredit = {
  id: string;
  label: string;
};

const WHATSAPP_NUMBER = "5567996314355";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatEventDatePtBr(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) {
    return isoDate;
  }
  return `${day}/${month}/${year}`;
}

export type BookingWhatsAppInput = {
  packageTitle?: string | null;
  eventDate: string;
};

export function bookingMessage({ packageTitle, eventDate }: BookingWhatsAppInput): string {
  const lines = ["Olá! Gostaria de solicitar orçamento de show com o Lohan Moraes."];
  if (packageTitle) {
    lines.push(`Pacote: ${packageTitle}.`);
  } else {
    lines.push("Pacote: ainda não sei.");
  }
  lines.push(`Data do evento: ${formatEventDatePtBr(eventDate)}.`);
  return lines.join("\n");
}

export function bookingWhatsAppUrl(input: BookingWhatsAppInput): string {
  return whatsappUrl(bookingMessage(input));
}

/** @deprecated Prefer bookingWhatsAppUrl with an event date */
export function showQuoteUrl(packageTitle: string): string {
  return whatsappUrl(
    `Olá! Gostaria de solicitar orçamento para o pacote "${packageTitle}" com o Lohan Moraes.`,
  );
}

export const site = {
  name: "Lohan Moraes",
  tagline: "Shows ao vivo",
  roles: ["Shows ao vivo"],
  heroImage: "/photos/hero-lohan.jpeg",
  logoImage: "/photos/lohan-logo.png",
  brand: "LMart",
  brandLegal: "LM Produções Artísticas",
} as const;

export const navItems: NavItem[] = [
  { id: "sobre", label: "Sobre", href: "#sobre" },
  { id: "ao-vivo", label: "Ao vivo", href: "#ao-vivo" },
  { id: "premios", label: "Prêmios", href: "#premios" },
  { id: "shows", label: "Shows", href: "#shows" },
  { id: "contato", label: "Contato", href: "#contato" },
];

export const proofCredits: ProofCredit[] = [
  { id: "canta-nova", label: "1º lugar Canta Nova 2026" },
  { id: "abertura-na", label: "Abertura · 67 anos de Nova Andradina" },
];

export const videos = {
  featuredId: "video-3",
  channelHref: "https://www.youtube.com/@lohanmoraes3378",
  items: [
    {
      id: "video-3",
      youtubeId: "UEH3kmobUXU",
      title: "Show ao vivo",
    },
    {
      id: "video-5",
      youtubeId: "srBOgTZPFvQ",
      title: "Palco ao vivo",
    },
    {
      id: "video-4",
      youtubeId: "fsniUKNxfw0",
      title: "Performance ao vivo",
    },
    {
      id: "modao-ao-vivo",
      youtubeId: "-4qCXka-Vxw",
      title: "100% modão ao vivo",
    },
    {
      id: "video-2",
      youtubeId: "LJUsBd0gpv0",
      title: "Apresentação ao vivo",
    },
  ] satisfies PortfolioVideo[],
} as const;

export const awards: Award[] = [
  {
    id: "canta-nova-2026",
    place: "1º lugar",
    category: "Sertanejo",
    event: "Canta Nova - Festival da Canção",
    location: "Nova Andradina/MS",
    year: "2026",
    description:
      "Após 12 anos, o Canta Nova voltou ao calendário cultural de Nova Andradina e Lohan conquistou o 1º lugar na categoria Sertanejo. Realizado pela Prefeitura Municipal, por meio da SEMEC e da FUNAC, em parceria com a Associação Rock do Vale, o festival reuniu talentos locais em duas noites de apresentações.",
    photo: {
      src: "/photos/lohan-canta-nova.jpeg",
      alt: "Lohan Moraes recebendo o 1º lugar na categoria Sertanejo no Canta Nova 2026",
    },
  },
];

export const bio = {
  headline: "Música ao vivo com alma e energia de palco",
  paragraphs: [
    "Cantor e instrumentista, Lohan Moraes sobe ao palco de casamentos, festas e eventos corporativos com a experiência de quem já entregou do acústico intimista à banda completa com efeitos de palco. Cada formato é desenhado para o seu público, com produção, som e montagem pensados para a noite.",
    "O foco deste site é contratar o show certo para o seu evento. Escolha o formato, envie a data e a LMart retorna com o orçamento completo.",
  ],
  photos: [
    {
      src: "/photos/lohan-performance.jpeg",
      alt: "Lohan Moraes cantando e tocando violão ao vivo",
    },
    {
      src: "/photos/lohan-1819.jpeg",
      alt: "Lohan Moraes cantando com microfone",
    },
    {
      src: "/photos/lohan-3864.jpeg",
      alt: "Lohan Moraes em retrato profissional",
    },
  ],
} as const;

export const showPackages: ShowPackage[] = [
  {
    id: "acustico",
    title: "Acústico intimista",
    duration: "2 horas",
    forWhom: "Eventos intimistas e recepções menores",
    highlights: ["Partes especiais com viola caipira", "Formato intimista para eventos menores"],
    instruments: ["Violão", "Sanfona"],
  },
  {
    id: "banda-premium",
    title: "Banda premium",
    duration: "2 horas",
    forWhom: "Grande festa com abertura pirotécnica e DJ",
    highlights: [
      "Abertura com show pirotécnico",
      "Efeitos especiais de palco",
      "+ 1 hora de show por DJ",
    ],
    instruments: ["Violão", "Sanfona", "Bateria", "Contrabaixo", "VS"],
  },
  {
    id: "acustico-som",
    title: "Acústico com som",
    duration: "2 horas",
    forWhom: "Até cerca de 90 convidados, com som incluso",
    highlights: ["Partes especiais com viola caipira", "Som e iluminação para até ~90 pessoas"],
    instruments: ["Violão", "Sanfona"],
  },
  {
    id: "semiacustico",
    title: "Semiacústico",
    duration: "2 horas",
    forWhom: "Festas que pedem mais energia de palco",
    highlights: ["Partes especiais com viola caipira", "Mais energia de palco"],
    instruments: ["Violão", "Sanfona", "Bateria"],
  },
  {
    id: "banda-completa",
    title: "Banda com efeitos",
    duration: "2 horas",
    forWhom: "Casamentos e festas com efeitos de palco",
    highlights: [
      "Partes com piano e viola caipira",
      "Efeitos: fumaça, gerbs, canhão de papel, micro mine",
      "Esquema de VS",
    ],
    instruments: ["Violão", "Sanfona", "Bateria", "Contrabaixo"],
  },
];

export const contact = {
  phone: "(67) 99631-4355",
  phoneHref: "tel:+5567996314355",
  email: "contato@lohanmoraes.com",
  emailHref: "mailto:contato@lohanmoraes.com",
  instagramHref: "https://www.instagram.com/lohanmoraescantor",
  whatsappMessage: "Olá! Gostaria de solicitar um orçamento de show com o Lohan Moraes.",
  notes: [
    "Resposta rápida com valores e deslocamento",
    "Deslocamento calculado pela distância do evento",
  ],
} as const;

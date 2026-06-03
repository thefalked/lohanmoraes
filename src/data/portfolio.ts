export type ShowPackage = {
  id: string;
  title: string;
  duration: string;
  highlights: string[];
  instruments: string[];
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

const WHATSAPP_NUMBER = "5567996314355";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: "Lohan Moraes",
  tagline: "Cantor & Professor",
  roles: ["Cantor", "Professor", "LMart"],
  heroImage: "/photos/hero-lohan.jpeg",
  logoImage: "/photos/lohan-logo.png",
  brand: "LMart",
  brandLegal: "LM Produções Artísticas",
} as const;

export const navItems: NavItem[] = [
  { id: "sobre", label: "Sobre", href: "#sobre" },
  { id: "shows", label: "Shows", href: "#shows" },
  { id: "ensino", label: "Ensino", href: "#ensino" },
  { id: "contato", label: "Contato", href: "#contato" },
];

export const bio = {
  headline: "Música ao vivo com alma e energia de palco",
  paragraphs: [
    "Lohan Moraes é cantor e instrumentista, com trajetória em apresentações para eventos, festas e encontros que pedem uma experiência musical marcante. Da proposta acústica intimista à banda completa com efeitos de palco, cada formato é pensado para o seu público.",
    "Além dos shows, Lohan dá aulas de violão, viola, bateria, guitarra, teclado e teoria musical, para quem está começando ou quer evoluir com método e prática.",
    "A LMart também cuida da produção musical de músicas, guias e materiais para DVD, com suporte audiovisual completo para seus projetos.",
    "Os shows são produzidos pela equipe LMart, com profissionais treinados para garantir som, montagem e uma noite inesquecível para o seu evento.",
  ],
  photos: [
    {
      src: "/photos/lohan-1819.jpeg",
      alt: "Lohan Moraes cantando com microfone",
    },
    {
      src: "/photos/lohan-3864.jpeg",
      alt: "Lohan Moraes em retrato profissional",
    },
    {
      src: "/photos/lohan-performance.jpeg",
      alt: "Lohan Moraes cantando e tocando violão ao vivo",
    },
  ],
} as const;

export const showPackages: ShowPackage[] = [
  {
    id: "acustico",
    title: "Acústico",
    duration: "2 horas",
    highlights: ["Partes especiais com viola caipira", "Formato intimista para eventos menores"],
    instruments: ["Violão", "Sanfona"],
  },
  {
    id: "acustico-som",
    title: "Acústico + locação de som",
    duration: "2 horas",
    highlights: ["Partes especiais com viola caipira", "Som e iluminação para até ~90 pessoas"],
    instruments: ["Violão", "Sanfona"],
  },
  {
    id: "semiacustico",
    title: "Semiacústico",
    duration: "2 horas",
    highlights: ["Partes especiais com viola caipira", "Mais energia de palco"],
    instruments: ["Violão", "Sanfona", "Bateria"],
  },
  {
    id: "banda-completa",
    title: "Banda completa",
    duration: "2 horas",
    highlights: [
      "Partes com piano e viola caipira",
      "Efeitos: fumaça, gerbs, canhão de papel, micro mine",
      "Esquema de VS",
    ],
    instruments: ["Violão", "Sanfona", "Bateria", "Contrabaixo"],
  },
  {
    id: "banda-premium",
    title: "Banda completa premium",
    duration: "2 horas",
    highlights: [
      "Abertura com show pirotécnico",
      "Efeitos especiais de palco",
      "+ 1 hora de show por DJ",
    ],
    instruments: ["Violão", "Sanfona", "Bateria", "Contrabaixo", "VS"],
  },
];

export const teaching = {
  headline: "Aprenda com quem vive a música",
  lessonsLabel: "Aulas de",
  description:
    "Aulas personalizadas do básico ao repertório para shows e eventos. (Não há aulas de canto.)",
  instruments: ["Violão", "Viola", "Bateria", "Guitarra", "Teclado", "Teoria musical"],
  production: {
    headline: "Produção & audiovisual",
    items: [
      "Produção musical de faixas, guias e conteúdo para DVD",
      "Produção audiovisual: gravação, edição e entrega de vídeos para seus projetos",
    ],
  },
} as const;

export const contact = {
  phone: "(67) 99631-4355",
  phoneHref: "tel:+5567996314355",
  email: "LMart.cantores@gmail.com",
  emailHref: "mailto:LMart.cantores@gmail.com",
  whatsappMessage: "Olá! Gostaria de solicitar um orçamento de show com o Lohan Moraes.",
  notes: [
    "Orçamentos e contratação de shows pelo contato deste site",
    "Deslocamento: valor por km, informado no orçamento",
  ],
} as const;

export function showQuoteUrl(packageTitle: string): string {
  return whatsappUrl(
    `Olá! Gostaria de solicitar orçamento para o pacote "${packageTitle}" com o Lohan Moraes.`,
  );
}

export type ThemePreset = {
  id: string;
  name: string;
  identity: string;
  heroIntro: string;
  heroDisplay: string;
  heroBlurb: string;
  heroImage: string;
  atmosphereImage: string;
  philosophyTexture: string;
  googleFontsHref: string;
  fonts: {
    sans: string;
    serif: string;
    mono: string;
  };
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceStrong: string;
    text: string;
    muted: string;
    border: string;
    dark: string;
  };
};

export const siteConfig = {
  brand: "SPOKO DOMEK",
  purpose:
    "Leśny domek wypoczynkowy w Mikaszówce dla osób, które chcą naprawdę zwolnić i odpocząć blisko natury.",
  cta: "Zarezerwuj pobyt",
  tagline: "Spokojny reset w sercu Puszczy Augustowskiej.",
  location: "Mikaszówka, ul. Wczasowa 7, gmina Płaska",
  phone: "780146021",
  email: "anetatrocki@wp.pl",
  mapUrl: "https://maps.app.goo.gl/GbxR7oXEjkW8NG5n9",
  minStay: "Minimum 4 doby",
  reservation: "Telefonicznie, z zaliczką i płatnością końcową na miejscu.",
  nav: [
    { href: "#atuty", label: "Atuty" },
    { href: "#filozofia", label: "Filozofia" },
    { href: "#pobyt", label: "Pobyt" },
    { href: "#kontakt", label: "Kontakt" },
  ],
  stats: [
    { label: "Goście", value: "do 8 osób" },
    { label: "Układ", value: "3 sypialnie + spanie na parterze" },
    { label: "Łóżka", value: "2 podwójne, 2 pojedyncze, kanapa" },
    { label: "Łazienki", value: "łazienka + toaleta na górze" },
  ],
  amenityPills: [
    "Kominek",
    "Taras",
    "Grill i ognisko",
    "Pełna kuchnia",
    "Parking",
    "Las, jeziora i szlaki",
  ],
  valueProps: [
    {
      title: "Prawdziwy odpoczynek",
      description:
        "Cisza, las i kameralna lokalizacja pozwalają zwolnić bez hałasu popularnych kurortów.",
      labels: ["Leśna cisza", "Kanał Augustowski", "Spokojny rytm"],
    },
    {
      title: "Komfortowy pobyt dla 8 osób",
      description:
        "Pełne wyposażenie, kominek i wygodny układ sprawiają, że domek działa przez cały pobyt, nie tylko na zdjęciach.",
      messages: [
        "Kominek gotowy na wieczorny reset.",
        "Pełna kuchnia pozwala gotować bez kompromisów.",
        "Taras i strefa grilla wydłużają dzień poza wnętrzem.",
        "Parking na miejscu ułatwia przyjazd rodzinie i znajomym.",
      ],
    },
    {
      title: "Blisko natury i aktywności",
      description:
        "Szlaki, jeziora, rower i kajak są na tyle blisko, że plan dnia można układać spontanicznie.",
      scheduleLabel: "Rytm pobliskich atrakcji",
      activeDays: [4, 5, 6],
    },
  ],
  philosophy: {
    neutral:
      "Większość miejsc noclegowych skupia się na szybkim obłożeniu i przypadkowych atrakcjach.",
    focus:
      "Tutaj priorytetem jest spokojny, naturalny rytm pobytu, w którym las, woda i kominek naprawdę wyhamowują tempo.",
    accent: "spokojny rytm",
  },
  protocol: [
    {
      step: "01",
      title: "Przyjazd bez pośpiechu",
      description:
        "Dojeżdżasz do Mikaszówki, zostawiasz auto na miejscu i od pierwszych minut wchodzisz w ciszę skraju lasu.",
      motif: "helix",
    },
    {
      step: "02",
      title: "Dzień dopasowany do natury",
      description:
        "Spacer, rower, kajak albo po prostu taras i kominek. Plan dnia powstaje z otoczenia, nie z presji.",
      motif: "scan",
    },
    {
      step: "03",
      title: "Wieczór, który domyka reset",
      description:
        "Grill, ognisko i spokojne wnętrze sprawiają, że wyjazd naprawdę daje oddech zamiast kolejnej listy bodźców.",
      motif: "wave",
    },
  ],
  staySection: {
    eyebrow: "Get Started",
    title: "Zarezerwuj pobyt, jeśli szukasz miejsca które naprawdę wycisza.",
    body:
      "Minimalny pobyt to 4 doby. Rezerwacja odbywa się telefonicznie, z zaliczką i płatnością końcową na miejscu. Najszybciej ustalisz termin bezpośrednio z właścicielką.",
  },
  footer: {
    legal: [
      { href: "/warunki-pobytu", label: "Warunki pobytu" },
      { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
    ],
  },
  theme: {
    id: "organic-tech",
    name: "Organic Tech",
    identity: "Forest editorial retreat",
    heroIntro: "Puszcza jest Twoim",
    heroDisplay: "Resetem.",
    heroBlurb:
      "SPOKO DOMEK łączy leśną ciszę, wygodę pobytu dla 8 osób i naturalny rytm Kanału Augustowskiego.",
    heroImage: "/photos/home-spring-001.jpg",
    atmosphereImage: "/photos/terrace-001.jpg",
    philosophyTexture:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600;1,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
    fonts: {
      sans: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
      serif: '"Cormorant Garamond", Georgia, serif',
      mono: '"IBM Plex Mono", "SF Mono", monospace',
    },
    colors: {
      primary: "#2E4036",
      accent: "#CC5833",
      background: "#F2F0E9",
      surface: "rgba(242, 240, 233, 0.72)",
      surfaceStrong: "#F7F4EE",
      text: "#1A1A1A",
      muted: "rgba(26, 26, 26, 0.66)",
      border: "rgba(26, 26, 26, 0.12)",
      dark: "#131714",
    },
  } satisfies ThemePreset,
};

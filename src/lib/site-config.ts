export type ThemePreset = {
  id: string;
  name: string;
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
  siteUrl: "https://spoko-domek.pl",
  purpose:
    "SPOKO DOMEK to domek na wynajem w Mikaszówce w gminie Płaska, blisko Kanału Augustowskiego i Puszczy Augustowskiej. Spokojny nocleg dla maksymalnie 8 osób, z kominkiem, tarasem i pełnym wyposażeniem.",
  tagline: "Domek w Mikaszówce blisko lasu, wody i Kanału Augustowskiego.",
  seoTitle:
    "SPOKO DOMEK - domek w Mikaszówce | nocleg przy Puszczy Augustowskiej",
  seoDescription:
    "Domek na wynajem w Mikaszówce, gmina Płaska. Do 8 osób, 3 sypialnie, kominek, taras, grill i pełna kuchnia. Blisko Kanału Augustowskiego, lasu i jezior.",
  cta: "Zapytaj o wolny termin",
  location: "Mikaszówka, ul. Wczasowa 7, gmina Płaska",
  region: "Puszcza Augustowska, Podlaskie, Polska",
  phone: "780146021",
  phoneDisplay: "+48 780 146 021",
  email: "anetatrocki@wp.pl",
  mapUrl: "https://maps.app.goo.gl/GbxR7oXEjkW8NG5n9",
  nav: [
    { href: "#dom", label: "Dom" },
    { href: "#weekend", label: "Pobyt" },
    { href: "#zdjecia", label: "Zdjęcia" },
    { href: "#kontakt", label: "Kontakt" },
  ],
  hero: {
    kicker: "SPOKO DOMEK / domek w Mikaszówce",
    title: "Domek na wynajem w Mikaszówce, blisko Puszczy Augustowskiej i Kanału Augustowskiego.",
    text:
      "To spokojny nocleg dla maksymalnie 8 osób. W środku czeka kominek i wygodny domowy klimat, a wokół masz las, jeziora, szlaki i dużo ciszy. Dobre miejsce na rodzinny wyjazd, weekend we dwoje albo odpoczynek z przyjaciółmi.",
    image: "/photos/home-spring-003.jpg",
  },
  stats: [
    "do 8 osób",
    "3 sypialnie",
    "pełna kuchnia",
    "minimum 4 doby",
  ],
  cards: [
    {
      title: "Na spokojny wieczór",
      text: "Kominek, ciepłe światło i wygodne wnętrze robią klimat bez wielkiego planowania.",
    },
    {
      title: "Na zwykłe, wygodne dni",
      text: "Kuchnia, parking, taras i dobre rozplanowanie domu sprawiają, że wszystko jest pod ręką.",
    },
    {
      title: "Na ruch albo totalny luz",
      text: "Możesz iść na spacer, rower, kajak albo zostać na miejscu z grillem i ogniskiem.",
    },
  ],
  sections: [
    {
      eyebrow: "W środku",
      title: "Jest po prostu wygodnie",
      text:
        "Domek w Mikaszówce ma 3 sypialnie, dodatkowe spanie na parterze, pełną kuchnię oraz łazienkę i osobną toaletę na górze. Jest wygodnie zarówno na dłuższy pobyt, jak i na krótki wypad.",
      image: "/photos/livingroom-003.jpg",
    },
    {
      eyebrow: "Wokół",
      title: "Okolica robi połowę roboty",
      text:
        "Las, jeziora, szlaki i Kanał Augustowski są blisko. Mikaszówka i gmina Płaska to dobra baza na spacer, rower, kajak i zwykły odpoczynek w sercu Puszczy Augustowskiej.",
      image: "/photos/home-spring-001.jpg",
    },
  ],
  gallery: [
    {
      src: "/photos/bedroom-2-001.jpg",
      alt: "Sypialnia w domku SPOKO DOMEK w Mikaszówce",
    },
    {
      src: "/photos/kitchen-003.jpg",
      alt: "Kuchnia w domku na wynajem SPOKO DOMEK",
    },
    {
      src: "/photos/toilet-001.jpg",
      alt: "Łazienka i toaleta w domku SPOKO DOMEK",
    },
    {
      src: "/photos/terrace-001.jpg",
      alt: "Taras przy domku SPOKO DOMEK w Mikaszówce",
    },
  ],
  booking: {
    title: "Rezerwacja jest prosta",
    text:
      "Dzwonisz, pytasz o termin, wpłacasz zaliczkę i gotowe. Reszta płatności odbywa się na miejscu. Można też napisać maila.",
    details: [
      "telefon: 780 146 021",
      "e-mail: anetatrocki@wp.pl",
      "minimum pobytu: 4 doby",
      "płatność: zaliczka + dopłata na miejscu",
    ],
  },
  footer: {
    legal: [
      { href: "/warunki-pobytu", label: "Warunki pobytu" },
      { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
    ],
  },
  seo: {
    keywords: [
      "domek Mikaszówka",
      "nocleg Mikaszówka",
      "domek Puszcza Augustowska",
      "nocleg Kanał Augustowski",
      "domek gmina Płaska",
      "domek na wynajem Podlaskie",
    ],
  },
  theme: {
    id: "midnight-luxe",
    name: "Midnight Luxe",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap",
    fonts: {
      sans: '"Inter", "Segoe UI", sans-serif',
      serif: '"Playfair Display", Georgia, serif',
      mono: '"JetBrains Mono", "SF Mono", monospace',
    },
    colors: {
      primary: "#0D0D12",
      accent: "#C9A84C",
      background: "#111216",
      surface: "rgba(24, 25, 31, 0.86)",
      surfaceStrong: "#191A1F",
      text: "#F7F3ED",
      muted: "rgba(247, 243, 237, 0.72)",
      border: "rgba(247, 243, 237, 0.12)",
      dark: "#090A0D",
    },
  } satisfies ThemePreset,
};

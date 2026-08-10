import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacja o przetwarzaniu danych kontaktowych podczas rezerwacji pobytu w SPOKO DOMEK w Mikaszówce.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/polityka-prywatnosci`,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: `${siteConfig.siteUrl}/polityka-prywatnosci`,
    siteName: siteConfig.brand,
    title: "Polityka prywatności | SPOKO DOMEK",
    description:
      "Informacja o przetwarzaniu danych kontaktowych podczas rezerwacji pobytu w SPOKO DOMEK w Mikaszówce.",
    images: [
      {
        url: siteConfig.hero.image,
        alt: `${siteConfig.brand} w Mikaszówce`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polityka prywatności | SPOKO DOMEK",
    description:
      "Informacja o przetwarzaniu danych kontaktowych podczas rezerwacji pobytu w SPOKO DOMEK w Mikaszówce.",
    images: [siteConfig.hero.image],
  },
};

export default function PrivacyPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Polityka prywatności",
    description:
      "Informacja o przetwarzaniu danych kontaktowych podczas rezerwacji pobytu w SPOKO DOMEK w Mikaszówce.",
    url: `${siteConfig.siteUrl}/polityka-prywatnosci`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.brand,
      url: siteConfig.siteUrl,
    },
    about: {
      "@type": "Thing",
      name: "Polityka prywatności",
      description: "Zasady przetwarzania danych osobowych",
    },
  };

  return (
    <>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <main className="legal-shell">
        <div className="legal-card">
          <p className="section-heading__eyebrow">Polityka prywatności</p>
          <h1>Informacja o przetwarzaniu danych kontaktowych</h1>
          <p>
            Dane przekazane podczas kontaktu telefonicznego lub mailowego są
            wykorzystywane wyłącznie w celu obsługi zapytania o pobyt i rezerwację w{" "}
            {siteConfig.brand}.
          </p>
          <p>
            Kontakt w sprawach dotyczących danych osobowych możliwy jest pod adresem{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> lub numerem{" "}
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>.
          </p>
          <p>
            Strona może technicznie przetwarzać dane niezbędne do jej działania i
            bezpieczeństwa hostingu. W sprawach związanych z danymi i ich aktualizacją
            najlepiej kontaktować się bezpośrednio z właścicielką obiektu.
          </p>
          <Link href="/">Wróć do strony głównej</Link>
        </div>
      </main>
    </>
  );
}

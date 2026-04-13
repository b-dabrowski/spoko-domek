import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Warunki pobytu",
  description:
    "Warunki rezerwacji i pobytu w SPOKO DOMEK w Mikaszówce: minimalna długość pobytu, zaliczka i zasady kontaktu.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/warunki-pobytu`,
  },
};

export default function TermsPage() {
  return (
    <main className="legal-shell">
      <div className="legal-card">
        <p className="section-heading__eyebrow">Warunki pobytu</p>
        <h1>Podstawowe zasady rezerwacji i pobytu</h1>
        <p>
          Rezerwacja pobytu w {siteConfig.brand} odbywa się telefonicznie pod numerem{" "}
          <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>. Minimalna długość
          pobytu wynosi 4 doby.
        </p>
        <p>
          Potwierdzenie rezerwacji następuje po ustaleniu terminu i wpłacie zaliczki.
          Pozostała płatność realizowana jest na miejscu, zgodnie z ustaleniami
          dokonanymi podczas rezerwacji.
        </p>
        <p>
          Szczegóły dotyczące przyjazdu, godzin zameldowania oraz dodatkowych ustaleń
          organizacyjnych są przekazywane bezpośrednio podczas kontaktu telefonicznego
          lub mailowego.
        </p>
        <Link href="/">Wróć do strony głównej</Link>
      </div>
    </main>
  );
}

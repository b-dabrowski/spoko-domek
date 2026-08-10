import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";
import { canonical, telHref } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Warunki pobytu",
  description:
    "Warunki rezerwacji i pobytu w SPOKO DOMEK w Mikaszówce: minimalna długość pobytu, zaliczka i zasady kontaktu.",
  ...canonical("/warunki-pobytu"),
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Warunki pobytu"
      title="Podstawowe zasady rezerwacji i pobytu"
    >
      <p>
        Rezerwacja pobytu w {siteConfig.brand} odbywa się telefonicznie pod numerem{" "}
        <a href={telHref}>{siteConfig.phone}</a>. Minimalna długość pobytu wynosi{" "}
        {siteConfig.minStayNights} doby.
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
    </LegalPage>
  );
}

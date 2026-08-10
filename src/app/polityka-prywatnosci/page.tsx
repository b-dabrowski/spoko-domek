import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";
import { canonical, mailtoHref, telHref } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacja o przetwarzaniu danych kontaktowych podczas rezerwacji pobytu w SPOKO DOMEK w Mikaszówce.",
  ...canonical("/polityka-prywatnosci"),
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Polityka prywatności"
      title="Informacja o przetwarzaniu danych kontaktowych"
    >
      <p>
        Dane przekazane podczas kontaktu telefonicznego lub mailowego są
        wykorzystywane wyłącznie w celu obsługi zapytania o pobyt i rezerwację w{" "}
        {siteConfig.brand}.
      </p>
      <p>
        Kontakt w sprawach dotyczących danych osobowych możliwy jest pod adresem{" "}
        <a href={mailtoHref}>{siteConfig.email}</a> lub numerem{" "}
        <a href={telHref}>{siteConfig.phone}</a>.
      </p>
      <p>
        Strona może technicznie przetwarzać dane niezbędne do jej działania i
        bezpieczeństwa hostingu. W sprawach związanych z danymi i ich aktualizacją
        najlepiej kontaktować się bezpośrednio z właścicielką obiektu.
      </p>
    </LegalPage>
  );
}

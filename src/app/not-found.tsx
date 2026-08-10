import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  description: "Ta podstrona nie istnieje.",
};

export default function NotFound() {
  return (
    <main className="legal-shell">
      <div className="legal-card">
        <p className="section-heading__eyebrow">404</p>
        <h1>Nie znaleziono strony</h1>
        <p>
          Ta podstrona nie istnieje lub została przeniesiona. W sprawie terminów zadzwoń
          pod numer <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>.
        </p>
        <Link href="/">Wróć do strony głównej</Link>
      </div>
    </main>
  );
}

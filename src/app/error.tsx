"use client";

import Link from "next/link";
import { useEffect } from "react";
import { reportError } from "@/lib/report-error";
import { siteConfig } from "@/lib/site-config";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    reportError("route error boundary", error);
  }, [error]);

  return (
    <main className="legal-shell">
      <div className="legal-card">
        <p className="section-heading__eyebrow">Coś poszło nie tak</p>
        <h1>Nie udało się wyświetlić tej strony</h1>
        <p>
          Spróbuj ponownie za chwilę. Jeśli problem się powtarza, zadzwoń pod numer{" "}
          <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a> lub napisz na{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
        {error.digest ? <p>Identyfikator błędu: {error.digest}</p> : null}
        <button
          type="button"
          className="midnight-button midnight-button--accent"
          onClick={() => unstable_retry()}
        >
          Spróbuj ponownie
        </button>
        <Link href="/">Wróć do strony głównej</Link>
      </div>
    </main>
  );
}

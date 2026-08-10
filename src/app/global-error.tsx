"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";
import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    reportError("global error boundary", error);
  }, [error]);

  return (
    <html lang="pl">
      <body>
        <main className="legal-shell">
          <div className="legal-card">
            <h1>Strona jest chwilowo niedostępna</h1>
            <p>
              Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę za
              chwilę.
            </p>
            {error.digest ? <p>Identyfikator błędu: {error.digest}</p> : null}
            <button
              type="button"
              className="midnight-button midnight-button--accent"
              onClick={() => unstable_retry()}
            >
              Spróbuj ponownie
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, children }: LegalPageProps) {
  return (
    <main className="legal-shell">
      <div className="legal-card">
        <p className="midnight-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
        <Link href="/">Wróć do strony głównej</Link>
      </div>
    </main>
  );
}

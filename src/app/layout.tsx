import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPOKO DOMEK",
  description:
    "Baza projektu strony domku wypoczynkowego SPOKO DOMEK w Mikaszowce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

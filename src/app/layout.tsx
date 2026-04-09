import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.brand} | ${siteConfig.tagline}`,
  description: siteConfig.purpose,
  metadataBase: new URL("https://spoko-domek.vercel.app"),
  openGraph: {
    title: `${siteConfig.brand} | ${siteConfig.tagline}`,
    description: siteConfig.purpose,
    images: [siteConfig.hero.image],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = siteConfig;

  return (
    <html lang="pl" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={siteConfig.theme.googleFontsHref} rel="stylesheet" />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={
          {
            "--color-primary": theme.colors.primary,
            "--color-accent": theme.colors.accent,
            "--color-background": theme.colors.background,
            "--color-surface": theme.colors.surface,
            "--color-surface-strong": theme.colors.surfaceStrong,
            "--color-text": theme.colors.text,
            "--color-muted": theme.colors.muted,
            "--color-border": theme.colors.border,
            "--color-dark": theme.colors.dark,
            "--font-display": theme.fonts.serif,
            "--font-sans-custom": theme.fonts.sans,
            "--font-mono-custom": theme.fonts.mono,
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}

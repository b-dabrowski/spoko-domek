import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import RootLayout, { metadata } from "@/app/layout";
import { siteConfig } from "@/lib/site-config";

type ElementWithChildren = ReactElement<{
  children?: unknown;
  style?: Record<string, string>;
  lang?: string;
}>;

const renderLayoutTree = () => {
  const html = RootLayout({
    children: <main data-testid="page" />,
  }) as ElementWithChildren;
  const [head, body] = html.props.children as [
    ElementWithChildren,
    ElementWithChildren,
  ];

  return { html, head, body };
};

describe("root metadata", () => {
  it("resolves relative urls against the site url", () => {
    expect(metadata.metadataBase?.toString()).toBe(`${siteConfig.siteUrl}/`);
    expect(metadata.alternates?.canonical).toBe(siteConfig.siteUrl);
  });

  it("suffixes sub page titles with the brand", () => {
    const title = metadata.title as { default: string; template: string };

    expect(title.default).toBe(siteConfig.seoTitle);
    expect(title.template).toBe(`%s | ${siteConfig.brand}`);
  });

  it("shares the same copy across open graph and twitter cards", () => {
    expect(metadata.openGraph?.title).toBe(siteConfig.seoTitle);
    expect(metadata.openGraph?.description).toBe(siteConfig.seoDescription);
    expect(metadata.twitter?.title).toBe(siteConfig.seoTitle);
    expect(metadata.twitter?.description).toBe(siteConfig.seoDescription);
  });

  it("uses the hero image as the social preview", () => {
    const openGraphImages = metadata.openGraph?.images as { url: string }[];

    expect(openGraphImages[0].url).toBe(siteConfig.hero.image);
    expect(metadata.twitter?.images).toEqual([siteConfig.hero.image]);
  });

  it("declares polish locale and the configured keywords", () => {
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      locale: "pl_PL",
      url: siteConfig.siteUrl,
      siteName: siteConfig.brand,
    });
    expect(metadata.keywords).toEqual(siteConfig.seo.keywords);
  });
});

describe("root layout tree", () => {
  it("declares polish as the document language", () => {
    expect(renderLayoutTree().html.props.lang).toBe("pl");
  });

  it("preconnects to the font hosts and loads the theme stylesheet", () => {
    const { head } = renderLayoutTree();
    const links = head.props.children as ReactElement<{
      rel: string;
      href: string;
    }>[];

    expect(links.map((link) => link.props.href)).toEqual([
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      siteConfig.theme.googleFontsHref,
    ]);
    expect(links.at(-1)?.props.rel).toBe("stylesheet");
  });

  it("exposes every theme color as a css custom property", () => {
    const style = renderLayoutTree().body.props.style ?? {};

    expect(style["--color-primary"]).toBe(siteConfig.theme.colors.primary);
    expect(style["--color-accent"]).toBe(siteConfig.theme.colors.accent);
    expect(style["--color-surface-strong"]).toBe(
      siteConfig.theme.colors.surfaceStrong,
    );
    expect(
      Object.keys(style).filter((name) => name.startsWith("--color-")),
    ).toHaveLength(Object.keys(siteConfig.theme.colors).length);
  });

  it("exposes the theme fonts as css custom properties", () => {
    const style = renderLayoutTree().body.props.style ?? {};

    expect(style["--font-display"]).toBe(siteConfig.theme.fonts.serif);
    expect(style["--font-sans-custom"]).toBe(siteConfig.theme.fonts.sans);
    expect(style["--font-mono-custom"]).toBe(siteConfig.theme.fonts.mono);
  });

  it("renders the page content inside the body", () => {
    const { body } = renderLayoutTree();

    expect(body.props.children).toMatchObject({ props: { "data-testid": "page" } });
  });
});

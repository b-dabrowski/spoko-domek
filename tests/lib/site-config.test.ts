import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";

const publicDir = join(process.cwd(), "public");
const appDir = join(process.cwd(), "src", "app");

const collectImages = () => [
  siteConfig.hero.image,
  ...siteConfig.sections.map((section) => section.image),
  ...siteConfig.gallery.map((photo) => photo.src),
];

describe("siteConfig contact details", () => {
  it("exposes a site url without a trailing slash", () => {
    expect(siteConfig.siteUrl).toMatch(/^https:\/\//);
    expect(siteConfig.siteUrl.endsWith("/")).toBe(false);
  });

  it("keeps the dialable phone number digits-only", () => {
    expect(siteConfig.phone).toMatch(/^\d{9}$/);
  });

  it("keeps the displayed phone number consistent with the dialable one", () => {
    expect(siteConfig.phoneDisplay.replace(/\D/g, "")).toBe(`48${siteConfig.phone}`);
  });

  it("uses a valid email address", () => {
    expect(siteConfig.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("points the map link at Google Maps", () => {
    expect(siteConfig.mapUrl).toMatch(/^https:\/\/maps\.app\.goo\.gl\//);
  });
});

describe("siteConfig navigation", () => {
  it("uses unique in-page anchors", () => {
    const hrefs = siteConfig.nav.map((item) => item.href);

    expect(hrefs.every((href) => href.startsWith("#"))).toBe(true);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("labels every nav entry", () => {
    for (const item of siteConfig.nav) {
      expect(item.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("links legal pages to existing routes", () => {
    for (const item of siteConfig.footer.legal) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(existsSync(join(appDir, item.href, "page.tsx"))).toBe(true);
    }
  });
});

describe("siteConfig media", () => {
  it("references images that exist in the public directory", () => {
    for (const image of collectImages()) {
      expect(image.startsWith("/")).toBe(true);
      expect(existsSync(join(publicDir, image))).toBe(true);
    }
  });

  it("gives every gallery photo a unique source and a descriptive alt", () => {
    const sources = siteConfig.gallery.map((photo) => photo.src);

    expect(new Set(sources).size).toBe(sources.length);
    for (const photo of siteConfig.gallery) {
      expect(photo.alt.length).toBeGreaterThan(10);
    }
  });
});

describe("siteConfig seo copy", () => {
  it("keeps the seo title and description within search result limits", () => {
    expect(siteConfig.seoTitle.length).toBeLessThanOrEqual(70);
    expect(siteConfig.seoDescription.length).toBeGreaterThanOrEqual(70);
    expect(siteConfig.seoDescription.length).toBeLessThanOrEqual(200);
  });

  it("has unique, non-empty keywords", () => {
    const { keywords } = siteConfig.seo;

    expect(keywords.length).toBeGreaterThan(0);
    expect(new Set(keywords).size).toBe(keywords.length);
    expect(keywords.every((keyword) => keyword.trim() === keyword)).toBe(true);
  });

  it("mentions the location in the marketing copy", () => {
    expect(siteConfig.purpose).toContain("Mikaszówce");
    expect(siteConfig.tagline).toContain("Mikaszówce");
  });
});

describe("siteConfig content blocks", () => {
  it("uses unique titles for cards and sections", () => {
    const cardTitles = siteConfig.cards.map((card) => card.title);
    const sectionTitles = siteConfig.sections.map((section) => section.title);

    expect(new Set(cardTitles).size).toBe(cardTitles.length);
    expect(new Set(sectionTitles).size).toBe(sectionTitles.length);
  });

  it("uses unique stat entries", () => {
    expect(new Set(siteConfig.stats).size).toBe(siteConfig.stats.length);
  });

  it("repeats the phone number and email in the booking details", () => {
    const details = siteConfig.booking.details.join(" ");

    expect(details).toContain(siteConfig.email);
    expect(details.replace(/\s/g, "")).toContain(siteConfig.phone);
  });
});

describe("siteConfig theme", () => {
  it("defines every color as a hex or rgba value", () => {
    for (const value of Object.values(siteConfig.theme.colors)) {
      expect(value).toMatch(/^(#[0-9A-Fa-f]{6}|rgba\(.+\))$/);
    }
  });

  it("defines a font stack with a fallback for each family", () => {
    for (const stack of Object.values(siteConfig.theme.fonts)) {
      expect(stack.split(",").length).toBeGreaterThan(1);
    }
  });

  it("loads the theme fonts from Google Fonts with font-display swap", () => {
    expect(siteConfig.theme.googleFontsHref).toMatch(
      /^https:\/\/fonts\.googleapis\.com\/css2\?/,
    );
    expect(siteConfig.theme.googleFontsHref).toContain("display=swap");
  });
});

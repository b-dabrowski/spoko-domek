import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/lib/site-config";

describe("sitemap", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-02T03:04:05.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("lists the home page and both legal pages", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      siteConfig.siteUrl,
      `${siteConfig.siteUrl}/warunki-pobytu`,
      `${siteConfig.siteUrl}/polityka-prywatnosci`,
    ]);
  });

  it("gives the home page the highest priority", () => {
    const [home, ...rest] = sitemap();

    expect(home.priority).toBe(1);
    expect(rest.every((entry) => (entry.priority ?? 0) < 1)).toBe(true);
  });

  it("uses valid change frequencies", () => {
    expect(sitemap().map((entry) => entry.changeFrequency)).toEqual([
      "weekly",
      "monthly",
      "yearly",
    ]);
  });

  it("stamps every entry with the current date", () => {
    for (const entry of sitemap()) {
      expect(entry.lastModified).toEqual(new Date("2026-01-02T03:04:05.000Z"));
    }
  });

  it("covers every legal link exposed in the footer", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const item of siteConfig.footer.legal) {
      expect(urls).toContain(`${siteConfig.siteUrl}${item.href}`);
    }
  });
});

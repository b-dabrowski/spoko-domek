import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { siteConfig } from "@/lib/site-config";

describe("robots", () => {
  it("allows every crawler to index the whole site", () => {
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("advertises the canonical host and sitemap", () => {
    const result = robots();

    expect(result.host).toBe(siteConfig.siteUrl);
    expect(result.sitemap).toBe(`${siteConfig.siteUrl}/sitemap.xml`);
  });
});

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const pages = [
  {
    path: "",
    priority: 1,
    changeFrequency: "weekly" as const,
    lastModified: new Date("2024-04-01"),
  },
  {
    path: "/warunki-pobytu",
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: new Date("2024-03-28"),
  },
  {
    path: "/polityka-prywatnosci",
    priority: 0.4,
    changeFrequency: "yearly" as const,
    lastModified: new Date("2024-03-28"),
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteConfig.siteUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

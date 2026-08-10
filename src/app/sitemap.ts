import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-links";

const pages = [
  {
    path: "",
    priority: 1,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/warunki-pobytu",
    priority: 0.6,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/polityka-prywatnosci",
    priority: 0.4,
    changeFrequency: "yearly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

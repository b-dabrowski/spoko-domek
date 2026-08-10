import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function absoluteUrl(path = ""): string {
  return `${siteConfig.siteUrl}${path}`;
}

export function canonical(path = ""): Pick<Metadata, "alternates"> {
  return { alternates: { canonical: absoluteUrl(path) } };
}

export const telHref = `tel:${siteConfig.phone}`;
export const mailtoHref = `mailto:${siteConfig.email}`;

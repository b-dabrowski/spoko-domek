import Script from "next/script";
import type { Metadata } from "next";
import { SpokoLanding } from "@/components/spoko-landing";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, canonical } from "@/lib/site-links";

export const metadata: Metadata = {
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
  ...canonical(),
};

export default function Home() {
  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.brand,
    description: siteConfig.seoDescription,
    url: absoluteUrl(),
    image: [
      absoluteUrl(siteConfig.hero.image),
      absoluteUrl("/photos/home-spring-001.jpg"),
      absoluteUrl("/photos/livingroom-003.jpg"),
    ],
    telephone: `+48${siteConfig.phone}`,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Wczasowa 7",
      addressLocality: "Mikaszówka",
      addressRegion: "podlaskie",
      addressCountry: "PL",
    },
    areaServed: [
      "Mikaszówka",
      "gmina Płaska",
      "Puszcza Augustowska",
      "Kanał Augustowski",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Kominek", value: true },
      { "@type": "LocationFeatureSpecification", name: "Grill", value: true },
      { "@type": "LocationFeatureSpecification", name: "Taras", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "W pełni wyposażona kuchnia",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    ],
    numberOfRooms: 3,
    maximumAttendeeCapacity: 8,
    sameAs: [siteConfig.mapUrl],
  };

  return (
    <>
      <Script
        id="lodging-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lodgingSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SpokoLanding />
    </>
  );
}

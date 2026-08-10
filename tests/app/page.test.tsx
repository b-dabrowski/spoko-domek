import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home, { metadata } from "@/app/page";
import { siteConfig } from "@/lib/site-config";

vi.mock("next/script", () => ({
  default: ({
    id,
    dangerouslySetInnerHTML,
  }: {
    id: string;
    dangerouslySetInnerHTML: { __html: string };
  }) => (
    <script
      data-testid={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  ),
}));

vi.mock("@/components/spoko-landing", () => ({
  SpokoLanding: () => <div data-testid="spoko-landing" />,
}));

const renderSchema = () => {
  render(<Home />);

  return JSON.parse(
    screen.getByTestId("lodging-business-schema").textContent ?? "{}",
  );
};

describe("home page", () => {
  it("declares the page level metadata", () => {
    expect(metadata.title).toBe(siteConfig.seoTitle);
    expect(metadata.description).toBe(siteConfig.seoDescription);
    expect(metadata.alternates?.canonical).toBe(siteConfig.siteUrl);
  });

  it("renders the landing page", () => {
    render(<Home />);

    expect(screen.getByTestId("spoko-landing")).toBeInTheDocument();
  });

  it("emits a valid LodgingBusiness json-ld document", () => {
    const schema = renderSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LodgingBusiness");
    expect(schema.name).toBe(siteConfig.brand);
    expect(schema.url).toBe(siteConfig.siteUrl);
  });

  it("exposes contact details in an internationally dialable form", () => {
    const schema = renderSchema();

    expect(schema.telephone).toBe(`+48${siteConfig.phone}`);
    expect(schema.email).toBe(siteConfig.email);
    expect(schema.sameAs).toContain(siteConfig.mapUrl);
  });

  it("uses absolute image urls", () => {
    const schema = renderSchema();

    expect(schema.image.length).toBeGreaterThan(0);
    for (const image of schema.image as string[]) {
      expect(image.startsWith(`${siteConfig.siteUrl}/`)).toBe(true);
    }
    expect(schema.image).toContain(`${siteConfig.siteUrl}${siteConfig.hero.image}`);
  });

  it("matches the capacity advertised in the site copy", () => {
    const schema = renderSchema();

    expect(schema.numberOfRooms).toBe(3);
    expect(schema.maximumAttendeeCapacity).toBe(8);
    expect(siteConfig.stats).toContain("do 8 osób");
    expect(siteConfig.stats).toContain("3 sypialnie");
  });

  it("describes the address and the served area", () => {
    const schema = renderSchema();

    expect(schema.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: "Mikaszówka",
      addressCountry: "PL",
    });
    expect(siteConfig.location).toContain(schema.address.streetAddress);
    expect(schema.areaServed).toContain("Puszcza Augustowska");
  });

  it("lists amenities as available location features", () => {
    const schema = renderSchema();
    const amenities = schema.amenityFeature as {
      "@type": string;
      name: string;
      value: boolean;
    }[];

    expect(amenities.map((amenity) => amenity.name)).toContain("Kominek");
    for (const amenity of amenities) {
      expect(amenity["@type"]).toBe("LocationFeatureSpecification");
      expect(amenity.value).toBe(true);
    }
  });
});

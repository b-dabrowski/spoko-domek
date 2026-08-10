import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPage, {
  metadata as privacyMetadata,
} from "@/app/polityka-prywatnosci/page";
import TermsPage, { metadata as termsMetadata } from "@/app/warunki-pobytu/page";
import { siteConfig } from "@/lib/site-config";

describe("privacy page", () => {
  it("declares its canonical url and title", () => {
    expect(privacyMetadata.title).toBe("Polityka prywatności");
    expect(privacyMetadata.alternates?.canonical).toBe(
      `${siteConfig.siteUrl}/polityka-prywatnosci`,
    );
  });

  it("renders a single heading and the brand name", () => {
    render(<PrivacyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /przetwarzaniu danych/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(siteConfig.brand))).toBeInTheDocument();
  });

  it("offers both contact channels and a way back home", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("link", { name: siteConfig.email })).toHaveAttribute(
      "href",
      `mailto:${siteConfig.email}`,
    );
    expect(screen.getByRole("link", { name: siteConfig.phone })).toHaveAttribute(
      "href",
      `tel:${siteConfig.phone}`,
    );
    expect(
      screen.getByRole("link", { name: /wróć do strony głównej/i }),
    ).toHaveAttribute("href", "/");
  });
});

describe("terms page", () => {
  it("declares its canonical url and title", () => {
    expect(termsMetadata.title).toBe("Warunki pobytu");
    expect(termsMetadata.alternates?.canonical).toBe(
      `${siteConfig.siteUrl}/warunki-pobytu`,
    );
  });

  it("states the minimum stay and the booking phone number", () => {
    render(<TermsPage />);

    expect(screen.getByText(/minimalna długość/i).textContent).toContain("4 doby");
    expect(screen.getByRole("link", { name: siteConfig.phone })).toHaveAttribute(
      "href",
      `tel:${siteConfig.phone}`,
    );
  });

  it("links back to the landing page", () => {
    render(<TermsPage />);

    expect(
      screen.getByRole("link", { name: /wróć do strony głównej/i }),
    ).toHaveAttribute("href", "/");
  });
});

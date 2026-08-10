import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SpokoLanding } from "@/components/spoko-landing";
import { siteConfig } from "@/lib/site-config";

const telHref = `tel:${siteConfig.phone}`;

describe("SpokoLanding header", () => {
  it("renders the brand logo linking home", () => {
    render(<SpokoLanding />);

    const brandLink = screen.getByRole("link", { name: siteConfig.brand });

    expect(brandLink).toHaveAttribute("href", "/");
    expect(within(brandLink).getByRole("img")).toHaveAttribute(
      "alt",
      siteConfig.brand,
    );
  });

  it("renders every configured nav anchor", () => {
    render(<SpokoLanding />);

    const nav = screen.getByRole("navigation");

    for (const item of siteConfig.nav) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("anchors every nav target to an existing section", () => {
    const { container } = render(<SpokoLanding />);

    for (const item of siteConfig.nav.filter((entry) => entry.href !== "#kontakt")) {
      expect(container.querySelector(item.href)).not.toBeNull();
    }
  });
});

describe("SpokoLanding mobile menu", () => {
  it("stays closed until the menu button is pressed", () => {
    render(<SpokoLanding />);

    expect(screen.getAllByRole("link", { name: siteConfig.nav[0].label })).toHaveLength(
      1,
    );
  });

  it("opens and closes when toggling the menu button", async () => {
    const user = userEvent.setup();
    render(<SpokoLanding />);

    const toggle = screen.getByRole("button", { name: /pokaż menu/i });

    await user.click(toggle);
    expect(
      screen.getAllByRole("link", { name: siteConfig.nav[0].label }),
    ).toHaveLength(2);

    await user.click(toggle);
    expect(
      screen.getAllByRole("link", { name: siteConfig.nav[0].label }),
    ).toHaveLength(1);
  });

  it("closes itself after picking a destination", async () => {
    const user = userEvent.setup();
    render(<SpokoLanding />);

    await user.click(screen.getByRole("button", { name: /pokaż menu/i }));
    const [, mobileLink] = screen.getAllByRole("link", {
      name: siteConfig.nav[0].label,
    });
    await user.click(mobileLink);

    expect(
      screen.getAllByRole("link", { name: siteConfig.nav[0].label }),
    ).toHaveLength(1);
  });
});

describe("SpokoLanding content", () => {
  it("renders the hero copy with a single top level heading", () => {
    render(<SpokoLanding />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      siteConfig.hero.title,
    );
    expect(screen.getByText(siteConfig.hero.kicker)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.hero.text)).toBeInTheDocument();
  });

  it("renders the stats strip, cards and feature sections", () => {
    render(<SpokoLanding />);

    for (const stat of siteConfig.stats) {
      expect(screen.getByText(stat)).toBeInTheDocument();
    }
    for (const card of siteConfig.cards) {
      expect(screen.getByRole("heading", { name: card.title })).toBeInTheDocument();
      expect(screen.getByText(card.text)).toBeInTheDocument();
    }
    for (const section of siteConfig.sections) {
      expect(screen.getByRole("heading", { name: section.title })).toBeInTheDocument();
      expect(screen.getByText(section.text)).toBeInTheDocument();
    }
  });

  it("renders every gallery photo with its caption", () => {
    render(<SpokoLanding />);

    for (const photo of siteConfig.gallery) {
      expect(screen.getByRole("img", { name: photo.alt })).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(photo.src)),
      );
      expect(screen.getByText(photo.alt)).toBeInTheDocument();
    }
  });

  it("renders the booking block with its details", () => {
    render(<SpokoLanding />);

    expect(
      screen.getByRole("heading", { name: siteConfig.booking.title }),
    ).toBeInTheDocument();
    for (const detail of siteConfig.booking.details) {
      expect(screen.getByText(detail)).toBeInTheDocument();
    }
  });
});

describe("SpokoLanding conversion links", () => {
  it("points every call to action at the phone number", () => {
    render(<SpokoLanding />);

    const ctaLinks = screen.getAllByRole("link", {
      name: new RegExp(siteConfig.cta),
    });

    expect(ctaLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of ctaLinks) {
      expect(link).toHaveAttribute("href", telHref);
    }
  });

  it("opens external map links safely in a new tab", () => {
    render(<SpokoLanding />);

    const mapLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === siteConfig.mapUrl);

    expect(mapLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of mapLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    }
  });

  it("exposes phone, email and legal links in the footer", () => {
    render(<SpokoLanding />);

    expect(screen.getByRole("link", { name: siteConfig.phone })).toHaveAttribute(
      "href",
      telHref,
    );
    expect(screen.getByRole("link", { name: siteConfig.email })).toHaveAttribute(
      "href",
      `mailto:${siteConfig.email}`,
    );
    for (const item of siteConfig.footer.legal) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });
});

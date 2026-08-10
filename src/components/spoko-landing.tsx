"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { CoverImage, PhoneCta, SectionIntro } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";
import { mailtoHref, telHref } from "@/lib/site-links";

gsap.registerPlugin(ScrollTrigger);

export function SpokoLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-show]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.85,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="midnight-page">
      <header className="midnight-nav">
        <Link href="/" className="midnight-brand">
          <Image
            src="/brand/logo-black-white.png"
            alt={siteConfig.brand}
            width={140}
            height={52}
            className="brand-logo"
            priority
          />
        </Link>

        <nav className="midnight-nav__links">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <PhoneCta variant="ghost" />

        <button
          type="button"
          className="midnight-menu"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Pokaż menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {menuOpen ? (
        <div className="midnight-mobile-menu">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={telHref}>{siteConfig.cta}</a>
        </div>
      ) : null}

      <main className="midnight-main">
        <section className="midnight-hero">
          <div className="midnight-hero__image" data-show>
            <CoverImage
              src={siteConfig.hero.image}
              alt="Widok domku SPOKO DOMEK"
              sizes="100vw"
              priority
              eager
            />
          </div>

          <div className="midnight-hero__content">
            <p className="midnight-eyebrow" data-show>
              {siteConfig.hero.kicker}
            </p>
            <h1 data-show>{siteConfig.hero.title}</h1>
            <p className="midnight-hero__text" data-show>
              {siteConfig.hero.text}
            </p>
            <div className="midnight-hero__actions" data-show>
              <PhoneCta variant="accent" withIcon />
              <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
                Pokaż mapę
              </a>
            </div>
          </div>
        </section>

        <section id="dom" className="midnight-strip" data-show>
          {siteConfig.stats.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </section>

        <section id="weekend" className="midnight-section" data-panel>
          <SectionIntro
            eyebrow="Na co ten domek jest dobry"
            title="Nocleg w Mikaszówce dla osób, które chcą odpocząć blisko lasu, wody i spokojnej okolicy."
          />

          <div className="midnight-card-grid">
            {siteConfig.cards.map((card) => (
              <article key={card.title} className="midnight-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="midnight-section midnight-feature-grid">
          {siteConfig.sections.map((section) => (
            <article key={section.title} className="midnight-feature" data-panel>
              <div className="midnight-feature__copy">
                <p className="midnight-eyebrow">{section.eyebrow}</p>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
              <div className="midnight-feature__image">
                <CoverImage
                  src={section.image}
                  alt={section.title}
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </article>
          ))}
        </section>

        <section id="zdjecia" className="midnight-section" data-panel>
          <SectionIntro
            eyebrow="Kilka zdjęć"
            title="Zobacz, jak wygląda domek na wynajem w Mikaszówce i jego spokojne otoczenie."
          />

          <div className="midnight-gallery">
            {siteConfig.gallery.map((photo, index) => (
              <figure key={photo.src} className="midnight-gallery__item">
                <CoverImage
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 900px) 100vw, 25vw"
                  eager={index === 0}
                />
                <figcaption>{photo.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="kontakt" className="midnight-section" data-panel>
          <div className="midnight-booking">
            <div className="midnight-booking__copy">
              <p className="midnight-eyebrow">Kontakt</p>
              <h2>{siteConfig.booking.title}</h2>
              <p>{siteConfig.booking.text}</p>
              <PhoneCta variant="accent" withIcon />
            </div>
            <div className="midnight-booking__details">
              {siteConfig.booking.details.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="midnight-footer">
        <div>
          <p className="midnight-eyebrow">{siteConfig.brand}</p>
          <h2>{siteConfig.tagline}</h2>
        </div>

        <div className="midnight-footer__contact">
          <a href={telHref}>
            <Phone size={16} />
            {siteConfig.phone}
          </a>
          <a href={mailtoHref}>
            <Mail size={16} />
            {siteConfig.email}
          </a>
          <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={16} />
            {siteConfig.location}
          </a>
        </div>

        <div className="midnight-footer__bottom">
          <div>
            {siteConfig.footer.legal.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <p>Rezerwacja telefoniczna, zaliczka i płatność na miejscu.</p>
        </div>
      </footer>
    </div>
  );
}

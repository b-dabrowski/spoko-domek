"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

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

        <a href={`tel:${siteConfig.phone}`} className="midnight-button midnight-button--ghost">
          {siteConfig.cta}
        </a>

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
          <a href={`tel:${siteConfig.phone}`}>{siteConfig.cta}</a>
        </div>
      ) : null}

      <main className="midnight-main">
        <section className="midnight-hero">
          <div className="midnight-hero__image" data-show>
            <Image
              src={siteConfig.hero.image}
              alt="Salon z kominkiem w SPOKO DOMEK"
              fill
              priority
              sizes="100vw"
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
              <a href={`tel:${siteConfig.phone}`} className="midnight-button midnight-button--accent">
                {siteConfig.cta} <ArrowRight size={16} />
              </a>
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
          <div className="midnight-section__intro">
            <p className="midnight-eyebrow">Na co ten domek jest dobry</p>
            <h2>Na kilka prostych dni, które nie muszą być niczym więcej niż odpoczynkiem.</h2>
          </div>

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
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </article>
          ))}
        </section>

        <section id="zdjecia" className="midnight-section" data-panel>
          <div className="midnight-section__intro">
            <p className="midnight-eyebrow">Kilka zdjęć</p>
            <h2>Tu można odpocząć zarówno latem, jak i w chłodniejsze dni.</h2>
          </div>

          <div className="midnight-gallery">
            {siteConfig.gallery.map((photo) => (
              <figure key={photo.src} className="midnight-gallery__item">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                />
                <figcaption>{photo.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="kontakt" className="midnight-section" data-panel>
          <div className="midnight-booking">
            <div>
              <p className="midnight-eyebrow">Kontakt</p>
              <h2>{siteConfig.booking.title}</h2>
              <p>{siteConfig.booking.text}</p>
            </div>
            <div className="midnight-booking__details">
              {siteConfig.booking.details.map((item) => (
                <span key={item}>{item}</span>
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
          <a href={`tel:${siteConfig.phone}`}>
            <Phone size={16} />
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`}>
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

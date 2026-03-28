"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  Flame,
  Mail,
  MapPin,
  Menu,
  Mountain,
  Phone,
  Trees,
  Waves,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(ScrollTrigger);

type CursorTarget = {
  left: number;
  top: number;
};

const dayShortcuts = ["S", "M", "T", "W", "T", "F", "S"];

const stayIcons = [CalendarDays, BedDouble, Bath, Car];

function mapScheduleTarget(index: number): CursorTarget {
  if (index < 7) {
    const row = index > 3 ? 1 : 0;
    const column = row === 0 ? index : index - 4;

    return {
      left: 18 + column * 17.5,
      top: row === 0 ? 32 : 55,
    };
  }

  return { left: 79, top: 83 };
}

function splitWords(sentence: string) {
  return sentence.split(" ").map((word, index) => (
    <span key={`${word}-${index}`} className="manifesto-word">
      {word}&nbsp;
    </span>
  ));
}

function ProtocolVisual({ motif, accent }: { motif: string; accent: string }) {
  if (motif === "helix") {
    return (
      <svg
        className="protocol-visual protocol-helix"
        viewBox="0 0 240 240"
        aria-hidden="true"
      >
        <g stroke={accent} strokeWidth="1.8" fill="none" opacity="0.9">
          <path d="M64 36c46 0 46 168 92 168" />
          <path d="M156 36c-46 0-46 168-92 168" />
          {[54, 80, 106, 132, 158, 184].map((y) => (
            <path key={y} d={`M82 ${y}h76`} opacity="0.45" />
          ))}
        </g>
      </svg>
    );
  }

  if (motif === "scan") {
    return (
      <svg className="protocol-visual" viewBox="0 0 240 240" aria-hidden="true">
        <defs>
          <linearGradient id="scan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="50%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="rgba(255,255,255,0.15)">
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 7 }).map((__, column) => (
              <circle
                key={`${row}-${column}`}
                cx={42 + column * 26}
                cy={42 + row * 26}
                r="2"
              />
            )),
          )}
        </g>
        <rect
          className="protocol-scan-line"
          x="24"
          y="38"
          width="192"
          height="10"
          rx="5"
          fill="url(#scan-gradient)"
        />
      </svg>
    );
  }

  return (
    <svg className="protocol-visual" viewBox="0 0 240 240" aria-hidden="true">
      <path
        className="protocol-waveform"
        d="M22 128h28l16-42 26 92 22-68 18 42 16-18 18 0 18-40 22 60h20"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpokoLanding() {
  const config = siteConfig;
  const { theme } = config;
  const quietFeature = config.valueProps[0] as {
    title: string;
    description: string;
    labels: string[];
  };
  const comfortFeature = config.valueProps[1] as {
    title: string;
    description: string;
    messages: string[];
  };
  const natureFeature = config.valueProps[2] as {
    title: string;
    description: string;
    scheduleLabel: string;
    activeDays: number[];
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(quietFeature.labels);
  const [typedMessage, setTypedMessage] = useState("");
  const [typeIndex, setTypeIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorStep, setCursorStep] = useState(0);
  const [activeScheduleDay, setActiveScheduleDay] = useState(
    natureFeature.activeDays[0]!,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const cursorTarget = useMemo(
    () =>
      mapScheduleTarget(
        cursorStep < natureFeature.activeDays.length
          ? natureFeature.activeDays[cursorStep]!
          : 7,
      ),
    [cursorStep, natureFeature.activeDays],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNavSolid(!entry.isIntersecting),
      { threshold: 0.22 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShuffleCards((current) => {
        const next = [...current];
        const tail = next.pop();

        if (tail) {
          next.unshift(tail);
        }

        return next;
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const messages = comfortFeature.messages;
    const activeMessage = messages[typeIndex] ?? messages[0] ?? "";

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && charIndex < activeMessage.length) {
          const nextIndex = charIndex + 1;
          setTypedMessage(activeMessage.slice(0, nextIndex));
          setCharIndex(nextIndex);
          return;
        }

        if (!isDeleting && charIndex === activeMessage.length) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && charIndex > 0) {
          const nextIndex = charIndex - 1;
          setTypedMessage(activeMessage.slice(0, nextIndex));
          setCharIndex(nextIndex);
          return;
        }

        setIsDeleting(false);
        setTypeIndex((current) => (current + 1) % messages.length);
      },
      isDeleting ? 24 : charIndex === activeMessage.length ? 1400 : 42,
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, comfortFeature.messages, isDeleting, typeIndex]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursorStep((current) => {
        const next = (current + 1) % (natureFeature.activeDays.length + 1);

        if (next < natureFeature.activeDays.length) {
          setActiveScheduleDay(natureFeature.activeDays[next]!);
        }

        return next;
      });
    }, 2200);

    return () => window.clearInterval(interval);
  }, [natureFeature.activeDays]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.15,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          },
        );
      });

      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      gsap.fromTo(
        words,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#filozofia",
            start: "top 68%",
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLElement>("[data-protocol-card]");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 72, opacity: 0.65 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          },
        );

        if (index > 0) {
          const previousCard = cards[index - 1];
          gsap.to(previousCard, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top 18%",
              scrub: true,
            },
          });
        }
      });

      gsap.to(".protocol-helix", {
        rotate: 360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 22,
        ease: "none",
      });

      gsap.to(".protocol-scan-line", {
        y: 150,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "power2.inOut",
      });

      gsap.to(".protocol-waveform", {
        strokeDasharray: 520,
        strokeDashoffset: -520,
        repeat: -1,
        duration: 3.6,
        ease: "none",
      });

      gsap.to("[data-parallax]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: "#filozofia",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cursorRef.current) {
        return;
      }

      gsap.to(cursorRef.current, {
        left: `${cursorTarget.left}%`,
        top: `${cursorTarget.top}%`,
        scale: cursorStep < natureFeature.activeDays.length ? 0.95 : 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [cursorStep, cursorTarget, natureFeature.activeDays.length]);

  return (
    <div ref={rootRef} className="site-shell">
      <header
        className={`floating-nav ${navSolid ? "floating-nav--solid" : ""}`}
      >
        <div className="floating-nav__inner">
          <Link href="/" className="floating-nav__brand">
            <span className="floating-nav__mark" />
            {config.brand}
          </Link>

          <nav className="floating-nav__links" aria-label="Główna nawigacja">
            {config.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="floating-nav__actions">
            <a href={`tel:${config.phone}`} className="magnetic-button">
              <span className="magnetic-button__fill" />
              <span className="magnetic-button__label">{config.cta}</span>
            </a>
            <button
              type="button"
              className="floating-nav__menu"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Otwórz nawigację mobilną"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-nav">
            {config.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href={`tel:${config.phone}`} className="mobile-nav__cta">
              {config.cta}
            </a>
          </div>
        ) : null}
      </header>

      <main>
        <section
          id="start"
          ref={heroRef}
          className="hero-section"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(19, 23, 20, 0.22) 0%, rgba(19, 23, 20, 0.74) 62%, rgba(19, 23, 20, 0.94) 100%), url(${theme.heroImage})`,
          }}
        >
          <div className="hero-gradient" />
          <div className="hero-content">
            <p className="hero-kicker" data-hero-item>
              {theme.name} / {theme.identity}
            </p>
            <div className="hero-headline">
              <span data-hero-item>{theme.heroIntro}</span>
              <span className="display-serif" data-hero-item>
                {theme.heroDisplay}
              </span>
            </div>
            <p className="hero-copy" data-hero-item>
              {theme.heroBlurb}
            </p>
            <div className="hero-actions" data-hero-item>
              <a href={`tel:${config.phone}`} className="magnetic-button">
                <span className="magnetic-button__fill" />
                <span className="magnetic-button__label">
                  {config.cta} <ArrowRight size={16} />
                </span>
              </a>
              <a href={config.mapUrl} target="_blank" rel="noreferrer">
                Zobacz lokalizację
              </a>
            </div>
            <div className="hero-facts" data-hero-item>
              {config.stats.map((item) => (
                <div key={item.label} className="hero-facts__card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="atuty" className="section-shell features-shell" data-reveal>
          <div className="section-heading">
            <p className="section-heading__eyebrow">Interactive Functional Artifacts</p>
            <div>
              <h2>Trzy argumenty, które budują pobyt zamiast tylko go sprzedawać.</h2>
              <p>
                Każda karta interpretuje inny powód, dla którego SPOKO DOMEK działa
                tak dobrze na rodzinny wyjazd, weekend we dwoje i spokojny reset z
                przyjaciółmi.
              </p>
            </div>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-card__header">
                <Trees size={18} />
                <div>
                  <h3>{quietFeature.title}</h3>
                  <p>{quietFeature.description}</p>
                </div>
              </div>
              <div className="shuffler">
                {shuffleCards.map((label, index) => (
                  <div
                    key={label}
                    className="shuffler__item"
                    style={{
                      transform: `translateY(${index * 18}px) scale(${1 - index * 0.06})`,
                      opacity: 1 - index * 0.24,
                      zIndex: 12 - index,
                    }}
                  >
                    <span className="shuffler__eyebrow">Signal {index + 1}</span>
                    <strong>{label}</strong>
                    <p>W tym miejscu cisza nie jest dodatkiem. Jest główną usługą.</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-card__header">
                <Flame size={18} />
                <div>
                  <h3>{comfortFeature.title}</h3>
                  <p>{comfortFeature.description}</p>
                </div>
              </div>
              <div className="typewriter-card">
                <div className="typewriter-card__meta">
                  <span className="live-dot" />
                  Live Feed
                </div>
                <div className="typewriter-card__body">
                  <span>{typedMessage}</span>
                  <span className="typewriter-card__cursor" />
                </div>
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-card__header">
                <Waves size={18} />
                <div>
                  <h3>{natureFeature.title}</h3>
                  <p>{natureFeature.description}</p>
                </div>
              </div>
              <div className="scheduler-card">
                <div className="scheduler-card__meta">
                  <span>{natureFeature.scheduleLabel}</span>
                  <strong>Zapisz plan</strong>
                </div>
                <div className="scheduler-card__grid">
                  {dayShortcuts.map((day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className={`scheduler-card__cell ${
                        activeScheduleDay === index ? "is-active" : ""
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                  <button type="button" className="scheduler-card__save">
                    Save
                  </button>
                  <div ref={cursorRef} className="scheduler-card__cursor">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M6 2l10 10-4 1.2 2 6.3-2.5.8-2-6.2L6 18V2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="filozofia" className="manifesto-section">
          <div
            className="manifesto-section__texture"
            data-parallax
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(19, 23, 20, 0.74), rgba(19, 23, 20, 0.92)), url(${theme.philosophyTexture})`,
            }}
          />
          <div className="section-shell manifesto-section__content">
            <p className="section-heading__eyebrow">The Manifesto</p>
            <p className="manifesto-section__neutral">{config.philosophy.neutral}</p>
            <h2 className="manifesto-section__headline">
              {splitWords(
                config.philosophy.focus.replace(
                  config.philosophy.accent,
                  config.philosophy.accent.toUpperCase(),
                ),
              )}
            </h2>
          </div>
        </section>

        <section id="pobyt" className="section-shell protocol-shell">
          <div className="section-heading" data-reveal>
            <p className="section-heading__eyebrow">Sticky Stacking Archive</p>
            <div>
              <h2>Jak wygląda pobyt, kiedy miejsce pracuje na spokój od pierwszej doby.</h2>
              <p>
                Tu nie chodzi o listę atrakcji. Chodzi o dobrze ułożony rytm dnia,
                który zaczyna się od przyjazdu i kończy dopiero wtedy, gdy nie chcesz
                już wracać do tempa codzienności.
              </p>
            </div>
          </div>

          <div className="protocol-stack">
            {config.protocol.map((item) => (
              <article key={item.step} className="protocol-card" data-protocol-card>
                <div className="protocol-card__copy">
                  <span className="protocol-card__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ProtocolVisual motif={item.motif} accent={theme.colors.accent} />
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell atmosphere-section" data-reveal>
          <div className="atmosphere-section__copy">
            <p className="section-heading__eyebrow">Site Conditions</p>
            <h2>Wypoczynek działa najlepiej, gdy wszystko potrzebne jest na miejscu.</h2>
            <p>
              Kominek, taras, grill, ognisko, pełna kuchnia i parking zamykają bazę
              pobytową. Las, jeziora i szlaki otwierają resztę dnia.
            </p>
            <div className="pill-grid">
              {config.amenityPills.map((item) => (
                <span key={item} className="amenity-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="atmosphere-section__visual">
            <div className="atmosphere-section__image">
              <Image
                src={theme.atmosphereImage}
                alt="Taras domku SPOKO DOMEK"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </section>

        <section className="section-shell stay-shell" data-reveal>
          <div className="stay-shell__card">
            <div className="stay-shell__intro">
              <p className="section-heading__eyebrow">{config.staySection.eyebrow}</p>
              <h2>{config.staySection.title}</h2>
              <p>{config.staySection.body}</p>
            </div>
            <div className="stay-shell__details">
              {config.stats.map((item, index) => {
                const Icon = stayIcons[index];

                return (
                  <div key={item.label} className="stay-shell__detail">
                    <Icon size={18} />
                    <div>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="stay-shell__actions">
              <a href={`tel:${config.phone}`} className="magnetic-button">
                <span className="magnetic-button__fill" />
                <span className="magnetic-button__label">
                  {config.cta} <ArrowRight size={16} />
                </span>
              </a>
              <a href={`mailto:${config.email}`}>Napisz e-mail</a>
            </div>
          </div>
        </section>
      </main>

      <footer id="kontakt" className="site-footer">
        <div className="section-shell site-footer__grid">
          <div className="site-footer__brand">
            <p className="section-heading__eyebrow">SPOKO DOMEK</p>
            <h2>{config.tagline}</h2>
            <p>
              Domek położony na skraju lasu, niedaleko Kanału Augustowskiego,
              stworzony do wypoczynku, który naprawdę odcina codzienny pośpiech.
            </p>
          </div>

          <div className="site-footer__column">
            <span>Nawigacja</span>
            {config.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="site-footer__column">
            <span>Kontakt</span>
            <a href={`tel:${config.phone}`}>
              <Phone size={16} />
              {config.phone}
            </a>
            <a href={`mailto:${config.email}`}>
              <Mail size={16} />
              {config.email}
            </a>
            <a href={config.mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={16} />
              {config.location}
            </a>
          </div>

          <div className="site-footer__column">
            <span>Pobyt</span>
            <p>
              <CalendarDays size={16} />
              {config.minStay}
            </p>
            <p>
              <Mountain size={16} />
              {config.reservation}
            </p>
            {config.footer.legal.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="section-shell site-footer__bottom">
          <div className="system-status">
            <span className="system-status__dot" />
            <span>System Operational</span>
          </div>
          <p>Telefoniczna rezerwacja, zaliczka i płatność na miejscu.</p>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { telHref } from "@/lib/site-links";

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
};

export function SectionIntro({ eyebrow, title }: SectionIntroProps) {
  return (
    <div className="midnight-section__intro">
      <p className="midnight-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

type PhoneCtaProps = {
  variant: "accent" | "ghost";
  withIcon?: boolean;
};

export function PhoneCta({ variant, withIcon = false }: PhoneCtaProps) {
  return (
    <a href={telHref} className={`midnight-button midnight-button--${variant}`}>
      {siteConfig.cta}
      {withIcon ? <ArrowRight size={16} /> : null}
    </a>
  );
}

type CoverImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
};

export function CoverImage({ src, alt, sizes, priority, eager }: CoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={eager ? "eager" : undefined}
    />
  );
}

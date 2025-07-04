import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FeaturesHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  onCtaClick?: () => void;
}

export default function FeaturesHeroSection({
  title,
  subtitle,
  description,
  ctaText = "Get Started",
  ctaLink = "#",
  className,
  onCtaClick,
}: FeaturesHeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern123/1200/800')] bg-repeat opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-blue-100 md:text-2xl">
            {subtitle}
          </h2>
          <p className="mb-8 text-blue-100">{description}</p>
          {ctaText && (
            <Button
              size="lg"
              className="rounded-full bg-white px-8 text-blue-900 hover:bg-blue-50"
              onClick={onCtaClick}
              asChild={!!ctaLink}
            >
              {ctaLink ? (
                <a href={ctaLink}>{ctaText}</a>
              ) : (
                <span>{ctaText}</span>
              )}
            </Button>
          )}
        </div>
      </div>

      <style jsx>
        {`
          .bg-grid-pattern-light {
            background-image: radial-gradient(
              circle,
              #00000010 1px,
              transparent 1px
            );
            background-size: 30px 30px;
          }
          .bg-grid-pattern-dark {
            background-image: radial-gradient(
              circle,
              #ffffff10 1px,
              transparent 1px
            );
            background-size: 30px 30px;
          }
        `}
      </style>
    </section>
  );
}

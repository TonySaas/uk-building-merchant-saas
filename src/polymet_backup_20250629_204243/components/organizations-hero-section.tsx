import React from "react";
import { cn } from "@/lib/utils";

export interface OrganizationsHeroSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function OrganizationsHeroSection({
  title,
  subtitle,
  className,
}: OrganizationsHeroSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-foreground md:text-2xl">
            {subtitle}
          </h2>
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

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PricingFeature {
  text: string;
}

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  popular?: boolean;
  className?: string;
  badge?: string;
}

export default function PricingCard({
  title,
  price,
  period = "/month",
  description,
  features,
  ctaText,
  ctaLink,
  onCtaClick,
  popular = false,
  className,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all duration-200",
        popular
          ? "border-primary/50 shadow-md shadow-primary/10 dark:shadow-primary/20"
          : "hover:border-primary/30 hover:shadow-sm",
        className
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}

      {badge && (
        <Badge
          variant="outline"
          className="mb-4 w-fit border-primary/20 text-xs font-normal text-muted-foreground"
        >
          {badge}
        </Badge>
      )}

      <div className="mb-4 flex-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && (
            <span className="ml-1 text-sm text-muted-foreground">{period}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon
              className="mr-2 mt-1 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />

            <span className="text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          className={cn(
            "w-full",
            popular ? "bg-primary hover:bg-primary/90" : "bg-primary/90"
          )}
          onClick={onCtaClick}
          asChild={!!ctaLink}
        >
          {ctaLink ? <a href={ctaLink}>{ctaText}</a> : <span>{ctaText}</span>}
        </Button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  StarIcon,
  ArrowRightIcon,
  CalendarIcon,
  TagIcon,
  BuildingIcon,
  MapPinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export interface FeaturedContent {
  id: string;
  type: "offer" | "event" | "news" | "merchant";
  title: string;
  description: string;
  image?: string;
  ctaLabel?: string;
  ctaLink?: string;
  date?: string;
  location?: string;
  discount?: string;
  merchantName?: string;
  organizationId?: string;
  organizationColor?: string;
  organizationLogo?: string;
}

export interface FeaturedContentCardProps {
  content: FeaturedContent;
  onClick?: (content: FeaturedContent) => void;
  className?: string;
}

export default function FeaturedContentCard({
  content,
  onClick,
  className,
}: FeaturedContentCardProps) {
  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick(content);
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get type icon
  const getTypeIcon = () => {
    switch (content.type) {
      case "offer":
        return <TagIcon className="h-5 w-5" />;

      case "event":
        return <CalendarIcon className="h-5 w-5" />;

      case "merchant":
        return <BuildingIcon className="h-5 w-5" />;

      default:
        return <StarIcon className="h-5 w-5" />;
    }
  };

  // Get type label
  const getTypeLabel = () => {
    switch (content.type) {
      case "offer":
        return "Special Offer";
      case "event":
        return "Upcoming Event";
      case "merchant":
        return "Featured Merchant";
      default:
        return "News & Updates";
    }
  };

  return (
    <Card
      className={`overflow-hidden cursor-pointer hover:shadow-md transition-all ${className}`}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative h-40 bg-muted">
        {content.image ? (
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            {getTypeIcon()}
          </div>
        )}

        {/* Type Badge */}
        <Badge
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
          variant="outline"
        >
          <div className="flex items-center gap-1">
            {getTypeIcon()}
            <span>{getTypeLabel()}</span>
          </div>
        </Badge>

        {/* Organization Badge */}
        {content.organizationId && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${
                content.organizationColor || "bg-primary"
              }`}
            />

            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              {content.organizationId}
            </Badge>
          </div>
        )}

        {/* Discount Badge for Offers */}
        {content.type === "offer" && content.discount && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1">
            {content.discount}
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight">
            {content.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {content.description}
          </p>
        </div>

        {/* Additional Info Based on Type */}
        <div className="space-y-2">
          {content.type === "offer" && content.merchantName && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <BuildingIcon className="h-4 w-4" />

              <span>{content.merchantName}</span>
            </div>
          )}

          {content.type === "event" && content.date && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />

              <span>{formatDate(content.date)}</span>
            </div>
          )}

          {content.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />

              <span>{content.location}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          className="w-full gap-1"
          asChild
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={content.ctaLink || "#"}>
            {content.ctaLabel || "View Details"}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

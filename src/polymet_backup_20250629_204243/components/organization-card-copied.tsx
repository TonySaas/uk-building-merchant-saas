import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrganizationCardProps {
  logo: string;
  name: string;
  tagline?: string;
  description: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  websiteUrl: string;
  accentColor?: string;
  className?: string;
}

export default function OrganizationCard({
  logo,
  name,
  tagline,
  description,
  stats,
  websiteUrl,
  accentColor = "bg-blue-600",
  className,
}: OrganizationCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col",
        className
      )}
    >
      <div
        className={cn(
          "h-2",
          accentColor.startsWith("bg-") ? accentColor : `bg-${accentColor}`
        )}
      ></div>
      <CardContent className="p-6 flex-grow">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-center">{name}</h3>
          {tagline && (
            <p className="text-sm text-muted-foreground text-center mt-1 italic">
              "{tagline}"
            </p>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="grid grid-cols-1 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  accentColor.startsWith("bg-")
                    ? accentColor
                    : `bg-${accentColor}`
                )}
              ></div>
              <div className="text-sm">
                <span className="font-medium">{stat.value}</span>{" "}
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(websiteUrl, "_blank")}
        >
          Learn More <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

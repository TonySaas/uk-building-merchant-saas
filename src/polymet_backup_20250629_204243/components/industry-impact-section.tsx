import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  BuildingIcon,
  HomeIcon,
  ShapesIcon as PoundIcon,
  UsersIcon,
} from "lucide-react";

export interface IndustryImpactSectionProps {
  className?: string;
}

export default function IndustryImpactSection({
  className,
}: IndustryImpactSectionProps) {
  const statistics = [
    {
      icon: <BuildingIcon className="h-8 w-8 text-blue-500" />,

      value: "10,000+",
      label: "Independent Merchants",
      description: "Across the UK building supply industry",
    },
    {
      icon: <PoundIcon className="h-8 w-8 text-green-500" />,

      value: "£38bn",
      label: "Annual Industry Value",
      description: "Contributing significantly to the UK economy",
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-amber-500" />,

      value: "330,000+",
      label: "Industry Employees",
      description: "Supporting local jobs and communities",
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-red-500" />,

      value: "85%",
      label: "Local Projects Supplied",
      description: "Powering UK construction and DIY",
    },
  ];

  return (
    <section className={cn("py-16 md:py-24 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            UK Building Merchant Industry Impact
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Supporting a vital sector of the UK economy through digital
            transformation
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat, index) => (
              <Card key={index} className="overflow-hidden">
                <div
                  className={`h-1 w-full ${stat.icon.props.className
                    .split(" ")
                    .find((c) => c.startsWith("text-"))
                    .replace("text-", "bg-")}`}
                ></div>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="mb-2 font-medium">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="text-left">
              <h3 className="mb-4 text-xl font-semibold">
                Digital Transformation Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Reduced operational costs through streamlined promotion
                    management
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Increased market reach through digital channels
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Enhanced customer engagement with interactive promotions
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Data-driven decision making for better inventory management
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="mb-4 text-xl font-semibold">
                Supporting Local Communities
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Preserving local merchant presence on high streets
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Maintaining expert advice and personalized service
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Encouraging "shop local" values with digital tools
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">
                    Creating sustainable business models for independent
                    merchants
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-lg bg-muted p-6 text-left">
            <blockquote className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
              "The UK building merchant industry is the backbone of our
              construction sector. By embracing digital transformation while
              preserving local relationships, we're ensuring this vital industry
              continues to thrive in the digital age."
            </blockquote>
            <div className="text-right font-medium">— BuildConnect Founder</div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BuildingIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface CtaJoinSectionProps {
  className?: string;
}

export default function CtaJoinSection({ className }: CtaJoinSectionProps) {
  const userTypes = [
    {
      type: "organization",
      title: "For Organizations",
      description:
        "Buying groups and trade associations looking to offer digital services to members",
      icon: <BuildingIcon className="h-8 w-8 text-blue-500" />,

      color: "border-blue-500",
      buttonText: "Partner With Us",
      link: "/organizations/apply",
    },
    {
      type: "supplier",
      title: "For Suppliers",
      description:
        "Building product manufacturers and distributors wanting to reach merchants digitally",
      icon: <ShoppingBagIcon className="h-8 w-8 text-green-500" />,

      color: "border-green-500",
      buttonText: "Join as Supplier",
      link: "/pricing",
    },
    {
      type: "consumer",
      title: "For Consumers",
      description:
        "Trade professionals and DIY enthusiasts looking for local building merchant offers",
      icon: <UserIcon className="h-8 w-8 text-amber-500" />,

      color: "border-amber-500",
      buttonText: "Download App",
      link: "/",
    },
  ];

  return (
    <section className={cn("py-16 md:py-24 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            Join the Digital Revolution
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Be part of transforming the UK building merchant industry
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {userTypes.map((userType) => (
              <Card
                key={userType.type}
                className={cn(
                  "overflow-hidden transition-all duration-300 hover:shadow-lg",
                  "border-t-4",
                  userType.color
                )}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${userType.color.replace("border-", "bg-").replace("500", "100")} dark:bg-opacity-20`}
                    >
                      {userType.icon}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {userType.title}
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {userType.description}
                  </p>
                  <Button asChild className="w-full">
                    <Link to={userType.link}>{userType.buttonText}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 rounded-lg bg-muted p-8">
            <h3 className="mb-4 text-2xl font-semibold">
              Ready to Get Started?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Schedule a demo to see how BuildConnect can transform your
              business
            </p>
            <Button size="lg">
              <Link to="/contact">Request a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

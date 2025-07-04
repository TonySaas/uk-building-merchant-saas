import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BuildingIcon,
  HomeIcon,
  LinkedinIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { TEAM_MEMBERS, COMPANY_VALUES } from "@/polymet/data/team-data";

export interface TeamSectionProps {
  className?: string;
}

export default function TeamSection({ className }: TeamSectionProps) {
  // Map icon strings to actual icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "HomeIcon":
        return <HomeIcon className="h-6 w-6" />;

      case "BuildingIcon":
        return <BuildingIcon className="h-6 w-6" />;

      case "ZapIcon":
        return <ZapIcon className="h-6 w-6" />;

      case "UsersIcon":
        return <UsersIcon className="h-6 w-6" />;

      default:
        return <BuildingIcon className="h-6 w-6" />;
    }
  };

  return (
    <section className={cn("py-16 md:py-24 bg-muted/30", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
            Our Team
          </h2>
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Industry experts committed to transforming the UK building merchant
            sector
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto mb-4 h-24 w-24 border-2 border-muted">
                    <AvatarImage src={member.avatar} alt={member.name} />

                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mb-4 text-xs text-muted-foreground">
                    {member.bio}
                  </p>
                  {member.linkedIn && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(member.linkedIn, "_blank")}
                    >
                      <LinkedinIcon className="mr-2 h-4 w-4" /> Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-24">
            <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
              Our Values
            </h2>
            <p className="mb-12 text-center text-lg text-muted-foreground">
              The principles that guide our mission and operations
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {COMPANY_VALUES.map((value) => (
                <Card key={value.id} className="overflow-hidden">
                  <CardContent className="flex p-6">
                    <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      {getIconComponent(value.icon)}
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="mb-4 text-xl font-semibold">Get in Touch</h3>
            <p className="mb-6 text-muted-foreground">
              Interested in partnering with BuildConnect? We'd love to hear from
              you.
            </p>
            <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                variant="outline"
                onClick={() =>
                  window.open("mailto:partnerships@buildconnect.co.uk")
                }
              >
                partnerships@buildconnect.co.uk
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("tel:+442071234567")}
              >
                +44 20 7123 4567
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "lucide-react";

export interface ContactOptionLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
}

export interface ContactOptionProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  email?: string;
  phone?: string;
  responseTime?: string;
  links?: ContactOptionLink[];
  accentColor?: string;
}

export default function ContactOptionCard({
  title,
  icon,
  description,
  email,
  phone,
  responseTime,
  links = [],
  accentColor = "bg-primary",
}: ContactOptionProps) {
  return (
    <Card className="h-full">
      <div className={`h-1 ${accentColor} rounded-t-md`}></div>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-md ${accentColor} bg-opacity-15`}>
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && <p className="text-muted-foreground">{description}</p>}

        <div className="space-y-2">
          {email && (
            <div>
              <div className="text-sm font-medium">Email:</div>
              <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
              >
                {email}
              </a>
            </div>
          )}

          {phone && (
            <div>
              <div className="text-sm font-medium">Phone:</div>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="text-primary hover:underline"
              >
                {phone}
              </a>
            </div>
          )}

          {responseTime && (
            <div className="pt-1">
              <Badge variant="outline" className="text-xs">
                Response time: {responseTime}
              </Badge>
            </div>
          )}
        </div>

        {links.length > 0 && (
          <div className="space-y-2 pt-2">
            {links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.label}
                  {link.isExternal && (
                    <ExternalLinkIcon className="ml-2 h-3 w-3" />
                  )}
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

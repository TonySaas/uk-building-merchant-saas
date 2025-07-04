import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface OfficeLocationProps {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  isPrimary?: boolean;
}

export default function OfficeLocationCard({
  name,
  address,
  city,
  postalCode,
  country,
  phone,
  email,
  mapUrl,
  isPrimary = false,
}: OfficeLocationProps) {
  return (
    <Card className={`overflow-hidden ${isPrimary ? "border-primary/50" : ""}`}>
      {isPrimary && (
        <div className="bg-primary text-primary-foreground text-xs font-medium py-1 text-center">
          HEADQUARTERS
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2">
          <MapPinIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />

          <div>
            <p className="leading-relaxed">{address}</p>
            <p className="leading-relaxed">
              {city}, {postalCode}
            </p>
            <p className="leading-relaxed">{country}</p>
          </div>
        </div>

        {phone && (
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5 text-muted-foreground shrink-0" />

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="hover:underline"
            >
              {phone}
            </a>
          </div>
        )}

        {email && (
          <div className="flex items-center space-x-2">
            <MailIcon className="h-5 w-5 text-muted-foreground shrink-0" />

            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </div>
        )}

        {mapUrl && (
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(mapUrl, "_blank")}
            >
              <MapPinIcon className="h-4 w-4 mr-2" />
              View on Map
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

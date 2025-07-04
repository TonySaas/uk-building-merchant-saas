import React from "react";
import OfficeLocationCard from "@/polymet/components/office-location-card";

export interface Office {
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

export default function OfficeLocationsSection() {
  const offices: Office[] = [
    {
      name: "London Headquarters",
      address: "123 Tech Hub Street",
      city: "London",
      postalCode: "EC2A 4NE",
      country: "United Kingdom",
      phone: "+44 (0) 20 1234 5678",
      email: "london@buildconnect.co.uk",
      mapUrl: "https://maps.google.com",
      isPrimary: true,
    },
    {
      name: "Manchester Office",
      address: "45 Northern Quarter",
      city: "Manchester",
      postalCode: "M4 1HW",
      country: "United Kingdom",
      phone: "+44 (0) 161 987 6543",
      email: "manchester@buildconnect.co.uk",
      mapUrl: "https://maps.google.com",
    },
    {
      name: "Birmingham Office",
      address: "78 Jewellery Quarter",
      city: "Birmingham",
      postalCode: "B1 3DE",
      country: "United Kingdom",
      phone: "+44 (0) 121 456 7890",
      email: "birmingham@buildconnect.co.uk",
      mapUrl: "https://maps.google.com",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offices.map((office, index) => (
            <OfficeLocationCard key={index} {...office} />
          ))}
        </div>
        <div className="mt-8 p-4 bg-muted/30 rounded-lg text-center">
          <p className="text-muted-foreground">
            <strong>Postal Address for Correspondence:</strong> MerchantDeals.ai
            Ltd, 123 Tech Hub Street, London, EC2A 4NE, United Kingdom
          </p>
        </div>
      </div>
    </section>
  );
}

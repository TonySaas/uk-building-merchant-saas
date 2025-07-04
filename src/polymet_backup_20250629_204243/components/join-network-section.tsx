import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BuildingIcon,
  UsersIcon,
  ShoppingBagIcon,
} from "lucide-react";

export interface JoinNetworkSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

export default function JoinNetworkSection({
  title,
  description,
  buttonText,
  onButtonClick,
  className,
}: JoinNetworkSectionProps) {
  return (
    <section
      className={cn(
        "py-16 bg-muted/30 rounded-lg border border-border",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-8">{description}</p>

          <Button size="lg" onClick={onButtonClick} className="mb-12">
            {buttonText} <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BuildingIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Buying Groups</h3>
              <p className="text-sm text-muted-foreground text-center">
                Collective purchasing organizations that represent multiple
                independent merchants
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Trade Associations</h3>
              <p className="text-sm text-muted-foreground text-center">
                Industry bodies representing businesses in the building
                materials sector
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ShoppingBagIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Wholesalers</h3>
              <p className="text-sm text-muted-foreground text-center">
                Suppliers that distribute products to multiple retailers and
                merchants
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { PrinterIcon, UsersIcon, ZapIcon, BarChartIcon } from "lucide-react";

export interface ValuePropositionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PricingValuePropositionProps {
  items?: ValuePropositionItem[];
  className?: string;
}

export default function PricingValueProposition({
  items = defaultValuePropositions,
  className,
}: PricingValuePropositionProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {item.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const defaultValuePropositions: ValuePropositionItem[] = [
  {
    icon: <PrinterIcon className="h-6 w-6" />,

    title: "Reduce Print Costs",
    description:
      "Save up to 80% on traditional print promotion costs while reaching more customers with digital offers.",
  },
  {
    icon: <UsersIcon className="h-6 w-6" />,

    title: "Reach Multiple Buying Groups",
    description:
      "Connect with all major UK building merchant organizations through a single unified platform.",
  },
  {
    icon: <ZapIcon className="h-6 w-6" />,

    title: "Faster Time to Market",
    description:
      "Launch promotions in minutes instead of weeks, with the ability to update offers in real-time.",
  },
  {
    icon: <BarChartIcon className="h-6 w-6" />,

    title: "Measurable Results",
    description:
      "Track performance with detailed analytics on offer engagement, redemptions, and merchant activity.",
  },
];

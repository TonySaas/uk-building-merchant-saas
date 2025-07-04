import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BuildingIcon,
  ShoppingBagIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

export interface SupplyChainBenefitsProps {
  className?: string;
}

export default function SupplyChainBenefits({
  className,
}: SupplyChainBenefitsProps) {
  const [activeTab, setActiveTab] = useState("organizations");

  const benefitGroups = {
    organizations: {
      title: "For Organizations",
      icon: <BuildingIcon className="h-8 w-8 text-blue-500" />,

      color: "bg-blue-500",
      benefits: [
        "Modernize member services with digital offerings",
        "Demonstrate digital leadership in the industry",
        "Strengthen supplier-merchant relationships",
        "Maintain competitive advantage against digital disruptors",
        "Generate new revenue streams through platform participation",
      ],
    },
    suppliers: {
      title: "For Suppliers",
      icon: <ShoppingBagIcon className="h-8 w-8 text-green-500" />,

      color: "bg-green-500",
      benefits: [
        "Eliminate print catalog constraints and costs",
        "Access multiple distribution channels through one platform",
        "Gather real-time market feedback on promotions",
        "Reduce time-to-market for new offers",
        "Enhance brand presentation with rich media content",
      ],
    },
    merchants: {
      title: "For Merchants",
      icon: <UsersIcon className="h-8 w-8 text-amber-500" />,

      color: "bg-amber-500",
      benefits: [
        "Streamline promotion management across suppliers",
        "Increase foot traffic and online sales with digital offers",
        "Establish professional digital presence with minimal effort",
        "Focus on local market with targeted promotions",
        "Gain competitive edge against big box retailers",
      ],
    },
    consumers: {
      title: "For Consumers",
      icon: <UserIcon className="h-8 w-8 text-red-500" />,

      color: "bg-red-500",
      benefits: [
        "Discover local special offers in one convenient place",
        "Support independent businesses in your community",
        "Access trade-quality products with special promotions",
        "Enjoy mobile-optimized shopping experience",
        "Save offers for offline viewing when visiting stores",
      ],
    },
  };

  return (
    <section className={cn("py-16 md:py-24 bg-muted/30", className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            Supply Chain Benefits
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            MerchantDeals.ai creates value at every level of the building merchant
            supply chain
          </p>

          {/* Supply Chain Flow Diagram */}
          <div className="mb-12 hidden md:block">
            <div className="relative mx-auto h-24 max-w-3xl">
              {/* Flow Lines */}
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-muted"></div>

              {/* Circles */}
              <div className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <BuildingIcon className="h-6 w-6 text-blue-500" />
              </div>

              <div className="absolute left-1/3 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <ShoppingBagIcon className="h-6 w-6 text-green-500" />
              </div>

              <div className="absolute left-2/3 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                <UsersIcon className="h-6 w-6 text-amber-500" />
              </div>

              <div className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <UserIcon className="h-6 w-6 text-red-500" />
              </div>

              {/* Labels */}
              <div className="absolute left-0 top-full mt-2 text-center text-sm font-medium">
                Organizations
              </div>

              <div className="absolute left-1/3 top-full mt-2 -translate-x-1/2 text-center text-sm font-medium">
                Suppliers
              </div>

              <div className="absolute left-2/3 top-full mt-2 -translate-x-1/2 text-center text-sm font-medium">
                Merchants
              </div>

              <div className="absolute right-0 top-full mt-2 text-center text-sm font-medium">
                Consumers
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="organizations"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="merchants">Merchants</TabsTrigger>
              <TabsTrigger value="consumers">Consumers</TabsTrigger>
            </TabsList>

            {Object.entries(benefitGroups).map(([key, group]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-6 flex items-center justify-center">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${group.color.replace("bg-", "bg-opacity-20 bg-")} dark:bg-opacity-30`}
                      >
                        {group.icon}
                      </div>
                    </div>
                    <h3 className="mb-4 text-center text-xl font-semibold">
                      {group.title}
                    </h3>
                    <ul className="space-y-2">
                      {group.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div
                            className={`mr-2 mt-1.5 h-2 w-2 rounded-full ${group.color}`}
                          ></div>
                          <span className="text-muted-foreground">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

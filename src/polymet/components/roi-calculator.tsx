"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightIcon, PrinterIcon, BarChartIcon } from "lucide-react";

export interface RoiCalculatorProps {
  className?: string;
}

export default function RoiCalculator({ className }: RoiCalculatorProps) {
  // Input states
  const [currentSpend, setCurrentSpend] = useState(5000);
  const [offersPerMonth, setOffersPerMonth] = useState(20);
  const [averageOfferValue, setAverageOfferValue] = useState(500);
  const [selectedPlan, setSelectedPlan] = useState("professional");

  // Calculated results
  const [printCostSavings, setPrintCostSavings] = useState(0);
  const [administrativeSavings, setAdministrativeSavings] = useState(0);
  const [increasedRevenue, setIncreasedRevenue] = useState(0);
  const [totalBenefit, setTotalBenefit] = useState(0);
  const [roi, setRoi] = useState(0);

  // Plan costs
  const planCosts = {
    starter: 299,
    professional: 599,
    enterprise: 1299,
  };

  // Calculate ROI whenever inputs change
  useEffect(() => {
    // Calculate print cost savings (80% of current spend)
    const printSavings = currentSpend * 0.8;
    setPrintCostSavings(printSavings);

    // Calculate administrative time savings (£25 per offer)
    const adminSavings = offersPerMonth * 25;
    setAdministrativeSavings(adminSavings);

    // Calculate increased revenue (10% increase in offer value)
    const revenueIncrease = offersPerMonth * averageOfferValue * 0.1;
    setIncreasedRevenue(revenueIncrease);

    // Calculate total monthly benefit
    const totalMonthlyBenefit = printSavings + adminSavings + revenueIncrease;
    setTotalBenefit(totalMonthlyBenefit);

    // Calculate ROI (benefit / cost)
    const planCost = planCosts[selectedPlan as keyof typeof planCosts];
    const calculatedRoi = (totalMonthlyBenefit / planCost) * 100;
    setRoi(calculatedRoi);
  }, [currentSpend, offersPerMonth, averageOfferValue, selectedPlan]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">ROI Calculator</CardTitle>
        <CardDescription>
          See how much you could save by switching to digital promotions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-spend">
                Current Monthly Print Promotion Spend (£)
              </Label>
              <div className="flex items-center gap-2">
                <PrinterIcon className="h-4 w-4 text-muted-foreground" />

                <Input
                  id="current-spend"
                  type="number"
                  min={0}
                  value={currentSpend}
                  onChange={(e) => setCurrentSpend(Number(e.target.value))}
                />
              </div>
              <Slider
                value={[currentSpend]}
                min={1000}
                max={20000}
                step={500}
                onValueChange={(value) => setCurrentSpend(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offers-per-month">
                Number of Offers Per Month
              </Label>
              <Input
                id="offers-per-month"
                type="number"
                min={1}
                value={offersPerMonth}
                onChange={(e) => setOffersPerMonth(Number(e.target.value))}
              />

              <Slider
                value={[offersPerMonth]}
                min={5}
                max={100}
                step={5}
                onValueChange={(value) => setOffersPerMonth(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="average-offer-value">
                Average Offer Value (£)
              </Label>
              <Input
                id="average-offer-value"
                type="number"
                min={0}
                value={averageOfferValue}
                onChange={(e) => setAverageOfferValue(Number(e.target.value))}
              />

              <Slider
                value={[averageOfferValue]}
                min={100}
                max={2000}
                step={100}
                onValueChange={(value) => setAverageOfferValue(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Subscription Plan</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter (£299/month)</SelectItem>
                  <SelectItem value="professional">
                    Professional (£599/month)
                  </SelectItem>
                  <SelectItem value="enterprise">
                    Enterprise (£1,299/month)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Section */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
              <BarChartIcon className="h-5 w-5 text-primary" />
              Monthly ROI Calculation
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-sm text-muted-foreground">
                  Print Cost Savings
                </span>
                <span className="font-medium">
                  £{printCostSavings.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-sm text-muted-foreground">
                  Administrative Savings
                </span>
                <span className="font-medium">
                  £{administrativeSavings.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-sm text-muted-foreground">
                  Increased Revenue
                </span>
                <span className="font-medium">
                  £{increasedRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-sm text-muted-foreground">
                  Monthly Subscription
                </span>
                <span className="font-medium text-red-500">
                  -£{planCosts[selectedPlan as keyof typeof planCosts]}
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="font-medium">Net Monthly Benefit</span>
                <span className="text-lg font-bold text-primary">
                  £
                  {(
                    totalBenefit -
                    planCosts[selectedPlan as keyof typeof planCosts]
                  ).toLocaleString()}
                </span>
              </div>

              <div className="mt-4 rounded-md bg-primary/10 p-3 text-center">
                <div className="text-sm font-medium">Estimated ROI</div>
                <div className="text-2xl font-bold text-primary">
                  {roi.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Get Your Customized ROI Report
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

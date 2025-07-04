import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon, HelpCircleIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PlanFeature {
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
  enterprisePlus: boolean | string;
  tooltip?: string;
}

export interface PricingComparisonTableProps {
  features: PlanFeature[];
  className?: string;
}

export default function PricingComparisonTable({
  features,
  className,
}: PricingComparisonTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className={cn("w-full overflow-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Features</TableHead>
            <TableHead className="text-center">Starter</TableHead>
            <TableHead className="text-center">Professional</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
            <TableHead className="text-center">Enterprise Plus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow
              key={index}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              className={cn(
                hoveredRow === index && "bg-muted/50",
                "transition-colors"
              )}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-1">
                  {feature.name}
                  {feature.tooltip && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircleIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-sm">{feature.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {renderFeatureValue(feature.starter)}
              </TableCell>
              <TableCell className="text-center">
                {renderFeatureValue(feature.professional)}
              </TableCell>
              <TableCell className="text-center">
                {renderFeatureValue(feature.enterprise)}
              </TableCell>
              <TableCell className="text-center">
                {renderFeatureValue(feature.enterprisePlus)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function renderFeatureValue(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="mx-auto h-5 w-5 text-primary" />
    ) : (
      <XIcon className="mx-auto h-5 w-5 text-muted-foreground/50" />
    );
  }
  return <span className="text-sm">{value}</span>;
}

import React from "react";
import { cn } from "@/lib/utils";

export interface BenefitItem {
  text: string;
}

export interface BenefitColumnProps {
  icon: React.ReactNode;
  title: string;
  benefits: BenefitItem[];
  className?: string;
  accentColor?: string;
}

export default function BenefitColumn({
  icon,
  title,
  benefits,
  className,
  accentColor = "bg-primary",
}: BenefitColumnProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={cn(
            "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
            accentColor.startsWith("bg-") ? accentColor : `bg-${accentColor}`
          )}
        >
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="mb-4 text-xl font-semibold">{title}</h3>
        <ul className="space-y-2 text-left">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-1 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">
                {benefit.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

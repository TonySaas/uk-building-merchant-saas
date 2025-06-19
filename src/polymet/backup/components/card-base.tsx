
import React, { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "small" | "medium" | "large";
  elevation?: "none" | "low" | "medium" | "high";
  interactive?: boolean;
}

const CardBase = forwardRef<HTMLDivElement, CardBaseProps>(
  ({
    children,
    className,
    padding = "medium",
    elevation = "low",
    interactive = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) => {
    const paddingClasses = {
      none: "",
      small: "p-3",
      medium: "p-4",
      large: "p-6",
    };

    const elevationClasses = {
      none: "shadow-none",
      low: "shadow-sm",
      medium: "shadow-md",
      high: "shadow-lg",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-200",
          paddingClasses[padding],
          elevationClasses[elevation],
          interactive && "cursor-pointer hover:shadow-md",
          className
        )}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

CardBase.displayName = "CardBase";

export default CardBase;

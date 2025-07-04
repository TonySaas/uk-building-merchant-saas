import { cn } from "@/lib/utils";
import { ZapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreditsIndicatorProps {
  creditsRemaining: number;
  totalCredits: number;
  className?: string;
}

export default function CreditsIndicator({
  creditsRemaining,
  totalCredits,
  className,
}: CreditsIndicatorProps) {
  const percentage = (creditsRemaining / totalCredits) * 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={
                percentage <= 20
                  ? "destructive"
                  : percentage <= 50
                    ? "warning"
                    : "default"
              }
              className="px-2.5 py-1 flex items-center gap-1.5 cursor-help"
            >
              <ZapIcon className="h-3.5 w-3.5" />

              <span className="font-medium">{creditsRemaining}</span>
              <span className="text-xs opacity-80">
                AI generations remaining
              </span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              You've used {totalCredits - creditsRemaining} of your{" "}
              {totalCredits} monthly credits
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

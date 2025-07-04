import { cn } from "@/lib/utils";
import { EyeIcon, ShareIcon, ArrowUpRightIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PerformanceIndicatorProps {
  views: number;
  shares: number;
  clicks: number;
  className?: string;
}

export default function PerformanceIndicator({
  views,
  shares,
  clicks,
  className,
}: PerformanceIndicatorProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-3 text-sm text-muted-foreground",
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <EyeIcon className="h-4 w-4 mr-1" />

              <span>{formatNumber(views)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{views.toLocaleString()} views</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <ShareIcon className="h-4 w-4 mr-1" />

              <span>{formatNumber(shares)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{shares.toLocaleString()} shares</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <ArrowUpRightIcon className="h-4 w-4 mr-1" />

              <span>{formatNumber(clicks)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{clicks.toLocaleString()} clicks</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

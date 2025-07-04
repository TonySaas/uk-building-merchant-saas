import { Card, CardContent } from "@/components/ui/card";
import { FileTextIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

interface QuickStatsBarProps {
  totalContent: number;
  activeCampaigns: number;
  reachThisMonth: number;
}

export default function QuickStatsBar({
  totalContent,
  activeCampaigns,
  reachThisMonth,
}: QuickStatsBarProps) {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatReach = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex items-center p-4">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
            <FileTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Content
            </p>
            <h3 className="text-2xl font-bold">{formatNumber(totalContent)}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-4">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mr-4">
            <TrendingUpIcon className="h-5 w-5 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Active Campaigns
            </p>
            <h3 className="text-2xl font-bold">
              {formatNumber(activeCampaigns)}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-4">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
            <UsersIcon className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Reach This Month
            </p>
            <h3 className="text-2xl font-bold">
              {formatReach(reachThisMonth)}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

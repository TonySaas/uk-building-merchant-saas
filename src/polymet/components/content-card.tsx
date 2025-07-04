import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontalIcon,
  EyeIcon,
  PencilIcon,
  ShareIcon,
  BarChartIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentTypeBadge from "@/polymet/components/content-type-badge";
import StatusBadge from "@/polymet/components/status-badge";
import PerformanceIndicator from "@/polymet/components/performance-indicator";
import { formatDistanceToNow } from "date-fns";
import { ContentItem } from "@/polymet/data/content-data";

interface ContentCardProps {
  content: ContentItem;
  onPreview: (content: ContentItem) => void;
  onEdit: (content: ContentItem) => void;
  onDistribute: (content: ContentItem) => void;
  onAnalytics: (content: ContentItem) => void;
}

export default function ContentCard({
  content,
  onPreview,
  onEdit,
  onDistribute,
  onAnalytics,
}: ContentCardProps) {
  const { title, type, thumbnail, createdAt, status, performance, campaign } =
    content;

  const createdDate = new Date(createdAt);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <ContentTypeBadge type={type} />
        </div>
        <div className="absolute top-2 right-2 z-10">
          <StatusBadge status={status} />
        </div>
        <div className="h-48 overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <CardContent className="flex-grow pt-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-muted-foreground">Created {timeAgo}</p>
            {campaign && (
              <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                {campaign}
              </span>
            )}
          </div>
        </div>

        <PerformanceIndicator
          views={performance.views}
          shares={performance.shares}
          clicks={performance.clicks}
          className="mt-4"
        />
      </CardContent>

      <CardFooter className="border-t pt-3 pb-3 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onDistribute(content)}
        >
          <ShareIcon className="h-3.5 w-3.5 mr-1" />
          Distribute
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onPreview(content)}>
              <EyeIcon className="h-4 w-4 mr-2" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(content)}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAnalytics(content)}>
              <BarChartIcon className="h-4 w-4 mr-2" />
              Analytics
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

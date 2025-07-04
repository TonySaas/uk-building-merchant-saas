import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, FilterIcon } from "lucide-react";
import { CAMPAIGN_DATA } from "@/polymet/data/content-data";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: string) => void;
}

export interface FilterOptions {
  contentType: string;
  dateCreated: string;
  campaignStatus: string;
  performance: string;
  campaign: string;
}

export default function FilterBar({
  onSearch,
  onFilterChange,
  onSortChange,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    contentType: "all",
    dateCreated: "all",
    campaignStatus: "all",
    performance: "all",
    campaign: "all",
  });

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search by product name, campaign or keywords..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center">
          <FilterIcon className="h-4 w-4 mr-2 text-muted-foreground" />

          <span className="text-sm font-medium mr-2">Filters:</span>
        </div>

        <Select
          value={filters.contentType}
          onValueChange={(value) => handleFilterChange("contentType", value)}
        >
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="copy">Copy</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.dateCreated}
          onValueChange={(value) => handleFilterChange("dateCreated", value)}
        >
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Date Created" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.campaignStatus}
          onValueChange={(value) => handleFilterChange("campaignStatus", value)}
        >
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.performance}
          onValueChange={(value) => handleFilterChange("performance", value)}
        >
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Performance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Performance</SelectItem>
            <SelectItem value="high-views">High Views</SelectItem>
            <SelectItem value="high-shares">High Shares</SelectItem>
            <SelectItem value="high-clicks">High Clicks</SelectItem>
            <SelectItem value="low-performance">Low Performance</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.campaign}
          onValueChange={(value) => handleFilterChange("campaign", value)}
        >
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {CAMPAIGN_DATA.map((campaign) => (
              <SelectItem
                key={campaign}
                value={campaign.toLowerCase().replace(/\s+/g, "-")}
              >
                {campaign}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="recent" onValueChange={onSortChange}>
          <SelectTrigger className="w-[140px] h-9 ml-auto">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="most-shared">Most Shared</SelectItem>
            <SelectItem value="best-performing">Best Performing</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

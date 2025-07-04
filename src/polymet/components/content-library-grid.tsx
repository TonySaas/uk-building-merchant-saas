import { useState } from "react";
import { ContentItem } from "@/polymet/data/content-data";
import ContentCard from "@/polymet/components/content-card";
import FilterBar, { FilterOptions } from "@/polymet/components/filter-bar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ContentLibraryGridProps {
  contentItems: ContentItem[];
  onPreview: (content: ContentItem) => void;
  onEdit: (content: ContentItem) => void;
  onDistribute: (content: ContentItem) => void;
  onAnalytics: (content: ContentItem) => void;
  onNewCampaign: () => void;
}

export default function ContentLibraryGrid({
  contentItems,
  onPreview,
  onEdit,
  onDistribute,
  onAnalytics,
  onNewCampaign,
}: ContentLibraryGridProps) {
  const [filteredItems, setFilteredItems] =
    useState<ContentItem[]>(contentItems);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, currentFilters);
  };

  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    contentType: "all",
    dateCreated: "all",
    campaignStatus: "all",
    performance: "all",
    campaign: "all",
  });

  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    applyFilters(searchQuery, filters);
  };

  const handleSortChange = (sort: string) => {
    let sortedItems = [...filteredItems];

    switch (sort) {
      case "recent":
        sortedItems.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "most-shared":
        sortedItems.sort((a, b) => b.performance.shares - a.performance.shares);
        break;
      case "best-performing":
        sortedItems.sort((a, b) => {
          const aScore =
            a.performance.views +
            a.performance.clicks * 2 +
            a.performance.shares * 3;
          const bScore =
            b.performance.views +
            b.performance.clicks * 2 +
            b.performance.shares * 3;
          return bScore - aScore;
        });
        break;
      case "alphabetical":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredItems(sortedItems);
  };

  const applyFilters = (query: string, filters: FilterOptions) => {
    let results = contentItems;

    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(lowercaseQuery) ||
          (item.campaign &&
            item.campaign.toLowerCase().includes(lowercaseQuery)) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)))
      );
    }

    // Apply content type filter
    if (filters.contentType !== "all") {
      results = results.filter((item) => item.type === filters.contentType);
    }

    // Apply date filter
    if (filters.dateCreated !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (filters.dateCreated) {
        case "today":
          results = results.filter((item) => {
            const createdDate = new Date(item.createdAt);
            return createdDate >= today;
          });
          break;
        case "this-week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          results = results.filter((item) => {
            const createdDate = new Date(item.createdAt);
            return createdDate >= weekStart;
          });
          break;
        case "this-month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          results = results.filter((item) => {
            const createdDate = new Date(item.createdAt);
            return createdDate >= monthStart;
          });
          break;
        case "last-3-months":
          const threeMonthsAgo = new Date(today);
          threeMonthsAgo.setMonth(today.getMonth() - 3);
          results = results.filter((item) => {
            const createdDate = new Date(item.createdAt);
            return createdDate >= threeMonthsAgo;
          });
          break;
      }
    }

    // Apply status filter
    if (filters.campaignStatus !== "all") {
      results = results.filter(
        (item) => item.status === filters.campaignStatus
      );
    }

    // Apply performance filter
    if (filters.performance !== "all") {
      switch (filters.performance) {
        case "high-views":
          results = results.filter((item) => item.performance.views > 5000);
          break;
        case "high-shares":
          results = results.filter((item) => item.performance.shares > 300);
          break;
        case "high-clicks":
          results = results.filter((item) => item.performance.clicks > 1000);
          break;
        case "low-performance":
          results = results.filter(
            (item) =>
              item.performance.views < 1000 &&
              item.performance.shares < 100 &&
              item.performance.clicks < 200
          );
          break;
      }
    }

    // Apply campaign filter
    if (filters.campaign !== "all" && filters.campaign) {
      const campaignName = filters.campaign.replace(/-/g, " ");
      results = results.filter(
        (item) => item.campaign && item.campaign.toLowerCase() === campaignName
      );
    }

    setFilteredItems(results);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Library</h2>
        <Button onClick={onNewCampaign}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <FilterBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No content items match your filters.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setCurrentFilters({
                contentType: "all",
                dateCreated: "all",
                campaignStatus: "all",
                performance: "all",
                campaign: "all",
              });
              setFilteredItems(contentItems);
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              onPreview={onPreview}
              onEdit={onEdit}
              onDistribute={onDistribute}
              onAnalytics={onAnalytics}
            />
          ))}
        </div>
      )}
    </div>
  );
}

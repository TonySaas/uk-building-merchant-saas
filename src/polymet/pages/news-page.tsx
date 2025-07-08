"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NewsHero from "@/polymet/components/news-hero";
import NewsCategoryFilter from "@/polymet/components/news-category-filter";
import NewsCard from "@/polymet/components/news-card";
import NewsSidebar from "@/polymet/components/news-sidebar";
import NewsletterSubscription from "@/polymet/components/newsletter-subscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  CalendarIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowUpIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/polymet/data/blog-post-data";
import { BlogPost } from "@/polymet/data/blog-post-data";

export default function NewsPage() {
  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [activeCategory, setActiveCategory] = useState("All News");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState("newest");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Get featured post
  const featuredPost =
    BLOG_POSTS.find((post) => post.featured) || BLOG_POSTS[0];

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get("category") || "All News";
    const query = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "newest";

    setActiveCategory(category);
    setSearchQuery(query);
    setSortBy(sort);

    // Parse dates if present
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    if (fromParam) setDateFrom(new Date(fromParam));
    if (toParam) setDateTo(new Date(toParam));
  }, [searchParams]);

  // Filter posts based on current filters
  useEffect(() => {
    let result = [...BLOG_POSTS];

    // Filter by category
    if (activeCategory !== "All News") {
      result = result.filter((post) => post.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          (post.author && post.author.toLowerCase().includes(query))
      );
    }

    // Filter by date range
    if (dateFrom) {
      result = result.filter((post) => new Date(post.date) >= dateFrom);
    }

    if (dateTo) {
      result = result.filter((post) => new Date(post.date) <= dateTo);
    }

    // Sort results
    result = sortPosts(result, sortBy);

    // Remove featured post from the list
    result = result.filter((post) => post.id !== featuredPost.id);

    setFilteredPosts(result);
  }, [activeCategory, searchQuery, dateFrom, dateTo, sortBy, featuredPost.id]);

  // Sort posts by selected criteria
  const sortPosts = (posts: BlogPost[], sortCriteria: string) => {
    switch (sortCriteria) {
      case "newest":
        return [...posts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return [...posts].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "trending":
        return [...posts].sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      default:
        return posts;
    }
  };

  // Update URL params when filters change
  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (activeCategory !== "All News") {
      params.append("category", activeCategory);
    }

    if (searchQuery) {
      params.append("q", searchQuery);
    }

    if (sortBy !== "newest") {
      params.append("sort", sortBy);
    }

    if (dateFrom) {
      params.append("from", dateFrom.toISOString().split("T")[0]);
    }

    if (dateTo) {
      params.append("to", dateTo.toISOString().split("T")[0]);
    }

    setSearchParams(params);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setTimeout(() => updateUrlParams(), 0);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => updateUrlParams(), 0);
  };

  // Handle filter apply
  const handleApplyFilters = () => {
    updateUrlParams();
    setShowFilterDialog(false);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setActiveCategory("All News");
    setSearchQuery("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setSortBy("newest");
    setSearchParams(new URLSearchParams());
    setShowFilterDialog(false);
  };

  // Handle bookmark toggle
  const handleBookmark = (postId: string) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // Handle share
  const handleShare = (postId: string) => {
    // In a real app, this would open a share dialog
    console.log(`Sharing post ${postId}`);
    alert(
      `Sharing functionality would open native share dialog for post ${postId}`
    );
  };

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get related posts based on category
  const getRelatedPosts = () => {
    return BLOG_POSTS.filter(
      (post) =>
        post.id !== featuredPost.id && post.category === featuredPost.category
    ).slice(0, 3);
  };

  // Get trending posts
  const getTrendingPosts = () => {
    return BLOG_POSTS.filter(
      (post) => post.trending && post.id !== featuredPost.id
    ).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8 md:py-12 border-b">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Building Merchant Industry News
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Stay informed with the latest developments in the UK building
              materials sector
            </p>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">
                Powered by Builders Merchants News
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Featured Article */}
        <div className="mb-8">
          <NewsHero
            post={featuredPost}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <NewsCategoryFilter
            categories={BLOG_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-2">
            {/* Active Filters Display */}
            {(searchQuery ||
              activeCategory !== "All News" ||
              dateFrom ||
              dateTo) && (
              <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-muted/30 rounded-md">
                <span className="text-sm font-medium">Active filters:</span>

                {activeCategory !== "All News" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => handleCategoryChange("All News")}
                  >
                    {activeCategory} <XIcon className="h-3 w-3" />
                  </Button>
                )}

                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => handleSearch("")}
                  >
                    "{searchQuery}" <XIcon className="h-3 w-3" />
                  </Button>
                )}

                {dateFrom && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => {
                      setDateFrom(undefined);
                      updateUrlParams();
                    }}
                  >
                    From: {format(dateFrom, "dd MMM yyyy")}{" "}
                    <XIcon className="h-3 w-3" />
                  </Button>
                )}

                {dateTo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1"
                    onClick={() => {
                      setDateTo(undefined);
                      updateUrlParams();
                    }}
                  >
                    To: {format(dateTo, "dd MMM yyyy")}{" "}
                    <XIcon className="h-3 w-3" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs ml-auto"
                  onClick={handleResetFilters}
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "Article" : "Articles"}
              </h2>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setTimeout(() => updateUrlParams(), 0);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <NewsCard
                    key={post.id}
                    post={post}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

                <h3 className="text-xl font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={handleResetFilters}>Reset all filters</Button>
              </div>
            )}

            {/* Related & Trending Articles */}
            {filteredPosts.length > 0 && (
              <div className="mt-12 space-y-8">
                {/* Related Articles */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getRelatedPosts().map((post) => (
                      <NewsCard
                        key={post.id}
                        post={post}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                        className="h-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Trending Articles */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Trending Now</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getTrendingPosts().map((post) => (
                      <NewsCard
                        key={post.id}
                        post={post}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                        className="h-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter (Mobile Only) */}
            <div className="mt-8 lg:hidden">
              <NewsletterSubscription />
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <NewsSidebar
              onSearch={handleSearch}
              onFilterClick={() => setShowFilterDialog(true)}
            />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-muted/30 py-8 mt-12 border-t">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Archive</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    2023
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    2022
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    2021
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    View All Archives
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Feeds</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    RSS Feed
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    JSON Feed
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto">
                    Atom Feed
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Partnership</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Content on this page is provided in partnership with Builders
                Merchants News, the leading publication for the UK building
                merchant industry.
              </p>
              <Button variant="outline" className="gap-2">
                Visit Builders Merchants News
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Articles</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />

                <Button size="icon" variant="ghost">
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date range</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">From</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {dateFrom ? (
                          format(dateFrom, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">To</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {dateTo ? (
                          format(dateTo, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 right-6 h-10 w-10 rounded-full shadow-lg z-10"
          onClick={scrollToTop}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

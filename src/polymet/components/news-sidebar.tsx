"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ExternalLinkIcon,
  TwitterIcon,
  LinkedinIcon,
  SearchIcon,
  FilterIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  UPCOMING_EVENTS,
  QUICK_LINKS,
  SOCIAL_FEED,
} from "@/polymet/data/blog-post-data";

interface NewsSidebarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
}

export default function NewsSidebar({
  onSearch,
  onFilterClick,
}: NewsSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <TwitterIcon className="h-4 w-4 text-blue-400" />;

      case "linkedin":
        return <LinkedinIcon className="h-4 w-4 text-blue-700" />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Widget */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />

              <Button type="submit" size="icon">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={onFilterClick}
            >
              <FilterIcon className="h-4 w-4" /> Advanced Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Newsletter Signup Widget */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Weekly Industry Digest</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Get the latest industry news delivered to your inbox every week.
          </p>
          <form className="space-y-3">
            <Input
              placeholder="Your email address"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />

            <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Industry Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="space-y-1">
                <h4 className="font-medium">{event.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />

                  <span>{event.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.location}
                </p>
                <div className="pt-1">
                  <Link
                    to={event.url}
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Details <ArrowRightIcon className="h-3 w-3" />
                  </Link>
                </div>
                {event.id !==
                  UPCOMING_EVENTS[UPCOMING_EVENTS.length - 1].id && (
                  <Separator className="my-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors flex items-center gap-1"
                >
                  {link.title} <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Social Media Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Social Media</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-4">
            {SOCIAL_FEED.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  {getSocialIcon(item.platform)}
                  <span className="font-medium text-sm">{item.author}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.platform}
                  </Badge>
                </div>
                <p className="text-sm">{item.content}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.date}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View
                  </a>
                </div>
                {item.id !== SOCIAL_FEED[SOCIAL_FEED.length - 1].id && (
                  <Separator className="my-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

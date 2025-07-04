"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ExternalLinkIcon,
  ClockIcon,
  CalendarIcon,
  BookmarkIcon,
  ShareIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/polymet/data/blog-post-data";

interface NewsCardProps {
  post: BlogPost;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
  className?: string;
}

export default function NewsCard({
  post,
  onBookmark,
  onShare,
  className = "",
}: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}
    >
      {/* Image Section */}
      {post.image && (
        <div className="relative h-48 w-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />

          {post.trending && (
            <Badge className="absolute top-2 right-2 bg-amber-500 text-white flex items-center gap-1">
              <TrendingUpIcon className="h-3 w-3" /> Trending
            </Badge>
          )}
          {post.externalUrl && (
            <Badge
              variant="outline"
              className="absolute bottom-2 right-2 bg-background/70 backdrop-blur-sm flex items-center gap-1"
            >
              <ExternalLinkIcon className="h-3 w-3" /> External
            </Badge>
          )}
          <Badge
            variant="outline"
            className="absolute bottom-2 left-2 bg-background/70 backdrop-blur-sm"
          >
            {post.category}
          </Badge>
        </div>
      )}

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" /> {formatDate(post.date)}
          </span>
          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" /> {post.readTime}
          </span>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {post.externalUrl ? (
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </a>
          ) : (
            <Link
              to={`/news/${post.id}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          )}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {post.author && (
              <>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />

                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{post.author}</span>
              </>
            )}
          </div>

          <div className="flex gap-1">
            <button
              className="p-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => onBookmark?.(post.id)}
              aria-label="Bookmark"
            >
              <BookmarkIcon className="h-4 w-4" />
            </button>
            <button
              className="p-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => onShare?.(post.id)}
              aria-label="Share"
            >
              <ShareIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

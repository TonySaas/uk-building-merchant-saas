"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ExternalLinkIcon,
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/polymet/data/blog-post-data";

interface NewsHeroProps {
  post: BlogPost;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export default function NewsHero({ post, onBookmark, onShare }: NewsHeroProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="relative h-[400px] md:h-[500px] w-full">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={
              post.image || "https://picsum.photos/seed/news-default/800/500"
            }
            alt={post.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary text-primary-foreground">
              Featured Story
            </Badge>
            <Badge
              variant="outline"
              className="bg-background/20 backdrop-blur-sm text-white border-white/20"
            >
              {post.category}
            </Badge>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            {post.title}
          </h1>

          <p className="text-white/90 text-base md:text-lg mb-4 line-clamp-2 md:line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={post.authorAvatar} alt={post.author} />

                <AvatarFallback>{post.author?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-white/90 text-sm">
                <span>{post.author}</span>
                <div className="flex items-center gap-2">
                  <span>{formatDate(post.date)}</span>
                  <span className="inline-block h-1 w-1 rounded-full bg-white/50"></span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="bg-background/20 backdrop-blur-sm text-white border-white/20 hover:bg-background/30"
                onClick={() => onBookmark?.(post.id)}
              >
                <BookmarkIcon className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-background/20 backdrop-blur-sm text-white border-white/20 hover:bg-background/30"
                onClick={() => onShare?.(post.id)}
              >
                <ShareIcon className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>

          <div className="mt-6">
            {post.externalUrl ? (
              <Button
                className="gap-2"
                size="lg"
                onClick={() => window.open(post.externalUrl, "_blank")}
              >
                Read Full Article <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="gap-2" size="lg" asChild>
                <Link to={`/news/${post.id}`}>Read Full Article</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

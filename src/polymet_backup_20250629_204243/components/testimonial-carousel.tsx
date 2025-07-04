import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "lucide-react";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  accentColor?: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <div
      className={cn("relative overflow-hidden py-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                className="mr-4 rounded-full"
                onClick={prevTestimonial}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>

              <Card className="flex-1">
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center">
                    <QuoteIcon
                      className="h-12 w-12 text-muted-foreground/30"
                      strokeWidth={1}
                    />
                  </div>

                  <blockquote className="mb-6 text-center text-lg italic text-muted-foreground">
                    "{testimonials[activeIndex].quote}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    {testimonials[activeIndex].image && (
                      <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div
                      className={cn(
                        "h-1 w-16 rounded-full mb-3",
                        testimonials[activeIndex].accentColor || "bg-primary"
                      )}
                    ></div>

                    <div className="text-center">
                      <div className="font-semibold">
                        {testimonials[activeIndex].author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[activeIndex].role},{" "}
                        {testimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                size="icon"
                className="ml-4 rounded-full"
                onClick={nextTestimonial}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === activeIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30"
                  )}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

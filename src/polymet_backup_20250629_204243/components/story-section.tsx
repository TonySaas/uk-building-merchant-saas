import React from "react";
import { cn } from "@/lib/utils";

export interface StorySectionProps {
  className?: string;
}

export default function StorySection({ className }: StorySectionProps) {
  return (
    <section
      id="our-story"
      className={cn("py-16 md:py-24 bg-background", className)}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-center md:text-4xl">
            Our Story
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="md:w-1/2">
              <img
                src="https://picsum.photos/seed/toolbankdeals/600/400"
                alt="Real Deals for You catalog"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">
                From Print to Digital
              </h3>
              <p className="text-muted-foreground mb-4">
                BuildConnect was born from the success of Toolbank's "Real Deals
                for You" promotional catalog. While the print catalog was
                effective, we saw an opportunity to bring these valuable
                promotions into the digital age.
              </p>
              <p className="text-muted-foreground">
                Our founders, with decades of experience in the UK building
                merchant industry, recognized that digital transformation could
                preserve and enhance the vital relationships between suppliers,
                merchants, and consumers.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src="https://picsum.photos/seed/buildingmerchant/600/400"
                alt="Local building merchant"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">
                Our Vision & Mission
              </h3>
              <p className="text-muted-foreground mb-4">
                <span className="font-medium">Vision:</span> To modernize the UK
                building merchant industry while preserving the local
                relationships and expertise that make it unique.
              </p>
              <p className="text-muted-foreground mb-4">
                <span className="font-medium">Mission:</span> To create a
                digital ecosystem that connects suppliers, merchants, and
                consumers, making special offers and promotions more accessible,
                efficient, and effective for everyone in the supply chain.
              </p>
              <p className="text-muted-foreground">
                We believe in the power of independent merchants and their vital
                role in communities across the UK. BuildConnect exists to
                strengthen these businesses in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

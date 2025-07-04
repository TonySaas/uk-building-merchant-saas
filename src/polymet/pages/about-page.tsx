import React from "react";
import AboutHeroSection from "@/polymet/components/about-hero-section";
import StorySection from "@/polymet/components/story-section";
import SupplyChainBenefits from "@/polymet/components/supply-chain-benefits";
import IndustryImpactSection from "@/polymet/components/industry-impact-section";
import TeamSection from "@/polymet/components/team-section";
import CtaJoinSection from "@/polymet/components/cta-join-section";
import TestimonialCarousel from "@/polymet/components/testimonial-carousel";
import MobileContentDistributionHubFeature from "@/polymet/components/mobile-content-distribution-hub-feature";
import { ORGANIZATIONS_DATA } from "@/polymet/data/organizations-data";

export default function AboutPage() {
  // Extract testimonials from organizations data
  const testimonials = ORGANIZATIONS_DATA.map((org) => ({
    id: org.id,
    quote: org.testimonial.quote,
    author: org.testimonial.author,
    role: org.testimonial.role,
    company: org.name,
    accentColor: org.accentColor,
  }));

  return (
    <div className="min-h-screen bg-background">
      <AboutHeroSection
        title="Digitizing UK Building Merchant Excellence"
        subtitle="Preserving Tradition, Embracing Innovation"
        ctaText="Learn Our Story"
        ctaLink="#our-story"
      />

      <StorySection />

      {/* Featured Solution - Content Distribution Hub */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Our Featured Solution
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover how our Content Distribution Hub connects the entire UK
              building merchant ecosystem
            </p>
          </div>
          <MobileContentDistributionHubFeature />
        </div>
      </section>

      <SupplyChainBenefits />

      <div className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
            What Our Partners Say
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>

      <IndustryImpactSection />

      <TeamSection />

      <CtaJoinSection />
    </div>
  );
}
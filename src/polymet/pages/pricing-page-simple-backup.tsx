
import HeroSection from "@/polymet/components/hero-section";
import PricingCard from "@/polymet/components/pricing-card";
import PricingValueProposition from "@/polymet/components/pricing-value-proposition";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your business needs. Scale as you grow with our flexible pricing options designed for suppliers, merchants, and organizations of all sizes."
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Starter"
              price="£29"
              period="per month"
              description="Perfect for small suppliers just getting started"
              features={[
                { text: "Up to 10 active promotions" },
                { text: "Basic analytics dashboard" },
                { text: "Email support" },
                { text: "Standard integration support" },
                { text: "Mobile app access" }
              ]}
              ctaText="Start Free Trial"
              popular={false}
            />
            
            <PricingCard
              title="Professional"
              price="£79"
              period="per month"
              description="Ideal for growing merchants and suppliers"
              features={[
                { text: "Up to 100 active promotions" },
                { text: "Advanced analytics & reporting" },
                { text: "Priority email & phone support" },
                { text: "Custom integrations" },
                { text: "Mobile app access" },
                { text: "Multi-location support" },
                { text: "Custom branding" }
              ]}
              ctaText="Start Free Trial"
              popular={true}
            />
            
            <PricingCard
              title="Enterprise"
              price="Custom"
              period="contact us"
              description="For large organizations with specific needs"
              features={[
                { text: "Unlimited promotions" },
                { text: "Enterprise analytics suite" },
                { text: "Dedicated account manager" },
                { text: "Custom development" },
                { text: "White-label solutions" },
                { text: "SLA guarantees" },
                { text: "Training & onboarding" }
              ]}
              ctaText="Contact Sales"
              popular={false}
            />
          </div>
        </div>
      </section>

      <PricingValueProposition />
    </div>
  );
}

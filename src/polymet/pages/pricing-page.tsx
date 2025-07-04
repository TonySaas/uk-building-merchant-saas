import HeroSection from "@/polymet/components/hero-section";
import PricingCard from "@/polymet/components/pricing-card";
import PricingValueProposition from "@/polymet/components/pricing-value-proposition";
import PricingComparisonTable from "@/polymet/components/pricing-comparison-table";
import RoiCalculator from "@/polymet/components/roi-calculator";
import PricingFaq from "@/polymet/components/pricing-faq";

// Define comprehensive feature comparison data
const comparisonFeatures = [
  {
    name: "Active Promotions",
    starter: "Up to 10",
    professional: "Up to 100", 
    enterprise: "Unlimited",
    enterprisePlus: "Unlimited",
    tooltip: "Number of concurrent promotional offers you can run"
  },
  {
    name: "Organization Connections",
    starter: "1 Organization",
    professional: "Up to 3 Organizations",
    enterprise: "Unlimited",
    enterprisePlus: "Unlimited",
    tooltip: "Connect with multiple buying groups like Toolbank, NMBS, BMN, BMF"
  },
  {
    name: "Analytics Dashboard",
    starter: true,
    professional: true,
    enterprise: true,
    enterprisePlus: true,
    tooltip: "Access to performance analytics and reporting"
  },
  {
    name: "Advanced Analytics & Reporting",
    starter: false,
    professional: true,
    enterprise: true,
    enterprisePlus: true,
    tooltip: "Detailed ROI analysis, cross-organization comparison, custom reports"
  },
  {
    name: "Customer Support",
    starter: "Email",
    professional: "Email + Phone",
    enterprise: "Priority Support",
    enterprisePlus: "Dedicated Account Manager",
    tooltip: "Level of customer support included"
  },
  {
    name: "Custom Integrations",
    starter: false,
    professional: "Standard APIs",
    enterprise: "Custom APIs",
    enterprisePlus: "Full Custom Development",
    tooltip: "Integration capabilities with your existing systems"
  },
  {
    name: "Multi-location Support",
    starter: false,
    professional: true,
    enterprise: true,
    enterprisePlus: true,
    tooltip: "Manage promotions across multiple store locations"
  },
  {
    name: "Custom Branding",
    starter: false,
    professional: "Basic",
    enterprise: "Advanced",
    enterprisePlus: "White-label",
    tooltip: "Customize the platform appearance with your branding"
  },
  {
    name: "Widget Customization",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Full Custom",
    enterprisePlus: "Full Custom + Dev Support",
    tooltip: "Customize website widgets for your merchant partners"
  },
  {
    name: "Training & Onboarding",
    starter: false,
    professional: "Self-service",
    enterprise: "Guided Setup",
    enterprisePlus: "Full Training Program",
    tooltip: "Level of onboarding and training support provided"
  },
  {
    name: "SLA Guarantee",
    starter: false,
    professional: false,
    enterprise: "99.9%",
    enterprisePlus: "99.99%",
    tooltip: "Uptime service level agreement"
  }
];

// Define FAQ data
const pricingFaqs = [
  {
    question: "How does the pricing work for multiple organizations?",
    answer: "Our pricing is per organization connection. The Professional plan includes up to 3 organization connections (e.g., Toolbank + NMBS + BMN), while Enterprise plans offer unlimited connections."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial for all plans. You can test all features with up to 5 promotional offers during the trial period."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "You retain full access to your data. We provide export tools to download all your promotional data, analytics, and merchant information. Data is retained for 90 days after cancellation."
  },
  {
    question: "Can I change plans later?",
    answer: "Absolutely! You can upgrade or downgrade at any time. Changes take effect at your next billing cycle, and we'll prorate any differences."
  },
  {
    question: "Do you offer custom pricing for large organizations?",
    answer: "Yes, we offer custom Enterprise Plus plans for large buying groups and organizations with specific requirements. Contact our sales team for a tailored quote."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, direct debit, and can arrange invoicing for Enterprise customers. All payments are processed securely through Stripe."
  },
  {
    question: "Is training included?",
    answer: "Training varies by plan. Professional includes self-service resources, Enterprise includes guided setup sessions, and Enterprise Plus includes comprehensive training programs for your team."
  },
  {
    question: "How does the ROI calculator work?",
    answer: "Our ROI calculator uses industry benchmarks and your specific data to estimate savings from print cost reduction, administrative efficiency, and increased promotional effectiveness. Results are based on real customer data."
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your business needs. Scale as you grow with our flexible pricing options designed for suppliers, merchants, and organizations of all sizes."
      />
      
      {/* Pricing Cards Section */}
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
                { text: "1 organization connection" },
                { text: "Basic analytics dashboard" },
                { text: "Email support" },
                { text: "Standard widget integration" },
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
                { text: "Up to 3 organization connections" },
                { text: "Advanced analytics & reporting" },
                { text: "Priority email & phone support" },
                { text: "Custom widget integrations" },
                { text: "Multi-location support" },
                { text: "Basic custom branding" }
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
                { text: "Unlimited organization connections" },
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

      {/* Value Proposition Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Why Choose BuildConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the digital transformation of the UK Building Merchant sector with our proven platform
            </p>
          </div>
          <PricingValueProposition />
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how much you could save by switching from traditional print promotions to our digital platform
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Compare Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed comparison of all features across our plans
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <PricingComparisonTable features={comparisonFeatures} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <PricingFaq
            title="Frequently Asked Questions"
            description="Everything you need to know about our pricing and platform"
            faqs={pricingFaqs}
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Transform Your Promotions?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join Toolbank, NMBS, BMN, BMF and other leading organizations in the digital transformation of building merchant promotions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-primary-foreground/20 px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
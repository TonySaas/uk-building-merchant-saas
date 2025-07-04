
import HeroSection from "@/polymet/components/hero-section";
import FeatureHighlights from "@/polymet/components/feature-highlights";
import IndustryImpactSection from "@/polymet/components/industry-impact-section";
import SupplyChainBenefits from "@/polymet/components/supply-chain-benefits";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Transforming UK Building Merchant Promotions"
        subtitle="From Print to Digital: Streamline Special Offers Across Multiple Organizations. BuildConnect bridges the gap between traditional print promotions and modern digital experiences, helping UK building merchants and suppliers reach more customers with less effort."
      />
      <FeatureHighlights />
      <IndustryImpactSection />
      <SupplyChainBenefits />
    </div>
  );
}

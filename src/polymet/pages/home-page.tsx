import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HeroSection from "@/polymet/components/hero-section";
import FeatureHighlights from "@/polymet/components/feature-highlights";
import TestimonialSection from "@/polymet/components/testimonial-section";
import UserTypeCards from "@/polymet/components/user-type-cards";
import OrganizationSelector from "@/polymet/components/organization-selector";
import SupplierSelector from "@/polymet/components/supplier-selector";
import MerchantSelector from "@/polymet/components/merchant-selector";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { SUPPLIERS, MERCHANTS } from "@/polymet/data/supplier-data";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [organizations, setOrganizations] = useState(ORGANIZATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('id, name, description, logo_url, logo_alt_text')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching organizations:', error);
        console.log('Falling back to static data');
        // Fall back to static data if Supabase fails
        setOrganizations(ORGANIZATIONS);
      } else if (data && data.length > 0) {
        console.log('Organizations fetched from Supabase:', data);
        // Transform Supabase data to match the component interface
        const transformedOrgs = data.map(org => ({
          id: org.name.toLowerCase(), // Use name as ID for compatibility
          name: org.name,
          description: org.description,
          logo: org.logo_url || undefined
        }));
        setOrganizations(transformedOrgs);
        console.log('Transformed organizations:', transformedOrgs);
      } else {
        console.log('No organizations found in Supabase, using static data');
        setOrganizations(ORGANIZATIONS);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setOrganizations(ORGANIZATIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeSelect = (userType: string) => {
    console.log(`Selected user type: ${userType}`);
    // In a real application, this would navigate to the appropriate page
    // or set user type in context/state
  };

  const handleOrganizationSelect = (organizationIds: string[]) => {
    console.log(`Selected organizations: ${organizationIds.join(', ')}`);
    // In a real application, this would update state or context
  };

  const handleSupplierSelect = (supplier: any) => {
    console.log(`Selected supplier: ${supplier.name}`);
    // In a real application, this would update state or context
  };

  const handleMerchantSelect = (merchant: any) => {
    console.log(`Selected merchant: ${merchant.name}`);
    // In a real application, this would update state or context
  };

  return (
    <>
      <HeroSection
        title="Connecting the UK Building Merchant Ecosystem"
        subtitle="A unified platform bringing together suppliers, merchants, and consumers through exclusive special offers and promotions"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Select Your Organization</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MerchantDeals.ai works with leading organizations in the UK building
            merchant industry. Select your organization to get started.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-muted-foreground">Loading organizations...</div>
          </div>
        ) : (
          <OrganizationSelector
            organizations={organizations}
            selectedOrganizationIds={[]}
            onSelect={handleOrganizationSelect}
          />
        )}
      </section>

      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Choose Your Supplier</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with top suppliers in the UK building industry and manage
              your special offers.
            </p>
          </div>
          <SupplierSelector
            suppliers={SUPPLIERS}
            onSelect={handleSupplierSelect}
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Select Your Merchant</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with merchants across the UK to promote your products and
            special offers.
          </p>
        </div>
        <MerchantSelector
          merchants={MERCHANTS}
          onSelect={handleMerchantSelect}
        />
      </section>

      <FeatureHighlights />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Choose Your Portal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MerchantDeals.ai offers tailored experiences for suppliers, merchants,
            and consumers. Select your role to access the features designed for
            you.
          </p>
        </div>
        <UserTypeCards onSelect={handleUserTypeSelect} />

        <div className="mt-12 text-center">
          <p className="mb-6 text-lg">
            Already have an account? Sign in to access your portal
          </p>
          <Link to="/login">
            <Button size="lg" className="px-8">
              Sign In
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Our Mission: Keeping the Tool Trade Local
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspired by Toolbank's ethos, MerchantDeals.ai is committed to
            supporting local building merchants and strengthening the UK's tool
            trade ecosystem through innovative digital solutions.
          </p>
        </div>
      </section>

      <TestimonialSection />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join MerchantDeals.ai today and become part of the UK's leading platform
            for building merchant special offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Create Account
              </Button>
            </Link>
            <Link to="/documentation">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

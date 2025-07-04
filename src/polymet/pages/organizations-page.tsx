
import OrganizationsHeroSection from "@/polymet/components/organizations-hero-section";
import OrganizationCard from "@/polymet/components/organization-card";
import TrustedOrganizations from "@/polymet/components/trusted-organizations";
import JoinNetworkSection from "@/polymet/components/join-network-section";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <OrganizationsHeroSection
        title="Building the Future Together"
        subtitle="Founding Organizations Leading Digital Transformation"
      />

      {/* Our Founding Members Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Founding Members</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leading organizations driving digital transformation in the UK building merchant sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {ORGANIZATIONS.map((org) => (
              <OrganizationCard
                key={org.id}
                name={org.name}
                logo={org.logo}
                description={org.description}
                website={org.website}
                campaigns={org.campaigns}
                membershipStatus="active"
                memberSince="2024"
                membershipLevel="enterprise"
                size="medium"
                variant="detailed"
                onViewDetails={() => window.open(org.website, '_blank')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Organizations Component */}
      <TrustedOrganizations />

      {/* Join Network Section */}
      <JoinNetworkSection 
        title="Join Our Network"
        description="Become part of the UK's largest digital transformation initiative for building merchants. Connect with leading organizations and access powerful promotional tools."
        buttonText="Apply to Join"
        onButtonClick={() => window.open('/contact', '_self')}
      />

      {/* Impact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Transforming the Building Merchant Industry
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Together, our founding organizations represent over 2,500 merchants, £53bn+ in combined sales, 
              and 200,000+ employees across the UK building materials sector.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Member Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">£53bn+</div>
                <div className="text-muted-foreground">Combined Sales</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">200,000+</div>
                <div className="text-muted-foreground">Employees Represented</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

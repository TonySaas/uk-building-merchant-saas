import AboutHeroSection from "@/polymet/components/about-hero-section";
import TeamSection from "@/polymet/components/team-section";
import StorySection from "@/polymet/components/story-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHeroSection
        title="About BuildConnect"
        subtitle="Transforming the UK building industry through innovative digital solutions"
        description="BuildConnect bridges the gap between traditional building merchant operations and modern digital experiences, helping suppliers, merchants, and consumers connect more effectively than ever before."
      />
      
      {/* Mission & Vision Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  To revolutionize how the UK building merchant industry operates by creating seamless 
                  digital connections between suppliers, merchants, and consumers.
                </p>
                <p className="text-muted-foreground">
                  We believe that technology should enhance, not replace, the personal relationships 
                  that form the backbone of the building trade. Our platform preserves the local, 
                  trust-based nature of the industry while unlocking new opportunities for growth.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  A future where every building merchant can compete on equal footing with large 
                  retailers through the power of collective digital transformation.
                </p>
                <p className="text-muted-foreground">
                  By working together with industry leaders like Toolbank, NMBS, BMN, and BMF, 
                  we're creating an ecosystem that benefits everyone - from the smallest local 
                  merchant to the largest trade customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Industry First</h3>
                <p className="text-muted-foreground">
                  We understand the building merchant industry inside and out, having grown from 
                  within it rather than imposing solutions from outside.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                <p className="text-muted-foreground">
                  Success comes from working together. We partner with organizations to create 
                  solutions that benefit the entire ecosystem.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
                <p className="text-muted-foreground">
                  Technology should make things easier, not more complicated. We focus on 
                  intuitive solutions that anyone can use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StorySection />
      <TeamSection />
    </div>
  );
}
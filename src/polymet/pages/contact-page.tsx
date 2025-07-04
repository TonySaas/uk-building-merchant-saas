
import ContactHeroSection from "@/polymet/components/contact-hero-section";
import ContactOptionsGrid from "@/polymet/components/contact-options-grid";
import ContactFaqSection from "@/polymet/components/contact-faq-section";
import OfficeLocationCard from "@/polymet/components/office-location-card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ContactHeroSection
        title="Get in Touch"
        subtitle="Ready to transform your promotional strategy? We're here to help."
      />

      {/* Contact Options Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How Can We Help?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to get in touch based on your needs
            </p>
          </div>
          <ContactOptionsGrid />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>
            
            {/* Simple Contact Information */}
            <div className="bg-white dark:bg-card rounded-lg p-8 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">General Inquiries</div>
                      <div className="text-muted-foreground">hello@merchantdeals.ai</div>
                      <div className="text-muted-foreground">+44 20 1234 5678</div>
                    </div>
                    <div>
                      <div className="font-medium">Sales Team</div>
                      <div className="text-muted-foreground">sales@merchantdeals.ai</div>
                      <div className="text-muted-foreground">+44 20 1234 5679</div>
                    </div>
                    <div>
                      <div className="font-medium">Support Team</div>
                      <div className="text-muted-foreground">support@merchantdeals.ai</div>
                      <div className="text-muted-foreground">+44 20 1234 5680</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-muted-foreground">9:00 AM - 6:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-muted-foreground">10:00 AM - 4:00 PM GMT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Locations</h2>
            <p className="text-lg text-muted-foreground">
              Find us across the UK
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <OfficeLocationCard
              name="London Office"
              address="123 Building Street"
              city="London"
              postalCode="EC1A 1AA"
              country="United Kingdom"
              phone="+44 20 1234 5678"
              email="london@merchantdeals.ai"
              isPrimary={true}
            />
            <OfficeLocationCard
              name="Manchester Office" 
              address="456 Merchant Road"
              city="Manchester"
              postalCode="M1 1AA"
              country="United Kingdom"
              phone="+44 161 1234 5678"
              email="manchester@merchantdeals.ai"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFaqSection />

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join Toolbank, NMBS, BMN, BMF and other leading organizations in transforming UK building merchant promotions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors">
              Schedule a Demo
            </button>
            <button className="border border-primary-foreground/20 px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

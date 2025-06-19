
import PageHeader from "@/polymet/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          logoSrc="/placeholder.svg"
          logoAlt="BuildConnect Logo"
          appName="BuildConnect"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Features</h1>
            <p className="text-xl text-muted-foreground">
              Discover the powerful features that make BuildConnect the perfect platform for your business
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This page is currently under development. We're working on showcasing all the amazing features 
                that BuildConnect has to offer. Please check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

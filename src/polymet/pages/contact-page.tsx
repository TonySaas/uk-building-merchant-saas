
import PageHeader from "@/polymet/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
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
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team - we'd love to hear from you
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This page is currently under development. We're working on creating easy ways for you to 
                reach out to our team for support, questions, or feedback. Please check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

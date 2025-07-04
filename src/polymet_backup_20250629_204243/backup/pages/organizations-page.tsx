
import PageHeader from "@/polymet/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrganizationsPage() {
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
            <h1 className="text-4xl font-bold mb-4">Organizations</h1>
            <p className="text-xl text-muted-foreground">
              Learn how organizations leverage BuildConnect to streamline their operations
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This page is currently under development. We're working on showcasing how different organizations 
                use BuildConnect to enhance their business processes. Please check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

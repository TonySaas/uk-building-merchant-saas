import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import QuickStatsBar from "@/polymet/components/quick-stats-bar";
import ContentLibraryGrid from "@/polymet/components/content-library-grid";
import DistributionWizard from "@/polymet/components/distribution-wizard";
import PerformanceAnalytics from "@/polymet/components/performance-analytics";
import ChannelManagementHub from "@/polymet/components/channel-management-hub";
import TemplateAutomationCenter from "@/polymet/components/template-automation-center";
import { CONTENT_DATA } from "@/polymet/data/content-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentDistributionHubPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(CONTENT_DATA[0]);
  const [activeTab, setActiveTab] = useState("content-library");

  const handleNewCampaign = () => {
    console.log("New campaign button clicked");
  };

  const handleDistribute = (content: any) => {
    setSelectedContent(content);
    setIsWizardOpen(true);
  };

  const handlePreview = (content: any) => {
    console.log("Preview content:", content);
  };

  const handleEdit = (content: any) => {
    console.log("Edit content:", content);
  };

  const handleAnalytics = (content: any) => {
    console.log("View analytics for content:", content);
    setActiveTab("performance");
  };

  const handleChannelConnect = (channelId: string) => {
    console.log("Connect channel:", channelId);
  };

  const handleChannelReconnect = (channelId: string) => {
    console.log("Reconnect channel:", channelId);
  };

  const handleChannelSettings = (channelId: string) => {
    console.log("Open settings for channel:", channelId);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Distribution Hub</h1>
          <p className="text-muted-foreground mt-1">
            Publish your content across all channels
          </p>
        </div>
        <Button onClick={handleNewCampaign}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <QuickStatsBar
        totalContent={CONTENT_DATA.length}
        activeCampaigns={5}
        reachThisMonth={1250000}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content-library">Content Library</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="channels">Channel Management</TabsTrigger>
          <TabsTrigger value="templates">Templates & Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="content-library">
          <ContentLibraryGrid
            contentItems={CONTENT_DATA}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDistribute={handleDistribute}
            onAnalytics={handleAnalytics}
            onNewCampaign={handleNewCampaign}
          />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceAnalytics />
        </TabsContent>

        <TabsContent value="channels">
          <ChannelManagementHub
            onConnect={handleChannelConnect}
            onReconnect={handleChannelReconnect}
            onSettings={handleChannelSettings}
          />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateAutomationCenter />
        </TabsContent>
      </Tabs>

      <DistributionWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        content={selectedContent}
      />
    </div>
  );
}

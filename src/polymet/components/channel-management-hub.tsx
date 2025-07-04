import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  LinkIcon,
  PlusIcon,
  RefreshCwIcon,
  SettingsIcon,
  XCircleIcon,
} from "lucide-react";
import { CHANNEL_DATA } from "@/polymet/data/content-data";

interface ChannelAccount {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

interface ChannelManagementHubProps {
  onConnect: (channelId: string) => void;
  onReconnect: (channelId: string) => void;
  onSettings: (channelId: string) => void;
}

export default function ChannelManagementHub({
  onConnect,
  onReconnect,
  onSettings,
}: ChannelManagementHubProps) {
  const [activeTab, setActiveTab] = useState("social-media");

  const allChannels = {
    "social-media": CHANNEL_DATA.socialMedia,
    "building-merchant": CHANNEL_DATA.buildingMerchant,
    "direct-marketing": CHANNEL_DATA.directMarketing,
    "trade-publications": CHANNEL_DATA.tradePublications,
  };

  const tabNames = {
    "social-media": "Social Media",
    "building-merchant": "Building Merchant",
    "direct-marketing": "Direct Marketing",
    "trade-publications": "Trade Publications",
  };

  const getConnectedCount = (channels: ChannelAccount[]) => {
    return channels.filter((channel) => channel.connected).length;
  };

  const renderChannelCard = (channel: ChannelAccount) => {
    return (
      <Card key={channel.id} className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={channel.icon}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{channel.name}</h3>
                <div className="flex items-center mt-1">
                  {channel.connected ? (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    >
                      <AlertCircleIcon className="h-3 w-3 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div>
              {channel.connected ? (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSettings(channel.id)}
                  >
                    <SettingsIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReconnect(channel.id)}
                  >
                    <RefreshCwIcon className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConnect(channel.id)}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              )}
            </div>
          </div>

          {channel.connected && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>API Usage</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-1.5" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Channel Management</h2>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Channel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(allChannels).map(([key, channels]) => {
          const connectedCount = getConnectedCount(channels);
          const totalCount = channels.length;

          return (
            <Card
              key={key}
              className={activeTab === key ? "ring-2 ring-primary" : ""}
            >
              <CardContent
                className="p-4 cursor-pointer"
                onClick={() => setActiveTab(key)}
              >
                <h3 className="font-medium">
                  {tabNames[key as keyof typeof tabNames]}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-2xl font-bold">
                    {connectedCount}/{totalCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
                <Progress
                  value={(connectedCount / totalCount) * 100}
                  className="h-1.5 mt-2"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
          <TabsTrigger value="building-merchant">Building Merchant</TabsTrigger>
          <TabsTrigger value="direct-marketing">Direct Marketing</TabsTrigger>
          <TabsTrigger value="trade-publications">
            Trade Publications
          </TabsTrigger>
        </TabsList>

        {Object.entries(allChannels).map(([key, channels]) => (
          <TabsContent key={key} value={key} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map((channel) => renderChannelCard(channel))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

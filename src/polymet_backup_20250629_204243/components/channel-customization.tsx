import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClockIcon, ShapesIcon as HashtagIcon, UsersIcon } from "lucide-react";
import { CHANNEL_DATA } from "@/polymet/data/content-data";
import { ContentItem } from "@/polymet/data/content-data";

interface ChannelCustomizationProps {
  content: ContentItem;
  selectedChannels: string[];
  onComplete: (
    customizations: Record<string, ChannelCustomizationData>
  ) => void;
}

export interface ChannelCustomizationData {
  caption: string;
  hashtags: string[];
  postingTime: string;
  audience?: string;
}

export default function ChannelCustomization({
  content,
  selectedChannels,
  onComplete,
}: ChannelCustomizationProps) {
  const allChannels = [
    ...CHANNEL_DATA.socialMedia,
    ...CHANNEL_DATA.buildingMerchant,
    ...CHANNEL_DATA.directMarketing,
    ...CHANNEL_DATA.tradePublications,
  ];

  const selectedChannelObjects = allChannels.filter((channel) =>
    selectedChannels.includes(channel.id)
  );

  const [activeTab, setActiveTab] = useState(
    selectedChannelObjects.length > 0 ? selectedChannelObjects[0].id : ""
  );

  // Generate default customizations for all selected channels
  const generateDefaultCustomization = (
    channelId: string
  ): ChannelCustomizationData => {
    const defaultHashtags = content.tags || [];
    const suggestedHashtags = [
      ...defaultHashtags,
      "tools",
      "construction",
      "diy",
      "professional",
      "quality",
    ];

    return {
      caption: `Check out our ${content.title}! Perfect for professional builders and DIY enthusiasts alike.`,
      hashtags: suggestedHashtags.slice(0, 5),
      postingTime: "optimal",
      audience: "all",
    };
  };

  const [customizations, setCustomizations] = useState<
    Record<string, ChannelCustomizationData>
  >(
    selectedChannels.reduce(
      (acc, channelId) => {
        acc[channelId] = generateDefaultCustomization(channelId);
        return acc;
      },
      {} as Record<string, ChannelCustomizationData>
    )
  );

  const handleCustomizationChange = (
    channelId: string,
    field: keyof ChannelCustomizationData,
    value: string | string[]
  ) => {
    setCustomizations((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [field]: value,
      },
    }));
  };

  const handleHashtagsChange = (channelId: string, hashtagsString: string) => {
    const hashtags = hashtagsString
      .split(/[\s,]+/)
      .map((tag) => (tag.startsWith("#") ? tag.substring(1) : tag))
      .filter((tag) => tag.length > 0);

    handleCustomizationChange(channelId, "hashtags", hashtags);
  };

  const getChannelIcon = (channelId: string) => {
    const channel = allChannels.find((c) => c.id === channelId);
    return channel ? channel.icon : "";
  };

  const getChannelName = (channelId: string) => {
    const channel = allChannels.find((c) => c.id === channelId);
    return channel ? channel.name : channelId;
  };

  const handleSaveAll = () => {
    onComplete(customizations);
  };

  if (selectedChannels.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No channels selected. Please go back and select channels.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Customize for Each Channel</h3>
        <Button onClick={handleSaveAll}>Save All Customizations</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto h-auto p-1 space-x-1">
            {selectedChannelObjects.map((channel) => (
              <TabsTrigger
                key={channel.id}
                value={channel.id}
                className="flex items-center px-3 py-1.5 h-auto"
              >
                <img
                  src={channel.icon}
                  alt={channel.name}
                  className="w-5 h-5 mr-2 rounded-full"
                />

                <span>{channel.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {selectedChannels.map((channelId) => (
          <TabsContent key={channelId} value={channelId} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Caption/Description
                  </label>
                  <Textarea
                    value={customizations[channelId]?.caption || ""}
                    onChange={(e) =>
                      handleCustomizationChange(
                        channelId,
                        "caption",
                        e.target.value
                      )
                    }
                    placeholder="Enter caption or description..."
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block flex items-center">
                    <HashtagIcon className="h-4 w-4 mr-1" />
                    Hashtags
                  </label>
                  <Input
                    value={customizations[channelId]?.hashtags
                      .map((tag) => `#${tag}`)
                      .join(" ")}
                    onChange={(e) =>
                      handleHashtagsChange(channelId, e.target.value)
                    }
                    placeholder="Enter hashtags separated by spaces..."
                  />

                  <div className="flex flex-wrap gap-1 mt-2">
                    {customizations[channelId]?.hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Posting Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        customizations[channelId]?.postingTime === "optimal"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        handleCustomizationChange(
                          channelId,
                          "postingTime",
                          "optimal"
                        )
                      }
                      className="justify-start"
                    >
                      Optimal Time (AI Suggested)
                    </Button>
                    <Button
                      variant={
                        customizations[channelId]?.postingTime === "custom"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        handleCustomizationChange(
                          channelId,
                          "postingTime",
                          "custom"
                        )
                      }
                      className="justify-start"
                    >
                      Custom Time
                    </Button>
                  </div>
                  {customizations[channelId]?.postingTime === "optimal" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI suggests posting at 10:30 AM on Tuesday for best
                      engagement.
                    </p>
                  )}
                  {customizations[channelId]?.postingTime === "custom" && (
                    <Input
                      type="datetime-local"
                      className="mt-2"
                      onChange={(e) =>
                        handleCustomizationChange(
                          channelId,
                          "postingTime",
                          e.target.value
                        )
                      }
                    />
                  )}
                </div>

                {(channelId === "facebook" ||
                  channelId === "linkedin" ||
                  channelId === "email") && (
                  <div>
                    <label className="text-sm font-medium mb-1 block flex items-center">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      Audience Targeting
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={
                          customizations[channelId]?.audience === "all"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handleCustomizationChange(
                            channelId,
                            "audience",
                            "all"
                          )
                        }
                        className="justify-start"
                      >
                        All Audience
                      </Button>
                      <Button
                        variant={
                          customizations[channelId]?.audience === "targeted"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          handleCustomizationChange(
                            channelId,
                            "audience",
                            "targeted"
                          )
                        }
                        className="justify-start"
                      >
                        Targeted
                      </Button>
                    </div>
                    {customizations[channelId]?.audience === "targeted" && (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Target audience: Professional builders, DIY
                          enthusiasts, 25-55 years old
                        </p>
                        <Button variant="outline" size="sm">
                          Edit Targeting
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={getChannelIcon(channelId)}
                      alt={getChannelName(channelId)}
                      className="w-6 h-6 rounded-full"
                    />

                    <h4 className="font-medium">
                      {getChannelName(channelId)} Preview
                    </h4>
                  </div>

                  <div className="rounded-md border overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />

                      {content.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-background">
                      <p className="text-sm mb-2">
                        {customizations[channelId]?.caption}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {customizations[channelId]?.hashtags.map(
                          (tag, index) => (
                            <span
                              key={index}
                              className="text-xs text-blue-600 dark:text-blue-400"
                            >
                              #{tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>
                      <strong>Posting time:</strong>{" "}
                      {customizations[channelId]?.postingTime === "optimal"
                        ? "Optimal time (AI suggested: 10:30 AM Tuesday)"
                        : "Custom time"}
                    </p>
                    {customizations[channelId]?.audience && (
                      <p>
                        <strong>Audience:</strong>{" "}
                        {customizations[channelId]?.audience === "all"
                          ? "All audience"
                          : "Targeted audience"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

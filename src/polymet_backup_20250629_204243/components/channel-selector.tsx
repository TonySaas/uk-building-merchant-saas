import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CHANNEL_DATA } from "@/polymet/data/content-data";
import { AlertCircleIcon } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

interface ChannelSelectorProps {
  onChannelsSelected: (channels: string[]) => void;
  initialSelectedChannels?: string[];
}

export default function ChannelSelector({
  onChannelsSelected,
  initialSelectedChannels = [],
}: ChannelSelectorProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    initialSelectedChannels
  );

  const handleChannelToggle = (channelId: string, checked: boolean) => {
    let updatedChannels: string[];

    if (checked) {
      updatedChannels = [...selectedChannels, channelId];
    } else {
      updatedChannels = selectedChannels.filter((id) => id !== channelId);
    }

    setSelectedChannels(updatedChannels);
    onChannelsSelected(updatedChannels);
  };

  const renderChannelGroup = (title: string, channels: Channel[]) => {
    return (
      <AccordionItem value={title.toLowerCase().replace(/\s+/g, "-")}>
        <AccordionTrigger className="hover:no-underline">
          <span className="text-base font-medium">{title}</span>
          <Badge variant="outline" className="ml-2">
            {channels.length}
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 mt-2">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent"
              >
                <Checkbox
                  id={`channel-${channel.id}`}
                  checked={selectedChannels.includes(channel.id)}
                  onCheckedChange={(checked) =>
                    handleChannelToggle(channel.id, checked === true)
                  }
                  disabled={!channel.connected}
                />

                <div className="flex items-center flex-1">
                  <img
                    src={channel.icon}
                    alt={channel.name}
                    className="w-6 h-6 mr-3 rounded-full"
                  />

                  <label
                    htmlFor={`channel-${channel.id}`}
                    className={`text-sm flex-1 cursor-pointer ${!channel.connected ? "text-muted-foreground" : ""}`}
                  >
                    {channel.name}
                  </label>
                  {!channel.connected && (
                    <div className="flex items-center text-amber-500 dark:text-amber-400">
                      <AlertCircleIcon className="h-4 w-4 mr-1" />

                      <span className="text-xs">Not connected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Select Distribution Channels</h3>
        <Badge variant="secondary">{selectedChannels.length} selected</Badge>
      </div>

      <Accordion type="multiple" defaultValue={["social-media"]}>
        {renderChannelGroup("Social Media", CHANNEL_DATA.socialMedia)}
        {renderChannelGroup(
          "Building Merchant Platforms",
          CHANNEL_DATA.buildingMerchant
        )}
        {renderChannelGroup(
          "Email & Direct Marketing",
          CHANNEL_DATA.directMarketing
        )}
        {renderChannelGroup(
          "Trade Publications",
          CHANNEL_DATA.tradePublications
        )}
      </Accordion>

      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedChannels([]);
            onChannelsSelected([]);
          }}
        >
          Clear All
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            const allConnectedChannels = [
              ...CHANNEL_DATA.socialMedia,
              ...CHANNEL_DATA.buildingMerchant,
              ...CHANNEL_DATA.directMarketing,
              ...CHANNEL_DATA.tradePublications,
            ]
              .filter((channel) => channel.connected)
              .map((channel) => channel.id);

            setSelectedChannels(allConnectedChannels);
            onChannelsSelected(allConnectedChannels);
          }}
        >
          Select All Connected
        </Button>
      </div>
    </div>
  );
}

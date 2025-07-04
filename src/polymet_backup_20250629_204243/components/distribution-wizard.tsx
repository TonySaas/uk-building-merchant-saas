import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import { ContentItem } from "@/polymet/data/content-data";
import ChannelSelector from "@/polymet/components/channel-selector";
import ChannelCustomization, {
  ChannelCustomizationData,
} from "@/polymet/components/channel-customization";
import CampaignScheduler, {
  ScheduleData,
} from "@/polymet/components/campaign-scheduler";

interface DistributionWizardProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentItem;
}

export default function DistributionWizard({
  isOpen,
  onClose,
  content,
}: DistributionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState<
    Record<string, ChannelCustomizationData>
  >({});
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);

  const steps = [
    { id: 1, name: "Content" },
    { id: 2, name: "Channels" },
    { id: 3, name: "Customize" },
    { id: 4, name: "Schedule" },
  ];

  const handleChannelsSelected = (channels: string[]) => {
    setSelectedChannels(channels);
  };

  const handleCustomizationComplete = (
    customizationData: Record<string, ChannelCustomizationData>
  ) => {
    setCustomizations(customizationData);
    goToNextStep();
  };

  const handleScheduleComplete = (data: ScheduleData) => {
    setScheduleData(data);
    // In a real application, you would submit the distribution job here
    console.log("Distribution complete", {
      content,
      channels: selectedChannels,
      customizations,
      schedule: data,
    });

    // Show success step
    setCurrentStep(5);
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="aspect-video max-h-[300px] overflow-hidden rounded-lg">
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold">{content.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Type:{" "}
                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
              </p>
              {content.campaign && (
                <p className="text-sm text-muted-foreground">
                  Campaign: {content.campaign}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={goToNextStep}>
                Choose Channels
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <ChannelSelector
              onChannelsSelected={handleChannelsSelected}
              initialSelectedChannels={content.channels || []}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPrevStep}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={selectedChannels.length === 0}
              >
                Customize Channels
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <ChannelCustomization
              content={content}
              selectedChannels={selectedChannels}
              onComplete={handleCustomizationComplete}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPrevStep}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <CampaignScheduler
              content={content}
              selectedChannels={selectedChannels}
              onSchedule={handleScheduleComplete}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={goToPrevStep}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="py-12 text-center space-y-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h3 className="text-xl font-semibold">Distribution Complete!</h3>
              <p className="text-muted-foreground mt-2">
                Your content has been{" "}
                {scheduleData?.scheduleType === "now"
                  ? "published"
                  : "scheduled"}{" "}
                to {selectedChannels.length} channels.
              </p>
            </div>

            <div className="pt-4">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Content Distribution</DialogTitle>
          <DialogDescription>
            Distribute your content across multiple channels in a few simple
            steps.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-8">
            <Tabs value={currentStep.toString()} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                {steps.map((step) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id.toString()}
                    disabled={true}
                    className={
                      currentStep >= step.id
                        ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        : ""
                    }
                  >
                    {step.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {renderStepContent()}
        </div>

        {currentStep === 5 && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

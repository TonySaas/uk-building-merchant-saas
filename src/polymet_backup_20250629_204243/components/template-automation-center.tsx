import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowRightIcon,
  CalendarIcon,
  CopyIcon,
  FileTextIcon,
  FolderIcon,
  GiftIcon,
  PlusIcon,
  TagIcon,
  ZapIcon,
} from "lucide-react";

interface TemplateCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  steps: number;
  channels: string[];
}

interface AutomationRule {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  conditions: string[];
  actions: string[];
}

export default function TemplateAutomationCenter() {
  const [activeTab, setActiveTab] = useState("templates");

  const templates: TemplateCard[] = [
    {
      id: "new-product",
      title: "New Product Launch",
      description:
        "A complete sequence for introducing new products to the market",
      icon: TagIcon,
      steps: 5,
      channels: ["Facebook", "Instagram", "Email", "LinkedIn"],
    },
    {
      id: "seasonal",
      title: "Seasonal Promotion",
      description: "Promote seasonal offers across multiple channels",
      icon: CalendarIcon,
      steps: 3,
      channels: ["Facebook", "Email", "SMS"],
    },
    {
      id: "trade-show",
      title: "Trade Show Follow-up",
      description: "Engage with leads and connections after trade shows",
      icon: FileTextIcon,
      steps: 4,
      channels: ["Email", "LinkedIn", "Trade Publications"],
    },
    {
      id: "special-offer",
      title: "Special Offer Announcement",
      description: "Announce limited-time offers and promotions",
      icon: GiftIcon,
      steps: 3,
      channels: ["Email", "SMS", "Facebook", "Instagram"],
    },
  ];

  const automationRules: AutomationRule[] = [
    {
      id: "auto-post",
      title: "Auto-post New Content",
      description:
        "Automatically post to specific channels when new content is approved",
      enabled: true,
      conditions: ["Content is approved", "Content type is any"],
      actions: [
        "Post to Facebook",
        "Post to LinkedIn",
        "Post to Email newsletter",
      ],
    },
    {
      id: "cross-post",
      title: "Cross-post Video Content",
      description:
        "Convert and post videos as image carousels on image-only platforms",
      enabled: false,
      conditions: ["Content type is video", "Duration is under 2 minutes"],
      actions: [
        "Convert to image carousel",
        "Post to Instagram",
        "Post to LinkedIn",
      ],
    },
    {
      id: "auto-hashtag",
      title: "Automatic Hashtag Application",
      description: "Apply relevant hashtags based on product category",
      enabled: true,
      conditions: [
        "Content has product category",
        "Platform supports hashtags",
      ],

      actions: ["Apply category-specific hashtags", "Apply trending hashtags"],
    },
    {
      id: "repost",
      title: "Performance-based Redistribution",
      description: "Repost high-performing content to maximize reach",
      enabled: false,
      conditions: ["Content engagement > 5%", "Content is older than 30 days"],
      actions: ["Repost to original channels", "Add 'Popular' badge"],
    },
  ];

  const renderTemplateCard = (template: TemplateCard) => {
    const Icon = template.icon;

    return (
      <Card key={template.id} className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{template.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            {template.description}
          </p>
          <div className="flex items-center mt-4 text-sm">
            <span className="font-medium">{template.steps} steps</span>
            <ArrowRightIcon className="h-3 w-3 mx-2 text-muted-foreground" />

            <div className="flex flex-wrap gap-1">
              {template.channels.map((channel, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {channel}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-between">
          <Button variant="ghost" size="sm">
            <CopyIcon className="h-3.5 w-3.5 mr-1" />
            Duplicate
          </Button>
          <Button size="sm">Use Template</Button>
        </CardFooter>
      </Card>
    );
  };

  const renderAutomationRule = (rule: AutomationRule) => {
    return (
      <Card key={rule.id} className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{rule.title}</CardTitle>
            <Switch checked={rule.enabled} />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4">
            {rule.description}
          </p>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Conditions
              </Label>
              <ul className="text-sm space-y-1">
                {rule.conditions.map((condition, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Actions
              </Label>
              <ul className="text-sm space-y-1">
                {rule.actions.map((action, index) => (
                  <li key={index} className="flex items-center">
                    <ZapIcon className="h-3 w-3 mr-2 text-amber-500" />

                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-end">
          <Button size="sm">Edit Rule</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Templates & Automation</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FolderIcon className="h-4 w-4 mr-2" />
            Manage Templates
          </Button>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Campaign Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => renderTemplateCard(template))}
          </div>

          <div className="mt-6 p-4 border border-dashed rounded-lg flex flex-col items-center justify-center text-center">
            <Button variant="ghost" className="h-16 w-16 rounded-full mb-2">
              <PlusIcon className="h-8 w-8 text-muted-foreground" />
            </Button>
            <h3 className="font-medium">Create Custom Template</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Build a custom campaign template tailored to your specific needs
            </p>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationRules.map((rule) => renderAutomationRule(rule))}
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">
                Create New Automation Rule
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    placeholder="e.g., Auto-post to social media"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>When this happens...</Label>
                    <Card className="mt-2">
                      <CardContent className="p-4">
                        <Button variant="outline" className="w-full">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Trigger Condition
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Label>Do this...</Label>
                    <Card className="mt-2">
                      <CardContent className="p-4">
                        <Button variant="outline" className="w-full">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Action
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Create Automation Rule</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

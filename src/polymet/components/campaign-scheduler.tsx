import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, RepeatIcon, ZapIcon } from "lucide-react";
import { format } from "date-fns";
import { ContentItem } from "@/polymet/data/content-data";

interface CampaignSchedulerProps {
  content: ContentItem;
  selectedChannels: string[];
  onSchedule: (scheduleData: ScheduleData) => void;
}

export interface ScheduleData {
  scheduleType: "now" | "optimal" | "custom" | "recurring";
  date?: Date;
  time?: string;
  recurringPattern?: string;
  recurringDays?: string[];
  recurringTime?: string;
  templateName?: string;
}

export default function CampaignScheduler({
  content,
  selectedChannels,
  onSchedule,
}: CampaignSchedulerProps) {
  const [scheduleType, setScheduleType] = useState<
    "now" | "optimal" | "custom" | "recurring"
  >("now");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [recurringPattern, setRecurringPattern] = useState("weekly");
  const [recurringDays, setRecurringDays] = useState<string[]>(["monday"]);
  const [recurringTime, setRecurringTime] = useState("12:00");
  const [templateName, setTemplateName] = useState("");
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const handleDayToggle = (day: string) => {
    setRecurringDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day]
    );
  };

  const handleSchedule = () => {
    const scheduleData: ScheduleData = {
      scheduleType,
    };

    if (scheduleType === "custom") {
      scheduleData.date = date;
      scheduleData.time = time;
    } else if (scheduleType === "recurring") {
      scheduleData.recurringPattern = recurringPattern;
      scheduleData.recurringDays = recurringDays;
      scheduleData.recurringTime = recurringTime;
    }

    if (saveAsTemplate) {
      scheduleData.templateName = templateName || `${content.title} Template`;
    }

    onSchedule(scheduleData);
  };

  const renderScheduleSummary = () => {
    switch (scheduleType) {
      case "now":
        return "Content will be published immediately across all selected channels.";
      case "optimal":
        return "Content will be published at the AI-recommended optimal time for each channel (typically between 9am-11am).";
      case "custom":
        return `Content will be published on ${date ? format(date, "MMMM d, yyyy") : ""} at ${time}.`;
      case "recurring":
        return `Content will be published ${recurringPattern === "weekly" ? "weekly" : "monthly"} on ${recurringDays.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")} at ${recurringTime}.`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Schedule Your Campaign</h3>
        <Badge variant="outline">
          {selectedChannels.length} channel
          {selectedChannels.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="options">Scheduling Options</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="flex justify-center space-x-2">
            <div className="w-32">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <Button
              className="mt-8"
              onClick={() => {
                setScheduleType("custom");
                handleSchedule();
              }}
            >
              Schedule for This Time
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="options" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer ${scheduleType === "now" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setScheduleType("now")}
            >
              <CardContent className="p-4 flex items-start space-x-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <ZapIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">Post immediately</h4>
                  <p className="text-sm text-muted-foreground">
                    Publish your content right now across all selected channels.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer ${scheduleType === "optimal" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setScheduleType("optimal")}
            >
              <CardContent className="p-4 flex items-start space-x-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <ZapIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium">Schedule for optimal time</h4>
                  <p className="text-sm text-muted-foreground">
                    AI will determine the best time to post for each channel.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer ${scheduleType === "custom" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setScheduleType("custom")}
            >
              <CardContent className="p-4 flex items-start space-x-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                  <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium">Custom date & time</h4>
                  <p className="text-sm text-muted-foreground">
                    Select a specific date and time to publish your content.
                  </p>

                  {scheduleType === "custom" && (
                    <div className="mt-3 flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[180px] justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />

                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>

                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />

                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-24"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer ${scheduleType === "recurring" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setScheduleType("recurring")}
            >
              <CardContent className="p-4 flex items-start space-x-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
                  <RepeatIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium">Recurring posts</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule content to post on a regular basis.
                  </p>

                  {scheduleType === "recurring" && (
                    <div className="mt-3 space-y-3">
                      <Select
                        value={recurringPattern}
                        onValueChange={setRecurringPattern}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>

                      <div>
                        <Label className="text-xs mb-1 block">
                          Days of the week
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "monday",
                            "tuesday",
                            "wednesday",
                            "thursday",
                            "friday",
                            "saturday",
                            "sunday",
                          ].map((day) => (
                            <Badge
                              key={day}
                              variant={
                                recurringDays.includes(day)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer"
                              onClick={() => handleDayToggle(day)}
                            >
                              {day.substring(0, 3)}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />

                        <Input
                          type="time"
                          value={recurringTime}
                          onChange={(e) => setRecurringTime(e.target.value)}
                          className="w-24"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="save-template"
              checked={saveAsTemplate}
              onCheckedChange={setSaveAsTemplate}
            />

            <Label htmlFor="save-template">
              Save as template for future use
            </Label>
          </div>

          {saveAsTemplate && (
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="e.g., New Product Launch Sequence"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Schedule Summary</h4>
        <p className="text-sm">{renderScheduleSummary()}</p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSchedule}>
          {scheduleType === "now" ? "Publish Now" : "Schedule Campaign"}
        </Button>
      </div>
    </div>
  );
}

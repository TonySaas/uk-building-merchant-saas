"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MailIcon, CheckIcon, AlertCircleIcon, LoaderIcon } from "lucide-react";
import { BLOG_CATEGORIES } from "@/polymet/data/blog-post-data";

interface NewsletterSubscriptionProps {
  className?: string;
}

export default function NewsletterSubscription({
  className = "",
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("weekly");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
            <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Thank You for Subscribing!
          </h3>
          <p className="text-muted-foreground">
            You've successfully subscribed to our Weekly Industry Digest. Check
            your inbox soon for the latest news and updates.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MailIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Weekly Industry Digest</h3>
            <p className="text-sm text-muted-foreground">
              Stay informed with the latest developments
            </p>
          </div>
        </div>

        {status === "error" && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md flex items-center gap-2 mb-4">
            <AlertCircleIcon className="h-4 w-4" />

            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="mb-2 block">Delivery frequency</Label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="weekly"
                  name="frequency"
                  checked={frequency === "weekly"}
                  onChange={() => setFrequency("weekly")}
                  disabled={status === "loading"}
                  className="text-primary"
                />

                <Label htmlFor="weekly" className="text-sm font-normal">
                  Weekly
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="monthly"
                  name="frequency"
                  checked={frequency === "monthly"}
                  onChange={() => setFrequency("monthly")}
                  disabled={status === "loading"}
                  className="text-primary"
                />

                <Label htmlFor="monthly" className="text-sm font-normal">
                  Monthly
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Topics you're interested in</Label>
            <div className="grid grid-cols-2 gap-2">
              {BLOG_CATEGORIES.slice(1).map((topic) => (
                <div key={topic} className="flex items-center gap-2">
                  <Checkbox
                    id={`topic-${topic}`}
                    checked={selectedTopics.includes(topic)}
                    onCheckedChange={() => handleTopicToggle(topic)}
                    disabled={status === "loading"}
                  />

                  <Label
                    htmlFor={`topic-${topic}`}
                    className="text-sm font-normal"
                  >
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe to Newsletter"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you agree to our Privacy Policy and consent to
            receive industry updates from BuildConnect.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

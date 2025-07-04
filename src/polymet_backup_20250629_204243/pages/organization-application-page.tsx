import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, LoaderIcon, ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function OrganizationApplicationPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate API call
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <Link
          to="/organizations"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Organizations
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              Join BuildConnect Network
            </CardTitle>
            <CardDescription>
              Complete this form to apply to join our network of organizations.
              Our team will review your application and contact you within 2
              business days.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  Application Received
                </h3>
                <p className="text-center text-muted-foreground max-w-md mb-8">
                  Thank you for your interest in BuildConnect. Our team will
                  review your application and contact you shortly.
                </p>
                <Button asChild>
                  <Link to="/organizations">Return to Organizations</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Organization Details</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        placeholder="Enter your organization name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying-group">
                            Buying Group
                          </SelectItem>
                          <SelectItem value="trade-association">
                            Trade Association
                          </SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website *</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourorganization.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="memberCount">
                        Number of Members/Locations
                      </Label>
                      <Input
                        id="memberCount"
                        type="number"
                        placeholder="e.g. 250"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Current Promotional Methods
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="currentMethods">
                      How do you currently manage promotions? *
                    </Label>
                    <Textarea
                      id="currentMethods"
                      placeholder="Describe your current promotional strategies and methods"
                      required
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">
                      What challenges are you facing with your current approach?
                    </Label>
                    <Textarea
                      id="challenges"
                      placeholder="Describe any challenges or pain points"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Integration Requirements
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="systems">
                        What systems would you need to integrate with?
                      </Label>
                      <Input
                        id="systems"
                        placeholder="e.g. CRM, ERP, POS systems"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataFormats">
                        What data formats do you currently use?
                      </Label>
                      <Input
                        id="dataFormats"
                        placeholder="e.g. CSV, XML, API"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        placeholder="Full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        placeholder="Your position"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@organization.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any other information you'd like to share"
                    className="min-h-[100px]"
                  />
                </div>

                <CardFooter className="px-0 pt-4 flex justify-between">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/organizations">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={formState === "submitting"}>
                    {formState === "submitting" ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </CardFooter>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

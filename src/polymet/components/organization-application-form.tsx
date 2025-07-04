import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { CheckIcon, LoaderIcon } from "lucide-react";

export interface OrganizationApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrganizationApplicationForm({
  open,
  onOpenChange,
}: OrganizationApplicationFormProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      // Reset form after 2 seconds and close dialog
      setTimeout(() => {
        setFormState("idle");
        onOpenChange(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Join BuildConnect Network
          </DialogTitle>
          <DialogDescription>
            Complete this form to apply to join our network of organizations.
            Our team will review your application and contact you within 2
            business days.
          </DialogDescription>
        </DialogHeader>

        {formState === "success" ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Application Received</h3>
            <p className="text-center text-muted-foreground">
              Thank you for your interest in BuildConnect. Our team will review
              your application and contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Organization Details</h3>

              <div className="grid grid-cols-1 gap-4">
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
                      <SelectItem value="buying-group">Buying Group</SelectItem>
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
              <h3 className="text-lg font-medium">Integration Requirements</h3>

              <div className="space-y-2">
                <Label htmlFor="systems">
                  What systems would you need to integrate with?
                </Label>
                <Input id="systems" placeholder="e.g. CRM, ERP, POS systems" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataFormats">
                  What data formats do you currently use?
                </Label>
                <Input id="dataFormats" placeholder="e.g. CSV, XML, API" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input id="contactName" placeholder="Full name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input id="jobTitle" placeholder="Your position" required />
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={formState === "submitting"}
              >
                Cancel
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
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

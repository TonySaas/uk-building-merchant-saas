
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";

interface OrganizationVerificationStepProps {
  organizationName?: string;
  organizationLogo?: string;
  onVerify?: (data: any) => void;
  onBack?: () => void;
  onComplete?: () => void;
  loading?: boolean;
}

export default function OrganizationVerificationStep({
  organizationName,
  organizationLogo,
  onVerify,
  onBack,
  onComplete,
  loading = false,
}: OrganizationVerificationStepProps) {
  const [verificationData, setVerificationData] = useState({
    businessNumber: "",
    vatNumber: "",
    documents: [],
    additionalInfo: "",
  });

  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected">("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onVerify) {
      onVerify(verificationData);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {verificationStatus === "verified" && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
          {verificationStatus === "rejected" && <AlertCircleIcon className="h-5 w-5 text-red-500" />}
          Organization Verification
          {organizationName && <span className="text-sm font-normal">- {organizationName}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {organizationLogo && (
          <div className="mb-4 text-center">
            <img src={organizationLogo} alt={organizationName} className="h-16 mx-auto" />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="businessNumber">Business Registration Number</Label>
            <Input
              id="businessNumber"
              value={verificationData.businessNumber}
              onChange={(e) => setVerificationData(prev => ({ 
                ...prev, 
                businessNumber: e.target.value 
              }))}
              placeholder="Enter your business registration number"
            />
          </div>

          <div>
            <Label htmlFor="vatNumber">VAT Number (Optional)</Label>
            <Input
              id="vatNumber"
              value={verificationData.vatNumber}
              onChange={(e) => setVerificationData(prev => ({ 
                ...prev, 
                vatNumber: e.target.value 
              }))}
              placeholder="Enter your VAT number"
            />
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={verificationData.additionalInfo}
              onChange={(e) => setVerificationData(prev => ({ 
                ...prev, 
                additionalInfo: e.target.value 
              }))}
              placeholder="Any additional information about your business"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            {onBack && (
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

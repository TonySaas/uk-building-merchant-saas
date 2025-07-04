import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { CheckIcon, LoaderIcon, AlertCircleIcon } from "lucide-react";
import { RegistrationService } from "@/services/registration-service";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Organization {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  tagline?: string;
  type?: string;
  is_active: boolean;
}

interface EnhancedOrganizationSelectorProps {
  selectedOrganizationIds: string[];
  onSelect: (organizationIds: string[]) => void;
  userType: string;
  maxSelections?: number;
  required?: boolean;
}

export default function EnhancedOrganizationSelector({
  selectedOrganizationIds,
  onSelect,
  userType,
  maxSelections = 4,
  required = true
}: EnhancedOrganizationSelectorProps) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      const orgs = await RegistrationService.getRegistrationOrganizations();
      setOrganizations(orgs);
    } catch (err) {
      console.error('Failed to load organizations:', err);
      setError('Failed to load organizations. Please try again.');
      // Fallback to default organizations if API fails
      setOrganizations([
        {
          id: 'toolbank',
          name: 'Toolbank',
          description: 'UK\'s largest tool and equipment distributor, keeping the tool trade local',
          tagline: 'Keeping the Tool Trade Local',
          type: 'distributor',
          is_active: true
        },
        {
          id: 'nmbs',
          name: 'NMBS',
          description: 'National merchant buying society with 1,250+ independent merchant members',
          tagline: 'Empowering Independent Merchants',
          type: 'buying_group',
          is_active: true
        },
        {
          id: 'ibc',
          name: 'BMN',
          description: 'Builders\' Merchants News',
          tagline: 'Builders\' Merchants News',
          type: 'buying_group',
          is_active: true
        },
        {
          id: 'bmf',
          name: 'BMF',
          description: 'Builders\' Merchant Federation representing 1,020+ companies across the UK',
          tagline: 'Trade Association Excellence',
          type: 'trade_association',
          is_active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationToggle = (orgId: string) => {
    const isSelected = selectedOrganizationIds.includes(orgId);
    
    if (isSelected) {
      // Remove organization
      onSelect(selectedOrganizationIds.filter(id => id !== orgId));
    } else {
      // Add organization (check max limit)
      if (selectedOrganizationIds.length < maxSelections) {
        onSelect([...selectedOrganizationIds, orgId]);
      }
    }
  };

  const getSelectionMessage = () => {
    if (userType === 'consumer') {
      return "Select organizations to discover offers from their merchant networks:";
    } else if (userType === 'supplier') {
      return "Select organizations where you want to distribute your products and offers:";
    } else if (userType === 'merchant') {
      return "Select the organizations your business is affiliated with:";
    }
    return "Select the organizations you're associated with:";
  };

  const getOrganizationBenefits = (org: Organization, userType: string) => {
    const benefitMap: Record<string, Record<string, string[]>> = {
      supplier: {
        toolbank: ['Access to 1,000+ tool retailers', 'National distribution network', 'Tool trade expertise'],
        nmbs: ['Reach 1,250+ independent merchants', 'Diverse product categories', 'Regional coverage'],
        ibc: ['Connect with 220+ builders merchants', 'Specialized building materials', 'Strong regional presence'],
        bmf: ['Industry authority access', 'Trade standards compliance', 'Professional networking']
      },
      merchant: {
        toolbank: ['Tool distributor partnerships', 'Competitive pricing', 'Technical support'],
        nmbs: ['Buying group benefits', 'Group purchasing power', 'Member support services'],
        ibc: ['Builders merchant network', 'Specialized procurement', 'Industry connections'],
        bmf: ['Trade association membership', 'Industry advocacy', 'Professional development']
      },
      consumer: {
        toolbank: ['Tool specialist offers', 'Professional quality products', 'Expert advice'],
        nmbs: ['Independent merchant variety', 'Local business support', 'Personalized service'],
        ibc: ['Builders merchant expertise', 'Construction materials', 'Project support'],
        bmf: ['Industry-verified merchants', 'Quality assurance', 'Professional standards']
      }
    };

    return benefitMap[userType]?.[org.id] || ['Access to exclusive offers', 'Professional network', 'Industry connections'];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <LoaderIcon className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-muted-foreground">Loading organizations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertDescription>
          {error}
          <button 
            onClick={loadOrganizations}
            className="ml-2 underline hover:no-underline"
          >
            Try again
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Organization Selection</h2>
        <p className="text-muted-foreground">
          {getSelectionMessage()}
        </p>
        {required && userType !== 'consumer' && (
          <p className="text-sm text-orange-600">
            * At least one organization is required for {userType}s
          </p>
        )}
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>Selected: {selectedOrganizationIds.length}/{maxSelections}</span>
          {selectedOrganizationIds.length >= maxSelections && (
            <span className="text-orange-600">(Maximum reached)</span>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {organizations.map((org) => {
          const isSelected = selectedOrganizationIds.includes(org.id);
          const isDisabled = !isSelected && selectedOrganizationIds.length >= maxSelections;
          const benefits = getOrganizationBenefits(org, userType);
          
          return (
            <div
              key={org.id}
              className={cn(
                "relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-6",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                  : isDisabled
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                  : "border-border hover:border-blue-300 hover:bg-blue-50/30"
              )}
              onClick={() => !isDisabled && handleOrganizationToggle(org.id)}
            >
              {/* Selection indicator */}
              <div className="absolute top-4 right-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  isSelected
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300"
                )}>
                  {isSelected && <CheckIcon className="h-4 w-4 text-white" />}
                </div>
              </div>

              <div className="flex items-start space-x-4 pr-12">
                {/* Organization Logo */}
                <div className="flex-shrink-0">
                  {org.logo_url ? (
                    <img
                      src={org.logo_url}
                      alt={`${org.name} logo`}
                      className="w-12 h-12 object-contain rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {org.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Organization Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg">{org.name}</h3>
                    {org.type && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {org.type.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  
                  {org.tagline && (
                    <p className="text-sm font-medium text-blue-600 mb-2">
                      {org.tagline}
                    </p>
                  )}
                  
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {org.description}
                  </p>

                  {/* Benefits for this user type */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Benefits for you:
                    </h4>
                    <ul className="space-y-1">
                      {benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-muted-foreground text-xs flex items-center">
                          <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consumer-specific note */}
      {userType === 'consumer' && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800 text-sm">
            <strong>Note for consumers:</strong> Selecting organizations helps us show you relevant offers 
            from their merchant networks. You can change these preferences anytime in your profile.
          </p>
        </div>
      )}

      {/* Selection validation */}
      {required && userType !== 'consumer' && selectedOrganizationIds.length === 0 && (
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-800 text-sm">
            Please select at least one organization to continue. This helps us connect you with 
            the right merchants and opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
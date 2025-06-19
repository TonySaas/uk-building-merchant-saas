import React from 'react';
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
}

interface MultiOrganizationSelectorProps {
  organizations: Organization[];
  selectedOrganizationIds: string[];
  onSelect: (organizationIds: string[]) => void;
}

export default function MultiOrganizationSelector({
  organizations,
  selectedOrganizationIds,
  onSelect
}: MultiOrganizationSelectorProps) {
  const handleOrganizationToggle = (orgId: string) => {
    const isSelected = selectedOrganizationIds.includes(orgId);
    if (isSelected) {
      onSelect(selectedOrganizationIds.filter(id => id !== orgId));
    } else {
      onSelect([...selectedOrganizationIds, orgId]);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground text-lg">
        Select the organizations you're affiliated with:
      </p>
      
      <div className="space-y-4">
        {organizations.map((org) => {
          const isSelected = selectedOrganizationIds.includes(org.id);
          
          return (
            <div
              key={org.id}
              className={cn(
                "relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-6",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                  : "border-border hover:border-gray-300"
              )}
              onClick={() => handleOrganizationToggle(org.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <div className={cn(
                  "flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 bg-white"
                )}>
                  {isSelected && (
                    <CheckIcon className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Organization Logo */}
                {org.logo && (
                  <div className="flex-shrink-0">
                    <img 
                      src={org.logo} 
                      alt={`${org.name} logo`}
                      className="w-12 h-12 rounded object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Organization Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">
                    {org.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {org.description}
                  </p>
                </div>
              </div>

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute bottom-4 right-4">
                  <div className="bg-blue-500 text-white text-xs font-medium py-1 px-3 rounded">
                    Selected
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Count */}
      <div className="text-center text-muted-foreground text-sm">
        Selected: {selectedOrganizationIds.length} organization{selectedOrganizationIds.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
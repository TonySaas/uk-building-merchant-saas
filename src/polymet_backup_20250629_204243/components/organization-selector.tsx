
import React from 'react';

interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
}

interface OrganizationSelectorProps {
  organizations: Organization[];
  selectedOrganizationIds: string[];
  onSelect: (organizationIds: string[]) => void;
}

export default function OrganizationSelector({
  organizations,
  selectedOrganizationIds = [], // default to empty array
  onSelect
}: OrganizationSelectorProps) {
  const handleOrganizationToggle = (orgId: string) => {
    const safeSelectedIds = Array.isArray(selectedOrganizationIds) ? selectedOrganizationIds : [];
    const isSelected = safeSelectedIds.includes(orgId);
    if (isSelected) {
      onSelect(safeSelectedIds.filter(id => id !== orgId));
    } else {
      onSelect([...safeSelectedIds, orgId]);
    }
  };

  const safeSelectedIds = Array.isArray(selectedOrganizationIds) ? selectedOrganizationIds : [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Select Organizations</h3>
      <div className="grid gap-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              safeSelectedIds.includes(org.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleOrganizationToggle(org.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {org.logo && (
                  <img 
                    src={org.logo} 
                    alt={`${org.name} logo`}
                    className="h-12 w-12 rounded-lg object-cover"
                    onError={(e) => {
                      // Hide image if it fails to load
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <h4 className="font-medium">{org.name}</h4>
                  <p className="text-sm text-gray-600">{org.description}</p>
                </div>
              </div>
              {safeSelectedIds.includes(org.id) && (
                <div className="text-blue-500">✓</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

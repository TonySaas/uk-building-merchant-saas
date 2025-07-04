import React from 'react';
import { cn } from "@/lib/utils";
import { 
  ShieldIcon, 
  UserIcon, 
  BuildingIcon, 
  ShoppingBagIcon,
  CrownIcon,
  TagIcon 
} from "lucide-react";

interface EnhancedRoleSelectorProps {
  userType: string;
  selectedRole: string;
  onSelect: (role: string) => void;
  organizationContext?: string[];
}

interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  permissions: string[];
  level: 'admin' | 'user' | 'basic';
  color: string;
  suitable_for: string[];
}

export default function EnhancedRoleSelector({
  userType,
  selectedRole = "",
  onSelect,
  organizationContext = []
}: EnhancedRoleSelectorProps) {
  
  const getRoleDefinitions = (): RoleDefinition[] => {
    switch (userType) {
      case 'supplier':
        return [
          {
            id: 'supplier',
            name: 'Supplier',
            description: 'Create and manage special offers, view analytics, and connect with merchants across multiple organizations',
            icon: <TagIcon className="h-8 w-8" />,
            level: 'user',
            color: 'blue',
            permissions: [
              'Create and edit special offers',
              'Manage product catalog',
              'View offer analytics and performance',
              'Connect with merchants across organizations',
              'Access supplier dashboard and tools'
            ],
            suitable_for: ['Manufacturers', 'Distributors', 'Wholesalers', 'Product suppliers']
          },
          {
            id: 'supplier_admin',
            name: 'Supplier Administrator',
            description: 'Full supplier management with additional administrative capabilities including team management',
            icon: <CrownIcon className="h-8 w-8" />,
            level: 'admin',
            color: 'purple',
            permissions: [
              'All supplier permissions',
              'Manage supplier team members',
              'Access advanced analytics',
              'Configure supplier settings',
              'Manage multi-organization presence',
              'Approve and oversee supplier operations'
            ],
            suitable_for: ['Supplier business owners', 'Operations managers', 'Regional managers']
          }
        ];
      
      case 'merchant':
        return [
          {
            id: 'merchant',
            name: 'Merchant',
            description: 'Browse and select offers, manage merchant locations, and serve consumers with promotional content',
            icon: <ShoppingBagIcon className="h-8 w-8" />,
            level: 'user',
            color: 'green',
            permissions: [
              'Browse and select special offers',
              'Manage merchant profile and locations',
              'Update stock status and availability',
              'View merchant analytics',
              'Manage customer interactions'
            ],
            suitable_for: ['Independent merchants', 'Store managers', 'Branch operators']
          },
          {
            id: 'merchant_admin',
            name: 'Merchant Administrator',
            description: 'Complete merchant management including multi-location oversight and staff coordination',
            icon: <BuildingIcon className="h-8 w-8" />,
            level: 'admin',
            color: 'indigo',
            permissions: [
              'All merchant permissions',
              'Manage multiple store locations',
              'Invite and manage staff members',
              'Configure merchant settings',
              'Access comprehensive analytics',
              'Coordinate across organization networks'
            ],
            suitable_for: ['Business owners', 'Regional managers', 'Operations directors']
          }
        ];
      
      case 'consumer':
        return [
          {
            id: 'consumer',
            name: 'Consumer',
            description: 'Discover local offers, save favorites, and connect with merchants in your area',
            icon: <UserIcon className="h-8 w-8" />,
            level: 'basic',
            color: 'orange',
            permissions: [
              'Browse and search special offers',
              'Save offers and create favorites',
              'Find local merchants and locations',
              'Write reviews and ratings',
              'Receive personalized recommendations'
            ],
            suitable_for: ['Individual consumers', 'Trade professionals', 'Small business owners']
          }
        ];
      
      default:
        return [];
    }
  };

  const roles = getRoleDefinitions();

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-border hover:border-blue-300',
        bg: isSelected ? 'bg-blue-50' : 'hover:bg-blue-50/50',
        shadow: isSelected ? 'shadow-lg shadow-blue-500/20' : '',
        icon: 'text-blue-500',
        badge: 'bg-blue-500'
      },
      purple: {
        border: isSelected ? 'border-purple-500' : 'border-border hover:border-purple-300',
        bg: isSelected ? 'bg-purple-50' : 'hover:bg-purple-50/50',
        shadow: isSelected ? 'shadow-lg shadow-purple-500/20' : '',
        icon: 'text-purple-500',
        badge: 'bg-purple-500'
      },
      green: {
        border: isSelected ? 'border-green-500' : 'border-border hover:border-green-300',
        bg: isSelected ? 'bg-green-50' : 'hover:bg-green-50/50',
        shadow: isSelected ? 'shadow-lg shadow-green-500/20' : '',
        icon: 'text-green-500',
        badge: 'bg-green-500'
      },
      indigo: {
        border: isSelected ? 'border-indigo-500' : 'border-border hover:border-indigo-300',
        bg: isSelected ? 'bg-indigo-50' : 'hover:bg-indigo-50/50',
        shadow: isSelected ? 'shadow-lg shadow-indigo-500/20' : '',
        icon: 'text-indigo-500',
        badge: 'bg-indigo-500'
      },
      orange: {
        border: isSelected ? 'border-orange-500' : 'border-border hover:border-orange-300',
        bg: isSelected ? 'bg-orange-50' : 'hover:bg-orange-50/50',
        shadow: isSelected ? 'shadow-lg shadow-orange-500/20' : '',
        icon: 'text-orange-500',
        badge: 'bg-orange-500'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getLevelBadge = (level: string) => {
    const badges = {
      admin: { text: 'Administrator', color: 'bg-purple-100 text-purple-800' },
      user: { text: 'Standard', color: 'bg-blue-100 text-blue-800' },
      basic: { text: 'Basic', color: 'bg-gray-100 text-gray-800' }
    };
    return badges[level as keyof typeof badges] || badges.basic;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Select Your Role</h2>
        <p className="text-muted-foreground">
          Choose the role that best describes your position and responsibilities
        </p>
      </div>
      
      <div className="space-y-6">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          const colors = getColorClasses(role.color, isSelected);
          const levelBadge = getLevelBadge(role.level);
          
          return (
            <div
              key={role.id}
              className={cn(
                "relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-6",
                colors.border,
                colors.bg,
                colors.shadow
              )}
              onClick={() => onSelect(role.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Role Icon */}
                <div className={cn("flex-shrink-0 p-3 rounded-full", 
                  isSelected ? `${colors.bg}` : 'bg-gray-100'
                )}>
                  <div className={colors.icon}>
                    {role.icon}
                  </div>
                </div>

                {/* Role Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-xl">
                        {role.name}
                      </h3>
                      <span className={cn(
                        "text-xs font-medium py-1 px-2 rounded",
                        levelBadge.color
                      )}>
                        {levelBadge.text}
                      </span>
                    </div>
                    {isSelected && (
                      <div className={cn(
                        "text-white text-xs font-medium py-1 px-3 rounded",
                        colors.badge
                      )}>
                        Selected
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Permissions */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">
                      What you can do:
                    </h4>
                    <ul className="space-y-1">
                      {role.permissions.map((permission, index) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-center">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0",
                            colors.icon.replace('text-', 'bg-')
                          )}></span>
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suitable For */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Suitable for:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {role.suitable_for.map((suitability, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {suitability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Information */}
      {userType !== 'consumer' && organizationContext.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2 text-blue-900">
            Organization Access
          </h4>
          <p className="text-blue-800 text-sm">
            This role will apply to your selected organizations: {organizationContext.join(', ')}. 
            You can modify organization access later in your profile settings.
          </p>
        </div>
      )}
    </div>
  );
}
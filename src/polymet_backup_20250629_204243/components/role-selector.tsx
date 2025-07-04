import React from 'react';
import { cn } from "@/lib/utils";
import { ShieldIcon, UserIcon } from "lucide-react";

interface RoleSelectorProps {
  userType: string;
  selectedRole: string;
  onSelect: (role: string) => void;
}

export default function RoleSelector({
  userType,
  selectedRole = "",
  onSelect
}: RoleSelectorProps) {
  const getRoles = () => {
    switch (userType) {
      case 'supplier':
        return [
          { 
            id: 'supplier_admin', 
            name: 'Supplier Admin',
            description: 'Manage store settings, staff, and all supplier operations',
            icon: <ShieldIcon className="h-8 w-8 text-blue-500" />,
            permissions: [
              'Manage store profile',
              'Invite staff members', 
              'Manage all store operations',
              'Access full analytics'
            ]
          },
          { 
            id: 'supplier_user', 
            name: 'Supplier User',
            description: 'Manage offers and day-to-day operations',
            icon: <UserIcon className="h-8 w-8 text-green-500" />,
            permissions: [
              'Select and manage offers',
              'Update inventory status',
              'Access basic analytics'
            ]
          }
        ];
      case 'merchant':
        return [
          { 
            id: 'merchant_admin', 
            name: 'Merchant Admin',
            description: 'Manage store settings, staff, and all merchant operations',
            icon: <ShieldIcon className="h-8 w-8 text-blue-500" />,
            permissions: [
              'Manage store profile',
              'Invite staff members',
              'Manage all store operations', 
              'Access full analytics'
            ]
          },
          { 
            id: 'merchant_user', 
            name: 'Merchant User',
            description: 'Browse and select offers for the store',
            icon: <UserIcon className="h-8 w-8 text-green-500" />,
            permissions: [
              'Browse available offers',
              'Select offers for store',
              'Update stock availability',
              'Access basic analytics'
            ]
          }
        ];
      default:
        return [];
    }
  };

  const roles = getRoles();

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground text-lg">
        Select your role in the organization:
      </p>
      
      <div className="space-y-6">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          
          return (
            <div
              key={role.id}
              className={cn(
                "relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-6",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                  : "border-border hover:border-gray-300"
              )}
              onClick={() => onSelect(role.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Role Icon */}
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100">
                  {role.icon}
                </div>

                {/* Role Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-xl">
                      {role.name}
                    </h3>
                    {isSelected && (
                      <div className="bg-blue-500 text-white text-xs font-medium py-1 px-3 rounded">
                        Selected
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Permissions */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Permissions:
                    </h4>
                    <ul className="space-y-1">
                      {role.permissions.map((permission, index) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
                          {permission}
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
    </div>
  );
}
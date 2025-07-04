import { useState } from "react";
import SidebarNavigation from "@/polymet/components/sidebar-navigation";
import {
  CURRENT_USER,
  NAVIGATION_ITEMS,
  ORGANIZATIONS,
  Organization,
  User,
  UserRole,
} from "@/polymet/data/sidebar-navigation-data";

interface BuildConnectSidebarProps {
  user?: User;
  organizations?: Organization[];
  currentOrganization?: Organization;
  className?: string;
}

export default function BuildConnectSidebar({
  user = CURRENT_USER,
  organizations = ORGANIZATIONS,
  currentOrganization = ORGANIZATIONS[0],
  className,
}: BuildConnectSidebarProps) {
  const [selectedOrg, setSelectedOrg] = useState(currentOrganization);
  const [selectedUser, setSelectedUser] = useState(user);

  // Get navigation items based on user role
  const navigationItems = NAVIGATION_ITEMS[selectedUser.role as UserRole];

  const handleOrganizationChange = (organization: Organization) => {
    setSelectedOrg(organization);
    // In a real application, you might want to fetch role-specific data here
  };

  // For demo purposes - allow switching user roles
  const handleRoleChange = (role: UserRole) => {
    setSelectedUser({
      ...selectedUser,
      role,
    });
  };

  return (
    <div className="relative">
      {/* Role Switcher for Demo Purposes */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-lg">
        <div className="text-xs font-medium text-muted-foreground">
          Demo: Switch Role
        </div>
        <div className="flex gap-2">
          <button
            className={`rounded-md px-2 py-1 text-xs ${selectedUser.role === "Organization Admin" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => handleRoleChange("Organization Admin")}
          >
            Admin
          </button>
          <button
            className={`rounded-md px-2 py-1 text-xs ${selectedUser.role === "Supplier" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => handleRoleChange("Supplier")}
          >
            Supplier
          </button>
          <button
            className={`rounded-md px-2 py-1 text-xs ${selectedUser.role === "Merchant" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => handleRoleChange("Merchant")}
          >
            Merchant
          </button>
        </div>
      </div>

      <SidebarNavigation
        user={selectedUser}
        organizations={organizations}
        currentOrganization={selectedOrg}
        navigationItems={navigationItems}
        onOrganizationChange={handleOrganizationChange}
        className={className}
      />
    </div>
  );
}

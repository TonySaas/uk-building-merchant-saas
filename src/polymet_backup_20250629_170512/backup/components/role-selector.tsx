import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShieldIcon, UserIcon } from "lucide-react";

interface RoleSelectorProps {
  userType: string;
  selectedRole: string;
  onSelect: (role: string) => void;
}

export default function RoleSelector({
  userType,
  selectedRole,
  onSelect,
}: RoleSelectorProps) {
  const roles = {
    supplier: [
      {
        id: "supplier_admin",
        title: "Supplier Admin",
        description: "Manage company settings, users, and all offers",
        icon: <ShieldIcon className="h-6 w-6 text-blue-600" />,
        permissions: [
          "Manage company profile",
          "Invite team members",
          "Create and manage all offers",
          "Access analytics",
        ],
      },
      {
        id: "supplier_user",
        title: "Supplier User",
        description: "Create and manage offers for your company",
        icon: <UserIcon className="h-6 w-6 text-blue-600" />,
        permissions: [
          "Create and manage your offers",
          "View company offers",
          "Access basic analytics",
        ],
      },
    ],
    merchant: [
      {
        id: "merchant_admin",
        title: "Merchant Admin",
        description: "Manage store settings, users, and all offers",
        icon: <ShieldIcon className="h-6 w-6 text-green-600" />,
        permissions: [
          "Manage store profile",
          "Invite team members",
          "Select and manage all offers",
          "Access analytics",
        ],
      },
      {
        id: "merchant_user",
        title: "Merchant User",
        description: "Select and manage offers for your store",
        icon: <UserIcon className="h-6 w-6 text-green-600" />,        permissions: [
          "Select and manage offers",
          "View store offers",
          "Access basic analytics",
        ],
      },
    ],
  };

  const roleOptions = userType === "supplier" ? roles.supplier : roles.merchant;

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Select your role in the organization:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roleOptions.map((role) => (
          <Card
            key={role.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedRole === role.id
                ? "border-2 border-primary shadow-sm"
                : "border border-border hover:border-primary/50"
            )}
            onClick={() => onSelect(role.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    {role.icon}
                  </div>
                  <h3 className="font-medium text-lg">{role.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-xs font-medium mb-2">Permissions:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {role.permissions.map((permission, index) => (
                      <li key={index} className="flex items-center">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>{permission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
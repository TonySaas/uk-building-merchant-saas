import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

interface UserTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function UserTypeSelector({
  selectedType,
  onSelect,
}: UserTypeSelectorProps) {
  const userTypes = [
    {
      id: "consumer",
      title: "Consumer",
      description: "I'm looking for deals and offers",
      icon: <UserIcon className="h-8 w-8 text-purple-600" />,
    },
    {
      id: "supplier",
      title: "Supplier",
      description: "I want to create and promote offers",
      icon: <ShoppingBagIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      id: "merchant",
      title: "Merchant",
      description: "I want to select offers for my store",
      icon: <ShoppingCartIcon className="h-8 w-8 text-green-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Select the option that best describes you:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedType === type.id
                ? "border-2 border-primary shadow-sm"
                : "border border-border hover:border-primary/50"
            )}
            onClick={() => onSelect(type.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-primary/10 rounded-full p-3">
                  {type.icon}
                </div>
                <div>                  <h3 className="font-medium text-lg">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                {selectedType === type.id && (
                  <div className="w-full mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-primary font-medium">Selected</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
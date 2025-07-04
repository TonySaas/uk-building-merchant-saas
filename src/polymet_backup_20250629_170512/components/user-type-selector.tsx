import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";

// Add global styles for dark mode text color
if (typeof document !== 'undefined') {
  const styleId = 'dark-mode-text-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .dark .unselected-text {
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);
  }
}

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
      icon: <UserIcon className="h-12 w-12 text-purple-500" />,
      color: "purple",
    },
    {
      id: "supplier",
      title: "Supplier",
      description: "I want to create and promote offers",
      icon: <ShoppingBagIcon className="h-12 w-12 text-blue-500" />,
      color: "blue",
    },
    {
      id: "merchant",
      title: "Merchant",
      description: "I want to select offers for my store",
      icon: <ShoppingCartIcon className="h-12 w-12 text-green-500" />,
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground text-lg">
        Select the option that best describes you:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userTypes.map((type) => (
          <div
            key={type.id}
            className={cn(
              "relative cursor-pointer transition-all duration-200",
              selectedType === type.id
                ? "transform scale-105"
                : "hover:transform hover:scale-[1.02]"
            )}
            onClick={() => onSelect(type.id)}
          >
            <Card
              className={cn(
                "h-full transition-all duration-200 border-2",
                selectedType === type.id
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                  : "border-border hover:border-gray-300"
              )}
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className={cn(
                    "p-4 rounded-full",
                    type.color === "purple" && "bg-purple-100",
                    type.color === "blue" && "bg-blue-100", 
                    type.color === "green" && "bg-green-100"
                  )}>
                    {type.icon}
                  </div>
                  <div>
                    <h3 
                      className={cn(
                        "font-semibold text-xl mb-2",
                        selectedType === type.id 
                          ? "text-black" 
                          : "text-gray-900 dark:text-white unselected-text"
                      )}
                    >
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </CardContent>
              {selectedType === type.id && (
                <div className="absolute bottom-4 left-0 right-0">
                  <div className="bg-blue-500 text-white text-xs font-medium py-2 px-4 rounded mx-4 text-center">
                    Selected
                  </div>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
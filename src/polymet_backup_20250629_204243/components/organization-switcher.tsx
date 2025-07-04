import { useState } from "react";
import { Check, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import OrganizationBadge from "@/polymet/components/organization-badge";

export interface Organization {
  id: string;
  name: string;
  type: "Wholesaler" | "Buying Group" | "Trade Association";
  logo?: string;
}

interface OrganizationSwitcherProps {
  organizations: Organization[];
  currentOrganization: Organization;
  onOrganizationChange: (organization: Organization) => void;
  className?: string;
}

export default function OrganizationSwitcher({
  organizations,
  currentOrganization,
  onOrganizationChange,
  className,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-md border border-transparent bg-background/50 p-2 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <Avatar className="h-6 w-6">
              {currentOrganization.logo ? (
                <AvatarImage
                  src={currentOrganization.logo}
                  alt={currentOrganization.name}
                />
              ) : (
                <AvatarFallback className="text-xs">
                  {currentOrganization.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="truncate">{currentOrganization.name}</span>
          </div>
          {open ? (
            <ChevronUpIcon className="h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search organization..." />

          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {organizations.map((org) => (
                <CommandItem
                  key={org.id}
                  onSelect={() => {
                    onOrganizationChange(org);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    {org.logo ? (
                      <AvatarImage src={org.logo} alt={org.name} />
                    ) : (
                      <AvatarFallback className="text-xs">
                        {org.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm">{org.name}</span>
                    <OrganizationBadge
                      type={org.type}
                      className="mt-0.5 text-[10px]"
                    />
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentOrganization.id === org.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

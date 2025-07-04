import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

interface SidebarUserMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    company?: string;
  };
  expanded?: boolean;
  className?: string;
}

export default function SidebarUserMenu({
  user,
  expanded = true,
  className,
}: SidebarUserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md p-2",
        expanded ? "justify-start" : "justify-center",
        className
      )}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-3 rounded-md p-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              expanded ? "w-full" : "w-auto"
            )}
          >
            <Avatar className="h-8 w-8 cursor-pointer">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            {expanded && (
              <div className="flex flex-1 flex-col overflow-hidden text-left">
                <span className="truncate text-sm font-medium">
                  {user.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.role}
                  {user.company && user.company !== "" && (
                    <> • {user.company}</>
                  )}
                </span>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={expanded ? "end" : "center"}
          className="w-56"
        >
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/profile">
              <UserIcon className="mr-2 h-4 w-4" />

              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">
              <SettingsIcon className="mr-2 h-4 w-4" />

              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/logout">
              <LogOutIcon className="mr-2 h-4 w-4" />

              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

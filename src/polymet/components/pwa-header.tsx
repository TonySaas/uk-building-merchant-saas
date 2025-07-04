"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  HelpCircleIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export interface PwaHeaderProps {
  userName?: string;
  userAvatar?: string;
  organizationName?: string;
  organizationLogo?: string;
  organizationColor?: string;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

export default function PwaHeader({
  userName = "Guest User",
  userAvatar,
  organizationName = "Organization",
  organizationLogo,
  organizationColor = "bg-primary",
  notificationCount = 0,
  onNotificationsClick,
  onMenuClick,
  onSearchClick,
}: PwaHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container px-4 h-16 flex items-center justify-between">
        {/* Left section - Menu and Organization */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onMenuClick}
          >
            <MenuIcon className="h-5 w-5" />

            <span className="sr-only">Menu</span>
          </Button>

          <div className="flex items-center gap-2">
            {organizationLogo ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={organizationLogo} alt={organizationName} />

                <AvatarFallback
                  className={`${organizationColor} text-primary-foreground`}
                >
                  {organizationName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${organizationColor}`}
              >
                <span className="text-sm font-medium text-primary-foreground">
                  {organizationName.charAt(0)}
                </span>
              </div>
            )}
            <span className="font-medium text-sm hidden sm:inline-block">
              {organizationName}
            </span>
          </div>
        </div>

        {/* Right section - Search, Notifications, Profile */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onSearchClick}
          >
            <SearchIcon className="h-5 w-5" />

            <span className="sr-only">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            onClick={onNotificationsClick}
          >
            <BellIcon className="h-5 w-5" />

            {notificationCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />

                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className="flex items-center cursor-pointer"
                >
                  <UserIcon className="mr-2 h-4 w-4" />

                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/settings"
                  className="flex items-center cursor-pointer"
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />

                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help" className="flex items-center cursor-pointer">
                  <HelpCircleIcon className="mr-2 h-4 w-4" />

                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                <LogOutIcon className="mr-2 h-4 w-4" />

                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  SearchIcon,
  TagIcon,
  MapPinIcon,
  UserIcon,
} from "lucide-react";

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface PwaBottomNavigationProps {
  items?: NavigationItem[];
  className?: string;
  enableHapticFeedback?: boolean;
}

export default function PwaBottomNavigation({
  items = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <SearchIcon className="h-5 w-5" />,
    },
    {
      name: "Offers",
      path: "/offers",
      icon: <TagIcon className="h-5 w-5" />,

      badge: 3,
    },
    {
      name: "Map",
      path: "/map",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
  ],

  className,
  enableHapticFeedback = true,
}: PwaBottomNavigationProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Update active tab based on current location
  useEffect(() => {
    const path = location.pathname;
    setActiveTab(
      items.find((item) => path === item.path)?.path ||
        items.find((item) => path.startsWith(item.path))?.path ||
        "/"
    );
  }, [location.pathname, items]);

  // Handle scroll direction detection for auto-hiding navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Trigger haptic feedback
  const triggerHapticFeedback = () => {
    if (enableHapticFeedback && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Handle navigation item click
  const handleNavItemClick = (item: NavigationItem) => {
    setActiveTab(item.path);
    triggerHapticFeedback();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isScrollingUp ? "translate-y-0" : "translate-y-full"
      } ${className}`}
    >
      {/* Main Navigation Bar */}
      <div className="bg-background border-t shadow-lg px-2 py-1">
        <div className="flex items-center justify-around">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative"
              onClick={() => handleNavItemClick(item)}
            >
              <Button
                variant={activeTab === item.path ? "default" : "ghost"}
                size="lg"
                className={`h-16 w-16 flex flex-col items-center justify-center gap-1 rounded-full ${
                  activeTab === item.path
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.name}</span>
              </Button>
              {item.badge && (
                <Badge
                  className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center p-0"
                  variant="destructive"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Safe area spacing for iOS devices */}
      <div className="h-safe-bottom bg-background" />
    </div>
  );
}

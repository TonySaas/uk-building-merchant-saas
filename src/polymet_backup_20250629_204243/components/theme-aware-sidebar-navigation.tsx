import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MenuIcon, XIcon } from "lucide-react";
import OrganizationBadge from "@/polymet/components/organization-badge";
import OrganizationSwitcher from "@/polymet/components/organization-switcher";
import ThemeAwareSidebarNavItem from "@/polymet/components/theme-aware-sidebar-nav-item";
import SidebarUserMenu from "@/polymet/components/sidebar-user-menu";
import {
  NavigationItem,
  Organization,
  User,
  UserRole,
} from "@/polymet/data/sidebar-navigation-data";

interface ThemeAwareSidebarNavigationProps {
  user: User;
  organizations: Organization[];
  currentOrganization: Organization;
  navigationItems: NavigationItem[];
  onOrganizationChange: (organization: Organization) => void;
  className?: string;
}

export default function ThemeAwareSidebarNavigation({
  user,
  organizations,
  currentOrganization,
  navigationItems,
  onOrganizationChange,
  className,
}: ThemeAwareSidebarNavigationProps) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Check if path is active
  const isActive = (path?: string, exactMatch = false) => {
    if (!path) return false;
    return exactMatch
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  // Recursively render navigation items
  const renderNavItems = (items: NavigationItem[], depth = 0) => {
    return items.map((item) => {
      const active = isActive(item.path);
      const hasActiveChild =
        item.children?.some((child) => isActive(child.path)) || false;

      return (
        <ThemeAwareSidebarNavItem
          key={item.id}
          title={item.title}
          icon={item.icon}
          path={item.path}
          badge={item.badge}
          depth={depth}
          expanded={expanded}
          active={active || hasActiveChild}
        >
          {item.children && renderNavItems(item.children, depth + 1)}
        </ThemeAwareSidebarNavItem>
      );
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm dark:bg-background/80 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-background transition-all duration-300 ease-in-out dark:bg-background dark:border-border",
          expanded ? "w-64" : "w-16",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4">
          {expanded ? (
            <div className="flex flex-1 flex-col gap-2">
              <OrganizationSwitcher
                organizations={organizations}
                currentOrganization={currentOrganization}
                onOrganizationChange={onOrganizationChange}
              />

              <OrganizationBadge
                type={currentOrganization.type}
                className="self-start"
              />
            </div>
          ) : (
            <div className="mx-auto">
              <div className="relative h-8 w-8">
                <img
                  src={currentOrganization.logo || ""}
                  alt={currentOrganization.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Collapse/Expand Button (Desktop only) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <XIcon className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </Button>

          {/* Close Button (Mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {renderNavItems(navigationItems)}
        </nav>

        <Separator />

        {/* User Menu */}
        <div className="p-2">
          <SidebarUserMenu user={user} expanded={expanded} />
        </div>
      </aside>
    </>
  );
}

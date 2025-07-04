import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import NotificationBadge from "@/polymet/components/notification-badge";
import * as Icons from "lucide-react";

interface NavItemProps {
  title: string;
  icon: string;
  path?: string;
  badge?: number;
  depth?: number;
  expanded?: boolean;
  active?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function SidebarNavItem({
  title,
  icon,
  path,
  badge,
  depth = 0,
  expanded = true,
  active = false,
  children,
  onClick,
  className,
}: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(children);
  const isActiveOrHasActiveChild = active;

  // Dynamically get the icon component
  const IconComponent = Icons[icon as keyof typeof Icons] || Icons.CircleIcon;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    if (onClick) {
      onClick();
    }
  };

  const itemContent = (
    <>
      <div
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-md px-3 py-2",
          isActiveOrHasActiveChild
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "hover:bg-accent hover:text-accent-foreground",
          !expanded && "justify-center",
          className
        )}
      >
        <IconComponent
          className={cn("h-4 w-4 shrink-0", expanded ? "mr-2" : "mr-0")}
        />

        {expanded && (
          <>
            <span className="flex-1 truncate">{title}</span>
            {badge !== undefined && badge > 0 && (
              <NotificationBadge count={badge} />
            )}
            {hasChildren && (
              <div className="ml-auto">
                {isOpen ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </div>
            )}
          </>
        )}
        {!expanded && badge !== undefined && badge > 0 && (
          <div className="absolute -right-1 -top-1">
            <NotificationBadge count={badge} />
          </div>
        )}
      </div>
      {!expanded && (
        <div
          className={cn(
            "absolute left-full ml-2 w-auto min-w-[180px] rounded-md border bg-popover p-2 text-popover-foreground shadow-md",
            "invisible opacity-0 group-hover:visible group-hover:opacity-100",
            "transition-all duration-100 z-50"
          )}
        >
          <div className="flex items-center gap-2 rounded-md px-2 py-1">
            <IconComponent className="h-4 w-4" />

            <span>{title}</span>
            {badge !== undefined && badge > 0 && (
              <NotificationBadge count={badge} />
            )}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "group relative text-sm font-medium",
        depth > 0 && "ml-4",
        className
      )}
    >
      {path ? (
        <Link to={path} className="block" onClick={onClick}>
          {itemContent}
        </Link>
      ) : (
        <button
          type="button"
          className="w-full text-left"
          onClick={handleToggle}
        >
          {itemContent}
        </button>
      )}
      {hasChildren && isOpen && expanded && (
        <div className="mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
}

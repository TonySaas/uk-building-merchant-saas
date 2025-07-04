import { cn } from "@/lib/utils";

type OrganizationType = "Wholesaler" | "Buying Group" | "Trade Association";

interface OrganizationBadgeProps {
  type: OrganizationType;
  className?: string;
}

export default function OrganizationBadge({
  type,
  className,
}: OrganizationBadgeProps) {
  const badgeColors = {
    Wholesaler:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Buying Group":
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    "Trade Association":
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeColors[type],
        className
      )}
    >
      {type}
    </span>
  );
}

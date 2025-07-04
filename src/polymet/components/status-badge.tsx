import { cn } from "@/lib/utils";

type StatusType = "draft" | "published" | "scheduled" | "archived";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  draft: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    label: "Draft",
  },
  published: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "Published",
  },
  scheduled: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    label: "Scheduled",
  },
  archived: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "Archived",
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const { color, label } = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        color,
        className
      )}
    >
      {label}
    </span>
  );
}

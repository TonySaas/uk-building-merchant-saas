import { cn } from "@/lib/utils";
import { FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";

type ContentType = "image" | "video" | "copy";

interface ContentTypeBadgeProps {
  type: ContentType;
  className?: string;
}

const typeConfig = {
  image: {
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    icon: ImageIcon,
    label: "Image",
  },
  video: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: VideoIcon,
    label: "Video",
  },
  copy: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: FileTextIcon,
    label: "Copy",
  },
};

export default function ContentTypeBadge({
  type,
  className,
}: ContentTypeBadgeProps) {
  const { color, icon: Icon, label } = typeConfig[type];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
        color,
        className
      )}
    >
      <Icon className="mr-1 h-3 w-3" />

      {label}
    </span>
  );
}

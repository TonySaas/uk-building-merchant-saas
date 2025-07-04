import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export type ContentType = "images" | "videos" | "copy";

interface ContentTypeCardProps {
  type: ContentType;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ContentTypeCard({
  type,
  title,
  description,
  icon,
  selected = false,
  onClick,
  disabled = false,
}: ContentTypeCardProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(
        "relative flex flex-col gap-4 p-6 rounded-xl border-2 transition-all duration-200",
        "hover:shadow-md cursor-pointer",
        selected ? "border-primary bg-primary/5" : "border-border",
        disabled && "opacity-60 cursor-not-allowed hover:shadow-none"
      )}
    >
      {selected && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1">
          <CheckIcon className="h-4 w-4" />
        </div>
      )}

      <div className="text-3xl">{icon}</div>

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

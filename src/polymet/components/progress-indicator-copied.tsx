import { cn } from "@/lib/utils";

interface ProgressStep {
  id: number;
  label: string;
  status: "completed" | "current" | "upcoming";
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  className?: string;
}

export default function ProgressIndicator({
  steps,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "flex items-center",
              index < steps.length - 1 ? "w-full" : ""
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border",
                  step.status === "completed"
                    ? "bg-primary text-primary-foreground border-primary"
                    : step.status === "current"
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground bg-background"
                )}
              >
                {step.status === "completed" ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1",
                  step.status === "completed"
                    ? "text-primary font-medium"
                    : step.status === "current"
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-full h-0.5 mx-2",
                  step.status === "completed" ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

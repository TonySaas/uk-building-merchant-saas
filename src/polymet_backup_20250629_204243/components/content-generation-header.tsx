import { cn } from "@/lib/utils";
import ProgressIndicator from "@/polymet/components/progress-indicator-copied";
import CreditsIndicator from "@/polymet/components/credits-indicator";

interface ContentGenerationHeaderProps {
  currentStep: number;
  creditsRemaining: number;
  totalCredits: number;
  className?: string;
}

export default function ContentGenerationHeader({
  currentStep,
  creditsRemaining,
  totalCredits,
  className,
}: ContentGenerationHeaderProps) {
  const steps = [
    {
      id: 1,
      label: "Brief",
      status:
        currentStep >= 1
          ? currentStep > 1
            ? "completed"
            : "current"
          : "upcoming",
    },
    {
      id: 2,
      label: "Options",
      status:
        currentStep >= 2
          ? currentStep > 2
            ? "completed"
            : "current"
          : "upcoming",
    },
    {
      id: 3,
      label: "Generate",
      status:
        currentStep >= 3
          ? currentStep > 3
            ? "completed"
            : "current"
          : "upcoming",
    },
    {
      id: 4,
      label: "Review",
      status: currentStep >= 4 ? "current" : "upcoming",
    },
  ] as const;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            AI Content Creation Studio
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate professional marketing content for your products
          </p>
        </div>
        <CreditsIndicator
          creditsRemaining={creditsRemaining}
          totalCredits={totalCredits}
        />
      </div>

      <ProgressIndicator steps={steps} />
    </div>
  );
}

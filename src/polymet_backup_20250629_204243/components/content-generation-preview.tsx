import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ContentGenerationPreviewProps {
  isGenerating: boolean;
  onRegenerate?: () => void;
  estimatedTime?: number; // in seconds
  className?: string;
  contentType: "images" | "videos" | "copy";
  previewUrl?: string;
}

export default function ContentGenerationPreview({
  isGenerating,
  onRegenerate,
  estimatedTime = 30,
  className,
  contentType,
  previewUrl,
}: ContentGenerationPreviewProps) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(estimatedTime);

  // Simulate progress when generating
  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      setTimeRemaining(estimatedTime);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Make progress non-linear to simulate real AI generation
        const increment = Math.max(1, 5 * (1 - prev / 100));
        const newProgress = Math.min(99, prev + increment);

        // Update time remaining
        const progressPercent = newProgress / 100;
        const newTimeRemaining = Math.ceil(
          estimatedTime * (1 - progressPercent)
        );
        setTimeRemaining(newTimeRemaining);

        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating, estimatedTime]);

  const renderPlaceholder = () => {
    if (contentType === "images") {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center p-4">
            <div className="text-4xl mb-4">🖼️</div>
            <p className="text-muted-foreground">
              Your product image will appear here
            </p>
          </div>
        </div>
      );
    } else if (contentType === "videos") {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center p-4">
            <div className="text-4xl mb-4">🎬</div>
            <p className="text-muted-foreground">
              Your marketing video will appear here
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center p-4">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-muted-foreground">
              Your marketing copy will appear here
            </p>
          </div>
        </div>
      );
    }
  };

  const renderContent = () => {
    if (!previewUrl) return renderPlaceholder();

    if (contentType === "images") {
      return (
        <img
          src={previewUrl}
          alt="Generated content"
          className="w-full h-full object-contain rounded-lg"
        />
      );
    } else if (contentType === "videos") {
      return (
        <video src={previewUrl} controls className="w-full h-full rounded-lg" />
      );
    } else {
      return (
        <div className="w-full h-full p-4 bg-card border rounded-lg overflow-y-auto">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: previewUrl }}
          />
        </div>
      );
    }
  };

  const renderLoadingOverlay = () => {
    if (!isGenerating) return null;

    return (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
        <Loader2Icon className="h-12 w-12 text-primary animate-spin mb-4" />

        <h3 className="text-xl font-medium mb-2">Generating your content...</h3>
        <p className="text-muted-foreground mb-6">
          This may take a few moments
        </p>

        <div className="w-3/4 space-y-2">
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Creating {contentType}</span>
            <span>~{timeRemaining} seconds remaining</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative min-h-[400px] w-full", className)}>
      {renderLoadingOverlay()}

      <div className="absolute top-4 right-4 z-20">
        {!isGenerating && previewUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            className="bg-background/80 backdrop-blur-sm"
          >
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        )}
      </div>

      <div className="w-full h-full min-h-[400px]">{renderContent()}</div>
    </div>
  );
}

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EditIcon,
  RefreshCwIcon,
  CheckIcon,
  LayoutIcon,
  MaximizeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ContentSizeVariant =
  | "facebook-post"
  | "instagram-post"
  | "instagram-story"
  | "twitter-post"
  | "youtube-thumbnail"
  | "youtube-video"
  | "tiktok-video"
  | "custom";

export type ContentOrientation = "landscape" | "portrait" | "square";

export interface ContentSizeConfig {
  name: string;
  width: number;
  height: number;
  orientation: ContentOrientation;
  aspectRatio: string;
}

export const CONTENT_SIZE_VARIANTS: Record<
  ContentSizeVariant,
  ContentSizeConfig
> = {
  "facebook-post": {
    name: "Facebook Post",
    width: 1200,
    height: 630,
    orientation: "landscape",
    aspectRatio: "1.9:1",
  },
  "instagram-post": {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    orientation: "square",
    aspectRatio: "1:1",
  },
  "instagram-story": {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    orientation: "portrait",
    aspectRatio: "9:16",
  },
  "twitter-post": {
    name: "Twitter Post",
    width: 1200,
    height: 675,
    orientation: "landscape",
    aspectRatio: "16:9",
  },
  "youtube-thumbnail": {
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    orientation: "landscape",
    aspectRatio: "16:9",
  },
  "youtube-video": {
    name: "YouTube Video",
    width: 1920,
    height: 1080,
    orientation: "landscape",
    aspectRatio: "16:9",
  },
  "tiktok-video": {
    name: "TikTok Video",
    width: 1080,
    height: 1920,
    orientation: "portrait",
    aspectRatio: "9:16",
  },
  custom: {
    name: "Custom Size",
    width: 800,
    height: 600,
    orientation: "landscape",
    aspectRatio: "4:3",
  },
};

interface ContentVariation {
  id: string;
  type: "image" | "video" | "copy";
  content: string; // URL for images/videos, HTML for copy
  thumbnail?: string; // Optional thumbnail for videos
  sizeVariant?: ContentSizeVariant;
  customWidth?: number;
  customHeight?: number;
}

interface ContentVariationCarouselProps {
  variations: ContentVariation[];
  onApprove?: (variation: ContentVariation) => void;
  onEdit?: (variation: ContentVariation) => void;
  onRegenerate?: (variation: ContentVariation) => void;
  onDownload?: (variation: ContentVariation) => void;
  className?: string;
  showSizeVariants?: boolean;
  onSizeVariantChange?: (
    variation: ContentVariation,
    sizeVariant: ContentSizeVariant
  ) => void;
}

export default function ContentVariationCarousel({
  variations,
  onApprove,
  onEdit,
  onRegenerate,
  onDownload,
  className,
  showSizeVariants = true,
  onSizeVariantChange,
}: ContentVariationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [activeSizeVariant, setActiveSizeVariant] =
    useState<ContentSizeVariant>(variations[0]?.sizeVariant || "facebook-post");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeVariation = variations[activeIndex];
  const currentSizeConfig = CONTENT_SIZE_VARIANTS[activeSizeVariant];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    scrollToThumbnail(activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < variations.length - 1 ? prev + 1 : prev));
    scrollToThumbnail(activeIndex + 1);
  };

  const scrollToThumbnail = (index: number) => {
    if (scrollRef.current && index >= 0 && index < variations.length) {
      const thumbnails = scrollRef.current.querySelectorAll("[data-thumbnail]");
      if (thumbnails[index]) {
        thumbnails[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedVariations((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSizeVariantChange = (value: ContentSizeVariant) => {
    setActiveSizeVariant(value);

    if (onSizeVariantChange && activeVariation) {
      onSizeVariantChange(activeVariation, value);
    }
  };

  const renderContent = (variation: ContentVariation) => {
    const sizeVariant = activeSizeVariant;
    const sizeConfig = CONTENT_SIZE_VARIANTS[sizeVariant];

    const containerStyle = {
      aspectRatio: sizeConfig.width / sizeConfig.height,
      maxHeight: "70vh",
      width: "auto",
    };

    switch (variation.type) {
      case "image":
        return (
          <div
            className="flex items-center justify-center w-full h-full bg-muted/20"
            style={containerStyle}
          >
            <img
              src={variation.content}
              alt="Generated content"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        );

      case "video":
        return (
          <div
            className="flex items-center justify-center w-full h-full bg-muted/20"
            style={containerStyle}
          >
            <video
              src={variation.content}
              controls
              className="max-w-full max-h-full rounded-lg"
            />
          </div>
        );

      case "copy":
        return (
          <div className="w-full h-full p-6 bg-card border rounded-lg overflow-y-auto">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: variation.content }}
            />
          </div>
        );
    }
  };

  const renderThumbnail = (variation: ContentVariation, index: number) => {
    const isActive = index === activeIndex;
    const isSelected = selectedVariations.includes(variation.id);

    let thumbnailContent;

    switch (variation.type) {
      case "image":
        thumbnailContent = (
          <img
            src={variation.content}
            alt={`Variation ${index + 1}`}
            className="w-full h-full object-cover"
          />
        );

        break;
      case "video":
        thumbnailContent = (
          <img
            src={variation.thumbnail || variation.content}
            alt={`Variation ${index + 1}`}
            className="w-full h-full object-cover"
          />
        );

        break;
      case "copy":
        thumbnailContent = (
          <div className="w-full h-full flex items-center justify-center bg-muted text-xs text-center p-1 overflow-hidden">
            {variation.content.substring(0, 50)}...
          </div>
        );

        break;
    }

    return (
      <div
        data-thumbnail
        key={variation.id}
        className={cn(
          "relative cursor-pointer transition-all duration-200 rounded-md overflow-hidden",
          "w-20 h-20 flex-shrink-0",
          isActive ? "ring-2 ring-primary" : "hover:opacity-80",
          isSelected && "ring-2 ring-green-500"
        )}
        onClick={() => setActiveIndex(index)}
      >
        {thumbnailContent}

        <Badge
          variant="default"
          className="absolute top-1 right-1 h-5 w-5 p-0 flex items-center justify-center"
        >
          {index + 1}
        </Badge>

        {isSelected && (
          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
            <CheckIcon className="h-6 w-6 text-green-500" />
          </div>
        )}
      </div>
    );
  };

  const renderSizeVariantSelector = () => {
    if (!showSizeVariants || activeVariation?.type === "copy") return null;

    return (
      <div className="flex items-center gap-2 mb-4">
        <LayoutIcon className="h-4 w-4 text-muted-foreground" />

        <Select
          value={activeSizeVariant}
          onValueChange={handleSizeVariantChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CONTENT_SIZE_VARIANTS).map(([key, config]) => (
              <SelectItem key={key} value={key as ContentSizeVariant}>
                <div className="flex items-center justify-between w-full">
                  <span>{config.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {config.aspectRatio}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="ml-2">
                {currentSizeConfig.width} × {currentSizeConfig.height}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Dimensions in pixels</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Badge variant="secondary" className="capitalize">
          {currentSizeConfig.orientation}
        </Badge>
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Size variant selector */}
      {renderSizeVariantSelector()}

      {/* Main preview */}
      <div className="relative bg-muted/30 rounded-lg flex items-center justify-center">
        {renderContent(activeVariation)}

        {/* Navigation arrows */}
        {variations.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={handlePrevious}
              disabled={activeIndex === 0}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={handleNext}
              disabled={activeIndex === variations.length - 1}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {onDownload && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onDownload(activeVariation)}
            >
              <DownloadIcon className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}

          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(activeVariation)}
            >
              <EditIcon className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}

          {onRegenerate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onRegenerate(activeVariation)}
            >
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              Regenerate
            </Button>
          )}

          {onApprove && (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                toggleSelection(activeVariation.id);
                onApprove(activeVariation);
              }}
            >
              <CheckIcon className="h-4 w-4 mr-1" />

              {selectedVariations.includes(activeVariation.id)
                ? "Selected"
                : "Select"}
            </Button>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {variations.length > 1 && (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
          >
            {variations.map((variation, index) =>
              renderThumbnail(variation, index)
            )}
          </div>
        </div>
      )}

      {/* Variation info */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          Variation {activeIndex + 1} of {variations.length}
        </span>

        {selectedVariations.length > 0 && (
          <span className="text-green-500 font-medium">
            {selectedVariations.length} selected
          </span>
        )}
      </div>
    </div>
  );
}

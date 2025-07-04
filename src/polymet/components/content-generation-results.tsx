import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentVariationCarousel from "@/polymet/components/content-variation-carousel";
import ContentEditingPanel from "@/polymet/components/content-editing-panel";

interface ContentVariation {
  id: string;
  type: "image" | "video" | "copy";
  content: string;
  thumbnail?: string;
}

interface ContentGenerationResultsProps {
  contentType: "images" | "videos" | "copy";
  variations: ContentVariation[];
  onRegenerate: () => void;
  onSave: (selectedVariations: ContentVariation[]) => void;
  onBack: () => void;
  className?: string;
}

export default function ContentGenerationResults({
  contentType,
  variations,
  onRegenerate,
  onSave,
  onBack,
  className,
}: ContentGenerationResultsProps) {
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [editingContent, setEditingContent] = useState<ContentVariation | null>(
    null
  );
  const [isEditingPanelOpen, setIsEditingPanelOpen] = useState(false);

  const handleApprove = (variation: ContentVariation) => {
    setSelectedVariations((prev) =>
      prev.includes(variation.id)
        ? prev.filter((id) => id !== variation.id)
        : [...prev, variation.id]
    );
  };

  const handleEdit = (variation: ContentVariation) => {
    setEditingContent(variation);
    setIsEditingPanelOpen(true);
  };

  const handleSaveEdit = (editedContent: any) => {
    // In a real application, this would update the variation with the edited content
    console.log("Saving edited content:", editedContent);
    setIsEditingPanelOpen(false);
  };

  const handleRegenerate = (variation: ContentVariation) => {
    // In a real application, this would regenerate just this variation
    console.log("Regenerating variation:", variation);
  };

  const handleDownload = (variation: ContentVariation) => {
    // In a real application, this would download the content
    console.log("Downloading variation:", variation);
  };

  const handleSaveSelected = () => {
    const selected = variations.filter((v) =>
      selectedVariations.includes(v.id)
    );
    onSave(selected);
  };

  const imageVariations = variations.filter((v) => v.type === "image");
  const videoVariations = variations.filter((v) => v.type === "video");
  const copyVariations = variations.filter((v) => v.type === "copy");

  const getTabsForContentType = () => {
    switch (contentType) {
      case "images":
        return (
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
        );

      case "videos":
        return (
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        );

      case "copy":
        return (
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="copy">Copy</TabsTrigger>
          </TabsList>
        );

      default:
        return (
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="copy">Copy</TabsTrigger>
          </TabsList>
        );
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Tabs defaultValue={contentType} className="w-full">
        {getTabsForContentType()}

        <TabsContent value="images" className="mt-6">
          {imageVariations.length > 0 ? (
            <ContentVariationCarousel
              variations={imageVariations}
              onApprove={handleApprove}
              onEdit={handleEdit}
              onRegenerate={handleRegenerate}
              onDownload={handleDownload}
            />
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                No image variations generated yet.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          {videoVariations.length > 0 ? (
            <ContentVariationCarousel
              variations={videoVariations}
              onApprove={handleApprove}
              onEdit={handleEdit}
              onRegenerate={handleRegenerate}
              onDownload={handleDownload}
            />
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                No video variations generated yet.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="copy" className="mt-6">
          {copyVariations.length > 0 ? (
            <ContentVariationCarousel
              variations={copyVariations}
              onApprove={handleApprove}
              onEdit={handleEdit}
              onRegenerate={handleRegenerate}
              onDownload={handleDownload}
            />
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                No copy variations generated yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4">
        <div className="space-x-2">
          <Button variant="outline" onClick={onBack}>
            Back to Options
          </Button>
          <Button variant="outline" onClick={onRegenerate}>
            Regenerate All
          </Button>
        </div>
        <Button
          onClick={handleSaveSelected}
          disabled={selectedVariations.length === 0}
        >
          Save Selected ({selectedVariations.length})
        </Button>
      </div>

      {editingContent && (
        <ContentEditingPanel
          isOpen={isEditingPanelOpen}
          onClose={() => setIsEditingPanelOpen(false)}
          onSave={handleSaveEdit}
          contentType={editingContent.type}
          content={editingContent}
        />
      )}
    </div>
  );
}

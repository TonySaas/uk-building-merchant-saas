import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  XIcon,
  SaveIcon,
  RefreshCwIcon,
  DownloadIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/polymet/components/color-picker";
import SliderWithLabel from "@/polymet/components/slider-with-label";

interface ContentEditingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedContent: any) => void;
  contentType: "image" | "video" | "copy";
  content: any;
  className?: string;
}

export default function ContentEditingPanel({
  isOpen,
  onClose,
  onSave,
  contentType,
  content,
  className,
}: ContentEditingPanelProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [activeTab, setActiveTab] = useState("style");

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  const renderImageEditor = () => {
    return (
      <Tabs defaultValue="style" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="text">Text Overlay</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-4">
          <div>
            <Label>Color Scheme</Label>
            <ColorPicker
              className="mt-2"
              selectedColors={editedContent.colorScheme || []}
              onChange={(colors) =>
                setEditedContent({ ...editedContent, colorScheme: colors })
              }
            />
          </div>

          <div>
            <Label>Background Style</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Clean", "Gradient", "Textured"].map((style) => (
                <Button
                  key={style}
                  variant={
                    editedContent.backgroundStyle === style
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setEditedContent({
                      ...editedContent,
                      backgroundStyle: style,
                    })
                  }
                  className="h-auto py-2"
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <SliderWithLabel
              min={0}
              max={100}
              label="Brightness"
              value={
                editedContent.brightness ? [editedContent.brightness] : [50]
              }
              onChange={(value) =>
                setEditedContent({ ...editedContent, brightness: value[0] })
              }
            />
          </div>

          <div>
            <SliderWithLabel
              min={0}
              max={100}
              label="Contrast"
              value={editedContent.contrast ? [editedContent.contrast] : [50]}
              onChange={(value) =>
                setEditedContent({ ...editedContent, contrast: value[0] })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div>
            <Label htmlFor="overlay-text">Text Overlay</Label>
            <Textarea
              id="overlay-text"
              placeholder="Add text to display on the image"
              value={editedContent.overlayText || ""}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  overlayText: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>

          <div>
            <Label>Text Position</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Top", "Center", "Bottom"].map((position) => (
                <Button
                  key={position}
                  variant={
                    editedContent.textPosition === position
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setEditedContent({
                      ...editedContent,
                      textPosition: position,
                    })
                  }
                  className="h-auto py-2"
                >
                  {position}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Text Color</Label>
            <ColorPicker
              className="mt-2"
              selectedColors={
                editedContent.textColor
                  ? [editedContent.textColor]
                  : ["#FFFFFF"]
              }
              onChange={(colors) =>
                setEditedContent({ ...editedContent, textColor: colors[0] })
              }
              maxColors={1}
            />
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-logo">Show Logo</Label>
            <Switch
              id="show-logo"
              checked={editedContent.showLogo || false}
              onCheckedChange={(checked) =>
                setEditedContent({ ...editedContent, showLogo: checked })
              }
            />
          </div>

          <div>
            <Label>Logo Position</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Top-Left", "Top-Right", "Bottom-Left", "Bottom-Right"].map(
                (position) => (
                  <Button
                    key={position}
                    variant={
                      editedContent.logoPosition === position
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setEditedContent({
                        ...editedContent,
                        logoPosition: position,
                      })
                    }
                    className="h-auto py-2"
                    disabled={!editedContent.showLogo}
                  >
                    {position}
                  </Button>
                )
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="watermark">Watermark Text</Label>
            <Input
              id="watermark"
              placeholder="Add watermark text"
              value={editedContent.watermark || ""}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  watermark: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  const renderVideoEditor = () => {
    return (
      <Tabs
        defaultValue="script"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="script">Script</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="script" className="space-y-4">
          <div>
            <Label htmlFor="voiceover-script">Voiceover Script</Label>
            <Textarea
              id="voiceover-script"
              placeholder="Enter the script for the voiceover"
              value={editedContent.voiceoverScript || ""}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  voiceoverScript: e.target.value,
                })
              }
              className="mt-2 min-h-[200px]"
            />
          </div>

          <div>
            <Label>Voice Style</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Professional", "Friendly", "Energetic", "Calm"].map(
                (style) => (
                  <Button
                    key={style}
                    variant={
                      editedContent.voiceStyle === style ? "default" : "outline"
                    }
                    onClick={() =>
                      setEditedContent({ ...editedContent, voiceStyle: style })
                    }
                    className="h-auto py-2"
                  >
                    {style}
                  </Button>
                )
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timing" className="space-y-4">
          <div>
            <SliderWithLabel
              min={15}
              max={60}
              step={5}
              label="Video Duration"
              formatValue={(value) => `${value} seconds`}
              value={editedContent.duration ? [editedContent.duration] : [30]}
              onChange={(value) =>
                setEditedContent({ ...editedContent, duration: value[0] })
              }
            />
          </div>

          <div>
            <Label>Scene Timing</Label>
            <div className="mt-2 space-y-2">
              {["Intro", "Features", "Benefits", "Call to Action"].map(
                (scene, index) => (
                  <div key={scene} className="flex items-center gap-2">
                    <span className="w-24 text-sm">{scene}</span>
                    <SliderWithLabel
                      min={1}
                      max={20}
                      value={
                        editedContent.sceneTiming?.[index]
                          ? [editedContent.sceneTiming[index]]
                          : [5]
                      }
                      onChange={(value) => {
                        const newSceneTiming = [
                          ...(editedContent.sceneTiming || [5, 5, 5, 5]),
                        ];

                        newSceneTiming[index] = value[0];
                        setEditedContent({
                          ...editedContent,
                          sceneTiming: newSceneTiming,
                        });
                      }}
                      formatValue={(value) => `${value}s`}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <div>
            <Label>Background Music</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["None", "Upbeat", "Corporate", "Inspirational", "Relaxed"].map(
                (music) => (
                  <Button
                    key={music}
                    variant={
                      editedContent.backgroundMusic === music
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setEditedContent({
                        ...editedContent,
                        backgroundMusic: music,
                      })
                    }
                    className="h-auto py-2"
                  >
                    {music}
                  </Button>
                )
              )}
            </div>
          </div>

          <div>
            <SliderWithLabel
              min={0}
              max={100}
              label="Music Volume"
              value={
                editedContent.musicVolume ? [editedContent.musicVolume] : [50]
              }
              onChange={(value) =>
                setEditedContent({ ...editedContent, musicVolume: value[0] })
              }
              disabled={editedContent.backgroundMusic === "None"}
            />
          </div>

          <div>
            <SliderWithLabel
              min={0}
              max={100}
              label="Voice Volume"
              value={
                editedContent.voiceVolume ? [editedContent.voiceVolume] : [80]
              }
              onChange={(value) =>
                setEditedContent({ ...editedContent, voiceVolume: value[0] })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div>
            <Label htmlFor="caption-text">Caption Text</Label>
            <Textarea
              id="caption-text"
              placeholder="Add captions to display in the video"
              value={editedContent.captionText || ""}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  captionText: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>

          <div>
            <Label>Text Style</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Minimal", "Bold", "Elegant"].map((style) => (
                <Button
                  key={style}
                  variant={
                    editedContent.textStyle === style ? "default" : "outline"
                  }
                  onClick={() =>
                    setEditedContent({ ...editedContent, textStyle: style })
                  }
                  className="h-auto py-2"
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-subtitles">Show Subtitles</Label>
            <Switch
              id="show-subtitles"
              checked={editedContent.showSubtitles || false}
              onCheckedChange={(checked) =>
                setEditedContent({ ...editedContent, showSubtitles: checked })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  const renderCopyEditor = () => {
    return (
      <Tabs
        defaultValue="content"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="tone">Tone & Style</TabsTrigger>
          <TabsTrigger value="format">Format</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              placeholder="Enter headline"
              value={editedContent.headline || ""}
              onChange={(e) =>
                setEditedContent({ ...editedContent, headline: e.target.value })
              }
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="main-copy">Main Copy</Label>
            <Textarea
              id="main-copy"
              placeholder="Enter the main copy text"
              value={editedContent.mainCopy || ""}
              onChange={(e) =>
                setEditedContent({ ...editedContent, mainCopy: e.target.value })
              }
              className="mt-2 min-h-[200px]"
            />
          </div>

          <div>
            <Label htmlFor="call-to-action">Call to Action</Label>
            <Input
              id="call-to-action"
              placeholder="Enter call to action text"
              value={editedContent.callToAction || ""}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  callToAction: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="tone" className="space-y-4">
          <div>
            <Label>Tone</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                "Professional",
                "Friendly",
                "Enthusiastic",
                "Technical",
                "Conversational",
              ].map((tone) => (
                <Button
                  key={tone}
                  variant={editedContent.tone === tone ? "default" : "outline"}
                  onClick={() =>
                    setEditedContent({ ...editedContent, tone: tone })
                  }
                  className="h-auto py-2"
                >
                  {tone}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <SliderWithLabel
              min={0}
              max={100}
              label="Formality"
              leftLabel="Casual"
              rightLabel="Formal"
              value={editedContent.formality ? [editedContent.formality] : [50]}
              onChange={(value) =>
                setEditedContent({ ...editedContent, formality: value[0] })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="use-emojis">Use Emojis</Label>
            <Switch
              id="use-emojis"
              checked={editedContent.useEmojis || false}
              onCheckedChange={(checked) =>
                setEditedContent({ ...editedContent, useEmojis: checked })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="format" className="space-y-4">
          <div>
            <Label>Length</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Short", "Medium", "Long"].map((length) => (
                <Button
                  key={length}
                  variant={
                    editedContent.length === length ? "default" : "outline"
                  }
                  onClick={() =>
                    setEditedContent({ ...editedContent, length: length })
                  }
                  className="h-auto py-2"
                >
                  {length}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Format Style</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Paragraphs", "Bullet Points", "Numbered List", "Q&A"].map(
                (format) => (
                  <Button
                    key={format}
                    variant={
                      editedContent.format === format ? "default" : "outline"
                    }
                    onClick={() =>
                      setEditedContent({ ...editedContent, format: format })
                    }
                    className="h-auto py-2"
                  >
                    {format}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="include-statistics">Include Statistics</Label>
            <Switch
              id="include-statistics"
              checked={editedContent.includeStatistics || false}
              onCheckedChange={(checked) =>
                setEditedContent({
                  ...editedContent,
                  includeStatistics: checked,
                })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  const renderEditor = () => {
    switch (contentType) {
      case "image":
        return renderImageEditor();
      case "video":
        return renderVideoEditor();
      case "copy":
        return renderCopyEditor();
      default:
        return <p>Unsupported content type</p>;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-full sm:w-[400px] bg-background border-l z-50",
        "flex flex-col shadow-xl transition-transform duration-300 ease-in-out",
        "transform translate-x-0",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">
          Edit {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">{renderEditor()}</div>

      <div className="p-4 border-t flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  colors?: string[];
  selectedColors?: string[];
  onChange?: (colors: string[]) => void;
  maxColors?: number;
  className?: string;
}

const defaultColors = [
  "#FF6B6B",
  "#FF9E7D",
  "#FFCA80",
  "#FFE066",
  "#9EE09E",
  "#88D9E6",
  "#7DB9E8",
  "#B088F9",
  "#D988F9",
  "#FF88DC",
];

export default function ColorPicker({
  colors = defaultColors,
  selectedColors = [],
  onChange,
  maxColors = 5,
  className,
}: ColorPickerProps) {
  const [selected, setSelected] = useState<string[]>(selectedColors);
  const [customColor, setCustomColor] = useState<string>("#000000");

  const handleColorClick = (color: string) => {
    let newSelected;

    if (selected.includes(color)) {
      newSelected = selected.filter((c) => c !== color);
    } else {
      if (selected.length >= maxColors) {
        newSelected = [...selected.slice(1), color];
      } else {
        newSelected = [...selected, color];
      }
    }

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const handleAddCustomColor = () => {
    if (customColor && !colors.includes(customColor)) {
      const newSelected =
        selected.length >= maxColors
          ? [...selected.slice(1), customColor]
          : [...selected, customColor];

      setSelected(newSelected);
      onChange?.(newSelected);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleColorClick(color)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              selected.includes(color)
                ? "ring-2 ring-offset-2 ring-primary"
                : ""
            )}
            style={{ backgroundColor: color }}
            title={color}
          >
            {selected.includes(color) && (
              <CheckIcon className={`h-4 w-4 ${getContrastColor(color)}`} />
            )}
          </button>
        ))}

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center bg-muted",
                "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              )}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="space-y-3">
              <Label htmlFor="custom-color">Custom color</Label>
              <div className="flex gap-2">
                <input
                  id="custom-color"
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-10 h-10 p-0 border-0 rounded-md cursor-pointer"
                />

                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-24 px-2 py-1 text-sm border rounded-md"
                />

                <Button size="sm" onClick={handleAddCustomColor}>
                  Add
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Selected:</p>
          <div className="flex gap-1">
            {selected.map((color) => (
              <div
                key={color}
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to determine if text should be white or black based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "text-black" : "text-white";
}

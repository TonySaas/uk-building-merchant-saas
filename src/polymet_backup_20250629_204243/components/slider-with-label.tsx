import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderWithLabelProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number[];
  value?: number[];
  onChange?: (value: number[]) => void;
  className?: string;
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

export default function SliderWithLabel({
  min,
  max,
  step = 1,
  defaultValue,
  value,
  onChange,
  className,
  label,
  leftLabel,
  rightLabel,
  formatValue = (value) => value.toString(),
  disabled = false,
}: SliderWithLabelProps) {
  const [internalValue, setInternalValue] = useState<number[]>(
    defaultValue || [min]
  );

  const handleValueChange = (newValue: number[]) => {
    if (!value) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const currentValue = value || internalValue;

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <span className="text-sm font-medium">
            {formatValue(currentValue[0])}
          </span>
        </div>
      )}

      <Slider
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="py-1"
      />

      {(leftLabel || rightLabel) && (
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          {leftLabel && <span>{leftLabel}</span>}
          {rightLabel && <span>{rightLabel}</span>}
        </div>
      )}
    </div>
  );
}

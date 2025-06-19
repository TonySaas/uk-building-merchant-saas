
import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TimePickerProps {
  value?: Date;
  onChange?: (value: Date) => void;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  format?: "12" | "24";
  step?: number;
  is24Hour?: boolean;
  minTime?: string;
  maxTime?: string;
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  ({
    value,
    onChange,
    label,
    error,
    helperText,
    className,
    disabled,
    required,
    format = "24",
    step = 15,
    is24Hour = format === "24",
    minTime,
    maxTime,
    ...props
  }, ref) => {
    // Convert Date to time string
    const timeValue = value ? 
      `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}` 
      : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      
      const timeString = e.target.value;
      if (timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const newDate = new Date();
        newDate.setHours(hours, minutes, 0, 0);
        onChange(newDate);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label className={cn("text-sm font-medium", error && "text-destructive")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        <Input
          ref={ref}
          type="time"
          value={timeValue}
          onChange={handleChange}
          disabled={disabled}
          min={minTime}
          max={maxTime}
          step={step * 60}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
export { TimePicker };

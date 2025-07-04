
import React, { forwardRef, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputBaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  success?: boolean;
  floatingLabel?: boolean;
  className?: string;
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({
    label,
    error,
    helperText,
    size = "md",
    variant = "default",
    leftIcon,
    rightIcon,
    startIcon,
    endIcon,
    success,
    floatingLabel,
    className,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: "h-8 text-sm",
      md: "h-10",
      lg: "h-12 text-lg",
    };

    const variantClasses = {
      default: "",
      outlined: "border-2",
      filled: "bg-muted",
    };

    // Use startIcon if provided, otherwise use leftIcon
    const displayLeftIcon = startIcon || leftIcon;
    // Use endIcon if provided, otherwise use rightIcon
    const displayRightIcon = endIcon || rightIcon;

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </Label>
        )}
        
        <div className="relative">
          {displayLeftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {displayLeftIcon}
            </div>
          )}
          
          <Input
            ref={ref}
            id={inputId}
            className={cn(
              sizeClasses[size],
              variantClasses[variant],
              displayLeftIcon && "pl-10",
              displayRightIcon && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              success && "border-green-500 focus-visible:ring-green-500",
              className
            )}
            {...props}
          />
          
          {displayRightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {displayRightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}

        {success && !error && (
          <p className="text-sm text-green-600">Valid input</p>
        )}
      </div>
    );
  }
);

InputBase.displayName = "InputBase";

export { InputBase };

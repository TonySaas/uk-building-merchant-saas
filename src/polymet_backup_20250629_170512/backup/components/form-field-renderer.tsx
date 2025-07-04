
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./form-types";

interface FormFieldRendererProps {
  field: FormField;
  value: string;
  onChange: (id: string, value: string) => void;
  onBlur: (field: FormField) => void;
  error?: string;
  touched?: boolean;
}

export default function FormFieldRenderer({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched = false
}: FormFieldRendererProps) {
  const hasError = touched && error;
  
  return (
    <div className="space-y-2">
      <Label
        htmlFor={field.id}
        className={
          field.required
            ? "after:content-['*'] after:ml-0.5 after:text-red-500"
            : ""
        }
      >
        {field.label}
      </Label>

      {field.type === "textarea" ? (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          onBlur={() => onBlur(field)}
          className={hasError ? "border-red-500" : ""}
        />
      ) : (
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          onBlur={() => onBlur(field)}
          className={hasError ? "border-red-500" : ""}
        />
      )}

      {hasError && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

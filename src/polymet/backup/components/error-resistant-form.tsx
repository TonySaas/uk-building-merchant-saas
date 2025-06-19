
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormFieldRenderer from "./form-field-renderer";
import FormErrorMessage from "./form-error-message";
import FormSuccessMessage from "./form-success-message";
import { validateField, validateForm } from "./form-validation-utils";
import { FormField } from "./form-types";

interface ErrorResistantFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  title?: string;
  submitLabel?: string;
  maxErrorRetries?: number;
}

export default function ErrorResistantForm({
  fields,
  onSubmit,
  title = "Form",
  submitLabel = "Submit",
  maxErrorRetries = 3,
}: ErrorResistantFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorRetries, setErrorRetries] = useState(0);
  const [errorDismissed, setErrorDismissed] = useState(false);

  // Initialize form data
  useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      initialData[field.id] = "";
    });
    setFormData(initialData);
  }, [fields]);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when field is changed
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }

    // Mark as touched
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field.id]: true }));

    const error = validateField(field, formData[field.id] || "");

    if (error) {
      setErrors((prev) => ({ ...prev, [field.id]: error }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field.id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => {
      allTouched[field.id] = true;
    });
    setTouched(allTouched);

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(fields, formData);
    setErrors(validationErrors);

    if (isValid) {
      setIsSubmitting(true);
      setFormError(null);

      try {
        await onSubmit(formData);
        setFormSuccess(true);
        setErrorRetries(0); // Reset error retries on success

        // Reset form after success
        setTimeout(() => {
          setFormSuccess(false);

          // Clear form data
          const clearedData: Record<string, string> = {};
          fields.forEach((field) => {
            clearedData[field.id] = "";
          });
          setFormData(clearedData);
          setTouched({});
        }, 3000);
      } catch (error) {
        // Increment error retries
        const newRetryCount = errorRetries + 1;
        setErrorRetries(newRetryCount);

        if (newRetryCount >= maxErrorRetries) {
          setFormError(
            "Maximum retry attempts reached. Please try again later or contact support."
          );
        } else {
          setFormError(
            `An error occurred. Retry attempt ${newRetryCount}/${maxErrorRetries}`
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const dismissError = () => {
    setFormError(null);
    setErrorDismissed(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {formError && !errorDismissed && (
            <FormErrorMessage error={formError} onDismiss={dismissError} />
          )}

          {formSuccess && <FormSuccessMessage />}

          {fields.map((field) => (
            <FormFieldRenderer
              key={field.id}
              field={field}
              value={formData[field.id] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[field.id]}
              touched={touched[field.id]}
            />
          ))}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              (errorRetries >= maxErrorRetries && !errorDismissed)
            }
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

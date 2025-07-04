
import { FormField } from "./form-types";

/**
 * Validates a single field based on its type and rules
 * 
 * @param field The form field configuration
 * @param value Current value of the field
 * @returns Error message or null if valid
 */
export const validateField = (field: FormField, value: string): string | null => {
  // Required validation
  if (field.required && !value.trim()) {
    return `${field.label} is required`;
  }

  // Email validation
  if (field.type === "email" && value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
  }

  // Custom validation
  if (field.validation && value.trim()) {
    return field.validation(value);
  }

  return null;
};

/**
 * Validates all fields in a form
 * 
 * @param fields Array of form field configurations
 * @param formData Current form data
 * @returns Object with field errors
 */
export const validateForm = (
  fields: FormField[],
  formData: Record<string, string>
): { errors: Record<string, string>; isValid: boolean } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  fields.forEach((field) => {
    const value = formData[field.id] || "";
    const error = validateField(field, value);

    if (error) {
      errors[field.id] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};

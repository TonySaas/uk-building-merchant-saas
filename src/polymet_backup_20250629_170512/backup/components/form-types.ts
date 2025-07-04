
/**
 * Common types for form components
 */

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | null;
}

export interface FormError {
  message: string;
  retryCount?: number;
  maxRetries?: number;
}

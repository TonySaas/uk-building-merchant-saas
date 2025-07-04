
import React, { useState, useEffect } from "react";
import { TextInput, TextInputProps } from "@/polymet/components/text-input";

export interface StateValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  isValid?: boolean;
  message?: string;
  custom?: (value: string) => boolean | string;
}

interface StateTrackedInputProps extends Omit<TextInputProps, "error" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onStateChange?: (state: {
    isDirty: boolean;
    isTouched: boolean;
    isValid: boolean;
    value: string;
  }) => void;
  validationRules?: StateValidation;
  stateOptions?: { validateOnBlur?: boolean; validateOnChange?: boolean };
  validator?: (value: string) => { isValid: boolean; message?: string };
}

export default function StateTrackedInput({
  value = "",
  onChange,
  onStateChange,
  validationRules,
  validator,
  stateOptions = { validateOnBlur: true, validateOnChange: true },
  ...props
}: StateTrackedInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const validateValue = (val: string): boolean => {
    if (validator) {
      const result = validator(val);
      if (!result.isValid) {
        setError(result.message || "Invalid value");
        return false;
      }
      setError("");
      return true;
    }
    
    if (!validationRules) return true;

    const { required, minLength, maxLength, pattern, custom } = validationRules;

    if (required && !val.trim()) {
      setError("This field is required");
      return false;
    }

    if (minLength && val.length < minLength) {
      setError(`Minimum length is ${minLength} characters`);
      return false;
    }

    if (maxLength && val.length > maxLength) {
      setError(`Maximum length is ${maxLength} characters`);
      return false;
    }

    if (pattern && !pattern.test(val)) {
      setError("Invalid format");
      return false;
    }

    if (custom) {
      const customResult = custom(val);
      if (typeof customResult === "string") {
        setError(customResult);
        return false;
      }
      if (!customResult) {
        setError("Invalid value");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    setIsDirty(true);
    
    const isValid = stateOptions?.validateOnChange ? validateValue(newValue) : true;
    
    const state = {
      isDirty: true,
      isTouched,
      isValid,
      value: newValue,
    };
    
    onStateChange?.(state);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (stateOptions?.validateOnBlur) {
      validateValue(internalValue);
    }
  };

  return (
    <TextInput
      {...props}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={isTouched ? error : ""}
    />
  );
}

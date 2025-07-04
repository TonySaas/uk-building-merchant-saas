
import React, { useState } from "react";
import StateTrackedInput from "@/polymet/components/state-managed-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormValidationExample() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formState, setFormState] = useState({
    email: { isDirty: false, isTouched: false, isValid: false },
    password: { isDirty: false, isTouched: false, isValid: false },
    confirmPassword: { isDirty: false, isTouched: false, isValid: false },
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateFieldState = (field: string, state: any) => {
    setFormState(prev => ({ ...prev, [field]: state }));
  };

  const isFormValid = Object.values(formState).every(field => field.isValid);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Form Validation Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StateTrackedInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => updateField("email", value)}
          onStateChange={(state) => updateFieldState("email", state)}
          validationRules={{
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          }}
          stateOptions={{ validateOnBlur: true, validateOnChange: false }}
        />

        <StateTrackedInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => updateField("password", value)}
          onStateChange={(state) => updateFieldState("password", state)}
          validationRules={{
            required: true,
            minLength: 8,
          }}
          stateOptions={{ validateOnBlur: true, validateOnChange: false }}
        />

        <StateTrackedInput
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
          onStateChange={(state) => updateFieldState("confirmPassword", state)}
          validator={(value) => ({
            isValid: value === formData.password,
            message: value !== formData.password ? "Passwords do not match" : undefined,
          })}
          stateOptions={{ validateOnBlur: true, validateOnChange: false }}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

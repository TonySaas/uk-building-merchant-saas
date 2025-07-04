
import React from "react";
import { CheckCircleIcon } from "lucide-react";

interface FormSuccessMessageProps {
  message?: string;
}

export default function FormSuccessMessage({ 
  message = "Form submitted successfully!" 
}: FormSuccessMessageProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
      <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

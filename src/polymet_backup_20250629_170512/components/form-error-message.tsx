
import React from "react";
import { AlertCircleIcon, XIcon } from "lucide-react";

interface FormErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

export default function FormErrorMessage({ error, onDismiss }: FormErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
      <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
      <div className="flex-grow">{error}</div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

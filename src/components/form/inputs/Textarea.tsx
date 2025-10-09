import { forwardRef, useState, useEffect } from "react";

type TextareaProps = {
  label: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  value?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, maxLength, showCharacterCount, value = "", ...props }, ref) => {
    const [charCount, setCharCount] = useState(value.length);

    // Update character count when value changes (for react-hook-form integration)
    useEffect(() => {
      setCharCount(value.length);
    }, [value]);

    const isNearLimit = maxLength && charCount > maxLength * 0.8;
    const isOverLimit = maxLength && charCount > maxLength;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-white font-medium block">
            {label}{required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          className={`px-4 py-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y ${
            isOverLimit
              ? "border-red-500 focus:ring-red-500"
              : isNearLimit
              ? "border-yellow-500 focus:ring-yellow-500"
              : "border-gray-300"
          }`}
          {...props}
        />
        <div className="flex justify-between items-center">
          {error && <span className="text-red-400 text-sm">{error}</span>}
          {showCharacterCount && maxLength && (
            <span
              className={`text-sm ml-auto ${
                isOverLimit
                  ? "text-red-400"
                  : isNearLimit
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";


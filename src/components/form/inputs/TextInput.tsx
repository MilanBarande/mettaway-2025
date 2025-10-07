import { forwardRef } from "react";

type TextInputProps = {
  label: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-white font-medium block">
            {label}{required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className="px-4 py-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...props}
        />
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";


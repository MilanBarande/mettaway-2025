import { forwardRef } from "react";

type CheckboxProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 text-gray-200 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="w-4 h-4 text-blue-600 cursor-pointer rounded"
            {...props}
          />
          <span>{label}</span>
        </label>
        {error && <span className="text-red-400 text-sm ml-7">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";


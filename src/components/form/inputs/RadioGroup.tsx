import { forwardRef } from "react";

type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  label: string;
  error?: string;
  required?: boolean;
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ label, error, required, options, name, value, onChange }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-white font-medium block">
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-gray-200 cursor-pointer"
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";


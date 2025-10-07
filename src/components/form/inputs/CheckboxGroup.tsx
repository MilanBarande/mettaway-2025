import { forwardRef } from "react";

type CheckboxOption = {
  value: string;
  label: string;
};

type CheckboxGroupProps = {
  label: string;
  error?: string;
  required?: boolean;
  options: CheckboxOption[];
  name: string;
  values?: string[];
  onChange?: (values: string[]) => void;
};

export const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ label, error, required, options, name, values = [], onChange }, ref) => {
    const handleChange = (optionValue: string, checked: boolean) => {
      if (onChange) {
        if (checked) {
          onChange([...values, optionValue]);
        } else {
          onChange(values.filter((v) => v !== optionValue));
        }
      }
    };

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
                type="checkbox"
                name={name}
                value={option.value}
                checked={values.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="w-4 h-4 text-blue-600 cursor-pointer rounded"
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

CheckboxGroup.displayName = "CheckboxGroup";


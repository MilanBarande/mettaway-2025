import { forwardRef, useId } from "react";

type SelectProps = {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string | number; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, options, ...props }, ref) => {
    const id = useId();
    const selectId = props.id || id;
    
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={selectId} className="text-white font-medium block">
            {label}{required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-label={!label ? props.name || "Select option" : undefined}
          className="pl-4 pr-10 py-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
          {...props}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";


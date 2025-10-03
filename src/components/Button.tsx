import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 font-medium rounded-md shadow-sm hover:shadow-md disabled:cursor-not-allowed cursor-pointer transition-colors duration-150";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800 disabled:bg-gray-400",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white active:bg-gray-800 disabled:bg-gray-400"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


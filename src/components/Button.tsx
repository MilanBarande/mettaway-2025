import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm hover:shadow-md active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


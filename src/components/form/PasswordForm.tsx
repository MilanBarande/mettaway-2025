"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export function PasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);
    
    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      
      setMessage(result.message);
      setIsSuccess(result.success);
      setIsRateLimited(result.rateLimited || false);
      
      if (result.success) {
        setPassword("");
        setIsRateLimited(false);
        // Redirect to registration page after a brief delay
        setTimeout(() => {
          router.push('/register');
        }, 1000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-2 items-center">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="px-4 py-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[250px]"
          disabled={isLoading || isRateLimited}
        />
        <Button type="submit" disabled={isLoading || !password || isRateLimited}>
          {isLoading ? 'Checking...' : 'Submit'}
        </Button>
      </div>
      <div className="min-h-[40px]">
        {message && (
          <p className={`text-sm px-4 py-2 rounded-lg backdrop-blur-md text-center ${
            isSuccess
              ? 'bg-green-500/30 text-green-100' 
              : isRateLimited
                ? 'bg-orange-500/30 text-orange-100'
                : 'bg-red-500/30 text-red-100'
          }`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}


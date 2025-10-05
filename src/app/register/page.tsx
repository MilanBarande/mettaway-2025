"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegistrationForm } from "@/components/form/Registration/RegistrationForm";

export default function RegisterPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    async function checkAuth() {
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <main className="font-sans flex flex-col items-center justify-center h-screen overflow-hidden">
        <p className="text-white text-lg">Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="font-sans flex flex-col items-center justify-center h-screen overflow-hidden py-4 md:py-8">
      <RegistrationForm />
    </main>
  );
}




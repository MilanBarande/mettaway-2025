"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RegistrationForm } from "@/components/form/Registration/RegistrationForm";

export default function RegisterPageContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const guest = searchParams.get('guest');
  const isGuestMode = guest === 'true';

  useEffect(() => {
    // Check authentication
    async function checkAuth() {
      try {
        // If guest=true is in the URL, allow immediate access
        if (isGuestMode) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/check-auth${guest ? `?guest=${guest}` : ''}`);
        const data = await response.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      } catch {
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [router, guest, isGuestMode]);

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

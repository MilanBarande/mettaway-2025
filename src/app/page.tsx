"use client";

import { Birds } from "@/components/Birds";
import { PasswordForm } from "@/components/form/PasswordForm";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [count, setCount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch('/api/registration-count');
        const data = await response.json();
        if (data.success) {
          setCount(Math.min(data.count, 140));
        } else {
          console.error('Error fetching registration count:', data.error);
          console.error('Error details:', data.details);
        }
      } catch (error) {
        console.error('Network error fetching registration count:', error);
      }
    };
    
    // Fetch count on initial load
    fetchRegistrationCount();
    
    // Check if redirected from successful registration
    if (searchParams.get('registered') === 'true') {
      // Fetch updated count after registration
      fetchRegistrationCount();
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);
  
  return (
    <main className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Birds count={count} />
      
      {/* Password Form / Loading */}
      <div className="flex flex-col items-center gap-6">
        {isRedirecting ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white text-lg">Redirecting to registration...</p>
          </div>
        ) : (
          <>
            {/* Bird count text */}
            <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
              {count} {count === 1 ? 'bird' : 'birds'} ready to fly, {140 - count} {140 - count === 1 ? 'place' : 'places'} left in the nest
            </p>
            
            <PasswordForm onRedirecting={setIsRedirecting} />
          </>
        )}
      </div>
    </main>
  );
}

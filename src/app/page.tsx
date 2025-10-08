"use client";

import { Birds } from "@/components/Birds";
import { PasswordForm } from "@/components/form/PasswordForm";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const [count, setCount] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(true);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchRegistrationCount = async () => {
      setIsLoadingCount(true);
      try {
        const response = await fetch('/api/registration-count');
        const data = await response.json();
        if (data.success) {
          setCount(Math.min(data.count, 140));
        }
      } catch (error) {
        console.error('Network error fetching registration count:', error);
      } finally {
        setIsLoadingCount(false);
      }
    };

    const checkRegistrationStatus = () => {
      // Check for registration cookie client-side
      const cookies = document.cookie.split(';');
      const registeredCookie = cookies.find(cookie =>
        cookie.trim().startsWith('mettaway_registered=')
      );
      setIsRegistered(registeredCookie?.includes('true') || false);
      setIsLoadingRegistration(false);
    };

    // Fetch count on initial load
    fetchRegistrationCount();
    checkRegistrationStatus();

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
      
      {/* Password Form / Loading / Thank You Message */}
      <div className="flex flex-col items-center gap-6">
        {isRedirecting ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-white text-lg">Redirecting to registration...</p>
          </div>
        ) : isLoadingCount || isLoadingRegistration ? (
          <div className="flex items-center justify-center px-4 py-2 rounded-lg backdrop-blur-md bg-black/30">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : isRegistered ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-white text-lg font-medium px-6 py-4 rounded-lg backdrop-blur-md bg-green-500/20 border border-green-400/30 text-center max-w-md">
              <p className="mb-2">🕊️ Thank you for registering!</p>
              <p className="text-sm opacity-90">You will hear from us soon with more details about your journey to Ventara.</p>
            </div>
            <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
              {count} {count === 1 ? 'bird' : 'birds'} ready to fly, {140 - count} {140 - count === 1 ? 'place' : 'places'} left in the nest
            </p>
          </div>
        ) : (
          <>
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

export default function Home() {
  return (
    <Suspense fallback={
      <main className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}

"use client";

import { Birds } from "@/components/Birds";
import { PasswordForm } from "@/components/form/PasswordForm";
import { useState, Suspense } from "react";

function HomeContent() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const isFull = true;
  const count = 140;
  const countText = `${count} ready to fly, no spots left in the nest`;

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
        ) : isRegistered ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-white text-lg font-medium px-6 py-4 rounded-lg backdrop-blur-md bg-green-500/20 border border-green-400/30 text-center max-w-md">
              <p className="mb-2">🕊️ Thank you for registering!</p>
              <p className="text-sm opacity-90">
                You will hear from us soon with more details about your journey
                to Ventara.
              </p>
            </div>
            <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
              {countText}
            </p>
          </div>
        ) : isFull ? (
          <>
            <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
              {countText}
            </p>
            <div className="flex flex-col gap-2 items-center">
              <a
                href="https://nmdl.notion.site/29132652a3f3803e90d9d35f6b54e27a?pvs=105"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm px-3 py-1 rounded backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                Waitlist
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
              {countText}
            </p>

            <div className="flex flex-col gap-2 items-center">
              <PasswordForm onRedirecting={setIsRedirecting} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

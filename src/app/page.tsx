"use client";

import { Birds } from "@/components/Birds";
import { Button } from "@/components/Button";
import { PasswordForm } from "@/components/form/PasswordForm";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const addBird = () => {
    if (count < 140) {
      setCount(count + 1);
    }
  };
  
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
            <PasswordForm onRedirecting={setIsRedirecting} />

            {/* Birds */}
            <div className="flex flex-col items-center gap-2 mt-8">
              <Button onClick={addBird} disabled={count >= 140}>Add Bird</Button>
              <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
                {count} {count === 1 ? 'bird' : 'birds'} ready to fly, {140 - count} {140 - count === 1 ? 'place' : 'places'} left in the nest
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

import { Suspense } from "react";
import RegisterPageContent from "./RegisterPageContent";

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <main className="font-sans flex flex-col items-center justify-center h-screen overflow-hidden">
        <p className="text-white text-lg">Loading...</p>
      </main>
    }>
      <RegisterPageContent />
    </Suspense>
  );
}




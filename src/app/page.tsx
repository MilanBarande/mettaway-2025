"use client";

import { Birds } from "@/components/Birds";
import { Button } from "@/components/Button";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  
  const addBird = () => {
    if (count < 140) {
      setCount(count + 1);
    }
  };
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Birds count={count} />
      <div className="flex flex-col items-center gap-2 mt-20">
        <Button onClick={addBird} disabled={count >= 140}>Add Bird</Button>
        <p className="text-sm text-white px-4 py-2 rounded-lg backdrop-blur-md bg-black/30 text-center">
          {count} {count === 1 ? 'bird' : 'birds'} ready to fly, {140 - count} {140 - count === 1 ? 'place' : 'places'} left in the nest
        </p>
      </div>
    </div>
  );
}

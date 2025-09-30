'use client';

import { useState, useEffect } from 'react';

type BirdProps = {
  count?: number;
}

type BirdData = {
  centerX: number;
  centerY: number;
  radius: number;
  duration: number;
  delay: number;
}

export function Bird({ count = 3 }: BirdProps) {
  const [birds, setBirds] = useState<BirdData[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Scale down birds when count is high so they don't overlap
  const birdScale = Math.max(0.3, Math.min(1, 10 / count));
  
  useEffect(() => {
    // Generate random orbit parameters for each bird on the client side only
    const generatedBirds = Array.from({ length: count }, () => {
      const centerX = 20 + Math.random() * 60; // 20-80% of viewport width
      const centerY = 20 + Math.random() * 60; // 20-80% of viewport height
      const radius = 10 + Math.random() * 25; // 10-35vh radius
      const duration = 15 + Math.random() * 15; // 15-30 seconds
      const delay = -Math.random() * duration; // Random start position
      
      return { centerX, centerY, radius, duration, delay };
    });
    
    setBirds(generatedBirds);
    setMounted(true);
  }, [count]);
  
  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  
  return (
    <>
      {birds.map((bird, index) => (
        <div
          key={index}
          className="bird-circle-container"
          style={{
            left: `${bird.centerX}%`,
            top: `${bird.centerY}%`,
          }}
        >
          <div 
            className="bird-orbit"
            style={{
              animationDelay: `${bird.delay}s`,
              animationDuration: `${bird.duration}s`,
              ['--orbit-radius' as string]: `${bird.radius}vh`,
            }}
          >
            <div 
              className="bird"
              style={{
                transform: `translateX(-30px) translateY(-42.5px) scale(${birdScale})`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
}

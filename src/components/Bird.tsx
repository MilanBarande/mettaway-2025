'use client';

import { useEffect, useState } from 'react';

type BirdProps = {
  count?: number;
}

type BirdData = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
  angle: number;
  scale: number;
}

function generateRandomBird(id: number): BirdData {
  // Random angle for direction
  const angle = Math.random() * 360;
  const angleRad = angle * (Math.PI / 180);
  
  // Start from outside the screen (off-screen positions)
  const startX = Math.random() * 120 - 10; // -10 to 110
  const startY = Math.random() * 120 - 10;
  
  // Fly a long distance in the direction (2-3x screen size)
  const distance = 200 + Math.random() * 100; // 200-300 viewport units
  const endX = startX + Math.cos(angleRad) * distance;
  const endY = startY + Math.sin(angleRad) * distance;
  
  // Duration between 30-60 seconds for the full journey
  const duration = 30 + Math.random() * 30;
  
  // Random delay for staggered start
  const delay = -Math.random() * duration;
  
  // Random scale between 0.6 and 1
  const scale = 0.6 + Math.random() * 0.4;
  
  return { id, startX, startY, endX, endY, duration, delay, angle, scale };
}

export function Bird({ count = 1 }: BirdProps) {
  const [birds, setBirds] = useState<BirdData[]>([]);
  
  useEffect(() => {
    // Generate random birds on mount
    const generatedBirds = Array.from({ length: count }, (_, i) => generateRandomBird(i));
    setBirds(generatedBirds);
  }, [count]);
  
  return (
    <>
      {birds.map((bird) => {
        const deltaX = bird.endX - bird.startX;
        const deltaY = bird.endY - bird.startY;
        
        return (
          <div
            key={bird.id}
            className="bird-container"
            style={{
              left: `${bird.startX}vw`,
              top: `${bird.startY}vh`,
              animation: `bird-fly-${bird.id} ${bird.duration}s linear ${bird.delay}s infinite`,
            }}
          >
            <div 
              className="bird"
              style={{
                transform: `rotate(${bird.angle}deg) scale(${bird.scale})`,
              }}
            ></div>
            <style>{`
              @keyframes bird-fly-${bird.id} {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(${deltaX}vw, ${deltaY}vh);
                }
              }
            `}</style>
          </div>
        );
      })}
    </>
  );
}

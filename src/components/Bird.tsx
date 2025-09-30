'use client';

type BirdProps = {
  count?: number;
}

export function Bird({ count = 3 }: BirdProps) {
  // Scale down birds when count is high so they don't overlap
  const birdScale = Math.max(0.3, Math.min(1, 10 / count));
  
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        // Generate random orbit parameters for each bird
        const centerX = 20 + Math.random() * 60; // 20-80% of viewport width
        const centerY = 20 + Math.random() * 60; // 20-80% of viewport height
        const radius = 10 + Math.random() * 25; // 10-35vh radius
        const duration = 15 + Math.random() * 15; // 15-30 seconds
        const delay = -Math.random() * duration; // Random start position
        
        return (
          <div
            key={index}
            className="bird-circle-container"
            style={{
              left: `${centerX}%`,
              top: `${centerY}%`,
            }}
          >
            <div 
              className="bird-orbit"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                ['--orbit-radius' as string]: `${radius}vh`,
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
        );
      })}
    </>
  );
}

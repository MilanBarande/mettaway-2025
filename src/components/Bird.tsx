type BirdProps = {
  count?: number;
}

export function Bird({ count = 3 }: BirdProps) {
  const orbitDuration = count * 1.5
  
  return (
    <div className="bird-circle-container">
      {Array.from({ length: count }, (_, index) => {
        // Calculate animation delay to space birds evenly around the circle
        // Each bird starts at a different point in the animation cycle
        const delayOffset = -(orbitDuration / count) * index;
        
        return (
          <div 
            key={index} 
            className="bird-orbit"
            style={{
              animationDelay: `${delayOffset}s`,
            }}
          >
            <div className="bird"></div>
          </div>
        );
      })}
    </div>
  );
}

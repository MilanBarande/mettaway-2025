'use client';

import { useState, useEffect } from 'react';

type BirdData = {
  centerX: number;
  centerY: number;
  radius: number;
  duration: number;
  delay: number;
  hue: number;
  saturation: number;
  brightness: number;
  scale: number;
}

type BirdProps = {
  count: number;
}

export function Bird({ count }: BirdProps) {
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  
  useEffect(() => {
    // Calculate base scale factor based on count
    // At count=10, baseScale is 1.0; at count=140, baseScale is ~0.6
    const baseScale = Math.max(0.6, Math.min(1, 10 / count));
    
    // Add random variation (±20%)
    const randomVariation = 0.8 + Math.random() * 0.4;
    const scale = baseScale * randomVariation;
    
    // Generate random parameters for this bird once on mount
    const centerX = 20 + Math.random() * 60; // 20-80% of viewport width
    const centerY = 20 + Math.random() * 60; // 20-80% of viewport height
    const radius = 10 + Math.random() * 25; // 10-35vh radius
    const duration = 15 + Math.random() * 15; // 15-30 seconds
    const delay = -Math.random() * duration; // Random start position
    const hue = Math.random() * 360; // Random hue for color (0-360 degrees)
    const saturation = 800 + Math.random() * 2000; // Vary saturation (800-2800%)
    const brightness = 80 + Math.random() * 60; // Vary brightness (80-140%)
    
    setBirdData({ centerX, centerY, radius, duration, delay, hue, saturation, brightness, scale });
  }, []); // Empty dependency array - only runs once on mount
  
  // Don't render until bird data is generated
  if (!birdData) {
    return null;
  }
  
  return (
    <div
      className="bird-circle-container"
      style={{
        left: `${birdData.centerX}%`,
        top: `${birdData.centerY}%`,
      }}
    >
      <div 
        className="bird-orbit"
        style={{
          animationDelay: `${birdData.delay}s`,
          animationDuration: `${birdData.duration}s`,
          ['--orbit-radius' as string]: `${birdData.radius}vh`,
        }}
      >
        <div 
          className="bird"
          style={{
            transform: `translateX(-30px) translateY(-42.5px) scale(${birdData.scale})`,
            filter: `brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(${birdData.saturation}%) hue-rotate(${birdData.hue}deg) brightness(${birdData.brightness}%)`,
          }}
        ></div>
      </div>
    </div>
  );
}

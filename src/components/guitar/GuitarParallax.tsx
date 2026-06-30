"use client";

import { useEffect, useRef } from 'react';
import { set } from 'animejs/utils';

interface GuitarParallaxProps {
  children: React.ReactNode;
  speed?: number;
}

export default function GuitarParallax({ children, speed = 0.05 }: GuitarParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      targetX.current = ((e.clientX - centerX) / centerX) * speed * 100;
      targetY.current = ((e.clientY - centerY) / centerY) * speed * 100;
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08;
      currentY.current += (targetY.current - currentY.current) * 0.08;
      
      set(container, {
        translateX: currentX.current,
        translateY: currentY.current,
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className="guitar-container">
      {children}
    </div>
  );
}
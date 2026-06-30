"use client";

import { useEffect, useRef } from 'react';
import { animate } from 'animejs/animation';
import { onScroll } from 'animejs/events';
import { set } from 'animejs/utils';

interface GuitarParallaxProps {
  children: React.ReactNode;
  /** Mouse parallax sensitivity — larger = more movement */
  speed?: number;
  /** Scroll parallax intensity — how much the element moves as you scroll through the section */
  scrollSpeed?: number;
}

export default function GuitarParallax({ 
  children, 
  speed = 0.05,
  scrollSpeed = 0.2
}: GuitarParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const animationRef = useRef<number>(0);
  const observerRef = useRef<ReturnType<typeof onScroll> | null>(null);

  // Scroll-driven parallax using animejs onScroll()
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a scroll-synced animation that moves the container on Y axis
    // as the user scrolls through the section, creating a parallax depth effect
    const scrollAnim = animate(container, {
      translateY: [scrollSpeed * 200, -(scrollSpeed * 200)],
      easing: 'linear',
      duration: 2000,
      autoplay: false,
    });

    const observer = onScroll({
      target: container,
      sync: 0.12, // smooth interpolation for natural feel
    }).link(scrollAnim);

    observerRef.current = observer;

    return () => {
      observer.revert();
      scrollAnim.pause();
    };
  }, [scrollSpeed]);

  // Mouse-driven parallax
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      targetX.current = ((e.clientX - centerX) / centerX) * speed * 100;
      targetY.current = ((e.clientY - centerY) / centerY) * speed * 100;
    };

    const animateMouse = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08;
      currentY.current += (targetY.current - currentY.current) * 0.08;
      
      set(container, {
        translateX: currentX.current,
        translateY: currentY.current,
      });
      
      animationRef.current = requestAnimationFrame(animateMouse);
    };

    window.addEventListener('mousemove', onMouseMove);
    animateMouse();

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
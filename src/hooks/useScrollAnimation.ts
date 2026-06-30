"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { animate } from 'animejs/animation';

type AnimeInstance = ReturnType<typeof animate>;

const anim = (targets: any, options: any) => animate(targets, { ...options, autoplay: false });

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface AnimationConfig {
  translateY?: number[];
  translateX?: number[];
  scale?: number[];
  opacity?: number[];
  rotate?: number[];
  duration?: number;
  delay?: number | ((el: Element, i: number) => number);
  easing?: string;
  stagger?: number | { from: string; grid: number[] };
}

export function useScrollAnimation(
  selector: string,
  animationConfig: AnimationConfig,
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options;
  const elementsRef = useRef<Element[]>([]);
  const animationsRef = useRef<AnimeInstance[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const runAnimation = useCallback(() => {
    if (elementsRef.current.length === 0) return;

    const animation = anim(
      elementsRef.current,
      { ...animationConfig, autoplay: false }
    );

    animationsRef.current.push(animation);
    animation.play();
    setHasAnimated(true);
  }, [animationConfig]);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elementsRef.current = Array.from(elements);

    if (elementsRef.current.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            if (triggerOnce) {
              observer.disconnect();
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    elementsRef.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      animationsRef.current.forEach((a) => a.pause());
    };
  }, [selector, threshold, rootMargin, triggerOnce, runAnimation]);

  return { hasAnimated };
}

export function useEntranceAnimation(selector: string, delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<AnimeInstance | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            animationRef.current = animate(
              elements,
              {
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                duration: 1000,
                delay,
                easing: 'easeOutExpo',
              }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      animationRef.current?.pause();
    };
  }, [selector, delay]);

  return isVisible;
}

export function useParallax(speed: number = 0.05) {
  const targetY = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      targetX.current = ((e.clientX - centerX) / centerX) * speed * 50;
      targetY.current = ((e.clientY - centerY) / centerY) * speed * 50;
    };

    const loop = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08;
      currentY.current += (targetY.current - currentY.current) * 0.08;
      animationRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed]);

  return {
    currentX,
    currentY,
  };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(scrollProgress, 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
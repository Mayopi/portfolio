"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import GuitarParallax from "@/components/guitar/GuitarParallax";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs/animation";
import { onScroll } from "animejs/events";

/*
 * Dynamic import with ssr: false to prevent hydration errors
 * This is necessary because ModelViewer uses Three.js/React Three Fiber
 * which interacts with the DOM and doesn't match server-rendered HTML
 */
const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-centerrounded-2xl border border-primary/20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-primary text-sm">Loading 3D Model...</p>
      </div>
    </div>
  ),
});

export default function Hobbies() {
  const [isVisible, setIsVisible] = useState(false);
  const [, setModelLoaded] = useState(false);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-synced parallax using animejs onScroll() — creates depth by moving
  // elements at different rates as the user scrolls through the section.
  // This is the modern "animejs.com" style parallax effect.
  useEffect(() => {
    if (isMobile) return;

    // Build an array so we can clean up cleanly
    const observers: ReturnType<typeof onScroll>[] = [];
    const animations: ReturnType<typeof animate>[] = [];

    // --- Header: slow parallax (deepest layer) ---
    // Moves subtly as you scroll, creating a background depth effect
    const headerAnim = animate(".hobbies-header", {
      translateY: [60, -60],
      scale: [0.9, 1, 1, 0.9],
      easing: "linear",
      duration: 2000,
      autoplay: false,
    });
    animations.push(headerAnim);
    const headerObserver = onScroll({
      target: ".hobbies-header",
      sync: 0.12,
    }).link(headerAnim);
    observers.push(headerObserver);

    // --- Text elements: medium parallax (mid layer) ---
    // Each text element moves at a slightly different rate for staggered depth
    const textAnim = animate(".hobbies-text", {
      translateY: [80, -80],
      easing: "linear",
      duration: 2000,
      autoplay: false,
    });
    animations.push(textAnim);
    const textObserver = onScroll({
      target: ".hobbies-text",
      sync: 0.15,
    }).link(textAnim);
    observers.push(textObserver);

    // --- Floating decorative accent line (between title and text) ---
    // Animate the gradient divider with a subtle width & opacity shift
    const dividerAnim = animate(".hobbies-divider", {
      scaleX: [0.3, 1, 1, 0.3],
      opacity: [0.2, 1, 1, 0.2],
      easing: "linear",
      duration: 2000,
      autoplay: false,
    });
    animations.push(dividerAnim);
    const dividerObserver = onScroll({
      target: ".hobbies-divider",
      sync: true,
    }).link(dividerAnim);
    observers.push(dividerObserver);

    // --- 3D model wrapper: scroll-synced horizontal entrance + zoom ---
    // Provides a subtle slide-in-from-right feel as the section scrolls into view
    const modelAnim = animate(".guitar-model-wrapper", {
      translateX: [100, -100],
      scale: [0.85, 1, 1, 0.85],
      easing: "linear",
      duration: 2000,
      autoplay: false,
    });
    animations.push(modelAnim);
    const modelObserver = onScroll({
      target: ".guitar-model-wrapper",
      sync: 0.18,
    }).link(modelAnim);
    observers.push(modelObserver);

    return () => {
      observers.forEach((obs) => obs.revert());
      animations.forEach((anim) => anim.pause());
    };
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hobbies"
      ref={sectionRef}
      className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Semi-transparent overlay for better content readability */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div
          className={`hobbies-header text-center mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-xl sm:text-5xl md:text-6xl font-bold mb-6 text-primary drop-shadow-[0_2px_10px_rgba(0,255,255,0.4)]">
            Do I Only Code?
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Beyond coding, music is where I find my way to prevent killing
            myself
          </p>
        </div>

        {/* Main Content - Left Text, Right Model */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="hobbies-text">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,255,255,0.3)]">
                Playing Guitar
              </h3>
              <div className="hobbies-divider h-1 w-24 bg-linear-to-r from-primary to-blue-500 mx-auto lg:mx-0 rounded-full mb-6"></div>
            </div>

            <p className="hobbies-text leading-relaxed">
              I started learning guitar from mid 2025 as a way to unwind after
              long hours of coding. It&apos;s been an incredible journey of
              self-expression and creativity, allowing me to relief stress and
              sometimes making it worse somehow.
            </p>
            <p className="hobbies-text leading-relaxed">
              master a skill. Playing guitar has become more than just a hobby;
              it&apos;s a way for me to connect with others and share my
              passion.
            </p>
          </div>

          {/* Right Side - 3D Model */}

          {!isMobile && (
            <GuitarParallax speed={0.06} scrollSpeed={0.25}>
              <div className="guitar-model-wrapper w-full h-[400px] sm:h-[500px] md:h-[600px]">
                <ModelViewer
                  url="/3D/guitar.glb"
                  width="100%"
                  height="100%"
                  showScreenshotButton={false}
                  enableMouseParallax={true}
                  enableManualRotation={true}
                  enableHoverRotation={true}
                  enableManualZoom={true}
                  defaultRotationX={-20}
                  defaultRotationY={30}
                  environmentPreset="sunset"
                  onModelLoaded={() => setModelLoaded(true)}
                />
              </div>
            </GuitarParallax>
          )}
        </div>
      </div>
    </section>
  );
}

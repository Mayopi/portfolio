"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/*
 * Dynamic import with ssr: false to prevent hydration errors
 * This is necessary because ModelViewer uses Three.js/React Three Fiber
 * which interacts with the DOM and doesn't match server-rendered HTML
 */
const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-2xl border border-primary/20">
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

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hobbies"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Semi-transparent overlay for better content readability */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-xl sm:text-5xl md:text-6xl font-bold mb-6 text-primary drop-shadow-[0_2px_10px_rgba(0,255,255,0.4)]">
            Do I Only Code?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Beyond coding, music is where I find my way to prevent killing
            myself
          </p>
        </div>

        {/* Main Content - Left Text, Right Model */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,255,255,0.3)]">
                Playing Guitar
              </h3>
              <div className="h-1 w-24 bg-linear-to-r from-primary to-blue-500 mx-auto lg:mx-0 rounded-full mb-6"></div>
            </div>

            <p className="leading-relaxed text-white">
              I started learning guitar from mid 2025 as a way to unwind after
              long hours of coding. It&apos;s been an incredible journey of
              self-expression and creativity, allowing me to relief stress and
              sometimes making it worse somehow.
            </p>
            <p className="leading-relaxed text-white">
              master a skill. Playing guitar has become more than just a hobby;
              it&apos;s a way for me to connect with others and share my
              passion.
            </p>
          </div>

          {/* Right Side - 3D Model */}

          <div className="w-full h-[400px] sm:h-[500px] md:h-[600px]">
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
        </div>
      </div>
    </section>
  );
}

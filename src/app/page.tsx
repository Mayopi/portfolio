"use client";
import Hero from "@/components/Hero";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative w-full">
        {/* Background Light Rays */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* Foreground Content */}
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
    </>
  );
}

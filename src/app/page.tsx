"use client";
import Hero from "@/components/Hero";
import Hobbies from "@/components/Hobbies";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />

      {/* Fixed Background Light Rays - extends across entire viewport */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor={theme === "dark" ? "#00ffff" : "#2374CF"}
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Main Content - positioned above background */}
      <main>
        <Hero />

        <Hobbies />
      </main>
    </>
  );
}

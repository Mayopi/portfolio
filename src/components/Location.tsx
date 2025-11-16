"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

/*
 * Dynamic import with ssr: false to prevent hydration errors
 * Globe component uses WebGL and doesn't work with SSR
 */
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-2xl border border-primary/20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-primary text-sm">Loading Globe...</p>
      </div>
    </div>
  ),
});

export default function Location() {
  const [isVisible, setIsVisible] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);
  const isMobile = useIsMobile();

  // Banyumas, Central Java, Indonesia coordinates
  const myLocation = {
    lat: -7.5153,
    lng: 109.2914,
    city: "Banyumas",
    region: "Central Java",
    country: "Indonesia",
    label: "Banyumas, Central Java",
  };

  // Ring animation data
  const ringsData = [
    {
      lat: myLocation.lat,
      lng: myLocation.lng,
      maxR: 5,
      propagationSpeed: 2,
      repeatPeriod: 1500,
    },
  ];

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Set point of view when globe is ready
  useEffect(() => {
    if (globeReady && globeRef.current) {
      globeRef.current.pointOfView(
        {
          lat: myLocation.lat,
          lng: myLocation.lng,
          altitude: 2.5,
        },
        1000 // Animation duration in ms
      );
    }
  }, [globeReady, myLocation.lat, myLocation.lng]);

  return (
    <section
      id="location"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Semi-transparent overlay for better content readability */}
      <div className="absolute inset-0  pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-primary">
            Where I'm Based
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Located in the heart of Java, Indonesia
          </p>
        </div>

        {/* Main Content - Left Globe, Right Text */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Left Side - 3D Globe */}
          {!isMobile && (
            <Globe
              ref={globeRef}
              width={500}
              height={500}
              backgroundColor={"#00000000"}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              pointAltitude={0.01}
              pointRadius="size"
              pointColor="color"
              pointLabel="label"
              ringsData={ringsData}
              ringColor={() => "#00ffff"}
              ringMaxRadius="maxR"
              ringPropagationSpeed="propagationSpeed"
              ringRepeatPeriod="repeatPeriod"
              atmosphereColor="#00ffff"
              atmosphereAltitude={0.15}
              onGlobeReady={() => setGlobeReady(true)}
            />
          )}

          {/* Right Side - Text Content */}
          <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {myLocation.city}
              </h3>
              <div className="h-1 w-24 bg-linear-to-r from-primary to-primary mx-auto lg:mx-0 rounded-full mb-6"></div>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed">
              I&apos;m based in{" "}
              <span className="text-primary font-semibold">
                {myLocation.city}
              </span>
              , a vibrant city in{" "}
              <span className="text-primary font-semibold">
                {myLocation.region}
              </span>
              ,{" "}
              <span className="text-primary font-semibold">
                {myLocation.country}
              </span>
              .
            </p>

            <p className="text-sm leading-relaxed">
              While I work remotely with clients and teams worldwide, being
              rooted here keeps me connected to my culture and provides a
              peaceful environment for creative work.
            </p>

            {/* CTA for contact */}
            <div className="pt-6">
              <Button
                className="rounded-full bg-linear-to-r from-primary to-blue-500"
                onClick={() => {
                  // TODO: Scroll to contact section or open contact modal
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Let&apos;s Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

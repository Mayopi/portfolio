"use client";

import useGithubProfile from "@/hooks/use-github-profile";
import { MoveDown } from "lucide-react";
import { useEffect, useState } from "react";

/*
 * Hero Component - Portfolio Landing Section
 *
 * Features:
 * - Responsive design (mobile-first)
 * - Animated text entrance
 * - Proper contrast over emerald light rays background
 * - Centered layout with proper spacing
 *
 * Usage: <Hero />
 */

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const { profile } = useGithubProfile("mayopi");

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleDownloadCV = () => {
    // TODO: Replace with actual CV download link
    console.log("Download CV clicked");
    // window.open('/path-to-cv.pdf', '_blank');
  };

  const handleViewProjects = () => {
    // TODO: Implement scroll to projects section or navigation
    console.log("View Projects clicked");
    // document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactMe = () => {
    // TODO: Implement scroll to contact section or navigation
    console.log("Contact Me clicked");
    // document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-10">
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
        {/* Animated greeting and name */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Greeting */}
          <p className="text-primary text-lg sm:text-xl md:text-2xl font-medium mb-4 tracking-wide">
            Hi there!
          </p>

          {/* Avatar */}
          {profile && (
            <div className="flex justify-center mb-4">
              <div
                className="p-20"
                style={{
                  backgroundImage: "url('/images/brush-background-blue.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  display: "inline-block",
                }}
              >
                <img
                  src={profile.avatar_url}
                  alt={`${profile.name || profile.login}'s avatar`}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-primary shadow-lg block"
                />
              </div>
            </div>
          )}
        </div>

        {/* Animated tagline/role */}
        <div
          className={`transition-all duration-1000 delay-200 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-primary">
            Front End Developer
          </h2>
        </div>

        {/* Animated description */}
        <div
          className={`transition-all duration-1000 delay-300 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-base max-w-3xl mx-auto mb-10 leading-relaxed">
            Im Eri! passionate Tech Enthusiast, constantly exploring the
            ever-evolving world of technology and seeking innovative solutions.
            With a deep curiosity and eagerness to learn. I thrive on embracing
            new challenges and leveraging cutting-edge tools to create impactful
            and meaningful experiences.
          </p>
        </div>

        {/* Experience */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12 text-center">
          <div className="grid lg:grid-cols-4 lg:gap-4 items-center justify-center">
            <p className="lg:text-xl">{new Date().getFullYear() - 2023}</p>
            <div className="uppercase lg:max-w-1 text-sm lg:col-span-3">
              <p>Years Experience</p>
            </div>
          </div>
          <div>
            <p>
              I Develop Meaningful Mobile &amp; Website <br /> Applications for
              Humanity
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Scroll Down
            </p>
            <MoveDown />
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * Accessibility Checklist:
 * - [x] Semantic HTML (section, h1, h2, p, button)
 * - [x] Proper heading hierarchy (h1 -> h2)
 * - [x] Sufficient color contrast with text shadows
 * - [x] Focus states on interactive elements (buttons)
 * - [x] Keyboard navigation support (native button elements)
 * - [ ] TODO: Add aria-labels to buttons if needed
 * - [ ] TODO: Add skip link for keyboard users
 *
 * Performance Considerations:
 * - useState/useEffect only for animation trigger (minimal overhead)
 * - Tailwind classes are purged in production
 * - No heavy dependencies or images in critical path
 * - CSS transitions use GPU-accelerated properties (transform, opacity)
 * - Responsive images if adding profile picture later
 *
 * Responsive Breakpoints:
 * - Mobile: Default (320px+)
 * - SM: 640px+ (tablet)
 * - MD: 768px+ (small desktop)
 * - LG: 1024px+ (desktop)
 * - XL: 1280px+ (large desktop)
 */

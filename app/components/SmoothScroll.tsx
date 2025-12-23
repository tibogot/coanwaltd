"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsapConfig";

interface SmoothScrollProps {
  children: ReactNode;
}

// Internal component to sync Lenis with ScrollTrigger
// Must be inside ReactLenis context to use useLenis hook
function LenisScrollTriggerSync() {
  // useLenis hook with callback automatically syncs scroll with ScrollTrigger
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    // One-time refresh after component mounts to ensure ScrollTrigger positions are correct
    ScrollTrigger.refresh();
  }, []);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Initialize with false, will be updated in effect
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Update state in a callback to avoid synchronous setState warning
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Initial check
    updatePreference();

    // Listen for changes to the preference
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: prefersReducedMotion ? 0 : 1.2, // Disable smooth scroll if user prefers reduced motion
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: false, // Disabled for better mobile performance (prevents stuttering)
        smoothWheel: true, // Enable smooth wheel scrolling for better consistency
        autoRaf: true, // Automatic requestAnimationFrame management for better performance
        anchors: true, // Enable smooth scrolling to anchor links
        lerp: 0.1, // Linear interpolation factor (lower = smoother)
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

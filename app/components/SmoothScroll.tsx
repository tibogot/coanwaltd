"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
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
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: true, // Enable touch synchronization for smoother mobile experience
        smoothWheel: true, // Enable smooth wheel scrolling for better consistency
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

"use client";

import { ReactLenis } from "lenis/react";
import { useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

interface SmoothScrollProps {
  children: ReactNode;
}

// Internal component to sync Lenis with ScrollTrigger
// Must be inside ReactLenis context to use useLenis hook
function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis with GSAP ticker for smooth animation
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis is ready and on window load
    const refreshScrollTrigger = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    refreshScrollTrigger();

    if (document.readyState === "complete") {
      refreshScrollTrigger();
    } else {
      window.addEventListener("load", refreshScrollTrigger);
    }

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refreshScrollTrigger);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: false,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

interface LoaderSplashProps {
  onComplete?: () => void;
}

export default function LoaderSplash({ onComplete }: LoaderSplashProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before animating
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!loaderRef.current || !isMounted) return;

      const loader = loaderRef.current;

      // Get the target size (matching the existing square: h-12 w-12 md:h-16 md:w-16)
      const getTargetSize = () => {
        if (typeof window !== "undefined") {
          return window.innerWidth >= 768 ? 64 : 48;
        }
        return 64; // default for SSR
      };

      const targetSize = getTargetSize();
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1080;

      // Calculate transform values to move to bottom right
      // Start from top-left (0, 0), end at bottom-right
      const targetX = viewportWidth - targetSize;
      const targetY = viewportHeight - targetSize;

      // Set initial state - full screen, positioned from top-left
      gsap.set(loader, {
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        x: 0,
        y: 0,
      });

      // Small delay to ensure smooth transition
      const delay = 0.3;

      // Animate to bottom right square
      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          // After animation, switch to right/bottom positioning
          gsap.set(loader, {
            top: "auto",
            left: "auto",
            bottom: 0,
            right: 0,
            x: 0,
            y: 0,
          });
          setIsComplete(true);
          onComplete?.();
        },
      });

      // Animate size and position using transforms
      tl.to(loader, {
        width: `${targetSize}px`,
        height: `${targetSize}px`,
        x: targetX,
        y: targetY,
        duration: 1.2,
        ease: "power3.inOut",
      });
    },
    { scope: loaderRef, dependencies: [isMounted] }
  );

  // Remove from DOM after animation completes
  if (isComplete) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="bg-secondary fixed z-[9999]"
      style={{
        backgroundColor: "var(--secondary)",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    />
  );
}


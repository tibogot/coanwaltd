"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import GradientTextReveal from "./GradientTextReveal";

interface GradientTextSectionProps {
  text: string;
  textColor?: string;
  highlightColor?: string;
  scrollDistance?: string;
  stagger?: number;
  className?: string;
  pin?: boolean;
}

export default function GradientTextSection({
  text,
  textColor = "#808080", // Grey color for initial state
  highlightColor = "#000000", // Black color for final state
  scrollDistance = "+=200%",
  stagger = 0.8,
  className = "",
  pin = true,
}: GradientTextSectionProps) {
  const pinContainerRef = useRef<HTMLDivElement>(null);

  // Handle pinning for pinned sections
  useGSAP(
    () => {
      if (!pin || !pinContainerRef.current) return;

      const textSection = pinContainerRef.current.querySelector(".text-section");
      if (!textSection) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: textSection,
          start: "top top",
          end: scrollDistance,
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });
    },
    { scope: pinContainerRef, dependencies: [pin, scrollDistance] }
  );

  // For non-pinned sections, use a simpler layout without the 300vh container
  if (!pin) {
    return (
      <section className={`relative w-full overflow-hidden py-32 md:py-48 ${className}`}>
        <div className="gradient-text-trigger flex h-auto w-full items-center justify-center text-center">
          <GradientTextReveal
            textColor={textColor}
            highlightColor={highlightColor}
            scrollDistance="bottom top"
            stagger={stagger}
            trigger=".gradient-text-trigger"
            start="top bottom"
            className="mx-auto w-full max-w-4xl px-4 md:px-8"
          >
            <h4 className="font-pp-neue-montreal text-4xl md:text-6xl">
              {text}
            </h4>
          </GradientTextReveal>
        </div>
      </section>
    );
  }

  // For pinned sections, use the original 300vh container layout
  return (
    <section ref={pinContainerRef} className={`relative w-full overflow-hidden ${className}`}>
      {/* Container with 300vh height for scroll animation */}
      <div className="relative" style={{ height: "300vh" }}>
        {/* Text section positioned absolutely, centered - matches original Section2 */}
        <div className="text-section absolute top-0 left-0 flex h-screen w-full items-center justify-center text-center">
          <GradientTextReveal
            textColor={textColor}
            highlightColor={highlightColor}
            scrollDistance={scrollDistance}
            stagger={stagger}
            trigger=".text-section"
            className="w-full px-4 md:px-8"
          >
            <h4 className="font-pp-neue-montreal text-4xl leading-tight md:text-6xl lg:text-7xl">
              {text}
            </h4>
          </GradientTextReveal>
        </div>
      </div>
    </section>
  );
}

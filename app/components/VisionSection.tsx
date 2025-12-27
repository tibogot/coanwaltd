"use client";

import { useRef } from "react";
import AnimatedText from "./AnimatedText3";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsapConfig";

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titlePlaceholderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !titleRef.current ||
        !contentRef.current ||
        !titlePlaceholderRef.current
      )
        return;

      let scrollTriggerInstance: ScrollTrigger | null = null;

      // Wait for content to render, then calculate pin distance
      const updatePinDistance = () => {
        if (
          !contentRef.current ||
          !titleRef.current ||
          !titlePlaceholderRef.current
        )
          return;

        const contentHeight = contentRef.current.offsetHeight;
        const pinDistance = contentHeight;
        const titleHeight = titleRef.current.offsetHeight;
        const titleWidth = titleRef.current.offsetWidth;

        // Set placeholder dimensions to match title
        gsap.set(titlePlaceholderRef.current, {
          height: titleHeight,
          width: titleWidth,
          display: "none", // Hidden initially
        });

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${pinDistance}px`,
          pin: titleRef.current,
          pinSpacing: true,
          scrub: false,
          onEnter: () => {
            // Show placeholder to maintain layout
            if (titlePlaceholderRef.current) {
              gsap.set(titlePlaceholderRef.current, { display: "block" });
            }
          },
          onLeave: () => {
            // Hide placeholder when unpinned
            if (titlePlaceholderRef.current) {
              gsap.set(titlePlaceholderRef.current, { display: "none" });
            }
          },
        });
      };

      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        setTimeout(updatePinDistance, 100);
      });

      return () => {
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars && trigger.vars.trigger === sectionRef.current) {
            trigger.kill();
          }
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20"
    >
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <div
          ref={containerRef}
          className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8"
        >
          {/* Left section - Title */}
          <div className="w-full md:w-1/2">
            {/* Placeholder to maintain layout when title is pinned */}
            <div ref={titlePlaceholderRef} className="hidden" />
            <div ref={titleRef} className="w-full text-left">
              <AnimatedText>
                <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
                  VISION
                </p>
              </AnimatedText>
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-5xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
          </div>
          {/* Right section - Content */}
          <div
            ref={contentRef}
            className="flex w-full flex-col md:mt-60 md:w-1/2"
          >
            {/* Top border */}
            <div className="border-secondary mb-4 border-t"></div>

            {/* First content block */}
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Mission
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    We are committed to delivering world-class construction and
                    engineering solutions that transform communities and drive
                    economic growth across West Africa. Through innovative
                    approaches and sustainable practices, we build
                    infrastructure that stands the test of time.
                  </p>
                </AnimatedText>
              </div>
            </div>

            {/* Border between blocks */}
            <div className="border-secondary mb-4 border-t"></div>

            {/* Second content block */}
            <div className="flex flex-col gap-4 pb-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Values
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    Integrity, excellence, and innovation guide everything we
                    do. We prioritize safety, sustainability, and client
                    satisfaction in every project, ensuring lasting impact and
                    meaningful contributions to the communities we serve.
                  </p>
                </AnimatedText>
              </div>
            </div>

            {/* Border between blocks */}
            <div className="border-secondary mb-4 border-t"></div>

            {/* Third content block */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Vision
                  </h3>
                </AnimatedText>
              </div>
              <div className="w-full md:w-1/2">
                <AnimatedText>
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    To be the leading construction and engineering firm in West
                    Africa, recognized for transforming infrastructure through
                    cutting-edge technology, sustainable practices, and
                    unwavering commitment to quality that shapes the future of
                    the region.
                  </p>
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

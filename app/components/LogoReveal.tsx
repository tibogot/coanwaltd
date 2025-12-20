"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

interface LogoRevealProps {
  children: React.ReactNode;
  delay?: number;
  blockColor?: string;
  duration?: number;
}

export default function LogoReveal({
  children,
  delay = 0,
  blockColor = "#000",
  duration = 0.75,
}: LogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blockRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Ensure element is in the DOM
      if (!containerRef.current.isConnected) return;

      // Cleanup previous state
      if (timelineRef.current) timelineRef.current.kill();
      if (blockRef.current) gsap.killTweensOf(blockRef.current);

      // Clean up DOM wrappers if they exist
      if (wrapperRef.current && wrapperRef.current.parentNode) {
        const wrapper = wrapperRef.current;
        const parent = wrapper.parentNode;
        // Move all content children back (exclude the block revealer)
        const contentNodes = Array.from(wrapper.childNodes).filter(
          (node) =>
            !(node instanceof HTMLElement && node.classList.contains("block-revealer"))
        );
        contentNodes.forEach((node) => {
          parent.insertBefore(node, wrapper);
        });
        wrapper.remove();
        wrapperRef.current = null;
      }

      // Reset container visibility
      if (containerRef.current) {
        gsap.set(containerRef.current, {
          visibility: "hidden",
          clearProps: "opacity",
        });
      }

      // Create wrapper for the logo
      const wrapper = document.createElement("div");
      wrapper.className = "block-line-wrapper";
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      
      // Move all children into wrapper
      const children = Array.from(containerRef.current.childNodes);
      children.forEach((child) => {
        wrapper.appendChild(child);
      });
      containerRef.current.appendChild(wrapper);

      wrapperRef.current = wrapper;

      // Set initial states - hide all content children
      const contentChildren = Array.from(wrapper.children) as HTMLElement[];
      contentChildren.forEach((child) => {
        gsap.set(child, { opacity: 0 });
      });

      // Create block revealer
      const block = document.createElement("div");
      block.className = "block-revealer";
      block.style.backgroundColor = blockColor;
      wrapper.appendChild(block);
      blockRef.current = block;

      gsap.set(block, { scaleX: 0, transformOrigin: "left center" });

      // Make container visible now that GSAP has initialized
      if (containerRef.current) {
        gsap.set(containerRef.current, { visibility: "visible" });
        containerRef.current.offsetHeight; // Force reflow
      }

      // Create block reveal animation - exactly like TextReveal
      const createBlockRevealAnimation = () => {
        const tl = gsap.timeline({ delay });

        // First, block scales to 1 (covers the logo)
        tl.to(block, { scaleX: 1, duration: duration, ease: "power4.inOut" });
        // Then, set logo opacity to 1 (logo is visible but blocked by the cover)
        contentChildren.forEach((child) => {
          tl.set(child, { opacity: 1 });
        });
        // Change transform origin to right
        tl.set(block, { transformOrigin: "right center" });
        // Finally, block scales back to 0 (reveals the logo)
        tl.to(block, { scaleX: 0, duration: duration, ease: "power4.inOut" });

        return tl;
      };

      // Animate immediately on load
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!containerRef.current || !containerRef.current.isConnected) return;
          const tl = createBlockRevealAnimation();
          timelineRef.current = tl;
        });
      });

      // Cleanup function
      return () => {
        if (timelineRef.current) {
          try {
            timelineRef.current.kill();
          } catch (e) {
            // Ignore errors
          }
        }
        if (blockRef.current) {
          gsap.killTweensOf(blockRef.current);
        }

        // Clean up DOM wrappers
        if (wrapperRef.current && wrapperRef.current.parentNode) {
          const wrapper = wrapperRef.current;
          const parent = wrapper.parentNode;
          // Move all content children back (exclude the block revealer)
          const contentNodes = Array.from(wrapper.childNodes).filter(
            (node) =>
              !(node instanceof HTMLElement && node.classList.contains("block-revealer"))
          );
          contentNodes.forEach((node) => {
            parent.insertBefore(node, wrapper);
          });
          wrapper.remove();
        }

        wrapperRef.current = null;
        blockRef.current = null;
        timelineRef.current = null;
      };
    },
    {
      scope: containerRef,
      dependencies: [delay, blockColor, duration],
    }
  );

  return (
    <div ref={containerRef} data-logo-reveal>
      {children}
    </div>
  );
}


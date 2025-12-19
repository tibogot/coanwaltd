"use client";
import { useRef, ReactNode, useState, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsapConfig";

// Function to fix SplitText clipping issues with descenders
function fixMask(
  { elements, masks }: { elements: HTMLElement[]; masks: Element[] },
  baseLineHeight = 1.2,
) {
  const [firstElement] = elements;
  const lineHeightValue = gsap.getProperty(firstElement, "line-height", "em");
  const lineHeight = parseFloat(String(lineHeightValue));
  const lineHeightDifference = lineHeight - baseLineHeight;

  masks.forEach((mask, i) => {
    const isFirstMask = i === 0;
    const isLastMask = i === masks.length - 1;

    const marginTop = isFirstMask ? `${0.5 * lineHeightDifference}em` : "0";
    const marginBottom = isLastMask
      ? `${0.5 * lineHeightDifference}em`
      : `${lineHeightDifference}em`;

    gsap.set(mask as HTMLElement, {
      lineHeight: baseLineHeight,
      marginTop,
      marginBottom,
    });
  });
}

interface AnimatedTextProps {
  children: ReactNode;
  trigger?: string | HTMLElement;
  start?: string;
  toggleActions?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  isHero?: boolean; // New prop for hero text
}

function AnimatedText({
  children,
  trigger,
  start = "top 75%",
  toggleActions = "play reverse play reverse",
  stagger = 0.15,
  duration = 0.8,
  delay = 0,
  ease = "power2.out",
  className = "",
  isHero = false,
}: AnimatedTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<any[]>([]); // Store all SplitText instances for cleanup
  const scrollTriggerRefs = useRef<any[]>([]); // Store ScrollTrigger instances for refresh
  const [fontsReady, setFontsReady] = useState(false);
  const [splitTextCreated, setSplitTextCreated] = useState(false);
  const [pageLoaderReady, setPageLoaderReady] = useState(false);
  const [navigationComplete, setNavigationComplete] = useState(false);

  // Simplified font loading detection using document.fonts.ready
  useEffect(() => {
    const checkFontsLoaded = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
          // For hero text, don't set fontsReady yet - wait for PageLoader
          if (!isHero) {
            setFontsReady(true);
          }
        } else {
          // Fallback for browsers that don't support document.fonts
          if (!isHero) {
            setFontsReady(true);
          }
        }
      } catch (error) {
        // Fallback: proceed if font detection fails
        if (!isHero) {
          setFontsReady(true);
        }
      }
    };

    checkFontsLoaded();
  }, [isHero]);

  // Wait for PageLoader to complete (for both hero and non-hero text)
  useEffect(() => {
    const handlePageLoaderComplete = () => {
      // Set PageLoader ready and fonts ready
      setPageLoaderReady(true);
      setTimeout(() => setFontsReady(true), isHero ? 200 : 100);
    };

    // Check if PageLoader is already complete
    if (document.documentElement.classList.contains("page-loader-complete")) {
      handlePageLoaderComplete();
    } else {
      // Listen for PageLoader completion
      window.addEventListener("pageLoaderComplete", handlePageLoaderComplete);

      return () => {
        window.removeEventListener(
          "pageLoaderComplete",
          handlePageLoaderComplete,
        );
      };
    }
  }, [isHero]);

  // Listen for page transition completion (for navigation)
  useEffect(() => {
    if (isHero) return; // Hero text doesn't need this

    let timeoutId: NodeJS.Timeout | null = null;
    let refreshTimeout: NodeJS.Timeout | null = null;

    // Debounced refresh function to avoid multiple rapid refreshes
    const scheduleRefresh = () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        refreshTimeout = null;
      }, 150);
    };

    const handlePageTransitionComplete = () => {
      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Mark navigation as complete and refresh ScrollTrigger
      setNavigationComplete(true);

      // Wait a bit for layout to stabilize, then refresh ScrollTrigger
      scheduleRefresh();
    };

    // Listen for page transition completion
    window.addEventListener(
      "pageTransitionComplete",
      handlePageTransitionComplete,
    );

    // Check if we came from navigation or if it's initial load
    const navigatedFlag = sessionStorage.getItem("navigated");

    if (navigatedFlag === "true") {
      // We're navigating - wait for transition to complete
      // The event will fire when reveal animation completes
      // Add a safety timeout in case the event fires before we start listening
      // (unlikely but possible in edge cases)
      timeoutId = setTimeout(() => {
        setNavigationComplete(true);
        scheduleRefresh();
      }, 1500); // 1.5s should be more than enough for the transition
    } else {
      // Initial load/refresh - no navigation happened, mark as complete immediately
      setNavigationComplete(true);
    }

    return () => {
      window.removeEventListener(
        "pageTransitionComplete",
        handlePageTransitionComplete,
      );
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [isHero]);

  // Add CSS to prevent FOUC - ensure text is hidden until GSAP takes control
  useEffect(() => {
    const styleId = "animated-text-fouc-prevention";

    // Check if style already exists
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = `
        .animated-text-wrapper {
          overflow: hidden;
        }
        
        /* Fix for SplitText clipping with tight line heights */
        .animated-text-wrapper.overflow-visible {
          overflow: visible !important;
        }
        
        /* Hide text until animation is ready */
        .animated-text-wrapper.fouc-prevent {
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, []);

  useGSAP(
    () => {
      if (!wrapperRef.current || !fontsReady) return;

      // Wait for PageLoader to be ready (for both hero and non-hero text)
      if (!pageLoaderReady) return;

      // For non-hero text, wait for navigation to complete before creating ScrollTrigger
      if (!isHero && !navigationComplete) return;

      // Add FOUC prevention class initially
      wrapperRef.current.classList.add("fouc-prevent");

      const createSplitTextInstances = () => {
        // Clean up existing instances
        splitRefs.current.forEach((split) => {
          if (split) split.revert();
        });
        splitRefs.current = [];

        const children = Array.from(
          wrapperRef.current!.children,
        ) as HTMLElement[];

        if (children.length === 0) return;

        let allInstancesCreated = true;

        children.forEach((child, index) => {
          try {
            // Hide the original text element to prevent FOUC
            gsap.set(child, {
              visibility: "hidden",
              opacity: 0,
            });

            // Force a reflow to ensure the element is fully rendered
            child.offsetHeight;

            const split = SplitText.create(child, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              aria: "none", // Disable automatic aria-label addition
            });

            // Apply the fixMask function to prevent clipping of descenders
            if (split.lines && split.lines.length > 0) {
              fixMask({ elements: [child], masks: split.lines });
            }

            // Verify the split was successful
            if (split && split.lines && split.lines.length > 0) {
              splitRefs.current.push(split);

              // Set initial state to prevent FOUC
              gsap.set(split.lines, {
                yPercent: 100,
                autoAlpha: 0, // This prevents FOUC by setting visibility: hidden initially
              });

              // For hero text, use immediate animation without ScrollTrigger
              if (isHero) {
                // Remove FOUC prevention class and make element visible for hero text
                if (wrapperRef.current) {
                  wrapperRef.current.classList.remove("fouc-prevent");
                }
                gsap.set(child, { visibility: "visible", opacity: 1 });

                gsap.to(split.lines, {
                  yPercent: 0,
                  autoAlpha: 1, // Reveal with autoAlpha for smooth transition
                  stagger,
                  duration,
                  ease,
                  delay: delay + index * 0.1, // Add slight delay between multiple children
                });
              } else {
                // Regular scroll-triggered animation - use a more reliable trigger strategy
                const scrollTriggerConfig = {
                  trigger: trigger || wrapperRef.current || child,
                  start: "top 80%", // More reliable start position
                  toggleActions: "play none none reverse",
                  refreshPriority: -1, // Lower priority for better performance
                  onEnter: () => {
                    // Remove FOUC prevention class and make element visible
                    if (wrapperRef.current) {
                      wrapperRef.current.classList.remove("fouc-prevent");
                    }
                    gsap.set(child, { visibility: "visible", opacity: 1 });
                    // Ensure animation plays when entering viewport
                  },
                };

                const animation = gsap.to(split.lines, {
                  yPercent: 0,
                  autoAlpha: 1, // Reveal with autoAlpha for smooth transition
                  stagger,
                  duration,
                  ease,
                  delay: delay + 0.3, // Small delay to ensure page transition is complete
                  scrollTrigger: scrollTriggerConfig,
                });

                // Store ScrollTrigger instance for potential refresh
                if (animation.scrollTrigger) {
                  scrollTriggerRefs.current.push(animation.scrollTrigger);
                }
              }
            } else {
              allInstancesCreated = false;
            }
          } catch (error) {
            allInstancesCreated = false;
          }
        });

        if (allInstancesCreated) {
          setSplitTextCreated(true);
        } else {
          // Retry after a short delay if some instances failed
          setTimeout(createSplitTextInstances, 100);
        }
      };

      // Use requestAnimationFrame and additional timeout for better timing
      requestAnimationFrame(() => {
        const additionalDelay = isHero ? 200 : 150; // Increased delay for non-hero text
        setTimeout(createSplitTextInstances, additionalDelay);
      });

      return () => {
        // Clean up ScrollTrigger instances
        scrollTriggerRefs.current.forEach((st) => {
          if (st && st.kill) st.kill();
        });
        scrollTriggerRefs.current = [];

        // Clean up SplitText instances
        splitRefs.current.forEach((split) => {
          if (split) split.revert();
        });
        splitRefs.current = [];
        setSplitTextCreated(false);
      };
    },
    {
      dependencies: [
        trigger,
        start,
        toggleActions,
        stagger,
        duration,
        delay,
        ease,
        fontsReady,
        pageLoaderReady,
        navigationComplete,
        isHero,
      ],
    },
  );

  return (
    <div
      ref={wrapperRef}
      className={`animated-text-wrapper fouc-prevent ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedText;

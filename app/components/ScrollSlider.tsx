"use client";

import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger, SplitText } from "@/lib/gsapConfig";

interface Slide {
  title: string;
  image: string;
}

interface ScrollSliderProps {
  slides: Slide[];
  className?: string;
}

export default function ScrollSlider({
  slides,
  className = "",
}: ScrollSliderProps) {
  const sliderRef = useRef<HTMLElement>(null);
  const sliderImagesRef = useRef<HTMLDivElement>(null);
  const sliderTitleRef = useRef<HTMLDivElement>(null);
  const sliderIndicesRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let activeSlide = 0;
      let currentSplit: SplitText | null = null;

      const pinDistance = window.innerHeight * slides.length;

      function createIndices() {
        if (sliderIndicesRef.current) {
          sliderIndicesRef.current.innerHTML = "";

          slides.forEach((_, index) => {
            const indexNum = (index + 1).toString().padStart(2, "0");
            const indicatorElement = document.createElement("p");
            indicatorElement.dataset.index = String(index);
            indicatorElement.className = "font-pp-neue-montreal-mono";
            indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
            sliderIndicesRef.current?.appendChild(indicatorElement);

            if (index === 0) {
              gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 1,
              });
              gsap.set(indicatorElement.querySelector(".marker"), {
                scaleX: 1,
              });
            } else {
              gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 0.35,
              });
              gsap.set(indicatorElement.querySelector(".marker"), {
                scaleX: 0,
              });
            }
          });
        }
      }

      function animateNewSlide(index: number) {
        if (!sliderImagesRef.current || !sliderTitleRef.current) return;

        const newSliderImage = document.createElement("img");
        newSliderImage.src = slides[index].image;
        newSliderImage.alt = `Slide ${index + 1}`;
        newSliderImage.className = "absolute h-full w-full object-cover";
        newSliderImage.style.transformOrigin = "center";
        newSliderImage.style.willChange = "transform, opacity";

        gsap.set(newSliderImage, {
          opacity: 0,
          scale: 1.1,
        });

        sliderImagesRef.current.appendChild(newSliderImage);

        gsap.to(newSliderImage, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(newSliderImage, {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });

        const allImages = sliderImagesRef.current.querySelectorAll("img");
        if (allImages.length > 3) {
          const removeCount = allImages.length - 3;
          for (let i = 0; i < removeCount; i++) {
            sliderImagesRef.current.removeChild(allImages[i]);
          }
        }

        animateNewTitle(index);
        animateIndicators(index);
      }

      function animateIndicators(index: number) {
        if (!sliderIndicesRef.current) return;

        const indicators = sliderIndicesRef.current.querySelectorAll("p");

        indicators.forEach((indicator, i) => {
          const markerElement = indicator.querySelector(".marker");
          const indexElement = indicator.querySelector(".index");

          if (i === index) {
            gsap.to(indexElement, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(markerElement, {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(indexElement, {
              opacity: 0.5,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(markerElement, {
              scaleX: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }

      function animateNewTitle(index: number) {
        if (!sliderTitleRef.current) return;

        if (currentSplit) {
          currentSplit.revert();
        }

        sliderTitleRef.current.innerHTML = `<h1 class="font-pp-neue-montreal text-4xl leading-tight md:text-5xl">${slides[index].title}</h1>`;

        currentSplit = new SplitText(
          sliderTitleRef.current.querySelector("h1")!,
          {
            type: "lines",
            linesClass: "line",
          },
        );

        gsap.set(currentSplit.lines, {
          yPercent: 100,
          opacity: 0,
        });

        gsap.to(currentSplit.lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      createIndices();

      ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: `+=${pinDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, {
              scaleY: self.progress,
            });
          }

          const currentSlide = Math.floor(self.progress * slides.length);

          if (activeSlide !== currentSlide && currentSlide < slides.length) {
            activeSlide = currentSlide;
            animateNewSlide(activeSlide);
          }
        },
      });

      return () => {
        if (currentSplit) currentSplit.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sliderRef },
  );

  return (
    <section
      className={`relative h-screen w-full overflow-hidden ${className}`}
      ref={sliderRef}
    >
      {/* Slider Images */}
      <div className="absolute h-full w-full" ref={sliderImagesRef}>
        <img
          src={slides[0].image}
          alt="Slide 1"
          className="absolute h-full w-full object-cover"
          style={{
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        />
        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
      </div>

      {/* Slider Title */}
      <div className="absolute top-1/2 left-8 w-1/2 -translate-y-1/2 text-white max-lg:top-20 max-lg:left-0 max-lg:w-full max-lg:translate-y-0 max-lg:px-8">
        <div ref={sliderTitleRef} className="max-w-3xl">
          <h1 className="font-pp-neue-montreal text-4xl leading-tight md:text-5xl">
            {slides[0].title}
          </h1>
        </div>
      </div>

      {/* Slider Indicator */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 max-lg:top-auto max-lg:right-8 max-lg:bottom-8 max-lg:translate-y-0">
        <div className="flex flex-col gap-4 px-5 py-4" ref={sliderIndicesRef}>
          {/* Indicators will be dynamically created here */}
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 right-0 h-full w-px bg-white/35">
          <div
            className="absolute top-0 left-1/2 h-full w-0.5 origin-top -translate-x-1/2 scale-y-0 bg-white"
            style={{
              willChange: "transform",
            }}
            ref={progressBarRef}
          />
        </div>
      </div>

      <style jsx global>{`
        .slider-indices p {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
          font-size: 0.75rem;
        }

        @media (min-width: 768px) {
          .slider-indices p {
            font-size: 0.875rem;
          }
        }

        .index {
          position: relative;
          width: 1.25rem;
          display: flex;
          justify-content: flex-end;
          will-change: opacity;
          color: white;
        }

        .marker {
          position: relative;
          width: 0.75rem;
          height: 1px;
          background-color: white;
          transform-origin: right;
          will-change: transform;
          transform: scaleX(0);
        }

        .line {
          position: relative;
          display: block;
          overflow: hidden;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

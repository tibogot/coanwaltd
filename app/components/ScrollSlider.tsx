"use client";

import { useRef } from "react";
import Image from "next/image";
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
            indicatorElement.innerHTML = `<span class="index">${indexNum}</span><span class="marker-horizontal"></span>`;
            sliderIndicesRef.current?.appendChild(indicatorElement);

            if (index === 0) {
              gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 1,
              });
              gsap.set(indicatorElement.querySelector(".marker-horizontal"), {
                opacity: 1,
              });
            } else {
              gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 0.35,
              });
              gsap.set(indicatorElement.querySelector(".marker-horizontal"), {
                opacity: 0.5,
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
          const markerElement = indicator.querySelector(".marker-horizontal");
          const indexElement = indicator.querySelector(".index");

          if (i === index) {
            gsap.to(indexElement, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(markerElement, {
              opacity: 1,
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
              opacity: 0.5,
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
          // Update segments (fill from top to bottom)
          const segments = document.querySelectorAll('.battery-segment');
          const filledSegments = Math.floor(self.progress * segments.length);

          segments.forEach((segment, index) => {
            if (index < filledSegments) {
              gsap.to(segment, {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                duration: 0.3,
                ease: 'power2.out',
              });
            } else {
              gsap.to(segment, {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });

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
        <Image
          src={slides[0].image}
          alt="Slide 1"
          fill
          className="absolute h-full w-full object-cover"
          style={{
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
          priority
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
      <div className="absolute bottom-8 right-8 flex flex-col gap-6">
        {/* Numbers on top */}
        <div className="flex gap-16 px-20" ref={sliderIndicesRef}>
          {/* Indicators will be dynamically created here */}
        </div>

        {/* Segmented Progress Indicator on bottom */}
        <div className="relative h-10 flex gap-1 px-20 self-stretch">
          {/* Create 50 segments */}
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="battery-segment h-full flex-1 bg-white/20 transition-all duration-300"
              data-segment={index}
            />
          ))}

          {/* Hidden element for progress tracking */}
          <div className="absolute opacity-0" ref={progressBarRef} />
        </div>
      </div>

      <style jsx global>{`
        .slider-indices p {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
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
          display: block;
          text-align: center;
          will-change: opacity;
          color: white;
          width: 100%;
        }

        .marker {
          display: inline-block;
          position: relative;
          width: 0.75rem;
          height: 1px;
          background-color: white;
          transform-origin: left;
          will-change: opacity;
          opacity: 0.5;
          vertical-align: middle;
          margin-left: 0.5rem;
        }

        .marker-horizontal {
          display: block;
          position: relative;
          width: 1px;
          height: 0.75rem;
          background-color: white;
          transform-origin: top;
          will-change: opacity;
          opacity: 0.5;
          margin: 0 auto;
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

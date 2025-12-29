"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";

const slides = [
  {
    image: "/images/vitalis-nwenyi.webp",
    title:
      "Building sustainable infrastructure across West Africa with innovative engineering solutions.",
  },
  {
    image: "/images/joshua-oluwagbemiga.webp",
    title: "Road Construction & Civil Engineering Excellence in Nigeria.",
  },
  {
    image: "/images/sticky-cards/stickycard-4.webp",
    title:
      "Transforming landscapes through precision road construction and engineering excellence.",
  },
];

export default function ImageHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const images = imageRefs.current.filter(Boolean);
      const imageInners = imageInnerRefs.current.filter(Boolean);
      const titles = titleRefs.current.filter(Boolean);

      if (images.length === 0 || imageInners.length === 0 || titles.length === 0)
        return;

      // Create SplitText instances for all titles
      const titleSplits: ReturnType<typeof SplitText.create>[] = [];
      titles.forEach((title) => {
        const h1 = title?.querySelector("h1");
        if (h1) {
          titleSplits.push(
            SplitText.create(h1, {
              type: "lines",
              linesClass: "line-child",
            })
          );
        }
      });

      // Set initial states for SplitText lines
      titleSplits.forEach((split, index) => {
        if (index === 0) {
          gsap.set(split.lines, { yPercent: 0, autoAlpha: 1 });
        } else {
          gsap.set(split.lines, { yPercent: 100, autoAlpha: 0 });
        }
      });

      // Set initial states for wrapper divs
      gsap.set([titles[1], titles[2]], { autoAlpha: 1 });

      // Set initial mask states using clip-path
      gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set([images[1], images[2]], { clipPath: "inset(100% 0% 0% 0%)" });

      // Set initial scale states on inner divs
      gsap.set(imageInners[0], { scale: 1 });
      gsap.set([imageInners[1], imageInners[2]], { scale: 1.2 });

      // Create looping timeline
      const tl = gsap.timeline({ repeat: -1 });

      // Hold first slide
      tl.to({}, { duration: 4 });

      // Transition 1 -> 2
      tl
        // Animate out title lines with delay
        .to(titleSplits[0].lines, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.inOut",
        })
        // Small pause before image starts clipping
        .to({}, { duration: 0.3 })
        // Clip current image to bottom
        .to(
          images[0],
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          ">"
        )
        // Scale up image as it exits
        .to(
          imageInners[0],
          {
            scale: 1.2,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        // Reveal new image from top
        .to(
          images[1],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        // Scale down new image
        .to(
          imageInners[1],
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        // Animate in new title lines after image is fully revealed
        .to(
          titleSplits[1].lines,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          ">"
        );

      // Hold second slide
      tl.to({}, { duration: 4 });

      // Transition 2 -> 3
      tl
        .to(titleSplits[1].lines, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.inOut",
        })
        // Small pause before image starts clipping
        .to({}, { duration: 0.3 })
        .to(
          images[1],
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          ">"
        )
        .to(
          imageInners[1],
          {
            scale: 1.2,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          images[2],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          imageInners[2],
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          titleSplits[2].lines,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          ">"
        );

      // Hold third slide
      tl.to({}, { duration: 4 });

      // Transition 3 -> 1 (loop back)
      tl
        .to(titleSplits[2].lines, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.inOut",
        })
        // Small pause before image starts clipping
        .to({}, { duration: 0.3 })
        .to(
          images[2],
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          ">"
        )
        .to(
          imageInners[2],
          {
            scale: 1.2,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        // Reset image[0] clip-path before revealing it
        .set(images[0], { clipPath: "inset(100% 0% 0% 0%)" }, "<")
        .to(
          images[0],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          imageInners[0],
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          titleSplits[0].lines,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
          },
          ">"
        );

      return () => {
        titleSplits.forEach((split) => split?.revert());
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden"
    >
      {/* Image slides - stacked */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={`image-${index}`}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 h-full w-full overflow-hidden"
          >
            <div
              ref={(el) => {
                imageInnerRefs.current[index] = el;
              }}
              className="relative h-full w-full"
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Title slides - stacked */}
      <div className="absolute left-8 top-20 z-10 h-64 w-full max-w-6xl md:left-16 md:top-32">
        {slides.map((slide, index) => (
          <div
            key={`title-${index}`}
            ref={(el) => {
              titleRefs.current[index] = el;
            }}
            className="absolute inset-0"
          >
            <h1 className="font-pp-neue-montreal w-full text-left text-3xl text-white md:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

const StickyCards3D = () => {
  const stickyCardsData = [
    {
      index: "01",
      title: "Planning",
      image: "/images/sticky-cards/stickycard-1.webp",
      description:
        "We start with clear scope, site intelligence, and realistic schedules—so budgets stay controlled and delivery stays predictable.",
    },
    {
      index: "02",
      title: "Design",
      image: "/images/sticky-cards/stickycard-2.webp",
      description:
        "Our engineers turn requirements into buildable plans—optimizing safety, constructability, and long-term performance.",
    },
    {
      index: "03",
      title: "Construction",
      image: "/images/sticky-cards/stickycard-3.webp",
      description:
        "From civil works to mechanical and electrical, we execute with tight supervision, quality control, and reliable on-site coordination.",
    },
    {
      index: "04",
      title: "Operation & Maintenance",
      image: "/images/sticky-cards/stickycard-4.webp",
      description:
        "We support what we build with handover documentation, inspections, and maintenance planning to keep assets performing over time.",
    },
  ];

  const container = useRef(null);

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll(".sticky-card-3d");

      stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
        }

        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const rotationX = 5 * progress; // 3D rotateX animation
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                rotationX: rotationX,
                transformPerspective: 1000, // Enable 3D transforms via GSAP
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: container },
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#EAEAEA]"
      style={{ isolation: "isolate" }}
      ref={container}
    >
      {stickyCardsData.map((cardData, index) => (
        <div
          className="sticky-card-3d relative flex h-screen w-full items-center justify-center overflow-hidden will-change-transform after:pointer-events-none after:absolute after:top-0 after:left-0 after:z-2 after:h-full after:w-full after:bg-black/50 after:opacity-(--after-opacity,0) after:transition-opacity after:duration-100 after:ease-linear after:content-['']"
          style={
            {
              backgroundImage: `url(${cardData.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              "--after-opacity": 0,
              zIndex: index + 1,
            } as React.CSSProperties
          }
          key={index}
        >
          {/* Dark overlay for text readability */}
          {/* <div className="absolute inset-0 z-1 bg-black/10" /> */}

          {/* Content */}
          <div className="relative z-3 flex h-full w-full flex-col justify-between p-8 md:p-12">
            {/* Top Row - Number and Title */}
            <div className="flex w-full items-start gap-8 md:gap-12">
              {/* Index - Top Left */}
              <div className="font-pp-neue-montreal-mono text-white">
                <h1 className="text-xs md:text-sm">{cardData.index}</h1>
              </div>

              {/* Title - To the right of number, pushed down */}
              <div className="font-pp-neue-montreal mt-6 text-white md:mt-8">
                <h2 className="text-4xl md:text-6xl">{cardData.title}</h2>
              </div>
            </div>

            {/* Description - Bottom */}
            <div className="font-pp-neue-montreal max-w-2xl text-white">
              <p className="text-base md:text-3xl">{cardData.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCards3D;

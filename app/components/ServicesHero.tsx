"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import TextReveal from "./TextReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "Road Construction & Infrastructure",
    description:
      "Building highways, urban roads, and transportation infrastructure that connects communities and drives economic growth across West Africa.",
    image: "/images/vitalis-nwenyi.webp",
  },
  {
    id: 2,
    title: "Civil Engineering Solutions",
    description:
      "Comprehensive engineering services from planning to execution, delivering sustainable and innovative solutions for complex projects.",
    image: "/images/joshua-oluwagbemiga.webp",
  },
  {
    id: 3,
    title: "Project Management & Development",
    description:
      "End-to-end project management ensuring quality, safety, and timely delivery of construction projects across diverse sectors.",
    image: "/images/vitalis-nwenyi.webp",
  },
];

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const titles = titleRefs.current.filter(Boolean);
      const descs = descRefs.current.filter(Boolean);
      const images = imageRefs.current.filter(Boolean);
      const titleBlocks = titleBlockRefs.current.filter(Boolean);
      const descBlocks = descBlockRefs.current.filter(Boolean);

      if (
        titles.length === 0 ||
        descs.length === 0 ||
        images.length === 0 ||
        titleBlocks.length === 0 ||
        descBlocks.length === 0
      )
        return;

      // Set initial states - show first item, hide others
      gsap.set([titles[1], titles[2]], { opacity: 0 });
      gsap.set([descs[1], descs[2]], { opacity: 0 });

      // Set initial block states
      gsap.set([...titleBlocks, ...descBlocks], {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Set initial mask states using clip-path
      // First image fully visible (no clip)
      gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)" });
      // Other images clipped (hidden)
      gsap.set([images[1], images[2]], { clipPath: "inset(0% 100% 0% 0%)" });

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // 3x viewport height for 3 states
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Transition from state 1 to state 2
      tl
        // Block covers text (slide in from left)
        .to([titleBlocks[0], descBlocks[0]], {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
        })
        // Clip current image out to the right
        .to(
          images[0],
          {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        )
        // Swap text visibility
        .set(titles[0], { opacity: 0 })
        .set(descs[0], { opacity: 0 })
        .set(titles[1], { opacity: 1 })
        .set(descs[1], { opacity: 1 })
        // Block reveals new text (slide out to right)
        .set([titleBlocks[0], descBlocks[0]], {
          transformOrigin: "right center",
        })
        .to([titleBlocks[0], descBlocks[0]], {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        // Reveal new image from left
        .to(
          images[1],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        )
        // Transition from state 2 to state 3
        // Block covers text (slide in from left)
        .to([titleBlocks[1], descBlocks[1]], {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
          transformOrigin: "left center",
        })
        // Clip current image out to the right
        .to(
          images[1],
          {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        )
        // Swap text visibility
        .set(titles[1], { opacity: 0 })
        .set(descs[1], { opacity: 0 })
        .set(titles[2], { opacity: 1 })
        .set(descs[2], { opacity: 1 })
        // Block reveals new text (slide out to right)
        .set([titleBlocks[1], descBlocks[1]], {
          transformOrigin: "right center",
        })
        .to([titleBlocks[1], descBlocks[1]], {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        // Reveal new image from left
        .to(
          images[2],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full overflow-hidden"
    >
      {/* Left side - Content */}
      <div className="relative z-10 flex w-full flex-col items-start justify-center px-6 md:w-1/2 md:px-12 lg:px-16">
        <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
          <p className="font-pp-neue-montreal-mono text-secondary mb-6 text-xs md:text-sm">
            SERVICES
          </p>
        </TextReveal>

        {/* Stacked content - all in same position */}
        <div className="relative mb-8 h-32 w-full max-w-xl overflow-hidden md:h-40">
          {servicesData.map((service, index) => (
            <div key={`title-wrapper-${service.id}`} className="absolute inset-0">
              <h1
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className="font-pp-neue-montreal text-secondary relative z-10 w-full text-left text-2xl md:text-4xl lg:text-5xl"
              >
                {service.title}
              </h1>
              <div
                ref={(el) => {
                  titleBlockRefs.current[index] = el;
                }}
                className="bg-secondary absolute inset-0 z-20"
              />
            </div>
          ))}
        </div>

        <div className="relative mb-10 h-32 w-full max-w-lg overflow-hidden md:h-28">
          {servicesData.map((service, index) => (
            <div key={`desc-wrapper-${service.id}`} className="absolute inset-0">
              <p
                ref={(el) => {
                  descRefs.current[index] = el;
                }}
                className="font-pp-neue-montreal text-secondary/80 relative z-10 w-full text-left text-base md:text-lg"
              >
                {service.description}
              </p>
              <div
                ref={(el) => {
                  descBlockRefs.current[index] = el;
                }}
                className="bg-secondary absolute inset-0 z-20"
              />
            </div>
          ))}
        </div>

        <Link
          href="/services"
          className="font-pp-neue-montreal bg-secondary text-primary hover:bg-secondary/90 group relative z-20 flex items-center gap-3 px-6 py-4 text-sm transition-all duration-300 md:text-base"
        >
          Explore Our Services
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Right side - Images stacked */}
      <div className="absolute right-0 top-0 h-full w-full md:relative md:w-1/2">
        {servicesData.map((service, index) => (
          <div
            key={`image-${service.id}`}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay gradient for mobile to ensure text readability */}
      <div className="bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none absolute inset-0 z-0 md:hidden" />
    </section>
  );
}

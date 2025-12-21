"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import TextReveal from "./TextReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current) return;

      // Parallax effect on the image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
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

        <TextReveal
          blockColor="var(--secondary)"
          animateOnScroll={true}
          delay={0.1}
        >
          <h1 className="font-pp-neue-montreal text-secondary mb-8 max-w-xl text-left text-2xl md:text-4xl lg:text-5xl">
            Building Tomorrow&apos;s Infrastructure Today
          </h1>
        </TextReveal>

        <TextReveal
          blockColor="var(--secondary)"
          animateOnScroll={true}
          delay={0.2}
        >
          <p className="font-pp-neue-montreal text-secondary/80 mb-10 max-w-lg text-left text-base md:text-lg">
            From road construction to comprehensive infrastructure development,
            we deliver integrated solutions that transform landscapes and
            communities across West Africa.
          </p>
        </TextReveal>

        <Link
          href="/services"
          className="font-pp-neue-montreal bg-secondary text-primary hover:bg-secondary/90 group flex items-center gap-3 px-6 py-4 text-sm transition-all duration-300 md:text-base"
        >
          Explore Our Services
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Right side - Image */}
      <div className="absolute right-0 top-0 h-full w-full md:relative md:w-1/2">
        <div ref={imageRef} className="relative h-full w-full">
          <Image
            src="/images/vitalis-nwenyi.webp"
            alt="Construction Services"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Overlay gradient for mobile to ensure text readability */}
      <div className="bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none absolute inset-0 z-0 md:hidden" />
    </section>
  );
}

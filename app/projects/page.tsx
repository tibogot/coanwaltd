"use client";

import Image from "next/image";
import TextReveal from "../components/TextReveal";

export default function Projects() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sticky-cards/stickycard-3.webp"
            alt="Projects Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full items-end justify-start">
          <div className="p-4 md:p-8 md:pb-12">
            <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
              <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
                Transforming Infrastructure Through Innovation
              </h1>
            </TextReveal>
            <TextReveal
              blockColor="var(--primary)"
              animateOnScroll={true}
              delay={0.2}
            >
              <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
                Explore our portfolio of successful construction and engineering
                projects across West Africa.
              </p>
            </TextReveal>
          </div>
        </div>
      </div>

      {/* About Section Layout (without map SVG) */}
      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
              <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
                PROJECTS
              </p>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                Our portfolio showcases excellence,
                <br />
                featuring transformative projects
                <br />
                that shape communities and infrastructure.
              </h2>
            </TextReveal>
          </div>
        </div>
      </section>
    </>
  );
}

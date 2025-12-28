"use client";

import Image from "next/image";
import TextReveal from "../components/TextReveal";
import MasonryGallery from "../components/MasonryGallery";
import Link from "next/link";

const galleryImages = [
  { src: "/images/projects-1.webp", alt: "Project 1", tall: true },
  { src: "/images/projects-2.webp", alt: "Project 2" },
  { src: "/images/projects-3.webp", alt: "Project 3" },
  { src: "/images/projects-4.webp", alt: "Project 4" },
  { src: "/images/projects-5.webp", alt: "Project 5", tall: true },
  { src: "/images/projects-6.webp", alt: "Project 6" },
  { src: "/images/sticky-cards/stickycard-1.webp", alt: "Sticky Card 1" },
  { src: "/images/sticky-cards/stickycard-2.webp", alt: "Sticky Card 2" },
  { src: "/images/sticky-cards/stickycard-3.webp", alt: "Sticky Card 3" },
  { src: "/images/sticky-cards/stickycard-4.webp", alt: "Sticky Card 4" },
];

export default function Gallery() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-svh w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sticky-cards/stickycard-1.webp"
            alt="Gallery Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full items-end justify-start">
          <div className="p-4 md:p-8 md:pb-12">
            <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
              <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
                Our Work in Focus
              </h1>
            </TextReveal>
            <TextReveal
              blockColor="var(--primary)"
              animateOnScroll={true}
              delay={0.2}
            >
              <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
                Discover the quality and craftsmanship behind our construction
                and engineering projects.
              </p>
            </TextReveal>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="bg-primary relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8 md:py-30">
        <div className="relative z-10 w-full">
          <div className="mb-16 text-left">
            <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
              <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
                GALLERY
              </p>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                A visual journey through our
                <br />
                construction and engineering
                <br />
                excellence across West Africa.
              </h2>
            </TextReveal>
          </div>

          {/* Gallery Grid - Masonry Style */}
          <MasonryGallery images={galleryImages} />

          {/* CTA Section */}
          <div className="mt-20 flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Left Side - Title */}
            <div className="flex-1">
              <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-3xl md:text-5xl">
                  Ready to bring your vision to life? Let&apos;s collaborate on
                  your next construction and engineering project together.
                </h3>
              </TextReveal>
            </div>

            {/* Right Side - Paragraph and CTA */}
            <div className="flex flex-1 flex-col gap-6">
              <TextReveal
                blockColor="var(--secondary)"
                animateOnScroll={true}
                delay={0.1}
              >
                <p className="font-pp-neue-montreal text-secondary text-left text-base leading-relaxed md:text-lg">
                  Let&apos;s discuss your construction and engineering project
                  needs in detail. Our experienced team is ready to help you
                  achieve your goals with quality craftsmanship, innovative
                  solutions, and a commitment to excellence. We bring years of
                  expertise across West Africa, delivering projects that exceed
                  expectations and stand the test of time. From initial
                  consultation to final completion, we work closely with you
                  every step of the way.
                </p>
              </TextReveal>
              <TextReveal
                blockColor="var(--secondary)"
                animateOnScroll={true}
                delay={0.2}
              >
                <Link
                  href="/contact"
                  className="bg-secondary hover:bg-secondary/90 inline-block w-fit cursor-pointer rounded-[1px] px-4 py-2 text-sm text-white transition-all duration-200 md:px-5 md:py-2.5 md:text-base"
                >
                  Get in Touch
                </Link>
              </TextReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

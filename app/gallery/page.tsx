"use client";

import Image from "next/image";
import TextReveal from "../components/TextReveal";
import MasonryGallery from "../components/MasonryGallery";

const galleryImages = [
  { src: "/images/projects-1.webp", alt: "Project 1" },
  { src: "/images/projects-2.webp", alt: "Project 2" },
  { src: "/images/projects-3.webp", alt: "Project 3" },
  { src: "/images/projects-4.webp", alt: "Project 4" },
  { src: "/images/projects-5.webp", alt: "Project 5" },
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
      <div className="relative h-[100dvh] w-full overflow-hidden">
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
        <div className="relative z-10 mx-auto w-full max-w-7xl">
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
        </div>
      </section>
    </>
  );
}

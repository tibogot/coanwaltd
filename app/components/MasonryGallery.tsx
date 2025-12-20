"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

interface GalleryImage {
  src: string;
  alt: string;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!galleryRef.current) return;

    const imageItems = galleryRef.current.querySelectorAll(".gallery-item");

    imageItems.forEach((img, index) => {
      gsap.fromTo(
        img,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <div
      ref={galleryRef}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="gallery-item group relative w-full overflow-hidden bg-tertiary/10"
        >
          <div className="relative w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ display: "block" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  );
}


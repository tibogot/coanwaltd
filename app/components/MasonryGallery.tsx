"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

interface GalleryImage {
  src: string;
  alt: string;
  tall?: boolean;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Distribute images into columns
  const columnArrays: GalleryImage[][] = Array.from(
    { length: columns },
    () => [],
  );
  images.forEach((image, index) => {
    columnArrays[index % columns].push(image);
  });

  useGSAP(() => {
    if (!galleryRef.current) return;

    const imageItems = galleryRef.current.querySelectorAll(".gallery-item");

    imageItems.forEach((img) => {
      gsap.fromTo(
        img,
        {
          opacity: 0,
          y: 60,
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
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, [columns]);

  return (
    <div ref={galleryRef} className="flex gap-4">
      {columnArrays.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-1 flex-col gap-4">
          {column.map((image, imgIndex) => (
            <div
              key={`${colIndex}-${imgIndex}`}
              className="gallery-item group bg-tertiary/10 relative overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  image.tall ? "h-[500px] object-cover md:h-[650px]" : "h-auto"
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

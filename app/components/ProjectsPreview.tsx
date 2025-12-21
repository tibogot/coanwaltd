"use client";

import Image from "next/image";
import Link from "next/link";
import TextReveal from "./TextReveal";

const PROJECTS_PREVIEW = [
  {
    id: 1,
    image: "/images/projects-1.webp",
    status: "Ongoing",
    title:
      "Award of Contract of the Construction of Yaba-Kpache Road (LOT EWR) Project, Abuja Under Satellite Town Development Agency (STDA)",
  },
  {
    id: 2,
    image: "/images/projects-2.webp",
    status: "Ongoing",
    title:
      "Award of Contract for the provision of Engineering Infrastructure to Plot 4075, Asokoro Extension (Comprising 50 Plots) Abuja",
  },
  {
    id: 3,
    image: "/images/projects-3.webp",
    status: "Completed",
    title:
      "Award of Contract for the Provision of Engineering Infrastructure to Plot 1038 Extension, Cadastral Zone AD5, Maitama District, Abuja",
  },
];

export default function ProjectsPreview() {
  return (
    <section className="bg-primary relative w-full py-24">
      <div className="px-4 md:px-8">
        <div className="flex flex-col">
          {/* Section label */}
          <div className="text-left mb-6">
            <TextReveal
              animateOnScroll={true}
              blockColor="var(--secondary)"
              stagger={0.15}
              duration={0.8}
            >
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                PROJECTS
              </p>
            </TextReveal>
          </div>

          {/* Title */}
          <div className="mb-10 md:mb-14">
            <TextReveal
              animateOnScroll={true}
              blockColor="var(--secondary)"
              stagger={0.15}
              duration={0.8}
            >
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-4xl">
                Featured Projects
              </h2>
            </TextReveal>
          </div>

          {/* Project Images Grid - fills width */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {PROJECTS_PREVIEW.map((project) => (
              <div key={project.id} className="group relative flex flex-col">
                <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                    {project.status}
                  </p>
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10 md:mt-14">
            <TextReveal
              blockColor="var(--secondary)"
              animateOnScroll={true}
              delay={0.2}
            >
              <Link
                href="/projects"
                className="bg-secondary hover:bg-secondary/90 inline-block w-fit cursor-pointer rounded-[1px] px-4 py-2 text-sm text-white transition-all duration-200 md:px-5 md:py-2.5 md:text-base"
              >
                View All Projects
              </Link>
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
}


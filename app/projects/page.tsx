"use client";

import Image from "next/image";

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
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
              Transforming Infrastructure Through Innovation
            </h1>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
              Explore our portfolio of successful construction and engineering
              projects across West Africa.
            </p>
          </div>
        </div>
      </div>

      {/* About Section Layout (without map SVG) */}
      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
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
          </div>

          {/* Project Cards Grid - 2 rows of 3 cards */}
          <div className="mt-24 grid grid-cols-1 gap-8 md:mt-32 md:grid-cols-3 md:gap-12">
            {/* Row 1 */}
            <div className="group relative flex flex-col">
              <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                <Image
                  src="/images/projects-1.webp"
                  alt="Project 1"
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                  Ongoing
                </p>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                  Award of Contract of the Construction of Yaba-Kpache Road (LOT
                  EWR) Project, Abuja Under Satellite Town Development Agency
                  (STDA)
                </h3>
              </div>
            </div>

            <div className="group relative flex flex-col">
              <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                <Image
                  src="/images/projects-2.webp"
                  alt="Project 2"
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                  Ongoing
                </p>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                  Award of Contract for the provision of Engineering
                  Infrastructure to Plot 4075, Asokoro Extension (Comprising 50
                  Plots) Abuja
                </h3>
              </div>
            </div>

            <div className="group relative flex flex-col">
              <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                <Image
                  src="/images/projects-3.webp"
                  alt="Project 3"
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                  Completed
                </p>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                  Award of Contract for the Provision of Engineering
                  Infrastructure to Plot 1038 Extension, Cadastral Zone AD5,
                  Maitama District, Abuja
                </h3>
              </div>
            </div>

            {/* Row 2 */}
            <div className="group relative flex flex-col">
              <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                <Image
                  src="/images/projects-4.webp"
                  alt="Project 4"
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                  Completed
                </p>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                  Award of Contract for the provision of Infrastructure to
                  outstanding Areas in Phase I (Lot1 – Provision of
                  Infrastructure to Plot 447 Extension Maitama District) Abuja
                </h3>
              </div>
            </div>

            <div className="group relative flex flex-col">
              <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                <Image
                  src="/images/projects-5.webp"
                  alt="Project 5"
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                  Completed
                </p>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                  Award of Contract for the Construction of Road Infrastructure
                  (Lot 11) for Jibi Resettlement Town
                </h3>
              </div>
            </div>

            <div className="group relative flex flex-col">
              <div className="relative h-[300px] w-full overflow-hidden md:h-[380px]">
                <Image
                  src="/images/projects-6.webp"
                  alt="Project 6"
                  fill
                  className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="font-pp-neue-montreal-mono text-secondary mb-2 text-left text-sm uppercase md:text-sm">
                  Completed
                </p>
                <h3 className="font-pp-neue-montreal text-secondary text-left text-lg md:text-xl">
                  Award of Contract for the upgrading of the existing
                  Engineering Infrastructure at APO/GARKI Resettlement Village,
                  Abuja (Lot – Roads Works)
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

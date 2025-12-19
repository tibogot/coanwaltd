"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsapConfig";

const servicesData = [
  {
    title: "Deliverables",
    image: "/sticky-cards/stickycard-1.webp",
    description:
      "We transform your ideas into tangible results. Our deliverables are meticulously crafted to exceed expectations, ensuring every project milestone is met with precision and excellence. From concept to completion.",
  },
  {
    title: "Brand & Event Design",
    image: "/sticky-cards/stickycard-2.webp",
    description:
      "Our brand and event design services create compelling visual identities that leave lasting impressions. We craft cohesive brand experiences and design engaging event spaces that tell your story, connect with your audience, and elevate your brand.",
  },
  {
    title: "Video & Fotographie",
    image: "/sticky-cards/stickycard-3.webp",
    description:
      "Through expert videography and photography, we capture the essence of your brand. Our visual storytelling combines technical excellence with creative vision, delivering powerful imagery that resonates with your target audience.",
  },
  {
    title: "Motion Design",
    image: "/sticky-cards/stickycard-4.webp",
    description:
      "Our motion design expertise brings static concepts to life. We create dynamic visual experiences through animation, kinetic typography, and fluid transitions, ensuring your message not only reaches but captivates your audience in today's fast-paced landscape.",
  },
  {
    title: "3D Graphics",
    image: "/sticky-cards/stickycard-1.webp",
    description:
      "We push creative boundaries with cutting-edge 3D graphics. Our team creates immersive visual experiences, from product visualization to architectural rendering, bringing depth and dimension to your projects with state-of-the-art modeling.",
  },
  {
    title: "Print & Drukwork",
    image: "/sticky-cards/stickycard-2.webp",
    description:
      "Our print and drukwerk solutions combine traditional craftsmanship with modern innovation. We deliver premium quality printed materials that make a tangible impact, from business collateral to large-format displays, using sustainable materials.",
  },
  {
    title: "Digital Antwerp (UI/UX)",
    image: "/sticky-cards/stickycard-3.webp",
    description:
      "Through intuitive UI/UX design, we create digital experiences that delight users. Our approach combines aesthetic excellence with functional efficiency, ensuring every interaction is meaningful, accessible, and aligned with your business objectives.",
  },
  {
    title: "Web Development",
    image: "/sticky-cards/stickycard-4.webp",
    description:
      "Our web development solutions leverage cutting-edge technologies to build robust, scalable digital platforms. We create responsive, performance-optimized websites and applications that provide seamless user experiences across all devices.",
  },
];

export default function ServiceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickySectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const serviceImgRef = useRef<HTMLDivElement>(null);
  const serviceCopyRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<SplitText | null>(null);
  const lenis = useLenis();

  // Sync Lenis with ScrollTrigger and GSAP ticker
  useEffect(() => {
    if (!lenis) return;

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker (like the original script)
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  useGSAP(
    () => {
      if (
        !stickySectionRef.current ||
        !indicatorRef.current ||
        !serviceImgRef.current ||
        !serviceCopyRef.current ||
        !progressRef.current
      )
        return;

      const stickySection = stickySectionRef.current;
      const indicator = indicatorRef.current;
      const serviceImg = serviceImgRef.current;
      const serviceCopy = serviceCopyRef.current;
      const progress = progressRef.current;
      const services = servicesRef.current;

      const stickyHeight = window.innerHeight * 8;
      const serviceHeight = 38;
      const serviceSpacing = 16; // mb-4 = 16px
      const totalServiceHeight = serviceHeight + serviceSpacing;
      const imgHeight = 250;

      // Set initial text
      serviceCopy.textContent = servicesData[0].description;
      splitTextRef.current = SplitText.create(serviceCopy, {
        type: "lines",
      });

      // Measure service widths
      const measureContainer = document.createElement("div");
      measureContainer.style.cssText = `
        position: absolute;
        visibility: hidden;
        height: auto;
        width: auto;
        white-space: nowrap;
        font-family: var(--font-pp-neue-montreal);
        font-size: 36px;
        font-weight: 600;
      `;
      document.body.appendChild(measureContainer);

      const serviceWidths = services.map((service) => {
        const text = service.querySelector("p")?.textContent || "";
        measureContainer.textContent = text;
        return measureContainer.offsetWidth + 8;
      });

      document.body.removeChild(measureContainer);

      // Set initial indicator position
      gsap.set(indicator, {
        width: serviceWidths[0],
        xPercent: -50,
        left: "50%",
        top: 0,
      });

      const scrollPerService = window.innerHeight;
      let currentIndex = 0;

      const animateTextChange = (index: number) => {
        return new Promise<void>((resolve) => {
          if (!splitTextRef.current) {
            resolve();
            return;
          }

          const lines = splitTextRef.current.lines;
          if (!lines || lines.length === 0) {
            resolve();
            return;
          }

          gsap.to(lines, {
            opacity: 0,
            y: -20,
            duration: 0.25,
            stagger: 0.025,
            ease: "power3.inOut",
            onComplete: () => {
              if (splitTextRef.current) {
                splitTextRef.current.revert();
              }

              const newText = servicesData[index].description;
              serviceCopy.textContent = newText;

              splitTextRef.current = SplitText.create(serviceCopy, {
                type: "lines",
              });

              const newLines = splitTextRef.current.lines;
              if (newLines && newLines.length > 0) {
                gsap.set(newLines, {
                  opacity: 0,
                  y: 20,
                });

                gsap.to(newLines, {
                  opacity: 1,
                  y: 0,
                  duration: 0.25,
                  stagger: 0.025,
                  ease: "power3.out",
                  onComplete: resolve,
                });
              } else {
                resolve();
              }
            },
          });
        });
      };

      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `${stickyHeight}px`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: async (self) => {
          const progressValue = self.progress;
          gsap.set(progress, { scaleY: progressValue });

          // Use scroll position from ScrollTrigger which is synced with Lenis
          const scrollPosition = Math.max(
            0,
            self.scroll() - window.innerHeight,
          );
          const activeIndex = Math.floor(scrollPosition / scrollPerService);

          if (
            activeIndex >= 0 &&
            activeIndex < services.length &&
            currentIndex !== activeIndex
          ) {
            currentIndex = activeIndex;

            services.forEach((service) => service.classList.remove("active"));
            services[activeIndex].classList.add("active");

            await Promise.all([
              gsap.to(indicator, {
                y: activeIndex * totalServiceHeight,
                width: serviceWidths[activeIndex],
                duration: 0.3,
                ease: "power3.inOut",
                overwrite: true,
              }),

              gsap.to(serviceImg, {
                y: -(activeIndex * imgHeight),
                duration: 0.3,
                ease: "power3.inOut",
                overwrite: true,
              }),

              animateTextChange(activeIndex),
            ]);
          }
        },
      });

      // Refresh ScrollTrigger after setup to ensure sync with Lenis
      ScrollTrigger.refresh();

      // Cleanup
      return () => {
        if (splitTextRef.current) {
          splitTextRef.current.revert();
        }
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === stickySection) {
            trigger.kill();
          }
        });
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {/* Sticky Section */}
      <section
        ref={stickySectionRef}
        className="sticky flex min-h-screen w-full flex-col bg-white md:flex-row"
      >
        {/* Left Column - Services List */}
        <div className="col flex flex-1 flex-col items-center justify-start gap-8 pt-[25%] md:justify-center md:pt-0">
          <div className="services relative flex flex-col items-center">
            {/* Indicator */}
            <div
              ref={indicatorRef}
              className="indicator bg-secondary absolute top-0 left-0 z-[-1] h-[38px]"
            />

            {/* Services */}
            {servicesData.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) servicesRef.current[index] = el;
                }}
                className={`service mb-4 flex h-[38px] w-max items-center last:mb-0 ${
                  index === 0 ? "active" : ""
                }`}
              >
                <p className="service-text font-pp-neue-montreal text-4xl text-gray-400 transition-colors duration-300 md:text-5xl">
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image and Copy */}
        <div className="col flex flex-1 flex-row items-center justify-center gap-6 md:flex-col md:gap-8">
          {/* Image Wrapper */}
          <div
            className="service-img-wrapper relative h-[250px] w-[25%] overflow-hidden md:w-[60%]"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 0, 100% 85%, 90% 100%, 50% 100%, 0 100%, 0 0)",
            }}
          >
            <div
              ref={serviceImgRef}
              className="service-img h-[2000px] w-full will-change-transform"
            >
              {servicesData.map((service, index) => (
                <div key={index} className="img relative h-[250px] w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Copy */}
          <div className="service-copy w-[60%] md:w-[60%]">
            <p
              ref={serviceCopyRef}
              className="font-pp-neue-montreal text-sm leading-7 font-normal text-black md:text-lg"
            >
              {servicesData[0].description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar absolute top-[-15%] left-1/2 h-[50%] w-px -translate-x-1/2 -rotate-90 bg-[#e0e0e0] md:top-1/2 md:h-[60%] md:translate-y-[-50%] md:rotate-0">
          <div
            ref={progressRef}
            className="progress bg-secondary absolute top-0 left-0 h-full w-full origin-top will-change-transform"
            style={{ transform: "scaleY(0)" }}
          />
        </div>
      </section>
    </div>
  );
}

"use client";

// import LogoReveal from "./components/LogoReveal";
import ProfilesTicker from "./components/ProfilesTicker";
import FAQ from "./components/FAQ";
import AboutSection from "./components/AboutSection";
import ProjectsPreview from "./components/ProjectsPreview";
import ServicesHero from "./components/ServicesHero";
import AnimatedText from "./components/AnimatedText3";
import ScrollSlider from "./components/ScrollSlider2";
// import ServiceScroll from "./components/ServiceScroll";
import FractalGlass from "./components/FractalGlass/FractalGlass";
// import LoaderSplash from "./components/LoaderSplash";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, ArrowUpRight } from "lucide-react";
import NigeriaMapSvg from "./components/NigeriaMapSvg";
import GradientTextSection from "./components/GradientTextSection";
import VisionSection from "./components/VisionSection";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import StickyCards3D from "./components/StickyCards3D";

const sliderSlides = [
  {
    title:
      "Building sustainable infrastructure across West Africa with innovative engineering solutions and decades of expertise.",
    image: "/images/vitalis-nwenyi.webp",
  },
  {
    title:
      "Transforming landscapes through precision road construction and civil engineering excellence in Nigeria.",
    image: "/images/joshua-oluwagbemiga.webp",
  },
  {
    title:
      "Delivering quality construction projects from planning to execution with integrated solutions.",
    image: "/images/sticky-cards/stickycard-4.webp",
  },
  {
    title:
      "Creating lasting impact through comprehensive infrastructure development and engineering services.",
    image: "/images/sticky-cards/stickycard-1.webp",
  },
  {
    title:
      "Shaping the future of transportation with modern highways and urban road networks.",
    image: "/images/sticky-cards/stickycard-2.webp",
  },
  {
    title:
      "Three decades of commitment to excellence in construction and infrastructure across the region.",
    image: "/images/sticky-cards/stickycard-3.webp",
  },
];

export default function Home() {
  const statsRowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!statsRowRef.current) return;

      const els = Array.from(
        statsRowRef.current.querySelectorAll<HTMLElement>("[data-count]"),
      );

      els.forEach((el) => {
        const endValue = Number(el.dataset.count ?? "0");
        const suffix = el.dataset.suffix ?? "";

        const state = { value: 0 };

        // Ensure we start at 0 on mount.
        el.textContent = `0${suffix}`;

        gsap.to(state, {
          value: endValue,
          ease: "none",
          scrollTrigger: {
            trigger: statsRowRef.current!,
            start: "top 85%",
            // Finish earlier so the numbers reach their final values before the section hits the top
            end: "top 45%",
            scrub: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });
    },
    { scope: statsRowRef },
  );

  return (
    <>
      {/* <LoaderSplash /> */}
      {/* Hero Section with Image Background */}
      <section className="relative min-h-dvh w-full overflow-hidden">
        {/* Bottom overlay with logo and arrow */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between p-6 md:p-10">
          {/* Bottom-left logo */}
          <div className="flex flex-col items-start">
            {/* Block animation commented out - might need later */}
            {/* <LogoReveal blockColor="var(--primary)">
              <Image
                src="/images/newlogohero.svg"
                alt="COANWA"
                width={850}
                height={260}
                priority
                className="h-auto w-[min(60vw,520px)]"
              />
            </LogoReveal> */}
            <Image
              src="/images/newlogohero.svg"
              alt="COANWA"
              width={850}
              height={260}
              priority
              className="h-auto w-[min(60vw,520px)]"
            />
            <AnimatedText isHero={true} delay={0.8} duration={0.8}>
              <p className="font-pp-neue-montreal mt-2 text-sm text-white md:text-base">
                Construction West Africa Unlimited
              </p>
            </AnimatedText>
          </div>
          {/* Bottom Right Square with Arrow */}
          <div className="bg-secondary flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
            <ArrowDownRight className="h-4 w-4 text-white md:h-5 md:w-5" />
          </div>
        </div>
        {/* Background Image - 100vh, not fixed */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/vitalis-nwenyi.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          {/* FractalGlass version - commented out for now */}
          {/* <FractalGlass imgSrc="/images/vitalis-nwenyi.webp" /> */}
        </div>
      </section>

      <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 flex-shrink-0" />
            <AnimatedText>
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                WHO WE ARE
              </p>
            </AnimatedText>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8">
            {/* Left section - Title */}
            <div className="w-full text-left md:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
            {/* Right section - Content */}
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              <AnimatedText>
                <p className="font-pp-neue-montreal text-secondary mb-4 text-left text-base md:text-xl">
                  Three decades of expertise in construction and engineering
                  across West Africa. We deliver integrated solutions from
                  planning to execution, transforming infrastructure and shaping
                  the future of the region through quality, innovation, and
                  reliability in every project we undertake. Our commitment to
                  excellence drives us to push boundaries, embrace cutting-edge
                  technologies, and maintain the highest standards in safety and
                  sustainability. With a proven track record spanning major
                  highways, urban road networks, and critical infrastructure
                  projects, we have built lasting partnerships with communities,
                  governments, and private sector clients.
                </p>
              </AnimatedText>
              <Link
                href="/company"
                className="bg-secondary hover:bg-secondary/90 inline-flex w-fit cursor-pointer items-center gap-2 rounded-[1px] px-4 py-2 text-sm text-white transition-all duration-200 md:px-5 md:py-2.5 md:text-base"
              >
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div
          ref={statsRowRef}
          className="mt-auto flex w-full flex-col gap-8 pt-20 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 md:pt-28 md:pb-14"
        >
          <div className="text-left">
            <div
              data-count="89"
              data-suffix="%"
              className="font-pp-neue-montreal-mono text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              89%
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              client satisfaction
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="34"
              data-suffix="+"
              className="font-pp-neue-montreal-mono text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              34+
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              delivering excellence
            </div>
          </div>
          <div className="text-left">
            <div
              data-count="48"
              data-suffix="+"
              className="font-pp-neue-montreal-mono text-secondary text-6xl tabular-nums md:text-8xl"
              style={{ letterSpacing: "-0.05em" }}
            >
              48+
            </div>
            <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
              completed successfully
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-70">
          <NigeriaMapSvg className="h-full w-full p-10 md:p-16" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
              ABOUT
            </p>
            <AnimatedText start="top 80%" stagger={0.2} duration={1}>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                <span className="opacity-0 select-none">A c</span>A construction
                company,
                <br />
                offering integrated solution and
                <br />
                related services.
              </h2>
            </AnimatedText>
          </div>
          <div className="mt-32 flex justify-end md:mt-48">
            <div className="flex flex-col gap-6">
              <AnimatedText
                start="top 80%"
                stagger={0.15}
                duration={0.9}
                delay={0.2}
              >
                <p className="font-pp-neue-montreal text-secondary max-w-2xl text-left text-base md:text-xl">
                  Three decades of expertise in construction and engineering
                  across West Africa.
                  <br />
                  We deliver integrated solutions from planning to execution.
                  <br />
                  Quality, innovation, and reliability in every project we
                  undertake.
                  <br />
                  Transforming infrastructure and shaping the future of the
                  region.
                  <br />
                  Your trusted partner for comprehensive construction services.
                </p>
              </AnimatedText>
              <Link
                href="/company"
                className="font-pp-neue-montreal text-secondary hover:text-secondary/80 flex cursor-pointer items-center gap-2 text-sm transition-colors"
              >
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div
            ref={statsRowRef}
            className="mt-auto flex w-full flex-col gap-8 pt-20 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 md:pt-28 md:pb-14"
          >
            <div className="text-left">
              <div
                data-count="89"
                data-suffix="%"
                className="font-pp-neue-montreal tabular-nums text-secondary text-6xl md:text-8xl"
              style={{ letterSpacing: '-0.05em' }}
              >
                89%
              </div>
              <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
                client satisfaction
              </div>
            </div>
            <div className="text-left">
              <div
                data-count="34"
                data-suffix="+"
                className="font-pp-neue-montreal tabular-nums text-secondary text-6xl md:text-8xl"
              style={{ letterSpacing: '-0.05em' }}
              >
                34+
              </div>
              <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
                delivering excellence
              </div>
            </div>
            <div className="text-left">
              <div
                data-count="48"
                data-suffix="+"
                className="font-pp-neue-montreal tabular-nums text-secondary text-6xl md:text-8xl"
              style={{ letterSpacing: '-0.05em' }}
              >
                48+
              </div>
              <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
                completed successfully
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Scroll Slider Section */}
      {/* <ScrollSlider slides={sliderSlides} /> */}

      <StickyCards3D />

      {/* Vision Section */}
      <VisionSection />

      {/* 100vh Image Background Section */}
      <section className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/joshua-oluwagbemiga.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Top Left Content */}
        <div className="relative z-10 max-w-2xl p-6 pt-16 md:p-10 md:pt-24">
          <h2 className="font-pp-neue-montreal mb-4 text-left text-3xl text-white md:text-5xl">
            Road Construction Excellence in Nigeria
          </h2>
          <p className="font-pp-neue-montreal text-left text-base text-white/90 md:text-xl">
            Building highways, urban roads, and infrastructure projects across
            West Africa with over three decades of expertise in civil
            engineering and construction.
          </p>
        </div>
        {/* Bottom Right Container */}
        {/* <div className="bg-secondary relative z-10 flex min-h-[40vh] w-full max-w-lg flex-col justify-between self-end pt-4 pl-4 md:px-6 md:py-6">
          <h2 className="font-pp-neue-montreal max-w-xs text-left text-xl text-white md:text-2xl">
            Infrastructure Development Across West Africa
          </h2>
          <p className="font-pp-neue-montreal max-w-xs text-left text-base text-white/90 md:text-base">
            Delivering quality road construction and engineering solutions from
            planning to execution, transforming Nigeria&apos;s transportation
            infrastructure.
          </p>
        </div> */}
      </section>

      {/* Gradient Text Reveal Section */}
      <GradientTextSection
        text="Building sustainable infrastructure across West Africa with innovative engineering solutions and decades of expertise."
        textColor="rgba(255, 51, 0, 0.3)"
        highlightColor="#ff3300"
      />

      {/* New About Section Component */}
      {/* <AboutSection /> */}

      {/* Services Hero Section */}
      {/* <ServicesHero /> */}

      {/* Service Scroll Section */}
      {/* <ServiceScroll /> */}

      {/* Gradient Text Reveal Section - No Pin */}
      <GradientTextSection
        text="Leading road construction and civil engineering solutions across Nigeria and West Africa."
        textColor="rgba(255, 51, 0, 0.3)"
        highlightColor="#ff3300"
        pin={false}
      />

      {/* Centered Title Section */}
      {/* <section className="relative w-full py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 md:px-8">
          <div className="text-center">
            <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
              STATISTICS
            </p>
            <h2 className="font-pp-neue-montreal text-secondary max-w-4xl text-center text-4xl md:text-6xl">
              Leading road construction and civil engineering solutions across
              Nigeria and West Africa.
            </h2>
          </div>
        </div>
      </section> */}

      {/* Profiles Ticker Section */}
      <section className="bg-primary relative w-full py-24">
        <div className="mb-16 px-4 md:mb-24 md:px-8">
          <div className="flex flex-col items-start">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                TEAM
              </p>
            </div>
            <div className="text-left">
              <p className="font-pp-neue-montreal text-secondary mb-8 max-w-2xl text-left text-4xl md:text-6xl">
                Our People
              </p>
            </div>
            <div className="text-left">
              <p className="font-pp-neue-montreal text-secondary/80 max-w-2xl text-left text-base sm:text-lg md:text-xl">
                Meet the dedicated professionals driving excellence across all
                our construction and engineering projects.
              </p>
            </div>
          </div>
        </div>
        <ProfilesTicker />
      </section>

      {/* Orange Background Section with Centered Text */}
      {/* <section className="bg-secondary relative w-full py-24">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-16 px-4 md:gap-20 md:px-8">
          <h3 className="font-pp-neue-montreal max-w-4xl text-center text-xl text-white md:text-4xl">
            Because infrastructure is built on movement, in perpetual
            development, through the choice of projects that create a profoundly
            transformative human experience.{" "}
          </h3>
          <p className="font-pp-neue-montreal max-w-sm text-center text-sm text-white/80 md:text-base">
            Your trusted partner for comprehensive road construction and
            engineering excellence in West Africa.
          </p>
        </div>
      </section> */}

      {/* FAQ Section */}
      <FAQ />

      {/* Projects Preview Section */}
      <ProjectsPreview />

      {/* Full Width Background Image Section */}
      <section className="relative flex min-h-dvh w-full items-end justify-start">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/vitalis-nwenyi.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Hero Content */}
        <div className="relative z-10 p-4 md:p-8 md:pb-12">
          <p className="font-pp-neue-montreal max-w-6xl text-left text-2xl text-white md:text-6xl">
            Transforming landscapes and shaping futures through innovative
            construction solutions and engineering excellence across West
            Africa.
          </p>
        </div>
      </section>
    </>
  );
}

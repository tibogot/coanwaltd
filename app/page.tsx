"use client";

import TextReveal from "./components/TextReveal";
import LogoReveal from "./components/LogoReveal";
import ProfilesTicker from "./components/ProfilesTicker";
import FAQ from "./components/FAQ";
import AboutSection from "./components/AboutSection";
// import ServiceScroll from "./components/ServiceScroll";
import FractalGlass from "./components/FractalGlass/FractalGlass";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, ArrowUpRight } from "lucide-react";
import NigeriaMapSvg from "./components/NigeriaMapSvg";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

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
      {/* Hero Section with Image Background */}
      <section className="relative min-h-[100dvh] min-h-[100svh] w-full overflow-hidden">
        {/* Bottom-left logo overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-start justify-end p-6 md:p-10">
          <LogoReveal blockColor="var(--primary)">
            <Image
              src="/images/newlogohero.svg"
              alt="COANWA"
              width={850}
              height={260}
              priority
              className="h-auto w-[min(60vw,520px)]"
            />
          </LogoReveal>
          <TextReveal
            blockColor="var(--primary)"
            animateOnScroll={false}
            delay={0.2}
          >
            <p className="font-pp-neue-montreal mt-2 text-sm text-white md:text-base">
              Construction West Africa Unlimited
            </p>
          </TextReveal>
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
        {/* Bottom Right Square with Arrow */}
        <div className="bg-secondary absolute right-0 bottom-0 z-10 flex h-12 w-12 items-center justify-center md:h-16 md:w-16">
          <ArrowDownRight className="h-5 w-5 text-white md:h-6 md:w-6" />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        {/* Nigeria map background (watermark) */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-50">
          <NigeriaMapSvg className="h-full w-full p-10 md:p-16" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
              <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
                ABOUT
              </p>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                <span className="opacity-0 select-none">A c</span>A construction
                company,
                <br />
                offering integrated solution and
                <br />
                related services.
              </h2>
            </TextReveal>
          </div>
          <div className="mt-32 flex justify-end md:mt-48">
            <div className="flex flex-col gap-6">
              <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
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
              </TextReveal>
              <Link
                href="/company"
                className="font-pp-neue-montreal text-secondary hover:text-secondary/80 flex cursor-pointer items-center gap-2 text-sm transition-colors"
              >
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Stats Row (bottom of section) */}
          <div
            ref={statsRowRef}
            className="mt-auto flex w-full flex-col gap-8 pt-20 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-12 md:pt-28 md:pb-14"
          >
            <div className="text-left">
              <div
                data-count="89"
                data-suffix="%"
                className="font-pp-neue-montreal text-secondary text-6xl tracking-tight md:text-8xl"
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
                className="font-pp-neue-montreal text-secondary text-6xl tracking-tight md:text-8xl"
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
                className="font-pp-neue-montreal text-secondary text-6xl tracking-tight md:text-8xl"
              >
                48+
              </div>
              <div className="font-pp-neue-montreal text-secondary mt-2 text-sm md:text-base">
                completed successfully
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New About Section Component */}
      <AboutSection />

      {/* Service Scroll Section */}
      {/* <ServiceScroll /> */}

      {/* 100vh Image Background Section */}
      <section className="relative flex min-h-dvh min-h-svh w-full flex-col justify-between overflow-hidden">
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
          <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
            <h2 className="font-pp-neue-montreal mb-4 text-left text-3xl text-white md:text-5xl">
              Road Construction Excellence in Nigeria
            </h2>
          </TextReveal>
          <TextReveal
            blockColor="var(--primary)"
            animateOnScroll={true}
            delay={0.2}
          >
            <p className="font-pp-neue-montreal text-left text-base text-white/90 md:text-xl">
              Building highways, urban roads, and infrastructure projects across
              West Africa with over three decades of expertise in civil
              engineering and construction.
            </p>
          </TextReveal>
        </div>
        {/* Bottom Right Container */}
        <div className="bg-secondary relative z-10 flex min-h-[40vh] w-full max-w-lg flex-col justify-between self-end pt-4 pl-4 md:px-6 md:py-6">
          <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
            <h2 className="font-pp-neue-montreal max-w-xs text-left text-xl text-white md:text-2xl">
              Infrastructure Development Across West Africa
            </h2>
          </TextReveal>
          <TextReveal
            blockColor="var(--primary)"
            animateOnScroll={true}
            delay={0.2}
          >
            <p className="font-pp-neue-montreal max-w-xs text-left text-base text-white/90 md:text-base">
              Delivering quality road construction and engineering solutions
              from planning to execution, transforming Nigeria&apos;s
              transportation infrastructure.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Centered Title Section */}
      <section className="relative w-full py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 md:px-8">
          <div className="text-center">
            <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
              <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
                STATISTICS
              </p>
              <h2 className="font-pp-neue-montreal text-secondary max-w-4xl text-center text-4xl md:text-6xl">
                Leading road construction and civil engineering solutions across
                Nigeria and West Africa.
              </h2>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Orange Background Section with Centered Text */}
      <section className="bg-secondary relative w-full py-24">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-16 px-4 md:gap-20 md:px-8">
          <h3 className="font-pp-neue-montreal max-w-4xl text-center text-xl text-white md:text-4xl">
            Parce que la musique réside dans le mouvement, en perpétuelle
            évolution, à travers le choix d’œuvres qui en font une expérience
            profondément humaine.{" "}
          </h3>
          <p className="font-pp-neue-montreal max-w-sm text-center text-sm text-white/80 md:text-base">
            Your trusted partner for comprehensive road construction and
            engineering excellence in West Africa.
          </p>
        </div>
      </section>

      {/* Profiles Ticker Section */}
      <section className="bg-primary relative w-full py-24">
        <div className="mb-16 px-4 md:mb-24 md:px-8">
          <div className="flex flex-col items-start">
            <div className="text-left">
              <TextReveal
                animateOnScroll={true}
                blockColor="var(--secondary)"
                stagger={0.15}
                duration={0.8}
              >
                <p className="font-pp-neue-montreal-mono text-secondary mb-6 text-xs md:text-sm">
                  TEAM
                </p>
                <p className="font-pp-neue-montreal text-secondary mb-8 max-w-2xl text-left text-4xl md:text-6xl">
                  Our People
                </p>
              </TextReveal>
            </div>
            <div className="text-left">
              <TextReveal
                animateOnScroll={true}
                blockColor="var(--secondary)"
                stagger={0.15}
                duration={0.8}
              >
                <p className="font-pp-neue-montreal text-secondary/80 max-w-2xl text-left text-base sm:text-lg md:text-xl">
                  Meet the dedicated professionals driving excellence across all
                  our construction and engineering projects.
                </p>
              </TextReveal>
            </div>
          </div>
        </div>
        <ProfilesTicker />
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Full Width Background Image Section */}
      <section className="relative flex min-h-[100dvh] min-h-[100svh] w-full items-end justify-start">
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
          <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
            <p className="font-pp-neue-montreal max-w-6xl text-left text-2xl text-white md:text-6xl">
              Transforming landscapes and shaping futures through innovative
              construction solutions and engineering excellence across West
              Africa.
            </p>
          </TextReveal>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedText from "./AnimatedText3";

export default function AboutSection() {
  return (
    <section className="bg-primary relative w-full overflow-hidden px-4 py-30 md:px-8">
      <div className="relative z-10 mx-auto flex h-full w-full flex-col">
        <div className="text-left">
          <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
            SERVICES
          </p>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Left Container */}
          <div className="flex-1 text-left">
            <AnimatedText start="top 80%" stagger={0.2} duration={1}>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-3xl md:text-5xl">
                Building the future
                <br />
                with expertise and
                <br />
                commitment to excellence.
              </h2>
            </AnimatedText>
          </div>
          {/* Right Container */}
          <div className="flex flex-1 flex-col gap-6">
            <AnimatedText
              start="top 80%"
              stagger={0.15}
              duration={0.9}
              delay={0.2}
            >
              <p className="font-pp-neue-montreal text-secondary text-left text-base md:text-xl">
                From road construction to infrastructure development, we handle
                projects of all scales.
                <br />
                Our team combines technical expertise with local knowledge to
                deliver exceptional results.
                <br />
                We prioritize safety, sustainability, and client satisfaction in
                every endeavor.
                <br />
                Partner with us for your next construction project and
                experience the difference.
              </p>
            </AnimatedText>
            <Link
              href="/services"
              className="font-pp-neue-montreal text-secondary hover:text-secondary/80 flex cursor-pointer items-center gap-2 text-sm transition-colors"
            >
              View services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        {/* Full Width Image */}
        {/* <div className="mt-12 w-full">
          <div className="relative h-[400px] w-full md:h-[500px]">
            <Image
              src="/images/vitalis-nwenyi.webp"
              alt="Construction"
              fill
              className="object-cover"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}

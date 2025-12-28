"use client";

import Image from "next/image";
import AnimatedText from "../components/AnimatedText3";

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-svh w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/john-kakuk.webp"
            alt="Contact Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full items-end justify-start">
          <div className="p-4 md:p-8 md:pb-12">
            <AnimatedText isHero={true}>
              <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
                Let&apos;s Build Together and Transform Your Vision Into Reality
              </h1>
            </AnimatedText>
            <AnimatedText isHero={true}>
              <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
                Get in touch with our team to discuss your construction and
                engineering project needs.
              </p>
            </AnimatedText>
          </div>
        </div>
      </div>

      {/* About Section Layout (without map SVG) */}
      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-secondary h-1.5 w-1.5 flex-shrink-0" />
              <AnimatedText>
                <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                  CONTACT
                </p>
              </AnimatedText>
            </div>
            <AnimatedText>
              <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                Ready to start your project,
                <br />
                connect with our team and discover
                <br />
                how we can bring your vision to life.
              </h2>
            </AnimatedText>
          </div>
        </div>
      </section>
    </>
  );
}

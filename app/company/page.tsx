import Image from "next/image";
import ProfileGrid from "../components/ProfileGrid";
import AnimatedText from "../components/AnimatedText3";

export default function Company() {
  return (
    <>
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/chuks-ugwuh.webp"
            alt="Company Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full items-end justify-start">
          <div className="p-4 md:p-8 md:pb-12">
            <AnimatedText isHero={true}>
              <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
                Building Excellence Across West Africa
              </h1>
            </AnimatedText>
            <AnimatedText isHero={true}>
              <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
                Three decades of expertise in construction and engineering,
                delivering integrated solutions from planning to execution.
              </p>
            </AnimatedText>
          </div>
        </div>
      </div>

      {/* About Section Layout (without map SVG) */}
      <section className="bg-primary relative w-full overflow-hidden px-4 py-10 md:px-8 md:py-20">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
            <AnimatedText>
              <p className="font-pp-neue-montreal-mono text-secondary text-xs md:text-sm">
                VISION
              </p>
            </AnimatedText>
          </div>
          <div className="text-left">
            <div className="w-full md:w-1/2">
              <AnimatedText>
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                  Building the future of infrastructure across West Africa with
                  precision and innovation.
                </h2>
              </AnimatedText>
            </div>
          </div>
          <div className="flex w-full gap-4 py-20">
            <div className="hidden w-1/2 md:block"></div>
            <div className="flex w-full flex-col md:w-1/2">
              {/* Top border */}
              <div className="border-secondary mb-4 border-t"></div>

              {/* First content block */}
              <div className="flex flex-col gap-4 pb-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                      Our Mission
                    </h3>
                  </AnimatedText>
                </div>
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                      We are committed to delivering world-class construction
                      and engineering solutions that transform communities and
                      drive economic growth across West Africa. Through
                      innovative approaches and sustainable practices, we build
                      infrastructure that stands the test of time.
                    </p>
                  </AnimatedText>
                </div>
              </div>

              {/* Border between blocks */}
              <div className="border-secondary mb-4 border-t"></div>

              {/* Second content block */}
              <div className="flex flex-col gap-4 pb-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                      Our Values
                    </h3>
                  </AnimatedText>
                </div>
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                      Integrity, excellence, and innovation guide everything we
                      do. We prioritize safety, sustainability, and client
                      satisfaction in every project, ensuring lasting impact and
                      meaningful contributions to the communities we serve.
                    </p>
                  </AnimatedText>
                </div>
              </div>

              {/* Border between blocks */}
              <div className="border-secondary mb-4 border-t"></div>

              {/* Third content block */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                      Our Vision
                    </h3>
                  </AnimatedText>
                </div>
                <div className="w-full md:w-1/2">
                  <AnimatedText>
                    <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                      To be the leading construction and engineering firm in
                      West Africa, recognized for transforming infrastructure
                      through cutting-edge technology, sustainable practices,
                      and unwavering commitment to quality that shapes the
                      future of the region.
                    </p>
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary px-4 md:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-secondary h-1.5 w-1.5 shrink-0" />
          <p className="font-pp-neue-montreal-mono text-secondary text-left text-xs md:text-sm">
            LEADERSHIP
          </p>
        </div>
      </div>
      <ProfileGrid />
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
          <AnimatedText isHero={true}>
            <p className="font-pp-neue-montreal max-w-6xl text-left text-2xl text-white md:text-6xl">
              Transforming landscapes and shaping futures through innovative
              construction solutions and engineering excellence across West
              Africa.
            </p>
          </AnimatedText>
        </div>
      </section>
    </>
  );
}

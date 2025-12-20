import Image from "next/image";
import TextReveal from "../components/TextReveal";
import ProfileGrid from "../components/ProfileGrid";

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
            <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
              <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
                Building Excellence Across West Africa
              </h1>
            </TextReveal>
            <TextReveal
              blockColor="var(--primary)"
              animateOnScroll={true}
              delay={0.2}
            >
              <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
                Three decades of expertise in construction and engineering,
                delivering integrated solutions from planning to execution.
              </p>
            </TextReveal>
          </div>
        </div>
      </div>

      {/* About Section Layout (without map SVG) */}
      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
              <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
                VISION
              </p>
              <div className="w-full md:w-1/2">
                <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
                  Three decades of excellence,
                  <br />
                  building the future of infrastructure
                  <br />
                  across West Africa with precision and innovation.
                </h2>
              </div>
            </TextReveal>
          </div>
          <div className="flex w-full gap-4 py-20">
            <div className="hidden w-1/2 md:block"></div>
            <div className="flex w-full flex-col md:w-1/2">
              {/* Top border */}
              <div className="border-secondary mb-4 border-t"></div>

              {/* First content block */}
              <div className="flex gap-4 pb-4">
                <div className="w-1/2">
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Mission
                  </h3>
                </div>
                <div className="w-1/2">
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    We are committed to delivering world-class construction and
                    engineering solutions that transform communities and drive
                    economic growth across West Africa. Through innovative
                    approaches and sustainable practices, we build
                    infrastructure that stands the test of time.
                  </p>
                </div>
              </div>

              {/* Border between blocks */}
              <div className="border-secondary mb-4 border-t"></div>

              {/* Second content block */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="font-pp-neue-montreal text-secondary text-left text-xl md:text-2xl">
                    Our Values
                  </h3>
                </div>
                <div className="w-1/2">
                  <p className="font-pp-neue-montreal text-secondary text-left text-sm md:text-base">
                    Integrity, excellence, and innovation guide everything we
                    do. We prioritize safety, sustainability, and client
                    satisfaction in every project, ensuring lasting impact and
                    meaningful contributions to the communities we serve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary px-4 py-8 md:px-8">
        <TextReveal blockColor="var(--secondary)" animateOnScroll={true}>
          <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-left text-xs md:text-sm">
            LEADERSHIP
          </p>
        </TextReveal>
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

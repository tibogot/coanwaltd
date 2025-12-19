import TextReveal from "../components/TextReveal";
import FractalGlass from "../components/FractalGlass/FractalGlass";

export default function Services() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FractalGlass imgSrc="/images/sticky-cards/stickycard-4.webp" />
      </div>
      <div className="relative z-10 flex h-full items-end justify-start">
        <div className="p-4 md:p-8 md:pb-12">
          <TextReveal blockColor="var(--primary)" animateOnScroll={true}>
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
              Comprehensive Construction Solutions
            </h1>
          </TextReveal>
          <TextReveal
            blockColor="var(--primary)"
            animateOnScroll={true}
            delay={0.2}
          >
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
              From civil engineering to mechanical and electrical services, we
              deliver integrated solutions for your construction needs.
            </p>
          </TextReveal>
        </div>
      </div>
    </div>
  );
}


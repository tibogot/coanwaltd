import Image from "next/image";
import TextReveal from "../components/TextReveal";

export default function Company() {
  return (
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
  );
}

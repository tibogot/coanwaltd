import FractalGlass from "../components/FractalGlass/FractalGlass";

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FractalGlass imgSrc="/images/sticky-cards/stickycard-4.webp" />
        </div>
        <div className="relative z-10 flex h-full items-end justify-start">
          <div className="p-4 md:p-8 md:pb-12">
            <h1 className="font-pp-neue-montreal mb-4 max-w-4xl text-left text-4xl text-white md:text-6xl">
              Comprehensive Construction Solutions
            </h1>
            <p className="font-pp-neue-montreal max-w-xl text-left text-base text-white/90 md:text-lg">
              From civil engineering to mechanical and electrical services, we
              deliver integrated solutions for your construction needs.
            </p>
          </div>
        </div>
      </div>

      {/* About Section Layout (without map SVG) */}
      <section className="bg-primary relative min-h-[120vh] w-full overflow-hidden px-4 py-30 md:px-8">
        <div className="relative z-10 mx-auto flex h-full w-full flex-col">
          <div className="text-left">
            <p className="font-pp-neue-montreal-mono text-secondary mb-8 text-xs md:text-sm">
              SERVICES
            </p>
            <h2 className="font-pp-neue-montreal text-secondary text-left text-4xl md:text-6xl">
              From civil to mechanical engineering,
              <br />
              we deliver comprehensive construction
              <br />
              services tailored to your needs.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}

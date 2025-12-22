/**
 * Example usage of ScrollSlider component
 *
 * This component creates a stunning scroll-triggered image slider with:
 * - Smooth scroll animations using GSAP ScrollTrigger
 * - Image crossfade transitions with scale effects
 * - Animated text reveals using SplitText
 * - Progress indicators with markers
 * - Responsive design
 */

import ScrollSlider from "../../components/ScrollSlider";

const slides = [
  {
    title:
      "Under the soft hum of streetlights she watches the world ripple through glass, her calm expression mirrored in the fragments of drifting light.",
    image: "/images/slider_img_1.jpg",
  },
  {
    title:
      "A car slices through the desert, shadow chasing the wind as clouds of dust rise behind, blurring the horizon into gold and thunder.",
    image: "/images/slider_img_2.jpg",
  },
  {
    title:
      "Reflections ripple across mirrored faces, each one a fragment of identity, caught between defiance, doubt, and the silence of thought.",
    image: "/images/slider_img_3.jpg",
  },
  {
    title:
      "Soft light spills through the café windows as morning settles into wood and metal, capturing the rhythm of quiet human routine.",
    image: "/images/slider_img_4.jpg",
  },
  {
    title:
      "Every serve becomes a battle between focus and instinct, movement flowing like rhythm as the court blurs beneath the sunlight.",
    image: "/images/slider_img_5.jpg",
  },
  {
    title:
      "Amber light spills over the stage as guitars cry into smoke and shadow, where music and motion merge into pure energy.",
    image: "/images/slider_img_6.jpg",
  },
  {
    title:
      "Dust erupts beneath his stride as sweat glints under floodlights, every step pushing closer to victory, grit, and pure determination.",
    image: "/images/slider_img_7.jpg",
  },
];

export default function ExamplePage() {
  return (
    <main>
      {/* Intro Section */}
      <section className="flex h-screen items-center justify-center bg-neutral-950 px-8 text-white">
        <h1 className="w-1/2 text-center text-5xl font-light leading-tight tracking-tight">
          Scroll to explore the rhythm of still images that move quietly between
          story and sensation.
        </h1>
      </section>

      {/* Scroll Slider */}
      <ScrollSlider slides={slides} />

      {/* Outro Section */}
      <section className="flex h-screen items-center justify-center bg-neutral-950 px-8 text-white">
        <h1 className="w-1/2 text-center text-5xl font-light leading-tight tracking-tight">
          As the sequence slows the silence takes over, holding the last traces
          of motion in the air.
        </h1>
      </section>
    </main>
  );
}

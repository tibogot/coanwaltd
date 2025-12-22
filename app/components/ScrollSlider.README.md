# ScrollSlider Component

A stunning scroll-triggered image slider built with GSAP, ScrollTrigger, and Tailwind CSS for Next.js projects.

## Features

- **Scroll-triggered animations**: Slides change as you scroll down the page
- **Smooth image transitions**: Images fade and scale with elegant easing
- **Animated text reveals**: Titles animate line-by-line using GSAP SplitText
- **Progress indicators**: Visual markers show current slide position
- **Progress bar**: Vertical bar fills as you scroll through slides
- **Pinned scrolling**: Section stays fixed while you scroll through slides
- **Responsive design**: Adapts layout for mobile and desktop
- **TypeScript support**: Full type safety
- **Tailwind CSS styling**: Easy to customize

## Installation

The component requires the following dependencies (already installed in your project):

```bash
npm install gsap @gsap/react lenis
```

## Usage

### Basic Example

```tsx
import ScrollSlider from "@/components/ScrollSlider";

const slides = [
  {
    title: "Your amazing slide title goes here",
    image: "/images/slide-1.jpg",
  },
  {
    title: "Another captivating description",
    image: "/images/slide-2.jpg",
  },
  // Add more slides...
];

export default function Page() {
  return <ScrollSlider slides={slides} />;
}
```

### With Lenis Smooth Scroll

For the best experience, wrap your app with Lenis for smooth scrolling:

```tsx
import { ReactLenis } from "lenis/react";
import ScrollSlider from "@/components/ScrollSlider";

export default function Page() {
  return (
    <>
      <ReactLenis root />
      <ScrollSlider slides={slides} />
    </>
  );
}
```

### Full Page Example

See [ScrollSlider.example.tsx](ScrollSlider.example.tsx) for a complete implementation with intro/outro sections.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `Slide[]` | **required** | Array of slide objects with `title` and `image` |
| `className` | `string` | `""` | Additional CSS classes for the container |

### Slide Object

```typescript
interface Slide {
  title: string;  // The text displayed on the slide
  image: string;  // Path to the image (e.g., "/images/slide-1.jpg")
}
```

## How It Works

1. **Scroll Pinning**: The slider section pins to the viewport as you scroll
2. **Progressive Loading**: As you scroll, the progress updates and triggers slide changes
3. **Image Transitions**: New images fade in with a subtle scale animation
4. **Text Animation**: Titles split into lines and animate sequentially
5. **Indicators**: Visual markers update to show the current slide
6. **Progress Bar**: A vertical bar fills to show scroll progress

## Customization

### Styling

The component uses Tailwind CSS classes for most styling. You can customize:

- **Colors**: Modify text colors, overlay darkness, and indicator colors
- **Typography**: Change font sizes, weights, and spacing
- **Layout**: Adjust positioning for different screen sizes
- **Animation timing**: Edit GSAP animation durations and easing in the component

### Animation Timing

Key animation parameters you can adjust in the component:

```typescript
// Image fade-in
duration: 0.5, ease: "power2.out"

// Image scale
duration: 1, ease: "power2.out"

// Title animation
duration: 0.75, stagger: 0.1, ease: "power3.out"

// Indicator animation
duration: 0.3, ease: "power2.out"
```

## Responsive Behavior

- **Desktop**: Title on left (50% width), indicators on right
- **Mobile (< 1024px)**: Title at top full width, indicators at bottom right

## GSAP Plugins Used

- **ScrollTrigger**: For scroll-based animations
- **SplitText**: For text line-by-line reveals (requires GSAP Club membership or trial)

## Notes

- The component uses `"use client"` directive for Next.js App Router
- Images are managed dynamically - only the current and previous 2 images are kept in the DOM
- ScrollTrigger instances are properly cleaned up on unmount
- The component is fully typed with TypeScript

## Credits

Based on the awesome Codegrid OVA scroll slider design, converted to TypeScript with Tailwind CSS.

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- GSAP ScrollTrigger
- ES6+ JavaScript features

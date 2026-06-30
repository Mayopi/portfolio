# Component Usage

## Core Components

### Navbar
Navigation component - fixed at top, theme-aware

```tsx
import Navbar from "@/components/Navbar";
```

### Hero
Landing section with profile display
- Uses GitHub API via `useGithubProfile` hook
- Animated entrance on mount

```tsx
import Hero from "@/components/Hero";
```

### Hobbies
Portfolio section with 3D guitar model and modern scroll-synced parallax effects
- Uses animejs `onScroll()` for multi-speed parallax: header (slow), text (medium), model (fast)
- Wraps the 3D model in `GuitarParallax` for additional mouse-driven + scroll parallax
- Dynamic import for ModelViewer (client-side only)
- Mobile-responsive (hides 3D on mobile, disables scroll animations)

```tsx
import Hobbies from "@/components/Hobbies";
```

### GuitarParallax
Wrapper component that applies mouse-driven and scroll-driven parallax to children
- **`speed`** (default `0.05`) — mouse parallax sensitivity
- **`scrollSpeed`** (default `0.2`) — scroll parallax intensity (Y-axis movement during scroll)

```tsx
import GuitarParallax from "@/components/guitar/GuitarParallax";

<GuitarParallax speed={0.06} scrollSpeed={0.25}>
  <div className="guitar-model-wrapper">...</div>
</GuitarParallax>
```

### ModelViewer
3D model renderer using React Three Fiber
- Supports GLB, GLTF, FBX, OBJ formats
- Interactive controls (orbit, zoom, hover)
- Built-in mouse parallax, hover rotation, manual rotation

```tsx
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### Location
Globe component using react-globe.gl

```tsx
import Location from "@/components/Location";
```

### LightRays
Background effect component
- Theme-aware colors
- Mouse-interactive

```tsx
import LightRays from "@/components/LightRays";
```

---

## UI Components

### Button
Radix-based button with variants

```tsx
import { Button } from "@/components/ui/button";
```

### Sonner
Toast notifications

```tsx
import { toast } from "sonner";
```

---

## Custom Hooks

### useGithubProfile
Fetch GitHub profile data

```tsx
const { profile, isLoading, error } = useGithubProfile("username");
```

### useMobile
Detect mobile viewport

```tsx
const isMobile = useIsMobile();
```

### useScrollAnimation
Scroll-triggered entrance animations using IntersectionObserver + animejs (legacy — new sections should prefer `onScroll()` directly)

```tsx
const { hasAnimated } = useScrollAnimation('.selector', {
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 1000,
});
```

---

## Animation Utilities (src/lib/animation.ts)

Reusable animejs animation builders:

| Function | Purpose |
|----------|---------|
| `createScrollReveal()` | Configurable scroll-triggered reveal |
| `createStaggerAnimation()` | Staggered entrance for multiple elements |
| `createParallaxAnimation()` | Mouse-driven parallax on an element |
| `createEntranceAnimation()` | Simple fade-in + slide-up entrance |
| `createTimelineAnimation()` | Animejs timeline builder |
| `animateOnScroll()` | IntersectionObserver-based scroll trigger |
| `animate`, `set`, `createTimeline`, `stagger` | Re-exports from animejs |

---

## Page Structure

```tsx
// app/page.tsx
<Navbar />
<LightRays />  {/* Fixed background */}
<main>
  <Hero />           {/* Landing, GitHub profile */}
  <Hobbies />        {/* Guitar 3D model + scroll parallax */}
  <Location />       {/* Interactive globe */}
</main>
```
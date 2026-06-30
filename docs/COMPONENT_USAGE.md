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
Contains 3D guitar model
- Dynamic import for ModelViewer (client-side only)
- Mobile-responsive (hides 3D on mobile)

```tsx
import Hobbies from "@/components/Hobbies";
```

### ModelViewer
3D model renderer using React Three Fiber
- Supports GLB, GLTF, FBX, OBJ formats
- Interactive controls (orbit, zoom, hover)

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

---

## Page Structure

```tsx
// app/page.tsx
<Navbar />
<LightRays />  {/* Background */}
<main>
  <Hero />
  <Hobbies />
  <Location />
</main>
```
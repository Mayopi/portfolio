# Best Practices

## General

### File Organization
- Group related files by feature/feature name
- Keep components in `src/components/`
- Keep hooks in `src/hooks/`
- Keep utilities in `src/lib/`
- Use index files for clean imports

### Naming Conventions
- Components: PascalCase (`ModelViewer.tsx`)
- Hooks: camelCase with `use` prefix (`useMobile.tsx`)
- Utilities: camelCase (`utils.ts`)
- Types: PascalCase (`GitHub.ts`)

### Imports
- Use path aliases (`@/` for `src/`)
- Order: external → internal → relative

```tsx
import { useState, useEffect } from 'react';        // external
import { useGithubProfile } from "@/hooks/";        // internal
import { cn } from "@/lib/utils";                   // internal
import Navbar from "@/components/Navbar";           // component
```

---

## React/Next.js

### Client Components
- Add `"use client"` at top of files using hooks
- Use dynamic imports for 3D/canvas components

```tsx
"use client";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
});
```

### Performance
- Memoize expensive computations
- Use `useCallback` for event handlers
- Lazy load non-critical components

### State Management
- Use `useState` for local component state
- Use SWR for server data
- Avoid prop drilling - use context if needed

---

## TypeScript

### Type Definitions
- Define props interfaces for components
- Use explicit types over `any`

```tsx
interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
}
```

### Generics
- Use generics for reusable hooks/components

---

## Tailwind CSS

### Classes
- Use utility classes for styling
- Use `cn()` for conditional classes

```tsx
className={cn(
  "base-classes",
  isActive && "active-class",
  variant === 'primary' ? "bg-primary" : "bg-secondary"
)}
```

### Responsive
- Use mobile-first approach: `className="text-base md:text-lg"`

---

## 3D Components (React Three Fiber)

### SSR Safety
- Always use dynamic import with `ssr: false`
- Provide loading fallback

### Performance
- Use `useMemo` for geometries/materials
- Limit shadow casting
- Use appropriate LOD

---

## Animation (Anime.js v4)

### Setup
- Import only needed modules (tree-shakeable ESM)
- Use `autoplay: false` for externally controlled animations

```tsx
import { animate } from 'animejs/animation';
import { onScroll } from 'animejs/events';
import { set } from 'animejs/utils';
```

### Scroll-Synced Animations (Modern Parallax)
Use `onScroll()` with `sync` for scroll-driven animations. This maps animation progress directly to scroll position — creates the modern parallax effect seen on animejs.com.

```tsx
import { animate } from 'animejs/animation';
import { onScroll } from 'animejs/events';

// Create an animation with autoplay disabled
const anim = animate('.element', {
  translateY: [100, -100],  // moves 200px total through scroll range
  scale: [0.9, 1],
  easing: 'linear',         // linear for scroll sync
  duration: 2000,
  autoplay: false,
});

// Link it to scroll — sync interpolates progress smoothly
const observer = onScroll({
  target: '.element',
  sync: 0.15,  // 0–1 smooth factor, or `true` for direct sync
}).link(anim);

// Cleanup
return () => {
  observer.revert();
  anim.pause();
};
```

### Multi-Speed Parallax (Depth Effect)
Give different element groups different `translate` ranges to create the illusion of depth:

| Layer | translateY | Description |
|-------|-----------|-------------|
| Background | `[60, -60]` | Slow movement — far away |
| Mid-ground | `[80, -80]` | Medium movement |
| Foreground | `[100, -100]` | Fast movement — close up |

### Key Parameters for `onScroll()`
- **`sync`** — `true` for exact 1:1 sync, a number (0–1) for smooth interpolation, or a string like `'play pause'`
- **`target`** — Element to observe for scroll thresholds
- **`enter` / `leave`** — Scroll boundary thresholds (default: `'end start'` / `'start end'`)
- **`.link(animation)`** — Attaches an animation to the scroll observer

### Performance
- Use CSS transforms (`translateX`, `translateY`, `scale`) and `opacity` only
- Avoid animating layout properties (`width`, `height`, `margin`, `top`, `left`)
- `onScroll()` with `sync` performs efficient requestAnimationFrame-based updates
- Clean up observers and animations on unmount

---

## Git/Version Control

### Commits
- Use clear, concise messages
- Group related changes

### Branches
- Feature: `feature/animation-name`
- Bugfix: `fix/issue-description`

---

## Accessibility

- Semantic HTML
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- ARIA labels when needed
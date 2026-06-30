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

## Animation (Anime.js)

### Setup
- Import only needed modules
- Use `autoplay: false` for controlled animations

### Scroll Animations
- Use Intersection Observer for triggers
- Clean up animations on unmount

```tsx
useEffect(() => {
  const animation = anime({...});
  return () => animation.seek(0); // Reset on unmount
}, []);
```

### Performance
- Use `will-change` for animated properties
- Avoid animating layout properties
- Use transforms and opacity

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
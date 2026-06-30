# Project Guide

Welcome to the portfolio project documentation.

---

## Quick Links- [Tech Stack](TECH_STACK.md) - Dependencies and tools
- [Component Usage](COMPONENT_USAGE.md) - How to use components
- [Best Practices](BEST_PRACTICES.md) - Coding conventions
- [Codebase Overview](CODEBASE_OVERVIEW.md) - Project structure
- [Theming](THEMING.md) - Nautical theme system, CSS variables, oklch colors
- [ModelViewer Guide](MODELVIEWER_GUIDE.md) - 3D viewer props, controls, and rendering

---

## Getting Started

### Install Dependencies
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Lint
```bash
pnpm lint
```

---

## Current Features

1. **Hero Section** — GitHub profile integration
2. **3D Guitar Display** — Interactive ModelViewer with mouse controls
3. **Modern Scroll Parallax** — Multi-speed scroll-synced animations via animejs `onScroll()`
4. **Theme Support** — Nautical-inspired dark/light mode with oklch colors
5. **Light Rays Background** — Dynamic background effect
6. **Location Globe** — Interactive globe component

---

## Animation System

The project uses **animejs v4** for all animations. Two animation approaches coexist:

### Scroll-Synced (Recommended for new work)
Uses `onScroll()` with `sync` to tie animation progress to scroll position. Creates multi-speed parallax by applying different `translate` ranges to different element groups.

```tsx
import { animate } from 'animejs/animation';
import { onScroll } from 'animejs/events';

const anim = animate('.target', {
  translateY: [100, -100],
  ease: 'linear',
  duration: 2000,
  autoplay: false,
});

onScroll({ target: '.target', sync: 0.15 }).link(anim);
```

### Scroll-Triggered (Legacy)
Uses IntersectionObserver via `useScrollAnimation` hook to detect when elements enter the viewport, then plays an animejs animation.

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Anime.js](https://animejs.com)
- [Tailwind CSS](https://tailwindcss.com)
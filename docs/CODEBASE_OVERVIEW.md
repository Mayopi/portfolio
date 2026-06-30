# Codebase Overview

## Project Structure

```
portfolio/
├── public/
│   ├── 3D/
│   │   └── guitar.glb            # 3D guitar model
│   └── images/
│       └── brush-background-blue.png
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx        # Button component
│   │   │   └── sonner.tsx        # Toast component
│   │   ├── guitar/
│   │   │   └── GuitarParallax.tsx # Mouse + scroll parallax wrapper
│   │   ├── Hero.tsx              # Landing section
│   │   ├── Hobbies.tsx           # Guitar section with scroll parallax
│   │   ├── Location.tsx          # Globe section
│   │   ├── LightRays.tsx         # Background effect
│   │   ├── ModelViewer.tsx       # 3D model viewer (R3F)
│   │   └── Navbar.tsx            # Navigation
│   ├── hooks/
│   │   ├── use-github-profile.ts  # GitHub API data fetching
│   │   ├── use-mobile.tsx         # Responsive viewport detection
│   │   └── useScrollAnimation.ts  # Scroll-triggered animejs animations
│   ├── lib/
│   │   ├── animation.ts           # Animejs animation utilities
│   │   ├── cache.ts               # Data caching
│   │   └── utils.ts               # Shared utilities
│   └── types/
│       └── github.ts              # GitHub API types
├── docs/                          # Project documentation
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## Key Files

### Entry Points
- `src/app/layout.tsx` - Root layout, theme provider
- `src/app/page.tsx` - Main home page

### Configuration
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `next.config.ts` - Next.js config
- `tailwind.config.ts` - Tailwind config
- `eslint.config.mjs` - ESLint config

---

## Data Flow

```
page.tsx
  ├── Navbar (static)
  ├── LightRays (fixed background, theme-aware)
  └── main content
        ├── Hero
        │     └── useGithubProfile → GitHub API
        ├── Hobbies
        │     ├── animejs onScroll() — header / text / model parallax
        │     ├── GuitarParallax — mouse + scroll wrapper
        │     └── ModelViewer → guitar.glb (R3F)
        └── Location
              └── react-globe.gl
```

---

## State Management

| State | Method | Location |
|-------|--------|----------|
| Theme | next-themes | layout.tsx |
| GitHub data | SWR | useGithubProfile |
| Mobile detection | useState | use-mobile.tsx |
| Model loaded | useState | Hobbies.tsx |
| Scroll anims | animejs onScroll() | Hobbies.tsx + GuitarParallax.tsx |
| Animation utils | animejs animate/set | lib/animation.ts |

---

## Dependencies Graph

```
next (core)
├── react + react-dom
├── three / @react-three/fiber
├── tailwindcss
├── swr
└── lucide-react
```

---

## Conventions

- `"use client"` for interactive components
- Dynamic imports for 3D/canvas
- Path aliases: `@/` → `src/`
- Component props in dedicated interfaces
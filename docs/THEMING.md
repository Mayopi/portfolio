# Theming System

The portfolio uses a **nautical / ocean-inspired** theme system built with CSS custom properties and [`next-themes`](https://github.com/pacocoursey/next-themes) for dark/light mode switching.

---

## Color System

All colors use the **oklch()** color space for perceptually uniform, vibrant colors across both themes.

### Light Mode (`:root`)

| Token | Value | Description |
|-------|-------|-------------|
| `--background` | `oklch(0.98 0.02 220)` | Very light misty blue |
| `--foreground` | `oklch(0.22 0.08 250)` | Deep navy text |
| `--primary` | `oklch(0.45 0.12 240)` | Ocean blue |
| `--secondary` | `oklch(0.92 0.04 210)` | Soft seafoam |
| `--accent` | `oklch(0.9 0.08 95)` | Sandy / rope beige |
| `--destructive` | `oklch(0.65 0.22 30)` | Coral red |
| `--border` | `oklch(0.86 0.03 220)` | Soft blue border |
| `--ring` | `oklch(0.6 0.15 240)` | Bright ocean focus ring |

### Dark Mode (`.dark`)

| Token | Value | Description |
|-------|-------|-------------|
| `--background` | `oklch(0.17 0.05 240)` | Deep navy |
| `--foreground` | `oklch(0.96 0.02 220)` | Near-white hint of blue |
| `--primary` | `oklch(0.78 0.09 220)` | Bright sea blue |
| `--secondary` | `oklch(0.26 0.04 230)` | Muted deep blue |
| `--accent` | `oklch(0.8 0.09 95)` | Lighter sand |
| `--destructive` | `oklch(0.7 0.2 30)` | Strong coral |
| `--border` | `oklch(0.9 0.02 220 / 0.12)` | Subtle bluish border |
| `--ring` | `oklch(0.7 0.12 240)` | Sea blue focus ring |

### Chart Palette

Five chart colors designed for data visualization:

| Token | Light | Dark |
|-------|-------|------|
| `--chart-1` | Deep ocean | Bright blue |
| `--chart-2` | Teal | Teal |
| `--chart-3` | Turquoise | Turquoise |
| `--chart-4` | Sand | Sand/gold |
| `--chart-5` | Coral | Coral |

---

## Setup

### Root Layout (`src/app/layout.tsx`)

```tsx
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {children}
</ThemeProvider>
```

- `attribute="class"` — toggles `.dark` class on `<html>` for dark mode
- `defaultTheme="dark"` — starts in dark mode by default
- `enableSystem` — respects OS-level preference

### Using Theme in Components

```tsx
"use client";
import { useTheme } from "next-themes";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "light")}>
      Toggle theme
    </button>
  );
}
```

---

## Tailwind Integration

CSS variables are mapped to Tailwind theme tokens in `globals.css` via `@theme inline {}`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

Use them naturally in JSX:

```tsx
<div className="bg-background text-foreground">
  <h2 className="text-primary">Hello</h2>
</div>
```

### Custom Variant

The `.dark` class is detected via a custom variant:

```css
@custom-variant dark (&:is(.dark *));
```

This enables Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-navy-900" />
```

---

## Adding a New Color Token

1. Add the CSS variable in both `:root` (light) and `.dark` (dark) in `globals.css`
2. Map it in `@theme inline {}` block
3. Use the Tailwind class `text-newColor` / `bg-newColor`

### Example

```css
/* globals.css */
:root {
  --color-sunset: oklch(0.7 0.15 60);
}
.dark {
  --color-sunset: oklch(0.85 0.12 60);
}
@theme inline {
  --color-sunset: var(--color-sunset);
}
```

```tsx
<div className="bg-sunset" />
```

---

## Best Practices

- **Use CSS variables** for theme-dependent values (colors, borders, shadows)
- **Use oklch** for new colors — it's perceptually uniform and works across light/dark
- **Avoid hardcoding colors** in component styles; always reference theme tokens
- **Test both themes** when adding new colors — verify contrast in light AND dark mode
- **Text shadows** use `drop-shadow` for readability on complex backgrounds (e.g., over LightRays)
- **Suppress hydration warning** on `<html>` to prevent next-themes flash: `suppressHydrationWarning={true}`

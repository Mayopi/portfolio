# ModelViewer Guide

The `ModelViewer` component renders interactive 3D models using React Three Fiber (R3F) with comprehensive controls for rotation, zoom, parallax, and environment lighting.

---

## Basic Usage

```tsx
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,       // Required: Three.js needs the DOM
  loading: () => <div>Loading 3D model...</div>,
});

<ModelViewer
  url="/3D/guitar.glb"
  width="100%"
  height="600px"
/>
```

> **Always use `ssr: false` with dynamic import** — Three.js reads DOM APIs that don't exist on the server.

---

## Props Reference

### Required

| Prop | Type | Description |
|------|------|-------------|
| `url` | `string` | Path to the 3D model file (GLB, GLTF, FBX, or OBJ) |

### Sizing

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `400` | Canvas width |
| `height` | `number \| string` | `400` | Canvas height |

### Model Positioning

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelXOffset` | `number` | `0` | Horizontal screen-space offset |
| `modelYOffset` | `number` | `0` | Vertical screen-space offset |
| `defaultRotationX` | `number` | `-50` | Initial X rotation (degrees) |
| `defaultRotationY` | `number` | `20` | Initial Y rotation (degrees) |
| `defaultZoom` | `number` | `0.5` | Initial camera distance |
| `autoFrame` | `boolean` | `false` | Auto-fit model to viewport |

### Controls

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableMouseParallax` | `boolean` | `true` | Subtle position shift tracking the cursor |
| `enableManualRotation` | `boolean` | `true` | Click-and-drag to rotate the model |
| `enableHoverRotation` | `boolean` | `true` | Model tilts toward the cursor |
| `enableManualZoom` | `boolean` | `true` | Scroll/pinch to zoom |
| `minZoomDistance` | `number` | `0.5` | Minimum camera distance |
| `maxZoomDistance` | `number` | `10` | Maximum camera distance |
| `autoRotate` | `boolean` | `false` | Model rotates continuously |
| `autoRotateSpeed` | `number` | `0.35` | Auto-rotate speed multiplier |

### Lighting & Environment

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ambientIntensity` | `number` | `0.3` | Ambient light level |
| `keyLightIntensity` | `number` | `1` | Main directional light |
| `fillLightIntensity` | `number` | `0.5` | Fill light from opposite side |
| `rimLightIntensity` | `number` | `0.8` | Rim/back light for edge definition |
| `environmentPreset` | `enum` | `'forest'` | HDR environment: `'city'`, `'sunset'`, `'night'`, `'dawn'`, `'studio'`, `'apartment'`, `'forest'`, `'park'`, `'none'` |

### Visual

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fadeIn` | `boolean` | `false` | Fade-in animation on model load |
| `placeholderSrc` | `string` | — | Image placeholder while loading |
| `showScreenshotButton` | `boolean` | `true` | "Take Screenshot" button overlay |
| `onModelLoaded` | `() => void` | — | Callback when model fully loads |

---

## Rendering Pipeline

```
Canvas (R3F, frameloop="demand")
├── Environment (HDR preset)
├── Ambient Light
├── Directional Lights (key, fill, rim)
├── ContactShadows (shadow beneath model)
├── Suspense
│   └── ModelLoader
│       ├── File-type detection
│       ├── useGLTF / useFBX / OBJLoader
│       ├── Auto-scale & center
│       ├── Cast/receive shadows
│       └── Optional fade-in
└── OrbitControls (desktop, zoom-only)
```

### Model Format Support

| Format | Loader | Notes |
|--------|--------|-------|
| `.glb` / `.gltf` | `useGLTF()` | Preferred format, binary/JSON |
| `.fbx` | `useFBX()` | Autodesk FBX |
| `.obj` | `OBJLoader` | Wavefront OBJ |

---

## Control Modes

The component has three independent control layers that compose together:

### 1. Mouse Parallax (`enableMouseParallax`)
The model's position shifts slightly opposite the cursor direction. This creates a subtle "floating" 3D feel.

- **Magnitude:** `0.05` (5% of viewport)
- **Easing:** `0.12` lerp factor — smooth, dampened movement

### 2. Hover Rotation (`enableHoverRotation`)
The model tilts toward the cursor position, creating the illusion that it's responding to the viewer's gaze.

- **Magnitude:** `6°` max rotation
- **Easing:** `0.15` lerp factor

### 3. Manual Rotation (`enableManualRotation`)

**Desktop:** Click-and-drag rotates the model with momentum/inertia (`0.925` decay).

**Touch:** Horizontal swipe rotates; once the finger moves past an 8px threshold the direction is locked.

### Zoom (`enableManualZoom`)

**Desktop:** Scroll wheel.

**Touch:** Two-finger pinch.

---

## Performance Guidelines

- **Use `frameloop="demand"`** — Canvas only re-renders when something changes (default in the component)
- **Inherit shadow settings** — model traversals enable `castShadow` and `receiveShadow` on all meshes
- **Model auto-scaling** — The component automatically scales models based on bounding sphere to fit a `1 / (radius * 2)` scale
- **Fade-in** — Uses a manual `setInterval` at 60fps with linear opacity interpolation (minimal overhead)
- **Inertia rotation** — Velocities decay below `1e-4` threshold before stopping to avoid unnecessary renders
- **Canvas `preserveDrawingBuffer: true`** — Required for the screenshot feature; minor memory trade-off

---

## Controls Interaction Table

| Input | Mobile | Desktop |
|-------|--------|---------|
| **Parallax** | ❌ | ✅ Cursor tracking |
| **Hover rotate** | ❌ | ✅ Cursor tracking |
| **Drag rotate** | ✅ Horizontal swipes | ✅ Click + drag |
| **Zoom** | ✅ Two-finger pinch | ✅ Scroll wheel |
| **Inertia** | ✅ On drag release | ✅ On drag release |

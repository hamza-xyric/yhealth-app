# yHealth Motion Design System

> Subtle, refined animations that enhance UX without distraction.

---

## Motion Philosophy

### Design Principles

1. **Subtle & Refined**: Apple-style micro-interactions. Calming, not distracting.
2. **Purposeful**: Every animation serves a UX purpose, not decoration.
3. **Adaptive**: Energetic for celebrations, calm for support.
4. **Performance-First**: 60fps, hardware-accelerated animations only.
5. **Accessible**: Respect `prefers-reduced-motion` preference.

### When to Use Motion

| Use Case | Motion Type | Purpose |
|----------|-------------|---------|
| State changes | Micro-interaction | Feedback confirmation |
| Page transitions | Navigation | Context preservation |
| Loading | Progress | Reduce perceived wait |
| Celebrations | Delight | Positive reinforcement |
| Errors | Attention | Direct user focus |
| Data updates | Transition | Smooth state changes |

### When NOT to Use Motion

- Purely decorative animations
- Complex animations that distract
- Animations that delay user actions
- Motion that competes with content
- Looping animations without purpose

---

## Timing Tokens

### Duration Scale

| Token | Duration | Tailwind | Usage |
|-------|----------|----------|-------|
| `instant` | 0ms | `duration-0` | Immediate feedback |
| `micro` | 100ms | `duration-100` | Hover states |
| `fast` | 150ms | `duration-150` | Button press, toggles |
| `normal` | 200ms | `duration-200` | **Default transitions** |
| `medium` | 300ms | `duration-300` | Page transitions |
| `slow` | 400ms | `duration-400` | Modal open/close |
| `slower` | 500ms | `duration-500` | Complex animations |
| `celebration` | 600ms | `duration-600` | Achievement unlock |

### CSS Custom Properties

```css
:root {
  --duration-instant: 0ms;
  --duration-micro: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-medium: 300ms;
  --duration-slow: 400ms;
  --duration-slower: 500ms;
  --duration-celebration: 600ms;
}
```

---

## Easing Functions

### Easing Scale

| Token | Curve | Tailwind | Usage |
|-------|-------|----------|-------|
| `ease-linear` | `linear` | `ease-linear` | Progress bars |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | `ease-in` | Exit animations |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | `ease-out` | **Enter animations** |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | `ease-in-out` | Move animations |
| `ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | custom | Celebrations |
| `ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | custom | Playful feedback |

### CSS Custom Properties

```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Easing Guidelines

| Animation Type | Recommended Easing |
|----------------|-------------------|
| Enter/appear | `ease-out` |
| Exit/disappear | `ease-in` |
| Move/resize | `ease-in-out` |
| Progress | `linear` |
| Celebrations | `ease-spring` or `ease-bounce` |

---

## Micro-Interactions

### Button Press

```css
.button {
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out);
}

.button:active {
  transform: scale(0.98);
}
```

**Behavior:**
- Scale down slightly on press (0.98)
- Background color change
- Duration: 150ms
- Easing: ease-out

### Toggle Switch

```css
.toggle-thumb {
  transition: transform var(--duration-normal) var(--ease-spring);
}

.toggle-track {
  transition: background-color var(--duration-normal) var(--ease-out);
}
```

**Behavior:**
- Thumb slides with spring easing
- Track color fades
- Duration: 200ms

### Checkbox Check

```css
.checkbox-check {
  transform-origin: center;
  transition: transform var(--duration-fast) var(--ease-spring),
              opacity var(--duration-fast) var(--ease-out);
}

.checkbox-check.checked {
  transform: scale(1);
  opacity: 1;
}

.checkbox-check.unchecked {
  transform: scale(0);
  opacity: 0;
}
```

**Behavior:**
- Check mark scales in with spring
- Slight overshoot for satisfaction
- Duration: 150ms

### Card Hover (Desktop)

```css
.card {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

**Behavior:**
- Subtle lift on hover
- Shadow increase
- Duration: 200ms

### Input Focus

```css
.input {
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.2);
}
```

---

## Page Transitions

### Screen Push (Forward Navigation)

```css
/* Entering screen */
.page-enter {
  transform: translateX(100%);
  opacity: 0;
}

.page-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: transform var(--duration-medium) var(--ease-out),
              opacity var(--duration-medium) var(--ease-out);
}

/* Exiting screen */
.page-exit {
  transform: translateX(0);
  opacity: 1;
}

.page-exit-active {
  transform: translateX(-30%);
  opacity: 0.5;
  transition: transform var(--duration-medium) var(--ease-in),
              opacity var(--duration-medium) var(--ease-in);
}
```

### Screen Pop (Back Navigation)

```css
/* Entering screen (coming back) */
.page-enter-back {
  transform: translateX(-30%);
  opacity: 0.5;
}

.page-enter-back-active {
  transform: translateX(0);
  opacity: 1;
  transition: transform var(--duration-medium) var(--ease-out),
              opacity var(--duration-medium) var(--ease-out);
}

/* Exiting screen */
.page-exit-back {
  transform: translateX(0);
  opacity: 1;
}

.page-exit-back-active {
  transform: translateX(100%);
  opacity: 0;
  transition: transform var(--duration-medium) var(--ease-in),
              opacity var(--duration-medium) var(--ease-in);
}
```

### Tab Switch

```css
.tab-content {
  transition: opacity var(--duration-normal) var(--ease-out);
}

.tab-content.entering {
  opacity: 0;
}

.tab-content.active {
  opacity: 1;
}
```

**Behavior:**
- Cross-fade between tabs
- No position animation (tabs are in place)
- Duration: 200ms

---

## Modal Animations

### Bottom Sheet

```css
/* Backdrop */
.sheet-backdrop {
  transition: opacity var(--duration-medium) var(--ease-out);
}

.sheet-backdrop.entering { opacity: 0; }
.sheet-backdrop.active { opacity: 1; }
.sheet-backdrop.exiting { opacity: 0; }

/* Sheet */
.sheet {
  transition: transform var(--duration-medium) var(--ease-out);
}

.sheet.entering { transform: translateY(100%); }
.sheet.active { transform: translateY(0); }
.sheet.exiting { transform: translateY(100%); }
```

**Behavior:**
- Slide up from bottom
- Backdrop fades in
- Duration: 300ms

### Dialog

```css
/* Backdrop */
.dialog-backdrop {
  transition: opacity var(--duration-medium) var(--ease-out);
}

/* Dialog */
.dialog {
  transition: opacity var(--duration-medium) var(--ease-out),
              transform var(--duration-medium) var(--ease-out);
}

.dialog.entering {
  opacity: 0;
  transform: scale(0.95);
}

.dialog.active {
  opacity: 1;
  transform: scale(1);
}

.dialog.exiting {
  opacity: 0;
  transform: scale(0.95);
}
```

**Behavior:**
- Scale up slightly while fading in
- Duration: 300ms

---

## Loading Animations

### Spinner

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### Skeleton Shimmer

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--muted) 25%,
    var(--surface-elevated-2) 50%,
    var(--muted) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

### Progress Ring Fill

```css
@keyframes ring-fill {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: var(--progress); }
}

.progress-ring-circle {
  animation: ring-fill 1s var(--ease-out) forwards;
}
```

---

## Celebration Animations

### Achievement Unlock

```css
@keyframes achievement-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.achievement {
  animation: achievement-pop var(--duration-celebration) var(--ease-spring);
}
```

**Include:**
- Scale up with overshoot
- Optional confetti particles
- Haptic feedback (device vibration)
- Sound effect (optional, respect settings)

### Streak Animation

```css
@keyframes streak-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.streak-badge {
  animation: streak-pulse 2s var(--ease-in-out) infinite;
}
```

### Checkmark Success

```css
@keyframes check-draw {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.check-icon path {
  stroke-dasharray: 100;
  animation: check-draw var(--duration-medium) var(--ease-out) forwards;
}
```

---

## Data Transitions

### Number Counter

```tsx
// Animate number changes
const AnimatedNumber = ({ value, duration = 500 }) => {
  // Interpolate from previous to new value
  // Use requestAnimationFrame for smooth 60fps
};
```

**Behavior:**
- Count up/down smoothly
- Duration: 500ms for large changes, 200ms for small
- Easing: ease-out

### Chart Data Update

```css
.chart-bar {
  transition: height var(--duration-medium) var(--ease-out);
}

.chart-line {
  transition: d var(--duration-medium) var(--ease-out);
}

.chart-point {
  transition: transform var(--duration-normal) var(--ease-out);
}
```

**Behavior:**
- Bars grow/shrink smoothly
- Lines morph between states
- Points move with easing

---

## Gesture Animations

### Pull to Refresh

```css
.refresh-indicator {
  transition: transform var(--duration-normal) var(--ease-out);
}

.refresh-indicator.pulling {
  transform: translateY(var(--pull-distance));
}

.refresh-indicator.refreshing {
  transform: translateY(60px);
}
```

### Swipe to Dismiss

```css
.swipeable {
  transition: transform var(--duration-fast) var(--ease-out),
              opacity var(--duration-fast) var(--ease-out);
}

.swipeable.swiping {
  transition: none; /* Follow finger exactly */
}

.swipeable.dismissed {
  transform: translateX(100%);
  opacity: 0;
}
```

---

## Accessibility

### Reduced Motion

Always respect user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Alternative for Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Replace motion with opacity change */
  .page-enter {
    opacity: 0;
    transform: none;
  }

  .page-enter-active {
    opacity: 1;
    transition: opacity var(--duration-normal) var(--ease-out);
  }
}
```

### Motion Sensitivity Guidelines

| Animation Type | Reduced Motion Alternative |
|----------------|---------------------------|
| Slide transitions | Fade only |
| Scale animations | Opacity only |
| Parallax | Static |
| Auto-playing | Static or user-triggered |
| Looping | Single iteration |

---

## Performance Guidelines

### Hardware Acceleration

Only animate properties that are GPU-accelerated:

| ✅ Performant | ❌ Avoid |
|--------------|----------|
| `transform` | `width` |
| `opacity` | `height` |
| `filter` | `margin` |
| | `padding` |
| | `left/right/top/bottom` |

### will-change

Use sparingly for complex animations:

```css
.complex-animation {
  will-change: transform, opacity;
}

/* Remove after animation */
.complex-animation.idle {
  will-change: auto;
}
```

### Animation Batching

Group related animations to prevent layout thrashing:

```javascript
// Good: Batch reads, then writes
const height = element.offsetHeight; // Read
element.style.transform = `translateY(${height}px)`; // Write

// Bad: Interleaved reads and writes
element.style.transform = 'none'; // Write
const height = element.offsetHeight; // Read (forces layout)
element.style.transform = `translateY(${height}px)`; // Write
```

---

## Implementation Examples

### Tailwind + Framer Motion

```tsx
import { motion } from 'framer-motion';

// Button with press feedback
<motion.button
  whileTap={{ scale: 0.98 }}
  className="bg-primary-600 px-4 py-3 rounded-md"
>
  Submit
</motion.button>

// Page transition
<motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -30 }}
  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
>
  <PageContent />
</motion.div>

// Achievement popup
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
>
  <Achievement />
</motion.div>
```

### CSS-Only Implementation

```css
/* Button */
.btn {
  transition: transform 150ms ease-out, background-color 150ms ease-out;
}
.btn:active {
  transform: scale(0.98);
}

/* Card */
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Page transition (CSS only is limited) */
.page {
  transition: opacity 300ms ease-out;
}
```

---

## Animation Checklist

Before shipping any animation:

- [ ] Duration under 500ms (except celebrations)
- [ ] Uses GPU-accelerated properties only
- [ ] Has reduced-motion alternative
- [ ] Runs at 60fps on target devices
- [ ] Serves a clear UX purpose
- [ ] Doesn't block user interaction
- [ ] Consistent with other animations
- [ ] Tested on low-end devices

---

*yHealth Motion Design System v1.0 | Subtle, purposeful, accessible*

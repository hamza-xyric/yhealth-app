# yHealth Component Library

> Specification for UI components aligned with shadcn/ui and Tailwind CSS.

---

## Component Philosophy

### Design Principles

1. **shadcn/ui Foundation**: Build on top of shadcn/ui primitives.
2. **Accessibility First**: WCAG 2.1 AA compliance built-in.
3. **Dark Mode Primary**: All components designed for dark mode first.
4. **Pillar-Aware**: Components support fitness, nutrition, wellbeing color variants.
5. **Consistent Patterns**: Predictable behavior across the application.

---

## Button Components

### Button Variants

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| `primary` | `primary-600` | `foreground` | none | Main CTAs |
| `secondary` | `transparent` | `primary-500` | `primary-500` | Secondary actions |
| `ghost` | `transparent` | `muted-foreground` | none | Tertiary actions |
| `outline` | `transparent` | `foreground` | `border` | Alternative secondary |
| `destructive` | `destructive` | `foreground` | none | Delete, cancel |
| `fitness` | `fitness-500` | `foreground` | none | Fitness actions |
| `nutrition` | `nutrition-500` | `foreground` | none | Nutrition actions |
| `wellbeing` | `wellbeing-500` | `foreground` | none | Wellbeing actions |

### Button Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| `sm` | 32px | 8px 12px | 14px | 16px |
| `md` | 40px | 12px 16px | 16px | 20px |
| `lg` | 48px | 16px 24px | 18px | 24px |
| `icon` | 44px | 0 | - | 20px |

### Button States

```css
/* Primary button states */
.btn-primary {
  /* Default */
  background: var(--primary-600);

  /* Hover */
  &:hover { background: var(--primary-500); }

  /* Active/Pressed */
  &:active { background: var(--primary-700); }

  /* Disabled */
  &:disabled {
    background: var(--muted);
    color: var(--muted-foreground);
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
}
```

### Button Component Spec

```tsx
// Button props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' |
           'fitness' | 'nutrition' | 'wellbeing';
  size: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}
```

---

## Card Components

### Card Types

#### Metric Card
Displays a single health metric with pillar color coding.

```
┌─────────────────────────────┐
│  PILLAR LABEL (overline)    │
│                             │
│  85                         │  ← Large metric number
│  Recovery Score             │  ← Metric name
│                             │
│  ▲ 12% from yesterday       │  ← Trend indicator
└─────────────────────────────┘
```

**Spec:**
- Padding: 20px (`p-5`)
- Border radius: 12px (`rounded-lg`)
- Background: `card` (#1E1E1E)
- Min height: 120px
- Pillar indicator: 2px top border or overline text color

#### Insight Card
Displays an AI-generated insight with action.

```
┌─────────────────────────────┐
│  💡 Coach Insight           │
│                             │
│  Your workouts are 40%      │
│  better after 7+ hours      │
│  of sleep.                  │
│                             │
│  [Learn More]               │
└─────────────────────────────┘
```

**Spec:**
- Padding: 20px (`p-5`)
- Border radius: 12px (`rounded-lg`)
- Background: `card` (#1E1E1E)
- Icon: `primary-500` teal
- CTA: Ghost button or link

#### Action Card
Prompts user to take an action.

```
┌─────────────────────────────┐
│  📝 Daily Check-in          │
│                             │
│  How are you feeling        │
│  today?                     │
│                             │
│  [Start Check-in ▶]         │
└─────────────────────────────┘
```

**Spec:**
- Padding: 20px (`p-5`)
- Border radius: 12px (`rounded-lg`)
- Background: Gradient or elevated surface
- CTA: Primary button

### Card Grid Layout

```html
<div class="grid grid-cols-2 gap-4">
  <MetricCard pillar="fitness" value={85} label="Recovery" />
  <MetricCard pillar="nutrition" value={72} label="Nutrition" />
  <InsightCard class="col-span-2">
    <!-- Full width insight -->
  </InsightCard>
</div>
```

---

## Input Components

### Text Input

```
┌─────────────────────────────┐
│  Label                      │
│  ┌───────────────────────┐  │
│  │ Placeholder text      │  │
│  └───────────────────────┘  │
│  Helper text                │
└─────────────────────────────┘
```

**Spec:**
- Height: 44px (`h-11`)
- Padding: 12px 16px (`px-4 py-3`)
- Border radius: 8px (`rounded-md`)
- Background: `surface-elevated-1`
- Border: `border` (#404040)
- Focus border: `primary-500`

**States:**
| State | Border | Background |
|-------|--------|------------|
| Default | `border` | `surface-elevated-1` |
| Hover | `border-strong` | `surface-elevated-2` |
| Focus | `primary-500` | `surface-elevated-1` |
| Error | `destructive` | `destructive/10` |
| Disabled | `border-subtle` | `muted` |

### Select/Dropdown

```tsx
interface SelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}
```

**Spec:**
- Same dimensions as text input
- Chevron icon on right (20px)
- Dropdown: `surface-elevated-2`, `rounded-lg`, shadow

### Toggle/Switch

```
OFF: [○        ]
ON:  [        ●]
```

**Spec:**
- Track: 48×24px
- Thumb: 20×20px
- Track off: `muted`
- Track on: `primary-500`
- Thumb: `foreground`

### Slider

Used for mood ratings, energy levels.

**Spec:**
- Track height: 4px
- Thumb: 24×24px, `primary-500`
- Active track: `primary-500`
- Inactive track: `muted`

### Checkbox

**Spec:**
- Size: 24×24px
- Border radius: 4px
- Unchecked: `border`, transparent background
- Checked: `primary-500` background, white checkmark

---

## Navigation Components

### Bottom Tab Bar

```
┌─────────────────────────────────────────┐
│  [🏠]     [📊]     [💬]     [⚙️]       │
│  Home    Insights  Coach   Settings     │
└─────────────────────────────────────────┘
```

**Spec:**
- Height: 64px + safe area
- Background: `card`
- Border top: `border`
- Active icon: `primary-500`
- Inactive icon: `muted-foreground`
- Touch target: 44×44px per item

### Header/App Bar

```
┌─────────────────────────────────────────┐
│  [←]  Page Title                   [⋮]  │
└─────────────────────────────────────────┘
```

**Spec:**
- Height: 56px (`h-14`)
- Background: `background`
- Border bottom: `border`
- Title: `text-lg font-semibold`
- Back button: 44×44px touch target

### Segmented Control

```
┌─────────────────────────────────────────┐
│  [Day]  [Week]  [Month]  [Year]         │
└─────────────────────────────────────────┘
```

**Spec:**
- Background: `muted`
- Active segment: `card`
- Border radius: 8px (container), 6px (segments)
- Height: 36px
- Padding: 4px (container)

---

## Feedback Components

### Toast Notifications

```
┌─────────────────────────────────────────┐
│  ✓  Meal logged successfully            │
└─────────────────────────────────────────┘
```

**Spec:**
- Position: Bottom, 16px from edges
- Background: `card`
- Border radius: 12px
- Padding: 16px
- Duration: 3-5 seconds
- Variants: success, error, warning, info

**Colors:**
| Variant | Icon Color | Background |
|---------|------------|------------|
| Success | `success` | `card` |
| Error | `destructive` | `card` |
| Warning | `warning` | `card` |
| Info | `info` | `card` |

### Loading States

#### Spinner
- Size: 20px (default), 16px (small), 32px (large)
- Color: `primary-500` or current text color
- Animation: 1s linear infinite rotation

#### Skeleton
- Background: Linear gradient animation
- Colors: `muted` to `surface-elevated-2`
- Border radius: Match component shape

#### Progress Ring
- Size: Varies (64px for dashboard, 40px for compact)
- Track: `muted` 4px stroke
- Progress: Pillar color, animated fill

### Empty States

```
┌─────────────────────────────────────────┐
│                                         │
│            [Illustration]               │
│                                         │
│        No meals logged today            │
│                                         │
│        [Log Your First Meal]            │
│                                         │
└─────────────────────────────────────────┘
```

**Spec:**
- Centered layout
- Illustration: 120×120px max
- Title: `text-lg font-semibold`
- Description: `text-muted-foreground`
- CTA: Primary button

---

## Modal Components

### Bottom Sheet

```
┌─────────────────────────────────────────┐
│               ─────                     │  ← Handle
│                                         │
│  Sheet Title                            │
│                                         │
│  Content goes here                      │
│                                         │
│                                         │
│  [Primary Action]                       │
│                                         │
└─────────────────────────────────────────┘
```

**Spec:**
- Border radius: 16px top
- Handle: 32×4px, `muted-foreground`, centered
- Background: `card`
- Backdrop: Black 50% opacity
- Animation: Slide up 300ms ease-out
- Swipe to dismiss: Yes

### Dialog/Alert

```
┌─────────────────────────────────────────┐
│                                         │
│  Dialog Title                           │
│                                         │
│  Are you sure you want to delete        │
│  this entry?                            │
│                                         │
│  [Cancel]           [Delete]            │
│                                         │
└─────────────────────────────────────────┘
```

**Spec:**
- Max width: 320px (mobile), 400px (tablet+)
- Padding: 24px
- Border radius: 16px
- Background: `card`
- Backdrop: Black 50% opacity
- Actions: Right-aligned or stacked on mobile

---

## Data Visualization Components

### Progress Ring

```
     ╭──────╮
    │   85  │
    │Recovery│
     ╰──────╯
```

**Spec:**
- Default size: 120×120px
- Stroke width: 8px
- Track: `muted`
- Progress: Pillar color
- Text: Centered, metric + label
- Animation: Smooth fill on load

### Bar Chart

**Spec:**
- Bar width: 24px (mobile), 32px (desktop)
- Gap: 8px
- Colors: Pillar-specific
- Axis labels: `caption` size
- Grid lines: `border-subtle`

### Line Chart

**Spec:**
- Line: 2px stroke
- Colors: `primary-500` or pillar colors
- Points: 6px circles on data points
- Grid: `border-subtle`
- Axis: `muted-foreground` text

### Score Gauge

```
     ◠◡◠◡◠
       72
      Good
```

**Spec:**
- Arc: 180° or 270°
- Segments: Color-coded (red→yellow→green)
- Score: Large centered number
- Label: Below score

---

## Pillar-Specific Components

### Fitness Components

#### Strain Gauge
- Arc visualization
- 0-21 scale display
- Orange gradient

#### Activity Ring
- Three concentric rings (Move, Exercise, Stand pattern)
- Orange primary color

### Nutrition Components

#### Macro Bar
```
Carbs  ████████░░░░░  156g / 200g
```
- Horizontal progress bars
- Green color scheme
- Labels: Macro name, current/goal

#### Meal Card
- Food photo thumbnail
- Meal name, time
- Calorie/macro summary
- Green accent

### Wellbeing Components

#### Mood Slider
```
😢  ●─────────────●  😊
     1  2  3  4  5
```
- Emoji anchors
- Soft blue accent
- Morphing animation on selection

#### Journal Entry Card
- Text preview
- Timestamp
- Mood indicator
- Soft blue accent

---

## Component States Summary

### Interactive States

| State | Visual Change |
|-------|---------------|
| Default | Base styling |
| Hover | Lighter background, cursor pointer |
| Focus | Ring outline (2px `primary-500`) |
| Active | Darker background |
| Disabled | 50% opacity, no cursor |
| Loading | Spinner overlay or skeleton |
| Error | Red border, error message |

### Focus Visible

All interactive components must show visible focus for keyboard navigation:

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

## Component Tokens Summary

### shadcn/ui Theme Variables

```css
:root {
  /* Backgrounds */
  --background: 0 0% 7%;
  --foreground: 0 0% 98%;
  --card: 0 0% 12%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 15%;
  --popover-foreground: 0 0% 98%;

  /* Primary */
  --primary: 187 100% 42%;
  --primary-foreground: 0 0% 98%;

  /* Secondary */
  --secondary: 0 0% 17%;
  --secondary-foreground: 0 0% 98%;

  /* Muted */
  --muted: 0 0% 17%;
  --muted-foreground: 0 0% 70%;

  /* Accent */
  --accent: 0 0% 17%;
  --accent-foreground: 0 0% 98%;

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;

  /* Border & Input */
  --border: 0 0% 25%;
  --input: 0 0% 25%;
  --ring: 187 100% 42%;

  /* Radius */
  --radius: 0.5rem;
}
```

---

*yHealth Component Library v1.0 | Built on shadcn/ui, optimized for dark mode*

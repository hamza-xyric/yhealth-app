# yHealth Home Page Design

> The primary dashboard experience for yHealth - delivering at-a-glance wellness insights with equal focus on Fitness, Nutrition, and Wellbeing.

---

## Overview

The Home Page is the heart of the yHealth experience. It provides users with an immediate understanding of their daily wellness status, personalized AI coaching insights, and quick access to logging actions.

### Design Goals

1. **Glanceable**: Users should understand their wellness status in under 3 seconds
2. **Equal Pillars**: Fitness, Nutrition, and Wellbeing receive equal visual weight
3. **Action-Oriented**: Clear pathways to log, check-in, and improve
4. **Warm & Supportive**: Encouraging tone, not clinical or judgmental
5. **Bevel-Inspired**: Clean dashboard aesthetic with progress rings and subtle animations

### Target User State

- **Primary**: Returning user with data (most common)
- **Secondary**: New user completing onboarding
- **Edge case**: User with partial data (some pillars empty)

---

## Page Layout

### Mobile Wireframe (375px width)

```
┌─────────────────────────────────────────┐
│  ▀▀▀▀▀▀▀▀▀ Status Bar ▀▀▀▀▀▀▀▀▀        │
├─────────────────────────────────────────┤
│                                         │
│  Good morning, Alex              [👤]   │  ← Header
│  Tuesday, December 7                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│              ╭──────╮                   │
│             │   78  │                   │  ← Overall Score
│             │ Today │                   │
│              ╰──────╯                   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────┐    ┌───────────┐        │
│  │  FITNESS  │    │ NUTRITION │        │  ← Pillar Cards
│  │           │    │           │        │     (2-column)
│  │    85     │    │    72     │        │
│  │   ○───○   │    │   ○───○   │        │
│  │  +12%     │    │  -5%      │        │
│  └───────────┘    └───────────┘        │
│                                         │
│  ┌───────────────────────────────┐     │
│  │         WELLBEING             │     │  ← Wellbeing Card
│  │            78                 │     │     (full width)
│  │           ○───○               │     │
│  │          Stable               │     │
│  └───────────────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  💡 Coach Insight                       │  ← AI Insight
│  ─────────────────────────────────      │
│  Your workouts are 40% more             │
│  effective after 7+ hours of sleep.     │
│  Last night: 6h 45m.                    │
│                                         │
│  [Learn More]                           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Quick Actions                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │  ← Action Pills
│  │Check │ │ Log  │ │ Log  │ │ Log  │  │
│  │ In   │ │Meal  │ │Workout│ │Mood  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Today's Activity                       │  ← Activity Feed
│  ─────────────────────────────────      │
│  🏃 Morning Run · 5.2km · 8:30am        │
│  🥗 Lunch logged · 650 cal · 12:45pm    │
│  😊 Mood: Good · 2:00pm                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  [🏠]    [📊]    [💬]    [⚙️]          │  ← Tab Bar
│  Home   Insights  Coach  Settings       │
│                                         │
└─────────────────────────────────────────┘
```

---

## Section Specifications

### 1. Header Section

The header establishes context and personalization.

#### Layout
```
┌─────────────────────────────────────────┐
│                                         │
│  Good morning, Alex              [👤]   │
│  Tuesday, December 7                    │
│                                         │
└─────────────────────────────────────────┘
```

#### Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Container height | 80px | `h-20` |
| Horizontal padding | 16px | `px-4` |
| Top padding | 16px (after safe area) | `pt-4` |
| Greeting | 28px, Bold | `text-2xl font-bold` |
| Date | 14px, Muted | `text-sm text-muted-foreground` |
| Avatar | 40px circle | `h-10 w-10 rounded-full` |

#### Greeting Logic

| Time Range | Greeting |
|------------|----------|
| 5:00 - 11:59 | Good morning |
| 12:00 - 16:59 | Good afternoon |
| 17:00 - 20:59 | Good evening |
| 21:00 - 4:59 | Good night |

#### Implementation

```tsx
<header className="h-20 px-4 pt-4 flex items-start justify-between">
  <div>
    <h1 className="text-2xl font-bold text-foreground">
      Good morning, Alex
    </h1>
    <p className="text-sm text-muted-foreground mt-1">
      Tuesday, December 7
    </p>
  </div>
  <button className="h-10 w-10 rounded-full bg-card overflow-hidden">
    <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
  </button>
</header>
```

---

### 2. Overall Wellness Score

A hero element showing the combined daily wellness score.

#### Layout
```
              ╭──────────╮
             │           │
             │    78     │
             │   Today   │
             │           │
              ╰──────────╯
```

#### Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Container padding | 24px top, 16px bottom | `pt-6 pb-4` |
| Ring size | 120x120px | `h-30 w-30` |
| Ring stroke | 8px | custom SVG |
| Ring track | `#2C2C2C` (muted) | — |
| Ring progress | `#00BCD4` (primary) | — |
| Score text | 48px, Bold | `text-5xl font-bold` |
| Label text | 14px, Muted | `text-sm text-muted-foreground` |

#### Score Calculation

```
Overall Score = (Fitness × 0.33) + (Nutrition × 0.33) + (Wellbeing × 0.34)
```

#### Implementation

```tsx
<section className="pt-6 pb-4 flex justify-center">
  <div className="relative h-30 w-30">
    {/* Background ring */}
    <svg className="absolute inset-0" viewBox="0 0 120 120">
      <circle
        cx="60" cy="60" r="54"
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth="8"
      />
      <circle
        cx="60" cy="60" r="54"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
        strokeDasharray="339.3"
        strokeDashoffset={339.3 * (1 - score / 100)}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        className="transition-all duration-500 ease-out"
      />
    </svg>
    {/* Center content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-5xl font-bold tabular-nums text-foreground">
        {score}
      </span>
      <span className="text-sm text-muted-foreground">Today</span>
    </div>
  </div>
</section>
```

---

### 3. Three Pillar Cards

Equal-weight cards for Fitness, Nutrition, and Wellbeing.

#### Layout Pattern

```
┌───────────────┐    ┌───────────────┐
│    FITNESS    │    │   NUTRITION   │
│               │    │               │
│      85       │    │      72       │
│     ○───○     │    │     ○───○     │
│    ▲ +12%     │    │    ▼ -5%      │
└───────────────┘    └───────────────┘

┌───────────────────────────────────────┐
│              WELLBEING                │
│                 78                    │
│               ○───○                   │
│              → Stable                 │
└───────────────────────────────────────┘
```

#### Grid Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Container padding | 16px horizontal | `px-4` |
| Grid gap | 16px | `gap-4` |
| Grid columns | 2 for Fitness/Nutrition | `grid-cols-2` |
| Wellbeing span | Full width | `col-span-2` |

#### Pillar Card Component

##### Props

```tsx
interface PillarCardProps {
  pillar: 'fitness' | 'nutrition' | 'wellbeing';
  score: number;
  trend: {
    direction: 'up' | 'down' | 'stable';
    value: string;
  };
  onPress: () => void;
}
```

##### Visual Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Background | `#1E1E1E` | `bg-card` |
| Border radius | 12px | `rounded-lg` |
| Padding | 20px | `p-5` |
| Min height | 140px | `min-h-[140px]` |
| Pillar label | 11px, Bold, Uppercase | `text-xs font-bold uppercase tracking-widest` |
| Score | 40px, Bold | `text-4xl font-bold tabular-nums` |
| Trend | 12px | `text-xs` |
| Progress ring | 48px diameter | `h-12 w-12` |

##### Pillar Colors

| Pillar | Label Color | Ring Color | Trend Up | Trend Down |
|--------|-------------|------------|----------|------------|
| Fitness | `#FFB74D` | `#FF9800` | `#81C784` | `#E57373` |
| Nutrition | `#81C784` | `#4CAF50` | `#81C784` | `#E57373` |
| Wellbeing | `#64B5F6` | `#5C9CE6` | `#81C784` | `#E57373` |

##### Implementation

```tsx
const pillarColors = {
  fitness: {
    label: 'text-fitness-300',
    ring: 'stroke-fitness-500',
  },
  nutrition: {
    label: 'text-nutrition-300',
    ring: 'stroke-nutrition-500',
  },
  wellbeing: {
    label: 'text-wellbeing-300',
    ring: 'stroke-wellbeing-500',
  },
};

<button
  onClick={onPress}
  className={cn(
    "bg-card rounded-lg p-5 min-h-[140px]",
    "flex flex-col justify-between",
    "transition-transform duration-150 ease-out active:scale-[0.98]",
    pillar === 'wellbeing' && "col-span-2"
  )}
>
  {/* Pillar label */}
  <span className={cn(
    "text-xs font-bold uppercase tracking-widest",
    pillarColors[pillar].label
  )}>
    {pillar}
  </span>

  {/* Score and ring */}
  <div className="flex items-center justify-between mt-3">
    <div>
      <span className="text-4xl font-bold tabular-nums text-foreground">
        {score}
      </span>
      <div className={cn(
        "text-xs mt-1 flex items-center gap-1",
        trend.direction === 'up' && "text-success",
        trend.direction === 'down' && "text-destructive",
        trend.direction === 'stable' && "text-muted-foreground"
      )}>
        {trend.direction === 'up' && <ArrowUp className="h-3 w-3" />}
        {trend.direction === 'down' && <ArrowDown className="h-3 w-3" />}
        {trend.direction === 'stable' && <Minus className="h-3 w-3" />}
        {trend.value}
      </div>
    </div>

    {/* Progress ring */}
    <ProgressRing
      value={score}
      size="sm"
      className={pillarColors[pillar].ring}
    />
  </div>
</button>
```

##### Full Grid Implementation

```tsx
<section className="px-4">
  <div className="grid grid-cols-2 gap-4">
    <PillarCard
      pillar="fitness"
      score={85}
      trend={{ direction: 'up', value: '+12% from yesterday' }}
      onPress={() => navigate('/fitness')}
    />
    <PillarCard
      pillar="nutrition"
      score={72}
      trend={{ direction: 'down', value: '-5% from yesterday' }}
      onPress={() => navigate('/nutrition')}
    />
    <PillarCard
      pillar="wellbeing"
      score={78}
      trend={{ direction: 'stable', value: 'Stable' }}
      onPress={() => navigate('/wellbeing')}
    />
  </div>
</section>
```

---

### 4. AI Coach Insight Card

Personalized insight from the AI coach.

#### Layout

```
┌─────────────────────────────────────────┐
│                                         │
│  💡 Coach Insight                       │
│                                         │
│  Your workouts are 40% more             │
│  effective after 7+ hours of sleep.     │
│  Last night you got 6h 45m.             │
│                                         │
│  [Learn More]                           │
│                                         │
└─────────────────────────────────────────┘
```

#### Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Container margin | 24px top | `mt-6` |
| Horizontal padding | 16px | `px-4` |
| Card background | `#1E1E1E` | `bg-card` |
| Border radius | 12px | `rounded-lg` |
| Card padding | 20px | `p-5` |
| Icon | 20px, Primary teal | `h-5 w-5 text-primary` |
| Title | 16px, Semibold | `text-base font-semibold` |
| Message | 14px, Secondary | `text-sm text-muted-foreground` |
| CTA | Ghost button | `variant="ghost"` |

#### Left Accent Variant (Optional)

```css
/* Teal left border accent */
.insight-card {
  border-left: 3px solid hsl(var(--primary));
}
```

#### Implementation

```tsx
<section className="mt-6 px-4">
  <div className="bg-card rounded-lg p-5 border-l-3 border-primary">
    {/* Header */}
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="h-5 w-5 text-primary" />
      <span className="text-base font-semibold text-foreground">
        Coach Insight
      </span>
    </div>

    {/* Message */}
    <p className="text-sm text-muted-foreground leading-relaxed">
      Your workouts are 40% more effective after 7+ hours of sleep.
      Last night you got 6h 45m.
    </p>

    {/* CTA */}
    <button className="mt-4 text-sm font-medium text-primary hover:text-primary-400 transition-colors">
      Learn More
    </button>
  </div>
</section>
```

---

### 5. Quick Actions Section

Horizontal scrollable action pills for common tasks.

#### Layout

```
Quick Actions
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 📝   │ │ 🍽️   │ │ 🏃   │ │ 😊   │
│Check │ │ Log  │ │ Log  │ │ Log  │
│ In   │ │ Meal │ │Workout│ │ Mood │
└──────┘ └──────┘ └──────┘ └──────┘
```

#### Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Section margin | 24px top | `mt-6` |
| Section title | 16px, Semibold | `text-base font-semibold` |
| Title padding | 16px horizontal | `px-4` |
| Pills container | Horizontal scroll | `overflow-x-auto` |
| Pills gap | 12px | `gap-3` |
| Pill padding | 16px container | `pl-4 pr-4` |

#### Action Pill Component

| Element | Spec | Tailwind |
|---------|------|----------|
| Background | `#2C2C2C` | `bg-muted` |
| Border radius | 12px | `rounded-lg` |
| Padding | 16px | `p-4` |
| Min width | 80px | `min-w-[80px]` |
| Icon | 24px | `h-6 w-6` |
| Label | 12px | `text-xs` |
| Touch target | 44px min | `min-h-11` |

#### Check-in Highlight

When daily check-in is incomplete, highlight the check-in pill:

```tsx
<button className={cn(
  "p-4 rounded-lg min-w-[80px] min-h-11",
  isCheckInComplete ? "bg-muted" : "bg-primary/10 border border-primary"
)}>
```

#### Implementation

```tsx
const quickActions = [
  { id: 'checkin', icon: ClipboardCheck, label: 'Check In', route: '/checkin' },
  { id: 'meal', icon: Utensils, label: 'Log Meal', route: '/nutrition/log' },
  { id: 'workout', icon: Dumbbell, label: 'Log Workout', route: '/fitness/log' },
  { id: 'mood', icon: Smile, label: 'Log Mood', route: '/wellbeing/mood' },
];

<section className="mt-6">
  <h2 className="text-base font-semibold text-foreground px-4 mb-3">
    Quick Actions
  </h2>
  <div className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-3 px-4">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => navigate(action.route)}
          className={cn(
            "flex flex-col items-center justify-center",
            "p-4 rounded-lg min-w-[80px] min-h-11",
            "transition-transform duration-150 ease-out active:scale-[0.98]",
            action.id === 'checkin' && !isCheckInComplete
              ? "bg-primary/10 border border-primary"
              : "bg-muted"
          )}
        >
          <action.icon className="h-6 w-6 text-foreground mb-2" />
          <span className="text-xs text-muted-foreground">{action.label}</span>
        </button>
      ))}
    </div>
  </div>
</section>
```

---

### 6. Today's Activity Summary

A compact feed of today's logged activities.

#### Layout

```
Today's Activity
─────────────────────────────────
🏃 Morning Run · 5.2km · 8:30am
🥗 Lunch logged · 650 cal · 12:45pm
😊 Mood: Good · 2:00pm
```

#### Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Section margin | 24px top | `mt-6` |
| Horizontal padding | 16px | `px-4` |
| Section title | 16px, Semibold | `text-base font-semibold` |
| List gap | 0 (use dividers) | `divide-y divide-border` |
| Item padding | 16px vertical | `py-4` |
| Icon | 16px | `h-4 w-4` |
| Activity text | 14px | `text-sm` |
| Timestamp | 12px, Muted | `text-xs text-muted-foreground` |

#### Activity Item Colors

| Activity Type | Icon | Color |
|---------------|------|-------|
| Workout | Running, Dumbbell | `text-fitness-500` |
| Meal | Utensils | `text-nutrition-500` |
| Mood | Smile | `text-wellbeing-500` |
| Sleep | Moon | `text-wellbeing-500` |

#### Implementation

```tsx
interface Activity {
  id: string;
  type: 'workout' | 'meal' | 'mood' | 'sleep';
  title: string;
  detail: string;
  timestamp: string;
}

const activityIcons = {
  workout: { icon: Dumbbell, color: 'text-fitness-500' },
  meal: { icon: Utensils, color: 'text-nutrition-500' },
  mood: { icon: Smile, color: 'text-wellbeing-500' },
  sleep: { icon: Moon, color: 'text-wellbeing-500' },
};

<section className="mt-6 px-4 pb-24">
  <h2 className="text-base font-semibold text-foreground mb-3">
    Today's Activity
  </h2>
  <div className="divide-y divide-border">
    {activities.map((activity) => {
      const { icon: Icon, color } = activityIcons[activity.type];
      return (
        <div key={activity.id} className="py-4 flex items-center gap-3">
          <Icon className={cn("h-4 w-4", color)} />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate">
              {activity.title}
              <span className="text-muted-foreground"> · {activity.detail}</span>
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {activity.timestamp}
          </span>
        </div>
      );
    })}
  </div>
</section>
```

---

### 7. Bottom Tab Navigation

Fixed bottom navigation bar.

#### Layout

```
┌─────────────────────────────────────────┐
│                                         │
│  [🏠]    [📊]    [💬]    [⚙️]          │
│  Home   Insights  Coach  Settings       │
│                                         │
└─────────────────────────────────────────┘
```

#### Specifications

| Element | Spec | Tailwind |
|---------|------|----------|
| Position | Fixed bottom | `fixed bottom-0 left-0 right-0` |
| Height | 64px + safe area | `h-16` |
| Background | `#1E1E1E` | `bg-card` |
| Border top | `#404040` | `border-t border-border` |
| Z-index | 30 | `z-30` |
| Safe area padding | env(safe-area-inset-bottom) | `pb-safe` |

#### Tab Item

| Element | Spec | Tailwind |
|---------|------|----------|
| Touch target | 44x44px min | `min-h-11 min-w-11` |
| Icon | 24px | `h-6 w-6` |
| Label | 10px | `text-[10px]` |
| Active color | `#00BCD4` | `text-primary` |
| Inactive color | `#757575` | `text-muted-foreground` |

#### Implementation

```tsx
const tabs = [
  { id: 'home', icon: Home, label: 'Home', route: '/' },
  { id: 'insights', icon: BarChart2, label: 'Insights', route: '/insights' },
  { id: 'coach', icon: MessageCircle, label: 'Coach', route: '/coach' },
  { id: 'settings', icon: Settings, label: 'Settings', route: '/settings' },
];

<nav className="fixed bottom-0 left-0 right-0 z-30 h-16 bg-card border-t border-border pb-safe">
  <div className="flex justify-around items-center h-full px-4">
    {tabs.map((tab) => {
      const isActive = currentRoute === tab.route;
      return (
        <button
          key={tab.id}
          onClick={() => navigate(tab.route)}
          className={cn(
            "min-h-11 min-w-11 flex flex-col items-center justify-center",
            "transition-colors duration-150"
          )}
        >
          <tab.icon className={cn(
            "h-6 w-6",
            isActive ? "text-primary" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-[10px] mt-1",
            isActive ? "text-primary font-medium" : "text-muted-foreground"
          )}>
            {tab.label}
          </span>
        </button>
      );
    })}
  </div>
</nav>
```

---

## Progress Ring Component

Reusable progress ring for scores and metrics.

### Props

```tsx
interface ProgressRingProps {
  value: number;           // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: string;          // Tailwind stroke class
  trackColor?: string;
  strokeWidth?: number;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}
```

### Size Variants

| Size | Dimensions | Stroke | Value Font |
|------|------------|--------|------------|
| `sm` | 48x48px | 4px | 16px |
| `md` | 80x80px | 6px | 24px |
| `lg` | 120x120px | 8px | 48px |

### Implementation

```tsx
const sizes = {
  sm: { dim: 48, stroke: 4, radius: 20, font: 'text-base' },
  md: { dim: 80, stroke: 6, radius: 34, font: 'text-2xl' },
  lg: { dim: 120, stroke: 8, radius: 54, font: 'text-5xl' },
};

export function ProgressRing({
  value,
  size = 'md',
  color = 'stroke-primary',
  trackColor = 'stroke-muted',
  showValue = false,
  animated = true,
  className,
}: ProgressRingProps) {
  const { dim, stroke, radius, font } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className={cn("relative", className)} style={{ width: dim, height: dim }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${dim} ${dim}`}>
        {/* Track */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          className={trackColor}
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          className={cn(color, animated && "transition-all duration-500 ease-out")}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(font, "font-bold tabular-nums text-foreground")}>
            {value}
          </span>
        </div>
      )}
    </div>
  );
}
```

---

## Animation Specifications

### Page Load Sequence

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Header | Fade in | 200ms | 0ms |
| 2 | Overall Score | Fade in + Scale | 300ms | 100ms |
| 3 | Score Ring | Fill animation | 500ms | 200ms |
| 4 | Fitness Card | Slide up + Fade | 200ms | 250ms |
| 5 | Nutrition Card | Slide up + Fade | 200ms | 300ms |
| 6 | Wellbeing Card | Slide up + Fade | 200ms | 350ms |
| 7 | Insight Card | Slide up + Fade | 200ms | 400ms |
| 8 | Quick Actions | Fade in | 200ms | 450ms |
| 9 | Activity Feed | Fade in | 200ms | 500ms |

### Framer Motion Implementation

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.2, 1], // ease-out
    },
  },
};

<motion.main
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.section variants={itemVariants}>
    <Header />
  </motion.section>
  <motion.section variants={itemVariants}>
    <OverallScore />
  </motion.section>
  {/* ... */}
</motion.main>
```

### Micro-Interactions

#### Card Press

```tsx
<motion.button
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15, ease: 'easeOut' }}
>
```

#### Score Update

```tsx
// Animate number changes
<motion.span
  key={score}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
  {score}
</motion.span>
```

---

## States

### Loading State

Display skeleton placeholders matching the layout.

```tsx
<div className="animate-pulse">
  {/* Header skeleton */}
  <div className="h-20 px-4 pt-4">
    <div className="h-7 w-48 bg-muted rounded" />
    <div className="h-4 w-32 bg-muted rounded mt-2" />
  </div>

  {/* Score skeleton */}
  <div className="pt-6 pb-4 flex justify-center">
    <div className="h-30 w-30 rounded-full bg-muted" />
  </div>

  {/* Cards skeleton */}
  <div className="px-4 grid grid-cols-2 gap-4">
    <div className="h-[140px] bg-muted rounded-lg" />
    <div className="h-[140px] bg-muted rounded-lg" />
    <div className="h-[140px] bg-muted rounded-lg col-span-2" />
  </div>
</div>
```

### Empty State (New User)

When no data exists yet.

```tsx
<section className="px-4 py-12 text-center">
  <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
    <Sparkles className="h-12 w-12 text-primary" />
  </div>
  <h2 className="text-xl font-semibold text-foreground mb-2">
    Welcome to yHealth!
  </h2>
  <p className="text-sm text-muted-foreground mb-6 max-w-[280px] mx-auto">
    Complete your first check-in to start tracking your wellness journey.
  </p>
  <Button variant="primary" size="lg">
    Start Check-in
  </Button>
</section>
```

### Partial Data State

When some pillars have data, others don't.

```tsx
// Show score if available, otherwise show prompt
{pillarData ? (
  <span className="text-4xl font-bold">{pillarData.score}</span>
) : (
  <span className="text-sm text-muted-foreground">Tap to log</span>
)}
```

### Error State

```tsx
<section className="px-4 py-12 text-center">
  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
  <h2 className="text-lg font-semibold text-foreground mb-2">
    Couldn't load your data
  </h2>
  <p className="text-sm text-muted-foreground mb-4">
    Please check your connection and try again.
  </p>
  <Button variant="secondary" onClick={refetch}>
    Try Again
  </Button>
</section>
```

### Pull to Refresh

```tsx
// Using react-native or similar
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      tintColor="#00BCD4"
    />
  }
>
```

---

## Accessibility

### Semantic Structure

```tsx
<main role="main" aria-label="Home Dashboard">
  <header aria-label="User greeting">...</header>
  <section aria-label="Overall wellness score">...</section>
  <section aria-label="Health pillars">...</section>
  <section aria-label="AI coach insight">...</section>
  <section aria-label="Quick actions">...</section>
  <section aria-label="Today's activities">...</section>
  <nav role="navigation" aria-label="Main navigation">...</nav>
</main>
```

### Progress Ring Accessibility

```tsx
<div
  role="progressbar"
  aria-valuenow={score}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`${pillar} score: ${score} out of 100`}
>
```

### Touch Targets

All interactive elements must be at least 44x44px:

```tsx
<button className="min-h-11 min-w-11 p-3">
```

### Reduced Motion

```tsx
// Check user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Disable animations
<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
>
```

### Color Independence

- All scores shown as numbers, not just colors
- Trend arrows + text labels (not just icons)
- Progress rings include numeric value

---

## Responsive Considerations

### Tablet (768px+)

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
  <PillarCard pillar="fitness" />
  <PillarCard pillar="nutrition" />
  <PillarCard pillar="wellbeing" />
</div>
```

### Large Phone (>400px width)

- Increase card padding: `p-5 sm:p-6`
- Larger score fonts: `text-4xl sm:text-5xl`

---

## Complete Page Implementation

```tsx
export default function HomePage() {
  const { user, scores, insights, activities, isLoading } = useHomeData();

  if (isLoading) return <HomePageSkeleton />;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <Header user={user} />

      {/* Overall Score */}
      <OverallScoreSection score={scores.overall} />

      {/* Pillar Cards */}
      <section className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <PillarCard
            pillar="fitness"
            score={scores.fitness.value}
            trend={scores.fitness.trend}
          />
          <PillarCard
            pillar="nutrition"
            score={scores.nutrition.value}
            trend={scores.nutrition.trend}
          />
          <PillarCard
            pillar="wellbeing"
            score={scores.wellbeing.value}
            trend={scores.wellbeing.trend}
          />
        </div>
      </section>

      {/* AI Insight */}
      <InsightCard insight={insights[0]} />

      {/* Quick Actions */}
      <QuickActionsSection />

      {/* Activity Feed */}
      <ActivityFeed activities={activities} />

      {/* Tab Bar */}
      <BottomTabBar activeTab="home" />
    </div>
  );
}
```

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-07 | Initial home page design specification |

---

*yHealth Home Page Design v1.0 | Bevel-inspired dashboard for three-pillar wellness tracking*

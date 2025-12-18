# yHealth Platform - Product Pillars

> **Source:** Product Requirements Document v4.1, Section 5

---

## Three Equal Pillars Philosophy

yHealth treats **Physical Fitness, Nutrition, and Daily Wellbeing** as equal pillars - never positioning one as primary or another as afterthought. This enables cross-domain insights impossible for specialist apps.

---

## Epic Structure

### Foundation Layer

| Epic | Name | Features | Description |
|------|------|----------|-------------|
| **E1** | Onboarding & Assessment | 6 | Account creation, flexible assessment, plan generation |

### Interaction Channels

| Epic | Name | Features | Description |
|------|------|----------|-------------|
| **E2** | Voice Coaching | 6 | AI calls, scheduled/on-demand, emotional intelligence |
| **E3** | WhatsApp Integration | 7 | 24/7 chat, quick logs, photo analysis, voice messages |
| **E4** | Mobile App | 7 | Dashboard, visualization, journal hub, goal tracking |

### Three Equal Pillars

| Epic | Name | Features | Description |
|------|------|----------|-------------|
| **E5** | Fitness Pillar | 6 | Activity, sleep, recovery, fitness goals |
| **E6** | Nutrition Pillar | 6 | Meal logging, calories/macros, hydration, AI coaching |
| **E7** | Wellbeing Pillar | 7 | Mood check-ins, journaling, habits, energy tracking |

### Intelligence Layer

| Epic | Name | Features | Description |
|------|------|----------|-------------|
| **E8** | Cross-Domain Intelligence | 8 | Mood-performance, nutrition-energy, sleep-wellbeing correlations |
| **E9** | Data Integrations | 10 | WHOOP, Apple Health, Google Fit, Fitbit, Garmin, Oura, etc. |
| **E10** | Analytics & Insights Dashboard | 20 | Personalized feed, three-pillar harmony, pattern alerts |

---

## Pillar Details

### Fitness Pillar (E5)

**Core Capabilities:**
- Activity tracking and monitoring
- Sleep quality analysis
- Recovery assessment
- Fitness goal setting and tracking
- Workout recommendations
- Performance trends

**Key Metrics:**
- Steps, active minutes, calories burned
- Sleep duration, stages, quality score
- Recovery score, readiness
- Strain/training load

---

### Nutrition Pillar (E6)

**Core Capabilities:**
- Meal logging (photo AI + manual)
- Calorie and macro tracking
- Hydration monitoring
- AI nutrition coaching
- Dietary pattern analysis
- Nutrition goal setting

**Key Metrics:**
- Calories (intake vs target)
- Macros (protein, carbs, fat)
- Hydration levels
- Meal timing patterns

---

### Wellbeing Pillar (E7)

**Core Capabilities:**
- Mood check-ins (emoji to detailed)
- Journaling (Light/Deep modes)
- Habit formation and tracking
- Energy level monitoring
- Stress pattern detection
- Emotional trend analysis

**Key Metrics:**
- Mood scores and patterns
- Energy levels throughout day
- Habit completion rates
- Journal engagement
- Stress indicators

---

## Cross-Domain Insights (E8)

**"Unimaginable Insights" Framework:**

| Category | Example | Why It's Unimaginable |
|----------|---------|----------------------|
| **Predictive** | "You'll likely feel low energy tomorrow" | No emotional prediction in competitors |
| **Correlational** | "Best workouts happen when you journal in morning" | No journaling correlation available |
| **Actionable** | "A 10-min walk would boost afternoon energy" | No real-time coaching elsewhere |

**Cross-Pillar Connections:**
- Mood → Workout Performance
- Nutrition → Energy Levels
- Sleep → Wellbeing and Recovery
- Habits → All pillars

---

## Epic Dependencies

```
E1: Onboarding (Foundation)
    │
    ├── E2: Voice ──┐
    ├── E3: WhatsApp │── Channels (can be parallel)
    └── E4: Mobile ──┘
           │
    ┌──────┴──────┐
    │             │
    E5-E7: Three Pillars (can be parallel)
           │
           ▼
    E8: Cross-Domain Intelligence
           │
           ▼
    E9: Data Integrations
           │
           ▼
    E10: Analytics Dashboard (USP)
```

---

## Using Pillars in Documents

When referencing pillars:
- Use "Physical Fitness" or "Fitness Pillar" (not just "fitness")
- Use "Daily Wellbeing" or "Wellbeing Pillar" (not "mental health")
- Always emphasize equality: "three equal pillars"
- Highlight cross-domain value in insights

---

*Extracted from PRD v4.1, Section 5*

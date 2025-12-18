# yHealth Platform - Terminology

> **Source:** Executive Vision Document + PRD + Epic PRDs

---

## Core Product Terms

| Term | Definition | Usage Notes |
|------|------------|-------------|
| **AI Life Coach** | yHealth's primary identity - an AI companion that helps users achieve life goals | Preferred term over "health coach" or "wellness app" |
| **Second Mind** | Aspirational state where yHealth knows users better than they know themselves | Used in vision/marketing, not features |
| **Three Equal Pillars** | Fitness, Nutrition, and Wellbeing treated with equal importance | Always emphasize "equal" - never position one as primary |
| **Invisible Intelligence** | AI complexity hidden from user, delivering simple actionable guidance | Core principle for AI design |
| **Visible Coaching** | User-facing conversational guidance delivered via Voice/WhatsApp/App | Paired with "invisible intelligence" |

---

## Pillar Terminology

| Pillar | Full Name | Abbreviation | What It Covers |
|--------|-----------|--------------|----------------|
| **Fitness** | Physical Fitness Pillar | E5 | Activity, sleep, recovery, fitness goals |
| **Nutrition** | Nutrition Pillar | E6 | Meals, calories, macros, hydration |
| **Wellbeing** | Daily Wellbeing Pillar | E7 | Mood, journaling, habits, energy |

**Note:** Use "Daily Wellbeing" not "mental health" - yHealth is wellness coaching, not clinical care.

---

## Engagement Modes

| Term | Definition | Duration |
|------|------------|----------|
| **Light Mode** | Quick, low-friction engagement | 30 seconds - 2 minutes |
| **Deep Mode** | Comprehensive, detailed engagement | 10+ minutes |
| **User-Adaptive Flexibility** | System principle that both modes are equally valid | Design principle, not feature |

---

## Interaction Channels

| Channel | Full Name | Description |
|---------|-----------|-------------|
| **Voice Coaching** | Voice Coaching Channel (E2) | AI phone/voice calls with emotional intelligence |
| **WhatsApp** | WhatsApp Integration (E3) | Async chat, photo logs, voice messages |
| **Mobile App** | Mobile App Channel (E4) | Dashboard, visualization, journaling |

---

## Insight Terminology

| Term | Definition | Category |
|------|------------|----------|
| **Unimaginable Insight** | Cross-domain correlation users couldn't discover alone | Core USP |
| **Predictive Insight** | Forward-looking pattern-based coaching | E.g., "You'll likely feel low energy tomorrow" |
| **Correlational Insight** | Connection between multiple data points | E.g., "Best workouts when you journal first" |
| **Actionable Insight** | Real-time guidance based on current state | E.g., "A 10-min walk would help now" |
| **Aha Moment** | User's first experience of yHealth's unique value | First week goal |

---

## Metric Terms

| Metric | Definition | Source Pillars |
|--------|------------|----------------|
| **Recovery Score** | Daily readiness assessment | Fitness (with Wellbeing factor) |
| **Strain Score** | Training load measurement | Fitness |
| **Holistic Health Score** | Combined three-pillar score | Cross-domain (E8) |
| **Three-Pillar Harmony** | Balance visualization across pillars | Analytics (E10) |

---

## Persona References

| Code | Name | Quick Reference |
|------|------|-----------------|
| **P1** | Holistic Health Seeker | 40%, mixed mode, wants integration |
| **P2** | Busy Professional | 25%, light mode, time-constrained |
| **P3** | Optimization Enthusiast | 20%, deep mode, data-driven |
| **P4** | Habit Formation Seeker | 10%, light→deep, needs accountability |
| **P5** | Gentle Wellness Builder | 5%, always light, compassionate support |

---

## Epic References

| Code | Name | Quick Description |
|------|------|-------------------|
| **E1** | Onboarding & Assessment | Account creation, initial setup |
| **E2** | Voice Coaching | AI voice calls |
| **E3** | WhatsApp Integration | Chat channel |
| **E4** | Mobile App | Visual dashboard |
| **E5** | Fitness Pillar | Activity, sleep, recovery |
| **E6** | Nutrition Pillar | Meals, macros, hydration |
| **E7** | Wellbeing Pillar | Mood, journaling, habits |
| **E8** | Cross-Domain Intelligence | Correlations, predictions |
| **E9** | Data Integrations | Wearables, APIs |
| **E10** | Analytics Dashboard | Insights, visualization |

---

## Feature ID Format

**Pattern:** `F[Epic#].[Feature#]`

Examples:
- F5.1 = First feature in Fitness Pillar (E5)
- F8.3 = Third feature in Cross-Domain Intelligence (E8)

---

## Story ID Format

**Pattern:** `S[Epic#].[Feature#].[Story#]`

Examples:
- S5.1.1 = First story of first feature in Fitness Pillar
- S8.3.2 = Second story of third feature in Cross-Domain Intelligence

---

## Integration Terms

| Term | Definition |
|------|------------|
| **Golden Source** | Highest-priority data source for a given metric |
| **Data Sync** | Process of pulling data from external sources |
| **OAuth Flow** | Authentication process for connecting external services |
| **Backfill** | Fetching historical data after connection |

---

## MoSCoW Priority Terms

| Priority | Code | Meaning | Typical % |
|----------|------|---------|-----------|
| **Must Have** | P0 | MVP-critical, non-negotiable | ~60% |
| **Should Have** | P1 | Important but not launch-blocking | ~20% |
| **Could Have** | P2 | Nice-to-have if time permits | ~15% |
| **Won't Have** | P3 | Explicitly excluded from current scope | ~5% |

---

## Competitive Terms

| Term | Definition |
|------|------------|
| **Better Together** | yHealth's integration superiority positioning |
| **Specialist App** | Single-domain competitor (fitness-only, nutrition-only) |
| **Data Aggregator** | Passive dashboard competitor (Apple Health, Google Fit) |

---

*Compiled from all yHealth documentation*

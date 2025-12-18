# Epic 07: Wellbeing Pillar - User Stories

> **Epic:** E07 - Wellbeing Pillar
> **Source:** `prd-epics/PRD-Epic-07-Wellbeing-Pillar.md`
> **Created:** 2025-12-11
> **Stories:** 18 (18 Must Have)
> **Workflow:** EXPERT-13 Story Generator v3.0

---

## Story Index

| Story ID | Title | Feature | Priority | Status |
|----------|-------|---------|----------|--------|
| S07.1.1 | Mood Check-in Logging | F7.1 | P0 (Must) | Draft |
| S07.1.2 | Mood Timeline & Patterns | F7.1 | P0 (Must) | Draft |
| S07.4.1 | Energy Level Logging | F7.4 | P0 (Must) | Draft |
| S07.4.2 | Energy Pattern Analysis | F7.4 | P0 (Must) | Draft |
| S07.3.1 | Habit Creation & Configuration | F7.3 | P0 (Must) | Draft |
| S07.3.2 | Habit Logging & Streaks | F7.3 | P0 (Must) | Draft |
| S07.3.3 | Habit Correlation Insights | F7.3 | P0 (Must) | Draft |
| S07.2.1 | Journaling Prompt System | F7.2 | P0 (Must) | Draft |
| S07.2.2 | Journal Entry & Voice Input | F7.2 | P0 (Must) | Draft |
| S07.2.3 | Journal AI Personalization | F7.2 | P0 (Must) | Draft |
| S07.5.1 | Self-Report Stress Tracking | F7.5 | P0 (Must) | Draft |
| S07.5.2 | Multi-Signal Stress Detection | F7.5 | P0 (Must) | Draft |
| S07.5.3 | Stress Alerts & Interventions | F7.5 | P0 (Must) | Draft |
| S07.6.1 | Wellbeing Goal Setting | F7.6 | P0 (Must) | Draft |
| S07.6.2 | Routine Templates & Builder | F7.6 | P0 (Must) | Draft |
| S07.6.3 | Routine Tracking & Analytics | F7.6 | P0 (Must) | Draft |
| S07.7.1 | Mindfulness Practice Library | F7.7 | P0 (Must) | Draft |
| S07.7.2 | Context-Aware Recommendations | F7.7 | P0 (Must) | Draft |

---

## Dependency Diagram

```
PHASE 1: FOUNDATION (Sprint 1)
S07.1.1 (Mood Input) ──► S07.1.2 (Mood Patterns)
         │
S07.4.1 (Energy Input) ──► S07.4.2 (Energy Patterns)
         │                        │
         └────────────┬───────────┘
                      ▼
PHASE 2: CORE TRACKING (Sprint 2)
S07.3.1 (Habit Create) ──► S07.3.2 (Habit Log) ──► S07.3.3 (Habit Correlations)
                                                           │
S07.2.1 (Journal Prompts) ──► S07.2.2 (Journal Entry) ──► S07.2.3 (AI Personalization)
                                        │                          │
                                        └──────────┬───────────────┘
                                                   ▼
PHASE 3: INTELLIGENCE (Sprint 3)
S07.5.1 (Stress Self-Report) ──┬──► S07.5.2 (Multi-Signal)
                               │              │
S07.2.2 (Journal Entry) ───────┘              ▼
                                       S07.5.3 (Alerts)
                                              │
                                              ▼
PHASE 4: ENHANCEMENT (Sprint 4)
S07.6.1 (Goals) ──► S07.6.2 (Routines) ──► S07.6.3 (Routine Analytics)
S07.7.1 (Practice Library) ──► S07.7.2 (AI Recommendations)
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F7.1: Mood Check-ins | S07.1.1, S07.1.2 | 100% |
| F7.2: Daily Journaling | S07.2.1, S07.2.2, S07.2.3 | 100% |
| F7.3: Habit Tracking | S07.3.1, S07.3.2, S07.3.3 | 100% |
| F7.4: Energy Level Monitoring | S07.4.1, S07.4.2 | 100% |
| F7.5: Stress Pattern Detection | S07.5.1, S07.5.2, S07.5.3 | 100% |
| F7.6: Wellbeing Goals & Routines | S07.6.1, S07.6.2, S07.6.3 | 100% |
| F7.7: Mindfulness Recommendations | S07.7.1, S07.7.2 | 100% |

**Completeness Verification:** All 7 features mapped to 18 stories with 100% coverage.

---

## Implementation Phases

| Phase | Sprint | Stories | Deliverable |
|-------|--------|---------|-------------|
| 1: Foundation | Sprint 1 | S07.1.1, S07.1.2, S07.4.1, S07.4.2 | Mood and energy tracking operational |
| 2: Core Tracking | Sprint 2 | S07.3.1-3.3, S07.2.1-2.3 | Habit tracking and journaling system |
| 3: Intelligence | Sprint 3 | S07.5.1-5.3 | Multi-signal stress detection engine |
| 4: Enhancement | Sprint 4 | S07.6.1-6.3, S07.7.1-7.2 | Goals, routines, and mindfulness recommendations |

---

## Cross-Epic Dependencies

| Story | Depends On | Dependency Type | Status |
|-------|------------|-----------------|--------|
| S07.1.2 (Mood Patterns) | E5 (Sleep), E6 (Meals) | Cross-pillar correlations | Awaiting E8 |
| S07.2.3 (AI Personalization) | E5 (Sleep, Workouts) | Context for prompts | Awaiting E8 |
| S07.3.3 (Habit Correlations) | E5 (Sleep, Activity), E6 (Meals) | Habit-health correlations | Awaiting E8 |
| S07.4.2 (Energy Patterns) | E5 (Sleep), E6 (Meals) | Energy correlation engine | Awaiting E8 |
| S07.5.2 (Multi-Signal) | E9 (Wearable HRV/RHR) | Biometric stress signals | Awaiting E9 |
| S07.5.3 (Stress Alerts) | E2, E3 | Delivery via Voice/WhatsApp | E2, E3 Complete |
| All Display Stories | E4 | Mobile App UI components | E4 Complete |

**Feeds To:**
- **E5 (Fitness):** Mood, stress, energy, journaling → Mental Recovery Score (30% weight)
- **E8 (Cross-Domain Intelligence):** All wellbeing data for insights engine

---

## Competitive Advantage Summary

Epic 07 establishes yHealth's Daily Wellbeing Pillar with three critical differentiators that no competitor offers:

1. **Daily Wellbeing as Equal Pillar:** While WHOOP and BEVEL treat mental health as an afterthought (monthly surveys), yHealth treats Daily Wellbeing as an EQUAL pillar alongside Fitness and Nutrition with real-time tracking and cross-pillar correlations.

2. **Multi-Signal Stress Detection:** The ONLY platform combining self-reported stress ratings + biometric signals (HRV, RHR) + text sentiment analysis from journaling + app usage patterns for comprehensive stress awareness without requiring users to consciously report.

3. **Dual Recovery Score (Mental Component):** yHealth uniquely contributes mood, stress, energy, and journaling data to the Mental Recovery Score, enabling predictions like "Tomorrow's workout may suffer due to high stress today" - insights competitors cannot provide.

---

# FEATURE F7.1: MOOD CHECK-INS

---

## S07.1.1: Mood Check-in Logging

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** quickly log my mood multiple times per day through emoji or detailed ratings,
**So that** I can discover patterns between my emotional state and my physical health without mood tracking feeling like a chore.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Mood check-ins are designed to be the lowest-friction wellbeing input. Users can log their mood via a single emoji tap (Light mode) or multi-dimensional ratings (Deep mode). Check-ins are available across all channels: mobile app widget, WhatsApp quick reply, and voice coaching conversations.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Single emoji tap: 😊 Great, 😐 Okay, 😟 Low, 😡 Angry, 😰 Anxious, 😴 Tired. Optional one-word descriptor. 5-second interaction. |
| **Deep** | Multi-dimensional rating scales: Happiness (1-10), Energy (1-10), Stress (1-10), Anxiety (1-10). Emotion tags selection. Optional context note. 30-60 second interaction. |

**Emoji Selection (Light Mode):**
| Emoji | Mood Label | Description |
|-------|------------|-------------|
| 😊 | Great | Feeling positive, energized, happy |
| 😐 | Okay | Neutral, neither good nor bad |
| 😟 | Low | Feeling down, sad, or unmotivated |
| 😡 | Angry | Frustrated, irritated, upset |
| 😰 | Anxious | Worried, stressed, nervous |
| 😴 | Tired | Exhausted, fatigued, low energy |

**Emotion Tags (Deep Mode):**
Grateful, Frustrated, Excited, Anxious, Content, Overwhelmed, Peaceful, Irritated, Hopeful, Lonely, Confident, Sad, Energized, Calm (15+ tags available)

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Emoji | Enum | From 6 options | User-only |
| Happiness Rating | Integer 1-10 | Deep mode only | User-only |
| Energy Rating | Integer 1-10 | Deep mode only | User-only |
| Stress Rating | Integer 1-10 | Deep mode only | User-only |
| Anxiety Rating | Integer 1-10 | Deep mode only | User-only |
| Emotion Tags | Array<string> | From tag library | User-only |
| Context Note | String | Max 500 chars | User-only |
| Mode | Enum | light/deep | System |
| Channel | Enum | app/whatsapp/voice | System |
| Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Light mode accessible via home screen widget (1 tap to open, 1 tap to log)
- Deep mode accessible by expanding from Light mode or via wellbeing tab
- Check-ins not forced - user can dismiss prompts without negative feedback
- Non-judgmental: No mood is labeled "good" or "bad"
- Multiple check-ins per day accepted (morning, afternoon, evening encouraged)
- Mood data immediately available for Mental Recovery Score calculation

**Multi-Channel Support:**
- **Mobile App:** Emoji widget, tap to expand to Deep mode
- **WhatsApp:** "How's your mood?" message with emoji quick replies
- **Voice Coaching:** "How are you feeling today?" with spoken mood capture

### Acceptance Criteria

**AC1: Light Mode Emoji Selection**
Given the user opens the mood check-in in Light mode,
When they tap an emoji (😊 😐 😟 😡 😰 😴),
Then the mood is logged immediately with timestamp and channel.

**AC2: Deep Mode Multi-Dimensional Rating**
Given the user switches to Deep mode,
When they adjust Happiness, Energy, Stress, Anxiety sliders (1-10),
Then all four dimensions are captured with the check-in.

**AC3: Emotion Tag Selection**
Given the user is in Deep mode,
When they tap emotion tags (e.g., "Grateful", "Anxious"),
Then selected tags are attached to the mood record (multi-select allowed).

**AC4: Context Note Entry**
Given the user is in Deep mode,
When they enter text in "What's affecting your mood?" field,
Then the note (max 500 chars) is saved with the check-in.

**AC5: WhatsApp Mood Logging**
Given the user receives "How's your mood?" prompt on WhatsApp,
When they reply with an emoji (😊, 😐, etc.),
Then the mood is logged from WhatsApp channel.

**AC6: Voice Mood Logging**
Given the user is in a voice coaching session,
When they respond to "How are you feeling?" with "I'm feeling anxious",
Then the AI captures mood (anxious) from voice input.

**AC7: Check-in Frequency**
Given a user has logged mood earlier today,
When they open mood check-in again,
Then a new check-in is created (multiple per day allowed).

**AC8: Non-Judgmental Prompts**
Given the user logs any mood (including low/angry/anxious),
When the check-in saves,
Then no negative language is used - all moods are validated.

### Success Metrics
- Daily mood logging rate: 80% of active users log mood ≥1x/day
- Multi-check-in adoption: 50% of users log mood ≥2x/day
- Light mode usage: 70% of check-ins use Light mode (validates low friction)
- Deep mode engagement: 30% use Deep mode ≥1x/week (validates depth option)
- Average check-in time: <5 seconds for Light mode, <60 seconds for Deep mode

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Check-in save <1s | Auth required | Mood data user-only | Min 44x44pt touch targets | iOS 14+, Android 10+ |
| Widget load <500ms | Encrypted at rest | No mood sharing without consent | Color-blind safe emojis | WhatsApp, Voice channels |

### Dependencies
- **Prerequisite Stories:** None (foundation story)
- **Related Stories:** S07.1.2, S07.4.1, S07.5.1
- **External Dependencies:** E4 (Mobile App widget), E3 (WhatsApp integration), E2 (Voice coaching)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Missed morning check-in | Gentle reminder at 11am: "Haven't heard from you today. Quick mood check?" |
| Multiple contradictory moods (😊 then 😟 within 1 hour) | Accept both; flag mood volatility for pattern detection (silent) |
| Context note contains crisis keywords | Trigger escalation protocol per PRD Section 14 (resources shown) |
| No mood logging for 3+ days | Re-engagement: "Missed you! Everything okay? Even 'I'm busy' helps me understand." |
| Offline check-in | Queue locally; sync when reconnected (confirmation shown) |
| WhatsApp reply with non-emoji text | Parse sentiment: "I'm feeling good" → 😊; if unclear, ask follow-up |

### Open Questions
- Should we show mood check-in streak counts (gamification)?
- What's the optimal prompt timing for morning/evening check-ins?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Light mode emoji check-in functional across app/WhatsApp/voice
- [ ] Deep mode multi-dimensional rating working
- [ ] Emotion tags selectable (15+ tags)
- [ ] Context note field functional
- [ ] Mood data feeds Mental Recovery Score (S05.3.1)
- [ ] Performance requirements verified (<1s save, <500ms widget load)
- [ ] Accessibility requirements verified (touch targets, color contrast)

---

## S07.1.2: Mood Timeline & Patterns

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** visualize my mood patterns across days, weeks, and months and discover correlations with other health factors,
**So that** I can understand what influences my emotional state and make data-driven lifestyle adjustments.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users can view their mood history as a visual timeline, revealing patterns across time. Cross-pillar correlations show how mood connects to sleep, workouts, meals, and habits - the "aha moments" that differentiate yHealth from competitors.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | 7-day mood summary with simple trend indicator (↑ improving, ↓ declining, → stable). "Your week at a glance" view. |
| **Deep** | Full mood timeline (day/week/month views), correlation insights, mood volatility analysis, export capability, historical comparisons. |

**Timeline Visualizations:**
- **Daily View:** Hourly mood check-ins plotted on 24-hour timeline
- **Weekly View:** 7-day mood average with min/max range
- **Monthly View:** 30-day trend line with weekly averages

**Cross-Pillar Correlation Insights:**
| Correlation | Example Insight |
|-------------|-----------------|
| Mood → Sleep | "Your mood is 40% better after 7+ hours of sleep" |
| Mood → Workouts | "Morning workouts correlate with 25% higher afternoon mood" |
| Mood → Meals | "Your mood dips 2 hours after high-carb meals" |
| Mood → Habits | "Journaling before bed improves next-day mood by 35%" |
| Mood → Steps | "Low mood days correlate with <5,000 steps" |

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Timeline Period | Enum | day/week/month | User setting |
| Correlation Metric | Enum | sleep/workout/meal/habit | System generated |
| Correlation Strength | Float | 0.0-1.0 | System generated |
| Insight Text | String | Auto-generated | User-only |
| Export Format | Enum | csv/pdf | User request |

**Behaviors:**
- Timeline auto-updates when new mood data logged
- Correlations require minimum 14 days of multi-pillar data
- Insights surface when correlation strength >0.3
- Users can tap any insight to see underlying data
- Export includes mood data with timestamps (no raw health data from other pillars)

### Acceptance Criteria

**AC1: Daily Timeline View**
Given the user has logged multiple moods today,
When they view the daily timeline,
Then each check-in appears at its timestamp with emoji/rating visible.

**AC2: Weekly Summary (Light Mode)**
Given the user is in Light mode,
When they view mood patterns,
Then a 7-day summary shows trend direction (↑↓→) and average mood.

**AC3: Monthly Timeline (Deep Mode)**
Given the user is in Deep mode,
When they select monthly view,
Then a 30-day trend line displays with weekly averages highlighted.

**AC4: Cross-Pillar Correlation Display**
Given the user has 14+ days of mood + sleep data,
When correlations are calculated,
Then insights like "Better sleep → Better mood" appear with specific percentages.

**AC5: Correlation Drill-Down**
Given a correlation insight is displayed,
When the user taps the insight,
Then underlying data (mood on sleep days vs poor sleep days) is shown.

**AC6: Mood Volatility Detection**
Given the user's mood varies significantly within days,
When viewing weekly patterns,
Then volatility indicator shows: "Your mood varied more than usual this week."

**AC7: Export Capability (Deep Mode)**
Given the user wants to export mood data,
When they select export option,
Then mood data downloads as CSV or PDF with date range selection.

**AC8: Minimum Data Requirement**
Given the user has <7 days of mood data,
When they view timeline,
Then message shows: "Keep logging! Patterns will appear after 7+ days of data."

### Success Metrics
- Timeline engagement: 60% of users view mood patterns weekly
- Correlation insight discovery: 75% receive cross-pillar insight within 14 days
- Insight accuracy: 70% user agreement that insights match their experience
- Export usage: 10% of Deep mode users export data monthly

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Timeline load <2s | Auth required | Correlations calculated locally | Screen reader support | iOS 14+, Android 10+ |
| Correlation calc <5s | Export encrypted | No cross-pillar raw data in exports | Min 4.5:1 contrast | Landscape for charts |

### Dependencies
- **Prerequisite Stories:** S07.1.1 (Mood Check-in Logging)
- **Related Stories:** S07.4.2, S07.3.3
- **External Dependencies:** E5 (Sleep data), E6 (Meal data), E8 (Cross-Domain Intelligence engine)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Only Light mode check-ins (no Deep data) | Timeline uses emoji-based visualization; no detailed ratings chart |
| Insufficient data for correlations (<14 days) | Show timeline without correlations; "More data needed for insights" |
| Large mood swing detected (5+ point change in 2 hours) | Highlight on timeline: "Significant mood shift detected" |
| Cross-pillar data missing (no sleep/meal logged) | Show mood-only insights; prompt to log other pillars |
| User deletes mood check-ins | Timeline updates; correlations recalculate; warning before bulk delete |

### Open Questions
- Should correlation insights include confidence intervals?
- What's the retention period for mood history (unlimited vs 12 months)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Daily, weekly, monthly timeline views functional
- [ ] Cross-pillar correlation insights generating (when data available)
- [ ] Export to CSV/PDF working
- [ ] Accessibility requirements verified (screen reader, contrast)
- [ ] Performance requirements verified (<2s load, <5s correlation calc)

---

# FEATURE F7.4: ENERGY LEVEL MONITORING

---

## S07.4.1: Energy Level Logging

### User Story
**As a** Busy Professional (P2),
**I want to** quickly rate my energy level multiple times per day with optional context,
**So that** I can understand my energy patterns and optimize my schedule for when I feel most productive.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Energy tracking captures the dynamic nature of how users feel throughout the day. Unlike one-time daily ratings, users can log energy multiple times to reveal patterns - morning energy baseline, afternoon dips, evening wind-down. Quick slider input makes logging effortless.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | 2-3 prompted check-ins per day (morning, afternoon, evening) with simple 1-10 slider. 5-second interaction. |
| **Deep** | Unlimited on-demand logging with context tagging, optional notes, and energy timeline visualization. |

**Energy Rating Scale:**
| Rating | Label | Description |
|--------|-------|-------------|
| 1-2 | Exhausted | Cannot function, need rest |
| 3-4 | Low | Fatigued, struggling to focus |
| 5-6 | Neutral | Functional but not optimal |
| 7-8 | Good | Alert, productive, focused |
| 9-10 | Highly Energized | Peak performance, excellent focus |

**Context Tags (Deep Mode):**
- Post-meal
- Post-workout
- During work
- After sleep
- After caffeine
- After social activity
- Stressed
- Relaxed

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Energy Rating | Integer 1-10 | Required | User-only |
| Context Tag | Enum | From tag list | User-only |
| Note | String | Max 200 chars | User-only |
| Prompt Type | Enum | morning/afternoon/evening/on-demand | System |
| Timestamp | ISO 8601 | Required | System |
| Channel | Enum | app/whatsapp/voice | System |

**Prompted Check-in Schedule:**
| Prompt | Default Time | Customizable |
|--------|--------------|--------------|
| Morning | 8:00 AM | Yes, 6-10 AM window |
| Afternoon | 2:00 PM | Yes, 12-4 PM window |
| Evening | 7:00 PM | Yes, 5-9 PM window |

**Behaviors:**
- Single slider tap for quick rating (no confirmation needed)
- Context tags optional but encouraged via "What's affecting your energy?"
- Prompted check-ins dismissable without penalty
- Energy data feeds Mental Recovery Score (20% weight)
- Cross-pillar integration: Energy vs sleep, meals, workouts

### Acceptance Criteria

**AC1: Quick Energy Rating**
Given the user opens energy check-in,
When they slide to a number (1-10),
Then the rating saves immediately with timestamp.

**AC2: Morning Prompt Delivery**
Given prompt time is reached (default 8 AM),
When user has app open or notifications enabled,
Then "How's your energy this morning?" prompt appears.

**AC3: Afternoon/Evening Prompts**
Given afternoon (2 PM) or evening (7 PM) prompt time,
When the user hasn't logged energy recently,
Then appropriate prompt appears: "Afternoon energy check?" or "How's your evening energy?"

**AC4: Custom Prompt Timing**
Given the user wants different prompt times,
When they adjust in settings,
Then prompts deliver at new times (within allowed windows).

**AC5: Context Tagging (Deep Mode)**
Given the user logs energy in Deep mode,
When they select context tags (e.g., "Post-meal", "After caffeine"),
Then tags attach to the energy record.

**AC6: WhatsApp Energy Check**
Given the user receives "Energy check: 1-10?" on WhatsApp,
When they reply with a number (e.g., "7"),
Then energy rating is logged from WhatsApp channel.

**AC7: On-Demand Logging**
Given the user wants to log energy outside prompted times,
When they access energy check-in manually,
Then they can log at any time without restriction.

**AC8: Dismiss Without Penalty**
Given an energy prompt appears,
When the user dismisses without logging,
Then no negative feedback or penalty occurs.

### Success Metrics
- Daily energy logging: 70% of users log energy ≥2x/day
- Prompt response rate: 60% of prompted check-ins completed
- Multi-time-point logging: 40% log energy ≥3x/day
- Average check-in time: <5 seconds

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Rating save <1s | Auth required | Energy data user-only | Voice input support | iOS 14+, Android 10+ |
| Prompt delivery <2s | Encrypted at rest | No sharing without consent | Color-blind safe slider | WhatsApp, Voice channels |

### Dependencies
- **Prerequisite Stories:** None (parallel to S07.1.1)
- **Related Stories:** S07.4.2, S07.1.1
- **External Dependencies:** E4 (Mobile App), E3 (WhatsApp), E2 (Voice coaching)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Chronic low energy (average <4 for 7+ days) | Health concern prompt: "Energy has been low. Consider talking to a healthcare provider?" |
| Missed energy check-ins (3+ days) | Re-engagement: "Haven't tracked energy recently. Quick check: How's your energy right now?" |
| Contradictory ratings (9 then 2 within 1 hour) | Accept both; flag for pattern analysis (possible caffeine crash, etc.) |
| User in meeting during prompt | Prompt waits 30 minutes before re-prompting (not intrusive) |
| Offline logging | Queue locally; sync when reconnected |

### Open Questions
- Should energy prompts sync with calendar (avoid during meetings)?
- What's the minimum interval between on-demand check-ins?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 1-10 slider functional with instant save
- [ ] Prompted check-ins delivered at correct times
- [ ] Custom prompt timing configurable
- [ ] Context tags working in Deep mode
- [ ] Multi-channel logging (app, WhatsApp, voice)
- [ ] Energy data feeds Mental Recovery Score
- [ ] Performance requirements verified (<1s save)

---

## S07.4.2: Energy Pattern Analysis

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** visualize my energy patterns throughout the day and understand what factors affect my energy levels,
**So that** I can optimize my schedule, meals, and activities for consistent high energy.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Energy pattern analysis reveals when users naturally peak and dip, and what behaviors correlate with better or worse energy. Insights like "High-protein breakfast = 25% better morning energy" help users make actionable changes.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | 7-day energy summary with peak/low indicators. "Your energy tends to dip around 3 PM." |
| **Deep** | Full energy timeline (hourly/daily/weekly), correlation engine, trend analysis, energy optimization recommendations. |

**Energy Timeline Visualizations:**
- **Hourly View:** Energy levels plotted across 24 hours (requires 3+ check-ins/day)
- **Daily View:** Average energy with min/max range
- **Weekly View:** 7-day trend with day-of-week patterns

**Energy Correlation Engine:**

| Correlation | Example Insight |
|-------------|-----------------|
| Energy → Sleep | "7+ hours sleep = +3 energy points average" |
| Energy → Meals | "High-protein breakfast = 25% better morning energy" |
| Energy → Workouts | "Morning workouts boost all-day energy by 18%" |
| Energy → Stress | "High stress days = -2.5 energy points average" |
| Energy → Caffeine | "No caffeine after 2 PM = +1.5 evening energy" |
| Energy → Habits | "Meditation mornings have 20% higher energy" |

**Energy Dip Detection:**
- Afternoon dip: Energy drop >3 points between 1-4 PM
- Consistent pattern: Same dip pattern 3+ days/week
- Alert: "Your afternoon energy crashes consistently. Try: walking break, protein snack, or hydration."

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Time-of-Day Pattern | JSON | System calculated | User-only |
| Correlation Metric | Enum | sleep/meal/workout/stress/habit | System |
| Correlation Strength | Float | 0.0-1.0 | System |
| Dip Detected | Boolean | Auto-detected | System |
| Recommendation | String | System generated | User-only |

**Behaviors:**
- Pattern detection requires 7+ days of energy data (3+ check-ins/day)
- Correlations require 14+ days of multi-pillar data
- Energy dip alerts surface when consistent pattern detected
- Recommendations are actionable and specific

### Acceptance Criteria

**AC1: Daily Energy Timeline**
Given the user has logged energy 3+ times today,
When they view the daily timeline,
Then hourly energy levels display as a chart/graph.

**AC2: Weekly Pattern Summary (Light Mode)**
Given the user is in Light mode,
When they view energy patterns,
Then 7-day average, peak time, and low time are shown.

**AC3: Time-of-Day Pattern Detection**
Given the user has 7+ days of energy data,
When patterns are analyzed,
Then insights like "Your energy peaks between 9-11 AM" appear.

**AC4: Cross-Pillar Correlation (Sleep)**
Given the user has 14+ days of energy + sleep data,
When correlations calculate,
Then insight shows: "7-8 hours sleep → 8/10 morning energy" (with actual numbers).

**AC5: Cross-Pillar Correlation (Meals)**
Given the user has 14+ days of energy + meal data,
When post-meal energy is analyzed,
Then insight shows meal-energy connections (e.g., protein vs carb impact).

**AC6: Afternoon Dip Detection**
Given the user's energy drops >3 points between 1-4 PM consistently,
When pattern is detected (3+ days/week),
Then alert: "Consistent afternoon energy dip detected. Recommendations: [list]."

**AC7: Trend Analysis (Deep Mode)**
Given the user is in Deep mode,
When they view 30-day energy trends,
Then average/min/max energy per week is shown with trend direction.

**AC8: Actionable Recommendations**
Given an energy pattern or dip is detected,
When recommendations surface,
Then they are specific: "Try a 10-minute walk at 2:30 PM" not generic "exercise more."

### Success Metrics
- Energy pattern insights: 75% receive energy correlation insight within 7 days
- Energy optimization: 50% report improved energy management in 30 days
- Insight accuracy: 70% user agreement that energy insights match experience
- Dip detection accuracy: 80% user confirmation when dip alert shown

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Timeline load <2s | Auth required | Energy patterns user-only | Screen reader support | iOS 14+, Android 10+ |
| Correlation calc <5s | Encrypted at rest | No cross-pillar raw data exposed | Min 4.5:1 contrast | Landscape for charts |

### Dependencies
- **Prerequisite Stories:** S07.4.1 (Energy Level Logging)
- **Related Stories:** S07.1.2 (Mood Patterns), S07.3.3 (Habit Correlations)
- **External Dependencies:** E5 (Sleep data), E6 (Meal data), E8 (Cross-Domain Intelligence)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient data (<7 days) | Show available data; "More data needed for patterns" message |
| Single check-in per day only | Show daily trend; cannot generate hourly timeline |
| No cross-pillar data (no sleep/meal logged) | Energy-only patterns; prompt to log other pillars for deeper insights |
| Erratic energy (no consistent pattern) | Acknowledge variability: "Your energy varies significantly. Tracking more factors may reveal causes." |
| User vacation/travel (unusual patterns) | Note unusual period; don't weight heavily in long-term patterns |

### Open Questions
- Should we show predicted energy for future time slots?
- How should we handle timezone changes for pattern analysis?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Hourly, daily, weekly energy timelines functional
- [ ] Cross-pillar correlations generating (sleep, meals, workouts, habits)
- [ ] Afternoon energy dip detection working
- [ ] Actionable recommendations displaying
- [ ] Performance requirements verified (<2s load)
- [ ] Accessibility requirements verified

---

# FEATURE F7.3: HABIT TRACKING

---

## S07.3.1: Habit Creation & Configuration

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** create and configure custom habits with flexible tracking types and frequencies,
**So that** I can track any behavior that matters to me and discover correlations with my health outcomes.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
yHealth's habit tracking is user-customizable, not limited to predefined categories. Users can track ANY habit (meditation, reading, alcohol consumption, creative work) with four tracking types and flexible frequencies. This enables discovering personal patterns rather than prescribing "correct" habits.

**Tracking Types:**

| Type | Description | Example |
|------|-------------|---------|
| **Checkbox** | Binary yes/no | "Meditated today" → ✓ or ✗ |
| **Counter** | Quantity | "Glasses of water" → 8 |
| **Duration** | Time-based | "Deep work" → 90 minutes |
| **Rating** | 1-10 scale | "Social connection quality" → 8/10 |

**Frequency Options:**
- Daily
- Weekly (any day completes)
- Specific days (M/T/W/T/F/S/S selectable)
- X times per week (e.g., 3x/week)

**Pre-populated Suggestions:**
| Category | Suggested Habits |
|----------|-----------------|
| Mindfulness | Meditation, Journaling, Gratitude practice, Breathing exercises |
| Social | Quality time with loved ones, Meaningful conversation, Phone call with friend |
| Health | Morning routine, Evening routine, Stretching, Cold shower |
| Productivity | Deep work session, Reading, Learning new skill, No phone before 9am |
| Avoidance | No alcohol, No caffeine after 2pm, No social media, No screens before bed |
| Recreation | Outdoor time, Hobby time, Play/fun activity, Music/art |

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Habit Name | String | 1-100 chars, required | User-only |
| Habit Category | Enum | From categories or custom | User-only |
| Tracking Type | Enum | checkbox/counter/duration/rating | User-only |
| Frequency | Enum | daily/weekly/specific_days/x_per_week | User-only |
| Specific Days | Array<Enum> | Mon-Sun if specific_days | User-only |
| Target Value | Integer | Counter/Duration only | User-only |
| Reminder Time | Time | Optional | User-only |
| Created At | ISO 8601 | Required | System |

**Behaviors:**
- Users can create unlimited habits (no cap)
- Categories are suggested but users can create custom categories
- Habits appear in daily dashboard based on frequency
- Reminder notifications optional per habit
- Habits can be archived (hidden but data preserved) or deleted

### Acceptance Criteria

**AC1: Create Checkbox Habit**
Given the user wants to track a binary habit,
When they create a habit with type "checkbox",
Then the habit appears with ✓/✗ toggle in daily view.

**AC2: Create Counter Habit**
Given the user wants to track a quantity,
When they create a habit with type "counter" (e.g., "Glasses of water", target 8),
Then the habit shows +/- buttons and progress toward target.

**AC3: Create Duration Habit**
Given the user wants to track time spent,
When they create a habit with type "duration" (e.g., "Deep work", target 60 min),
Then the habit allows entering minutes with progress display.

**AC4: Create Rating Habit**
Given the user wants to track quality on a scale,
When they create a habit with type "rating" (e.g., "Sleep quality"),
Then the habit shows 1-10 slider for daily rating.

**AC5: Set Frequency (Daily)**
Given the user creates a daily habit,
When viewing the habit dashboard,
Then the habit appears every day.

**AC6: Set Frequency (Specific Days)**
Given the user creates a habit for Mon/Wed/Fri only,
When viewing the habit dashboard on Tuesday,
Then the habit does not appear (only on selected days).

**AC7: Use Pre-populated Suggestions**
Given the user is creating a new habit,
When they view suggestions,
Then categorized suggestions are shown and selectable.

**AC8: Create Custom Category**
Given no existing category fits the user's habit,
When they type a custom category name,
Then the new category is created and available for future habits.

**AC9: Set Reminder**
Given the user wants a reminder for a habit,
When they set reminder time (e.g., 7:00 AM),
Then notification triggers at that time on applicable days.

**AC10: Archive Habit**
Given the user no longer tracks a habit but wants to keep data,
When they archive the habit,
Then it's hidden from daily view but data is preserved.

### Success Metrics
- Habit creation adoption: 70% of users create ≥1 custom habit
- Multi-habit tracking: 50% create 3+ habits
- Suggestion usage: 40% of habits created from suggestions
- Custom category creation: 20% create custom category

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Habit create <1s | Auth required | Habit data user-only | Voice input for habit name | iOS 14+, Android 10+ |
| Dashboard load <2s | Encrypted at rest | No habit sharing | 44x44pt touch targets | All channels |

### Dependencies
- **Prerequisite Stories:** None (foundation for habits)
- **Related Stories:** S07.3.2, S07.3.3
- **External Dependencies:** E4 (Mobile App UI)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Too many habits created (>15 active) | Suggestion: "Tracking many habits! Focus on 5-7 core habits for better consistency?" |
| Duplicate habit name | Allow duplicates (user may want "Morning meditation" and "Evening meditation") |
| Empty habit name | Validation error: "Habit name required" |
| Very long habit name (>100 chars) | Truncate at 100; warning shown |
| Delete habit with data | Confirmation: "Delete habit and all logged data? This cannot be undone." |

### Open Questions
- Should we limit active habits to prevent overwhelm?
- What's the maximum number of custom categories?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 4 tracking types functional (checkbox, counter, duration, rating)
- [ ] All frequency options working
- [ ] Pre-populated suggestions displayed
- [ ] Custom categories creatable
- [ ] Reminders triggering at correct times
- [ ] Archive and delete functional
- [ ] Performance requirements verified

---

## S07.3.2: Habit Logging & Streaks

### User Story
**As a** Habit Formation Seeker (P4),
**I want to** log my habits daily and track my streaks with milestone celebrations,
**So that** I can build consistency and feel motivated by my progress.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Daily habit logging is the core interaction - a checklist view where users mark habits complete. Streak tracking provides motivation with visual progress and milestone celebrations (3-day, 7-day, 21-day, 30-day).

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Simple checklist view with checkboxes. Today's habits only. Quick "all done" completion. |
| **Deep** | Detailed logging with notes per habit, historical view, streak analytics, export habit data. |

**Streak Milestones:**
| Streak | Milestone | Celebration |
|--------|-----------|-------------|
| 3 days | Getting started | "3-day streak! You're building momentum." |
| 7 days | One week | "7-day streak! Habits are forming." |
| 21 days | Habit forming | "21-day streak! Research says habits form around now." |
| 30 days | One month | "30-day streak! This is who you are now." |
| 60 days | Two months | "60-day streak! Impressive consistency." |
| 90 days | Three months | "90-day streak! Truly embedded habit." |

**Daily Dashboard:**
- Today's habits filtered by frequency (only applicable habits shown)
- Completion status for each habit
- Streak count displayed per habit
- Overall daily completion rate

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Habit ID | UUID | Required | System |
| Date | Date | Required | System |
| Completed | Boolean | Checkbox type | User-only |
| Value | Integer | Counter/Duration type | User-only |
| Rating | Integer 1-10 | Rating type | User-only |
| Note | String | Max 500 chars | User-only |
| Current Streak | Integer | System calculated | User-only |
| Longest Streak | Integer | System calculated | User-only |

**Behaviors:**
- Dashboard shows today's applicable habits based on frequency
- Checkbox habits toggle with single tap
- Counter/Duration habits show +/- or input field
- Streak updates immediately when habit completed
- Streak resets if day missed (for daily habits)
- Partial completion possible for "X times per week" habits

### Acceptance Criteria

**AC1: Daily Habit Dashboard**
Given the user opens habit tracking,
When today's date loads,
Then only habits with applicable frequency (daily, today's weekday, etc.) appear.

**AC2: Checkbox Habit Completion**
Given a checkbox habit is displayed,
When the user taps the checkbox,
Then the habit marks complete with visual feedback (checkmark, color change).

**AC3: Counter Habit Logging**
Given a counter habit is displayed (e.g., "Glasses of water"),
When the user taps +/- or enters a number,
Then the value saves and progress toward target updates.

**AC4: Duration Habit Logging**
Given a duration habit is displayed (e.g., "Deep work"),
When the user enters minutes,
Then the duration saves and progress displays.

**AC5: Rating Habit Logging**
Given a rating habit is displayed,
When the user slides to a rating (1-10),
Then the rating saves for that day.

**AC6: Streak Display**
Given a habit has been completed consecutive days,
When viewing the habit,
Then current streak count displays (e.g., "🔥 7").

**AC7: Streak Milestone Celebration**
Given a user completes a habit reaching 7-day streak,
When the streak milestone is reached,
Then celebratory message appears: "7-day streak! Habits are forming."

**AC8: Streak Reset**
Given a daily habit was missed yesterday,
When the user opens habits today,
Then streak shows reset to 0 with message: "Streak ended. Start fresh today!"

**AC9: Note on Habit (Deep Mode)**
Given the user is in Deep mode,
When they add a note to a habit completion,
Then the note saves with that day's log.

**AC10: Light Mode Quick View**
Given the user is in Light mode,
When viewing habits,
Then a simplified checklist with minimal detail appears.

### Success Metrics
- Daily habit logging rate: 65% of users log habits ≥5 days/week
- Streak achievement: 50% achieve 7+ day streak on ≥1 habit within first month
- 21-day streak: 30% achieve 21-day streak on ≥1 habit
- Habit completion rate: 70% average completion across all habits

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Habit toggle <500ms | Auth required | Habit logs user-only | 44x44pt touch targets | iOS 14+, Android 10+ |
| Dashboard load <2s | Encrypted at rest | No sharing without consent | Color-blind safe indicators | All channels |

### Dependencies
- **Prerequisite Stories:** S07.3.1 (Habit Creation)
- **Related Stories:** S07.3.3, S07.6.3
- **External Dependencies:** E4 (Mobile App), E3 (WhatsApp for quick logging)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Habit never completed (0% for 14+ days) | Suggestion: "Haven't completed [habit]. Adjust goal or remove to keep list focused?" |
| Habit logged after midnight for yesterday | Allow backdating within 24 hours with confirmation |
| Multiple completions same day (counter) | Allow updating value; keep latest |
| Streak broken after 21+ days | Encouragement: "21-day streak ended! One miss doesn't erase progress. Start again?" |
| Offline logging | Queue locally; sync when reconnected; streaks calculate on server |

### Open Questions
- Should we allow "grace period" for streaks (1 missed day doesn't break)?
- How should we handle timezone changes for streak calculation?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 4 habit types logging correctly
- [ ] Streaks calculating and displaying accurately
- [ ] Milestone celebrations appearing at correct thresholds
- [ ] Light and Deep modes rendering correctly
- [ ] Performance requirements verified
- [ ] WhatsApp quick logging functional

---

## S07.3.3: Habit Correlation Insights

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** discover how my habits correlate with my mood, energy, sleep, and other health factors,
**So that** I can understand which habits truly impact my wellbeing and focus on what works.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The habit correlation engine analyzes habit completion against mood, energy, sleep, workouts, and stress to reveal which habits have the most impact. Insights like "Your mood is 45% better on days you meditate" help users prioritize their most effective habits.

**Cross-Pillar Correlation Analysis:**

| Correlation | Example Insight |
|-------------|-----------------|
| Habit → Mood | "Your mood is 45% better on days you meditate" |
| Habit → Energy | "Energy levels are 2 points higher when you do morning exercise" |
| Habit → Sleep | "Sleep quality improves 20% when you avoid caffeine after 2pm" |
| Habit → Stress | "Stress levels are 35% lower on journaling days" |
| Habit → Workouts | "You complete workouts 80% more often on meditation days" |

**Correlation Requirements:**
- Minimum 14 days of habit + correlating metric data
- Correlation coefficient >0.3 to surface insight
- Insights update weekly with new data

**Weekly Habit-Correlation Summary:**
- Top 3 positive correlations: "These habits boost your wellbeing"
- Top 3 negative correlations: "These habits may be holding you back" (e.g., "Late night screens correlate with 25% worse sleep")
- Habit effectiveness ranking

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Habit ID | UUID | Required | System |
| Correlated Metric | Enum | mood/energy/sleep/stress/workout | System |
| Correlation Coefficient | Float | -1.0 to 1.0 | System |
| Insight Text | String | Auto-generated | User-only |
| Sample Size | Integer | Days of data used | System |
| Generated At | ISO 8601 | Weekly update | System |

**Behaviors:**
- Correlations calculate in background (not real-time)
- Weekly summary delivered Sunday evening
- Users can tap any insight to see underlying data
- Negative correlations phrased constructively
- No judgment on "bad" habits - just data

### Acceptance Criteria

**AC1: Minimum Data Requirement**
Given the user has <14 days of habit + correlating metric data,
When viewing habit insights,
Then message shows: "Keep tracking! Correlations will appear after 14+ days."

**AC2: Positive Correlation Display**
Given habit "Meditation" correlates with higher mood (+0.4 coefficient),
When insights are generated,
Then insight shows: "Your mood is X% better on days you meditate."

**AC3: Negative Correlation Display**
Given habit "Late night screens" correlates with worse sleep (-0.35 coefficient),
When insights are generated,
Then insight shows: "Late night screens correlate with X% worse sleep quality."

**AC4: Weekly Summary Delivery**
Given the user has sufficient data,
When Sunday evening arrives,
Then weekly habit-correlation summary is generated and available.

**AC5: Insight Drill-Down**
Given a correlation insight is displayed,
When the user taps for details,
Then underlying data shows (e.g., mood on meditation days vs. non-meditation days).

**AC6: Habit Effectiveness Ranking**
Given multiple habits have correlations,
When viewing insights,
Then habits are ranked by positive impact on wellbeing.

**AC7: Multiple Metrics Per Habit**
Given a habit correlates with multiple metrics (mood AND energy),
When viewing that habit's insights,
Then all relevant correlations are shown.

**AC8: Confidence Indicator**
Given a correlation is based on limited data (14-21 days),
When insight displays,
Then confidence indicator shows: "Early insight - more data will improve accuracy."

### Success Metrics
- Habit-correlation insights: 80% of users receive habit correlation insights within 14 days
- Insight engagement: 60% of users view habit correlations weekly
- Insight accuracy: 70% user agreement that correlations match their experience
- Behavior change: 40% report adjusting habits based on correlation insights

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Correlation calc <10s | Auth required | Correlations user-only | Screen reader support | iOS 14+, Android 10+ |
| Insights load <2s | Encrypted at rest | No habit data shared | Min 4.5:1 contrast | All channels |

### Dependencies
- **Prerequisite Stories:** S07.3.2 (Habit Logging), S07.1.1 (Mood), S07.4.1 (Energy)
- **Related Stories:** S07.1.2, S07.4.2
- **External Dependencies:** E5 (Sleep, Workout data), E8 (Cross-Domain Intelligence)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Habit never completed (no data) | No correlation possible; skip in analysis |
| Habit completed every day (no variance) | Cannot calculate correlation; note: "Try skipping to see if there's a difference" |
| Correlating metric not logged (e.g., no sleep data) | Show available correlations; "Log sleep to see sleep correlations" |
| Spurious correlation detected | Require coefficient >0.3 AND p-value <0.05 to surface |
| User disputes correlation | Allow feedback: "This doesn't feel right" - flag for review |

### Open Questions
- Should we show negative correlations as "opportunities" or as-is?
- How should we handle habits that are new (<7 days old)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Correlations calculating for mood, energy, sleep, stress, workouts
- [ ] Weekly summary generating on schedule
- [ ] Drill-down to underlying data working
- [ ] Effectiveness ranking functional
- [ ] Confidence indicators displaying
- [ ] Performance requirements verified

---

# FEATURE F7.2: DAILY JOURNALING

---

## S07.2.1: Journaling Prompt System

### User Story
**As a** Busy Professional (P2),
**I want to** receive research-based journaling prompts that guide my reflection,
**So that** I can build a journaling habit without staring at a blank page.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The journaling prompt system provides structured guidance using research-backed prompt categories (gratitude, reflection, emotional processing, stress management, self-compassion, future focus). Prompts reduce the intimidation of blank-page journaling and ensure meaningful reflection.

**Prompt Categories (Research-Based):**

| Category | Evidence | Example Prompts |
|----------|----------|-----------------|
| **Gratitude** | Improves wellbeing, reduces depression | "List three things you're grateful for today and why they matter." |
| **Reflection & Growth** | Increases self-awareness, goal achievement | "What's one thing that went well today? What made it successful?" |
| **Emotional Processing** | Reduces anxiety, improves emotional regulation | "What emotion are you feeling right now? What triggered it?" |
| **Stress Management** | Reduces cortisol, improves coping | "What's causing stress right now? What parts are within your control?" |
| **Self-Compassion** | Reduces self-criticism, improves mental health | "What would you say to a friend going through what you're experiencing?" |
| **Future Focus** | Increases motivation, reduces anxiety | "What's one intention you have for tomorrow?" |

**Prompt Library (50+ prompts across 6 categories):**

**Gratitude (10+ prompts):**
- "What are three things you're grateful for today?"
- "Who made a positive impact on you today? How did they help?"
- "What's a simple pleasure you enjoyed today?"

**Reflection & Growth (10+ prompts):**
- "What's one thing that went well today? What made it successful?"
- "What challenge did you face? What did you learn from it?"
- "How did you show up as your best self today?"

**Emotional Processing (10+ prompts):**
- "What emotion are you feeling right now? What triggered it?"
- "What's weighing on your mind? Why does it matter to you?"
- "If this emotion had a message for you, what would it be?"

**Stress Management (10+ prompts):**
- "What's causing stress right now? What's within your control?"
- "What's one action you can take to ease this stress?"
- "What would help you feel calmer right now?"

**Self-Compassion (10+ prompts):**
- "What would you say to a friend going through what you're experiencing?"
- "What do you need to forgive yourself for today?"
- "How can you be kinder to yourself tomorrow?"

**Future Focus (10+ prompts):**
- "What's one intention you have for tomorrow?"
- "What are you looking forward to this week?"
- "What would make tomorrow feel successful?"

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Single prompt displayed. 1-2 sentence response encouraged. 2-5 minute session. |
| **Deep** | Multiple prompts (3-5), extended reflection, cross-pillar prompts. 10-20 minute session. |

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Prompt ID | UUID | Required | System |
| Prompt Text | String | From library | System |
| Prompt Category | Enum | From 6 categories | System |
| Display Mode | Enum | light/deep | User setting |
| Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Prompt rotates daily to prevent repetition
- Same prompt not shown within 7 days
- Category balance maintained across week
- Users can "skip" prompt to get a different one
- Cross-pillar prompts available: "How did today's workout affect your mood?"

### Acceptance Criteria

**AC1: Daily Prompt Display**
Given the user opens journaling,
When the journaling interface loads,
Then a prompt is displayed from the prompt library.

**AC2: Prompt Rotation**
Given the user saw a specific prompt yesterday,
When they open journaling today,
Then a different prompt is shown (no repeat within 7 days).

**AC3: Skip to Different Prompt**
Given the user doesn't resonate with the current prompt,
When they tap "Different prompt",
Then a new prompt from a different category appears.

**AC4: Category Balance**
Given the user journals daily for a week,
When reviewing prompts shown,
Then all 6 categories are represented (not all gratitude, for example).

**AC5: Light Mode Single Prompt**
Given the user is in Light mode,
When viewing journal prompts,
Then only one prompt displays with brief entry field.

**AC6: Deep Mode Multiple Prompts**
Given the user is in Deep mode,
When viewing journal prompts,
Then 3-5 prompts are available for extended reflection.

**AC7: Cross-Pillar Prompt (Deep Mode)**
Given the user logged a workout today,
When Deep mode prompts load,
Then cross-pillar prompt is included: "How did today's workout affect your mood?"

**AC8: Prompt Library Coverage**
Given the prompt library,
When reviewing all prompts,
Then 50+ unique prompts exist across 6 categories.

### Success Metrics
- Prompt engagement: 70% of users respond to at least one prompt per session
- Skip rate: <30% of prompts skipped (indicates prompt relevance)
- Category coverage: Users exposed to 5+ categories within first 2 weeks
- Light mode completion: 80% complete Light mode journal entries

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Prompt load <500ms | Auth required | Prompts not logged until response | Voice input for prompt | iOS 14+, Android 10+ |
| Skip response <300ms | Encrypted | User-only | Min 4.5:1 contrast | All channels |

### Dependencies
- **Prerequisite Stories:** None (foundation for journaling)
- **Related Stories:** S07.2.2, S07.2.3
- **External Dependencies:** E4 (Mobile App), E3 (WhatsApp for prompts)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| All prompts in category exhausted (rare) | Reset category, start rotation again |
| User always skips certain category | Reduce frequency of that category; don't eliminate |
| User prefers specific category | Allow "favorite" prompts to appear more often |
| Prompt contains triggering content | Avoid prompts that assume negative context (e.g., don't assume conflict) |
| Cross-pillar data unavailable | Show standard prompts; no cross-pillar prompt |

### Open Questions
- Should users be able to favorite specific prompts?
- Can users submit custom prompts for personal use?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 50+ prompts implemented across 6 categories
- [ ] Prompt rotation preventing repeats
- [ ] Skip functionality working
- [ ] Category balance maintained
- [ ] Light and Deep mode prompts rendering correctly
- [ ] Cross-pillar prompts functional when data available

---

## S07.2.2: Journal Entry & Voice Input

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** write or speak my journal entries with streak tracking and privacy,
**So that** I can reflect consistently using my preferred input method while keeping my thoughts secure.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Journal entry supports both text and voice input. Streak tracking motivates consistency. Privacy is paramount - all entries are encrypted and user-only accessible. Free write mode available for users who prefer blank-page journaling.

**Input Methods:**

| Method | Experience |
|--------|------------|
| **Text** | Standard text input with markdown support. Word count displayed. |
| **Voice-to-Text** | Speak journal entry; transcription appears in real-time. Edit after speaking. |

**Structured Templates:**

| Template | Duration | Structure |
|----------|----------|-----------|
| **Morning Pages** | 10-15 min | Free-form stream of consciousness writing |
| **Evening Reflection** | 5-10 min | What went well? What to improve? Gratitude. |
| **Weekly Review** | 15-20 min | Week highlights, challenges, intentions for next week |
| **Monthly Check-in** | 20-30 min | Month review, progress on goals, adjustments needed |

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Respond to single prompt with 1-3 sentences. Quick save. 2-5 minutes. |
| **Deep** | Extended reflection with multiple prompts, templates, or free write. 10-20 minutes. |

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Entry ID | UUID | Required | System |
| Prompt ID | UUID | If prompted entry | System |
| Entry Text | Encrypted String | Max 10,000 chars | User-only (encrypted) |
| Word Count | Integer | System calculated | User-only |
| Duration | Integer (seconds) | System tracked | User-only |
| Input Method | Enum | text/voice | System |
| Template Used | Enum | Optional | System |
| Sentiment Score | Float | AI-analyzed | System (for stress detection) |
| Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Entries auto-save every 30 seconds during writing
- Voice-to-text allows pause/resume
- Journaling streak tracks consecutive days
- +10 Mental Recovery Score bonus on journaling days
- Entries encrypted at rest (AES-256)
- Export available in PDF/text format

**Streak Milestones:**
| Streak | Celebration |
|--------|-------------|
| 3 days | "3-day journaling streak! Reflection is becoming a habit." |
| 7 days | "7-day streak! You're building self-awareness." |
| 30 days | "30-day streak! Journaling is part of who you are." |

### Acceptance Criteria

**AC1: Text Entry**
Given the user opens journal entry,
When they type in the text field,
Then text saves and word count updates in real-time.

**AC2: Voice-to-Text Entry**
Given the user taps voice input,
When they speak their journal entry,
Then transcription appears in real-time with ability to edit after.

**AC3: Auto-Save**
Given the user is writing an entry,
When 30 seconds pass without explicit save,
Then entry auto-saves as draft.

**AC4: Free Write Mode**
Given the user wants unguided journaling,
When they select "Free write",
Then blank entry field appears without prompt.

**AC5: Template Selection (Deep Mode)**
Given the user is in Deep mode,
When they view templates,
Then Morning Pages, Evening Reflection, Weekly Review, Monthly Check-in are available.

**AC6: Journaling Streak Display**
Given the user has journaled consecutive days,
When viewing journal section,
Then current streak displays: "🔥 7-day streak!"

**AC7: Streak Milestone Celebration**
Given the user reaches a streak milestone,
When they complete today's entry,
Then celebratory message appears.

**AC8: Mental Recovery Bonus**
Given the user completes a journal entry today,
When Mental Recovery Score calculates,
Then +10 bonus is applied.

**AC9: Entry Encryption**
Given a journal entry is saved,
When stored in database,
Then entry text is encrypted (AES-256) and only decryptable by user.

**AC10: Export Entries**
Given the user wants to export journal data,
When they select export option,
Then entries download as PDF or text with date range selection.

### Success Metrics
- Daily journaling rate: 60% of users journal ≥3x/week
- Journaling streak formation: 50% achieve 7+ day streak within first month
- Voice input adoption: 25% use voice-to-text for journaling
- Mental Recovery Score impact: +15 point boost on journaling days (measured)

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Entry save <1s | AES-256 encryption | Entries user-only | Voice input support | iOS 14+, Android 10+ |
| Voice transcription <2s | Auth required | No sharing without export | Screen reader support | WhatsApp voice notes |

### Dependencies
- **Prerequisite Stories:** S07.2.1 (Journaling Prompt System)
- **Related Stories:** S07.2.3, S07.5.2 (text sentiment for stress detection)
- **External Dependencies:** E4 (Mobile App), E3 (WhatsApp voice notes), E2 (Voice coaching)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Very short entries (<10 words) consistently | Suggestion: "Quick entries are great! Want to try voice journaling for richer reflection?" |
| Entry contains crisis keywords | Trigger escalation protocol per PRD Section 14 (resources shown, not intervention) |
| Voice transcription error | Allow manual correction; "Couldn't catch that - please review and edit." |
| Journaling streak broken after 7+ days | Encouragement: "7-day streak! One miss doesn't erase the habit. Quick entry today?" |
| Blank entry submitted | Accept and encourage: "Even blank pages are valid. Want a different prompt?" |
| App crash during entry | Restore from auto-save draft |

### Open Questions
- Should we offer guided audio journaling (AI asks questions, user responds verbally)?
- What's the retention period for journal entries (unlimited vs 5 years)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Text entry with auto-save functional
- [ ] Voice-to-text working with real-time transcription
- [ ] Templates available in Deep mode
- [ ] Streak tracking and celebrations functional
- [ ] Mental Recovery bonus applying
- [ ] Entry encryption verified (AES-256)
- [ ] Export to PDF/text working
- [ ] Performance requirements verified

---

## S07.2.3: Journal AI Personalization

### User Story
**As a** returning user,
**I want to** receive journaling prompts personalized to my recent mood, activities, and patterns,
**So that** my journaling feels relevant and helps me process what's actually happening in my life.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
AI personalization enhances the journaling experience over time. Initially, users receive research-based prompts (bootstrap approach). As data accumulates, AI customizes prompts based on mood patterns, stress levels, sleep quality, workout consistency, and previous journal themes.

**Bootstrap Approach:**
- Days 1-14: Research-based prompts only (from S07.2.1)
- Days 15+: AI begins personalizing based on accumulated data
- Personalization improves with more data

**AI Personalization Logic:**

| User Context | Prompt Adaptation |
|--------------|-------------------|
| Low mood (from S07.1.1) | Self-compassion or Gratitude prompts prioritized |
| High stress (from S07.5.1) | Stress Management or Emotional Processing prompts |
| Good recovery score | Reflection & Growth prompts (celebrate wins) |
| Missed workouts | Motivational or Future Focus prompts |
| Recent sleep issues | Prompts about rest and self-care |
| Previous journal mentioned work stress | Follow-up: "Last week you mentioned work pressure. How's that going?" |

**Personalization Inputs:**
- Recent mood patterns (7 days)
- Current stress level
- Sleep quality (last 3 nights)
- Workout consistency (7 days)
- Previous journal entry themes (NLP analysis)
- Time of day (morning vs evening appropriate prompts)

**Variety Management:**
- Same personalized prompt not shown within 7 days
- Balance categories even with personalization
- Allow "surprise me" to get random prompt

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| User Context | JSON | System assembled | System |
| Personalization Score | Float | 0-1 confidence | System |
| Prompt Selected | UUID | From library | System |
| Personalization Reason | String | For debugging | System |
| User Feedback | Enum | helpful/not_helpful | User-only |

**Behaviors:**
- Personalization runs when user opens journaling
- Falls back to random research-based prompt if personalization fails
- User can provide feedback on prompt relevance
- Feedback improves future personalization

### Acceptance Criteria

**AC1: Bootstrap Phase (Days 1-14)**
Given a new user with <14 days of data,
When they open journaling,
Then research-based prompts display (no personalization attempted).

**AC2: Low Mood Personalization**
Given the user logged low mood today,
When journaling prompt loads,
Then self-compassion or gratitude prompts are prioritized.

**AC3: High Stress Personalization**
Given the user's stress score is high (>7),
When journaling prompt loads,
Then stress management prompts are prioritized.

**AC4: Cross-Pillar Context**
Given the user had poor sleep last night,
When journaling prompt loads,
Then prompt may reference: "After a tough night's sleep, what do you need today?"

**AC5: Previous Entry Follow-Up**
Given the user mentioned "work stress" in last week's journal,
When journaling prompt loads,
Then personalized follow-up may appear: "You mentioned work pressure last week. Any updates?"

**AC6: Time-of-Day Appropriateness**
Given it's morning,
When journaling prompt loads,
Then morning-appropriate prompts prioritized (intentions, gratitude, not "reflect on today").

**AC7: Variety Despite Personalization**
Given personalization suggests gratitude prompts 3 days in a row,
When the 4th day loads,
Then a different category is selected for variety.

**AC8: Fallback to Research-Based**
Given personalization engine fails or returns low confidence,
When prompt loads,
Then fallback to random research-based prompt from library.

**AC9: User Feedback**
Given a personalized prompt is shown,
When the user rates it "not helpful",
Then feedback is recorded to improve future personalization.

### Success Metrics
- Personalization engagement: 60% of personalized prompts rated "helpful"
- Prompt relevance: 50% reduction in prompt skips after personalization active
- Data utilization: 80% of users with sufficient data receive personalized prompts
- User satisfaction: 4.5/5 rating for journaling prompts after 30 days

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Personalization <2s | Auth required | Context data not stored permanently | Screen reader support | iOS 14+, Android 10+ |
| Fallback <500ms | Encrypted analysis | Previous entries only analyzed, not stored raw | Min 4.5:1 contrast | All channels |

### Dependencies
- **Prerequisite Stories:** S07.2.1 (Prompt System), S07.2.2 (Journal Entry), S07.1.1 (Mood), S07.5.1 (Stress)
- **Related Stories:** S07.4.1 (Energy), S07.3.2 (Habits)
- **External Dependencies:** E5 (Sleep, Workout data), E8 (Cross-Domain Intelligence)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| No mood/stress data available | Use journal themes + time-of-day only |
| User always rates prompts "not helpful" | Reduce personalization confidence; offer more variety |
| Contradictory signals (high stress + good mood) | Use most recent signal; acknowledge complexity in prompt |
| User journals at irregular times | Adapt time-of-day logic; don't assume morning/evening pattern |
| Previous journal entry was blank | Skip journal theme analysis; use other context |

### Open Questions
- Should we show users WHY a prompt was selected ("Based on your recent mood...")?
- How long should previous journal themes influence personalization?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Bootstrap phase correctly limiting personalization
- [ ] Mood, stress, sleep, workout context incorporated
- [ ] Previous journal theme analysis functional
- [ ] Variety maintained despite personalization
- [ ] Fallback to research-based prompts working
- [ ] User feedback mechanism functional
- [ ] Performance requirements verified

---

# FEATURE F7.5: STRESS PATTERN DETECTION

---

## S07.5.1: Self-Report Stress Tracking

### User Story
**As a** Busy Professional (P2),
**I want to** quickly log my stress level with optional trigger identification,
**So that** I can track my stress patterns and understand what causes my stress.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Self-reported stress is the first signal in the multi-signal stress detection system. Users rate their stress on a 1-10 scale with optional trigger tagging. Daily evening check-ins capture overall stress, with on-demand logging available for acute stress moments.

**Stress Scale:**

| Rating | Label | Description |
|--------|-------|-------------|
| 1-2 | No stress | Completely relaxed, at ease |
| 3-4 | Mild stress | Slight tension, manageable |
| 5-6 | Moderate stress | Noticeable stress, affecting focus |
| 7-8 | High stress | Significant stress, difficulty coping |
| 9-10 | Extreme stress | Overwhelming, crisis-level |

**Stress Triggers:**
- Work
- Relationships
- Finances
- Health
- Family
- Uncertainty
- Time pressure
- Conflict
- Other (free text)

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Daily stress rating (1-10), optional single trigger. 10-second check-in. |
| **Deep** | Detailed stress logging with multiple triggers, notes, intensity tracking throughout day. |

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Stress Rating | Integer 1-10 | Required | User-only |
| Triggers | Array<Enum> | From trigger list | User-only |
| Other Trigger | String | If "Other" selected | User-only |
| Note | String | Max 500 chars | User-only |
| Timestamp | ISO 8601 | Required | System |
| Check-in Type | Enum | daily/on-demand | System |

**Behaviors:**
- Evening check-in prompt (default 8 PM): "How was your stress today?"
- On-demand logging available anytime
- Multiple stress logs per day accepted
- Triggers are multi-select (can have multiple stressors)
- Stress data is 30% weight in Mental Recovery Score

### Acceptance Criteria

**AC1: Stress Rating Input**
Given the user opens stress check-in,
When they slide to a stress level (1-10),
Then the rating saves with timestamp.

**AC2: Evening Prompt Delivery**
Given evening prompt time (default 8 PM),
When user has app open or notifications enabled,
Then "How was your stress today?" prompt appears.

**AC3: Trigger Selection**
Given the user is logging stress,
When they view trigger options,
Then they can select multiple triggers from the list.

**AC4: Other Trigger Free Text**
Given "Other" trigger is selected,
When the user enters custom trigger text,
Then the custom trigger saves with the stress log.

**AC5: On-Demand Stress Logging**
Given the user is experiencing acute stress,
When they open stress check-in manually,
Then they can log stress outside of daily prompt.

**AC6: Multiple Daily Logs**
Given the user logged stress this morning,
When they log again in the evening,
Then both logs are saved (not overwritten).

**AC7: Light Mode Quick Check**
Given the user is in Light mode,
When stress check-in opens,
Then simple slider + optional single trigger appears.

**AC8: Deep Mode Detailed Check**
Given the user is in Deep mode,
When stress check-in opens,
Then multiple triggers, notes field, and intensity details are available.

**AC9: Mental Recovery Score Integration**
Given stress data is logged,
When Mental Recovery Score calculates,
Then stress contributes 30% weight to the score.

### Success Metrics
- Daily stress logging: 70% of users log stress ≥1x/day
- Trigger tagging: 50% of stress logs include at least one trigger
- On-demand usage: 20% use on-demand stress logging for acute stress
- Average check-in time: <10 seconds for Light mode

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Stress save <1s | Auth required | Stress data user-only | Voice input support | iOS 14+, Android 10+ |
| Prompt delivery <2s | Encrypted at rest | No sharing without consent | 44x44pt touch targets | WhatsApp, Voice channels |

### Dependencies
- **Prerequisite Stories:** None (foundation for stress detection)
- **Related Stories:** S07.5.2, S07.5.3
- **External Dependencies:** E4 (Mobile App), E3 (WhatsApp), E2 (Voice coaching)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Chronic extreme stress (≥9 for 5+ days) | Escalation protocol: "Your stress is very high. Consider talking to a professional?" + resources |
| No stress logging for 3+ days | Re-engagement: "Haven't tracked stress recently. How are you holding up?" |
| All triggers selected (unlikely) | Accept; may indicate overwhelm |
| Stress improves dramatically (9→3 in 1 day) | Accept; flag for pattern analysis (positive) |
| Offline stress logging | Queue locally; sync when reconnected |

### Open Questions
- Should we show stress trend inline with the check-in ("Your stress has been 7+ for 3 days")?
- What's the appropriate escalation threshold for crisis resources?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 1-10 stress scale functional
- [ ] Trigger selection (multi-select) working
- [ ] Evening prompt delivering
- [ ] On-demand logging available
- [ ] Stress data feeding Mental Recovery Score (30% weight)
- [ ] Crisis escalation protocol implemented
- [ ] Performance requirements verified

---

## S07.5.2: Multi-Signal Stress Detection

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** have stress detected from multiple signals including biometrics, journaling sentiment, and app usage patterns,
**So that** I can understand my stress levels even when I don't consciously recognize or report them.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Multi-signal stress detection is yHealth's KEY DIFFERENTIATOR. By combining self-report with biometric cues, text sentiment analysis, and app usage patterns, yHealth detects stress that users may not consciously recognize. This enables proactive interventions before stress escalates.

**Four Signal Sources:**

| Signal | Source | Detection Method |
|--------|--------|------------------|
| **Self-Report** | S07.5.1 | User's 1-10 stress rating |
| **Biometric** | E9 (Wearables) | HRV (below baseline), elevated RHR |
| **Text Sentiment** | S07.2.2 (Journal) | Negative sentiment, stress keywords |
| **App Usage Patterns** | System | Reduced engagement, missed check-ins |

**Biometric Stress Indicators:**
| Metric | Stress Indicator | Detection |
|--------|-----------------|-----------|
| HRV | Below 30-day baseline | Low HRV = higher stress |
| RHR | Above 30-day baseline | Elevated RHR = potential stress |
| Sleep Disruption | Quality <60/100 | Poor sleep correlates with stress |
| Wake-ups | >5 per night | Sleep fragmentation = stress |

**Text Sentiment Analysis:**
- Negative sentiment keywords: "overwhelmed," "anxious," "stressed," "can't cope," "too much," "struggling"
- Tone shift detection: Sudden change from positive to negative journaling
- Sentiment scoring: -1 (very negative) to +1 (very positive)

**App Usage Pattern Detection:**
| Pattern | Stress Signal |
|---------|---------------|
| Missed check-ins (3+ days) | May indicate overwhelm or avoidance |
| Irregular logging patterns | Life disruption indicator |
| Decreased engagement | Possible stress/overwhelm |
| Increased mood logging | Awareness of emotional shift |

**Multi-Signal Aggregation Algorithm:**

```
Stress Score Calculation (0-10 Scale):

Base Score: Self-reported stress (if available)

Biometric Adjustments (if wearable connected):
- Low HRV (below baseline): +1 to +3 points
- Elevated RHR (above baseline): +1 to +2 points
- Poor sleep quality (<60): +1 point
- Sleep disruption (>5 wake-ups): +1 point

Text Sentiment Adjustments (if journaling):
- Negative sentiment: +1 to +2 points
- Stress keywords detected: +1 point per occurrence (max +3)
- Tone shift (positive → negative): +1 point

Behavioral Adjustments:
- Missed check-ins (3+ days): +1 point
- Irregular logging: +0.5 points
- Decreased engagement: +0.5 points

Final Stress Score = Base + Adjustments (capped at 10)
```

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Self-Report Score | Integer 1-10 | From S07.5.1 | User-only |
| Biometric Score | Float 0-10 | If wearable connected | System |
| Sentiment Score | Float 0-10 | From journal analysis | System |
| Behavioral Score | Float 0-10 | From usage patterns | System |
| Final Stress Score | Float 0-10 | Aggregated | User-only |
| Signals Used | Array<Enum> | Which signals contributed | System |
| Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Stress score calculates daily (end of day)
- If no self-report, use other signals only
- Surface discrepancy when biometric stress ≠ self-report
- Notify user when multi-signal stress detected without self-report

### Acceptance Criteria

**AC1: Self-Report Only Score**
Given the user logged stress but has no wearable/journal,
When stress score calculates,
Then self-report is the primary score (100% weight).

**AC2: Biometric Signal Integration**
Given the user has a connected wearable with HRV/RHR data,
When biometric data shows stress indicators,
Then biometric adjustments are added to base score.

**AC3: Sentiment Signal Integration**
Given the user journaled today,
When journal text is analyzed,
Then sentiment adjustments are applied based on tone and keywords.

**AC4: Behavioral Signal Integration**
Given the user's app engagement has decreased,
When behavioral patterns are analyzed,
Then behavioral adjustments are applied.

**AC5: Multi-Signal Aggregation**
Given all 4 signals are available,
When stress score calculates,
Then all signals are combined per algorithm (capped at 10).

**AC6: Stress Detected Without Self-Report**
Given biometric and sentiment signals indicate stress (≥7),
When the user has not self-reported stress,
Then prompt appears: "I'm noticing some stress signals. How are you really feeling?"

**AC7: Signal Discrepancy Alert**
Given self-report is low (3) but biometrics show high stress,
When scores are compared,
Then insight surfaces: "You said stress is low, but your body shows tension. Explore this?"

**AC8: Minimum Signal Requirement**
Given only 1 signal is available (e.g., self-report only),
When stress score calculates,
Then that single signal determines the score.

### Success Metrics
- Multi-signal stress detection: 60% of users receive stress insights from non-self-report signals
- Stress detection accuracy: 70% user agreement when AI flags stress
- Proactive alerts: 50% receive stress pattern alerts before self-reporting high stress
- Signal utilization: 80% of users with wearables have biometric signals contributing

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Score calculation <3s | Auth required | Analysis results user-only | Screen reader support | iOS 14+, Android 10+ |
| Daily calculation | Encrypted | Raw signals not stored long-term | N/A | Requires E9 for biometrics |

### Dependencies
- **Prerequisite Stories:** S07.5.1 (Self-Report), S07.2.2 (Journal Entry - for sentiment)
- **Related Stories:** S07.5.3
- **External Dependencies:** E9 (HRV, RHR from wearables), E8 (Sentiment analysis engine)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| No wearable connected (biometrics unavailable) | Use remaining 3 signals |
| No journal entries (sentiment unavailable) | Use remaining signals |
| Conflicting signals (high self-report, low biometrics) | Note discrepancy; use average or higher |
| All signals unavailable | Cannot calculate multi-signal score; prompt for data |
| User busy, not using app (could be stressed OR just busy) | Behavioral signal = +1 max; validate with check-in |

### Open Questions
- Should we weight signals differently (e.g., self-report as primary)?
- How should we handle weekend vs weekday behavioral patterns?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Self-report integration functional
- [ ] Biometric signals (HRV, RHR) contributing when available
- [ ] Sentiment analysis from journal entries working
- [ ] Behavioral pattern detection functional
- [ ] Multi-signal aggregation algorithm implemented
- [ ] Discrepancy alerts surfacing
- [ ] Performance requirements verified

---

## S07.5.3: Stress Alerts & Interventions

### User Story
**As a** user experiencing stress,
**I want to** receive timely alerts and actionable intervention recommendations,
**So that** I can manage my stress before it escalates and affects my health.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Stress alerts surface when patterns indicate concern - chronic high stress, stress spikes, or multi-signal detection. Intervention recommendations are actionable and contextual, ranging from immediate techniques (breathing exercises) to longer-term suggestions (schedule downtime).

**Alert Types:**

| Alert | Trigger | Timing |
|-------|---------|--------|
| **Chronic Stress** | Average stress ≥7 for 3+ days | End of 3rd day |
| **Stress Spike** | Stress increase >3 points in 24 hours | Immediate |
| **Multi-Signal Alert** | Biometric + sentiment indicate stress without self-report | End of day |
| **Stress Pattern** | Recurring stress at same time/trigger | After 3+ occurrences |

**Intervention Categories:**

| Category | Timing | Examples |
|----------|--------|----------|
| **Immediate** | Now | Breathing exercises, short walk, 5-min meditation |
| **Short-term** | Today | Schedule downtime, reduce commitments, sleep prioritization |
| **Long-term** | This week+ | Therapy resources, stress management courses, lifestyle changes |
| **Contextual** | Based on patterns | "Your stress is lowest on days you exercise and journal" |

**Intervention Recommendations:**

**Immediate (Acute Stress Relief):**
- "Try box breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times."
- "A 5-minute walk can help reset. Step outside if possible."
- "Quick body scan: Where are you holding tension? Consciously relax those muscles."

**Short-Term (Today's Recovery):**
- "Consider protecting the next hour from meetings."
- "Your evening is open - try a relaxing activity like reading or music."
- "Prioritize sleep tonight - aim for 7+ hours."

**Long-Term (Sustained Management):**
- "Consistent high stress may benefit from professional support. Resources: [links]"
- "Stress management courses like MBSR have strong evidence. Consider exploring."
- "Your stress patterns suggest work may be a factor. Boundary-setting resources: [links]"

**Contextual (Pattern-Based):**
- "Your stress is 40% lower on days you exercise. Try a workout today?"
- "Journaling before bed reduces your next-day stress by 20%. Write tonight?"
- "Weekends show lower stress. Protect this time."

**Escalation Protocol (PRD Section 14):**
- Trigger: Stress ≥9 for 5+ consecutive days OR crisis keywords in journaling
- Response: Provide mental health resources (not intervention)
- Resources: Crisis hotlines, therapist finder, wellness check-in

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Alert Type | Enum | From alert types | System |
| Trigger Condition | String | What triggered alert | System |
| Recommendations Shown | Array<String> | What was suggested | System |
| User Action | Enum | accepted/dismissed/snoozed | User-only |
| Outcome | Enum | If tracked, stress reduction? | System |
| Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Alerts delivered via preferred channel (app notification, WhatsApp)
- Maximum 2 stress alerts per day (avoid overwhelm)
- User can snooze alerts for 24 hours
- Recommendations are actionable (specific, not generic)
- Escalation protocol followed for extreme cases

### Acceptance Criteria

**AC1: Chronic Stress Alert**
Given the user's average stress ≥7 for 3 consecutive days,
When the 3rd day ends,
Then alert appears: "Your stress has been high for 3 days. Here are some strategies..."

**AC2: Stress Spike Alert**
Given the user's stress increased from 4 to 8 in 6 hours,
When the spike is detected,
Then immediate alert appears with breathing exercise recommendation.

**AC3: Multi-Signal Alert**
Given biometrics and sentiment indicate stress but no self-report,
When end of day calculation runs,
Then alert appears: "I'm noticing some stress signals. How are you really feeling?"

**AC4: Immediate Intervention Recommendation**
Given a high-stress alert is triggered,
When recommendations display,
Then immediate technique (e.g., box breathing) is first option.

**AC5: Contextual Recommendation**
Given the user's stress pattern data shows exercise reduces stress,
When stress alert displays,
Then contextual recommendation appears: "Your stress is lower on workout days. Try a workout today?"

**AC6: Alert Dismissal**
Given a stress alert is displayed,
When the user dismisses it,
Then alert is acknowledged and won't repeat for same trigger (unless pattern continues).

**AC7: Alert Snooze**
Given a stress alert is displayed,
When the user selects "Snooze",
Then alert is hidden for 24 hours.

**AC8: Max 2 Alerts Per Day**
Given the user has received 2 stress alerts today,
When a third trigger occurs,
Then additional alert is queued for tomorrow (not shown today).

**AC9: Escalation Protocol**
Given the user's stress ≥9 for 5 consecutive days OR crisis keywords detected,
When alert generates,
Then escalation resources are provided: crisis hotlines, therapist finder.

**AC10: Multi-Channel Delivery**
Given the user prefers WhatsApp notifications,
When a stress alert triggers,
Then alert is delivered via WhatsApp.

### Success Metrics
- Alert acceptance: 55% of stress alerts accepted (not dismissed)
- Intervention effectiveness: 60% report lower stress after accepting intervention
- Proactive detection: 50% of chronic stress alerts occur before user consciously recognizes issue
- Escalation compliance: 100% compliance with PRD Section 14 safety protocols

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Alert delivery <5s | Auth required | Alert history user-only | Screen reader support | iOS 14+, Android 10+ |
| Recommendation load <2s | Encrypted | No external sharing | Voice delivery option | WhatsApp, Voice channels |

### Dependencies
- **Prerequisite Stories:** S07.5.1 (Self-Report), S07.5.2 (Multi-Signal)
- **Related Stories:** S07.7.2 (Mindfulness Recommendations)
- **External Dependencies:** E2 (Voice delivery), E3 (WhatsApp delivery), E4 (App notifications)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| User dismisses all alerts | Reduce frequency; ask: "Stress alerts don't seem helpful. Want fewer or different suggestions?" |
| Stress resolves before alert delivered | Cancel alert if stress improved significantly |
| User in "Do Not Disturb" | Queue alert; deliver when DND ends |
| Escalation resources unavailable in user's region | Provide generic resources; note limitation |
| User reports alert was false positive | Learn from feedback; adjust multi-signal thresholds |

### Open Questions
- Should we track intervention effectiveness longitudinally?
- What's the appropriate delay before repeat alerts for same pattern?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Chronic stress alerts triggering correctly
- [ ] Stress spike alerts working
- [ ] Multi-signal alerts functional
- [ ] Immediate, short-term, long-term recommendations displaying
- [ ] Contextual recommendations generating
- [ ] Escalation protocol implemented per PRD Section 14
- [ ] Multi-channel delivery working (app, WhatsApp)
- [ ] Max 2 alerts per day enforced
- [ ] Performance requirements verified

---

# FEATURE F7.6: WELLBEING GOALS & ROUTINES

---

## S07.6.1: Wellbeing Goal Setting

### User Story
**As a** Habit Formation Seeker (P4),
**I want to** set wellbeing improvement goals with AI-suggested targets,
**So that** I can work toward meaningful improvements in my mood, stress, energy, and habits.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Wellbeing goal setting applies the SMART framework to mental and emotional improvement. AI suggests realistic targets based on user's baseline data. Goals can target mood improvement, stress reduction, energy optimization, habit formation, sleep quality, or emotional regulation.

**Goal Categories:**

| Category | Example Goals |
|----------|---------------|
| **Mood Improvement** | "Increase average mood from 6 to 8 within 30 days" |
| **Stress Reduction** | "Reduce high-stress days (≥7) from 4/week to 1/week" |
| **Energy Optimization** | "Achieve morning energy ≥7 for 5+ days/week" |
| **Habit Formation** | "Meditate 5 days/week for 21 consecutive days" |
| **Sleep Quality** | "Improve sleep quality score from 70 to 85" |
| **Emotional Regulation** | "Reduce mood volatility (daily range <3 points)" |

**SMART Goal Framework:**
- **Specific:** Clear target metric (mood score, stress days, habit streak)
- **Measurable:** Quantifiable progress tracking
- **Achievable:** AI suggests realistic targets based on baseline
- **Relevant:** Connected to wellbeing improvements
- **Time-bound:** 7-day, 21-day, 30-day, 90-day windows

**AI-Suggested Targets:**
Based on user's baseline data (last 14 days), AI suggests achievable improvements:
- If baseline mood is 5.5, suggest target of 6.5-7.0 (realistic 15-25% improvement)
- If baseline stress days are 5/week at ≥7, suggest reduction to 3/week
- If no baseline data, suggest starting goals (e.g., "Log mood daily for 7 days")

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Goal ID | UUID | Required | System |
| Goal Category | Enum | From 6 categories | User-only |
| Target Metric | String | Specific to category | User-only |
| Current Baseline | Float | System calculated | System |
| Target Value | Float | User or AI suggested | User-only |
| Timeframe | Enum | 7d/21d/30d/90d | User-only |
| Start Date | Date | Required | System |
| End Date | Date | Calculated | System |
| Status | Enum | active/completed/abandoned | System |

**Behaviors:**
- AI suggests goals based on available data
- User can accept, modify, or create custom goals
- Goals appear in wellbeing dashboard
- Progress updates daily
- Celebration on goal achievement

### Acceptance Criteria

**AC1: Goal Category Selection**
Given the user wants to set a wellbeing goal,
When they view goal categories,
Then all 6 categories are available: Mood, Stress, Energy, Habit, Sleep, Emotional Regulation.

**AC2: AI-Suggested Target**
Given the user has 14+ days of mood data (baseline: 5.5),
When they select "Mood Improvement" goal,
Then AI suggests: "Increase average mood to 6.5-7.0 within 30 days."

**AC3: Custom Target Override**
Given AI suggests a target,
When the user wants a different target,
Then they can modify the value (within reasonable bounds).

**AC4: Timeframe Selection**
Given the user is creating a goal,
When they select timeframe,
Then options are: 7 days, 21 days, 30 days, 90 days.

**AC5: Goal Without Baseline Data**
Given the user has <14 days of relevant data,
When they try to set a goal,
Then AI suggests data collection goal: "Log mood daily for 7 days to establish baseline."

**AC6: SMART Validation**
Given the user creates a goal,
When they attempt to save,
Then validation ensures: specific metric, measurable target, time-bound.

**AC7: Active Goal Limit**
Given the user has 3 active wellbeing goals,
When they try to add a 4th,
Then suggestion appears: "Focus on fewer goals for better results. Complete one first?"

**AC8: Goal Dashboard Display**
Given the user has active goals,
When they view wellbeing dashboard,
Then goals appear with progress indicators.

### Success Metrics
- Goal creation: 60% of users create ≥1 wellbeing goal
- AI suggestion acceptance: 70% accept AI-suggested targets (with or without modification)
- Goal achievement: 55% achieve wellbeing goal within timeframe
- Multi-goal engagement: 40% have 2+ active goals

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Goal create <1s | Auth required | Goal data user-only | Screen reader support | iOS 14+, Android 10+ |
| AI suggestion <2s | Encrypted | Baseline data not shared | Min 4.5:1 contrast | All channels |

### Dependencies
- **Prerequisite Stories:** S07.1.1 (Mood), S07.4.1 (Energy), S07.5.1 (Stress), S07.3.1 (Habits)
- **Related Stories:** S07.6.2, S07.6.3
- **External Dependencies:** E5 (Sleep data), E8 (AI suggestion engine)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Unrealistic goal (mood 4→10 in 7 days) | Warning: "This goal seems ambitious. Smaller improvements may be more sustainable." |
| Goal already achieved at creation | Note: "You're already meeting this target! Set a stretch goal?" |
| Goal category without data | Prompt to log relevant data first |
| All goals abandoned | Check-in: "Goals haven't been resonating. Want help adjusting?" |
| Duplicate active goal in same category | Warning: "You have an active mood goal. Replace or keep both?" |

### Open Questions
- Should we allow team/accountability partner goals?
- What happens to goals when user goes on vacation?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 6 goal categories functional
- [ ] AI-suggested targets generating based on baseline
- [ ] Custom target override working
- [ ] SMART validation enforced
- [ ] Goal dashboard displaying progress
- [ ] Performance requirements verified

---

## S07.6.2: Routine Templates & Builder

### User Story
**As a** Busy Professional (P2),
**I want to** use pre-built routine templates or create custom routines,
**So that** I can build consistent morning and evening practices without figuring out what to include.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Pre-built routine templates provide research-backed sequences for morning energy, evening wind-down, and stress reset. Users can use templates as-is or customize. The custom builder allows creating any routine from scratch.

**Pre-Built Routine Templates:**

**Morning Energizer (15 minutes):**
1. Gratitude reflection (1 min): "What are you grateful for today?"
2. Light stretching (5 min): Gentle movement to wake up body
3. Hydrate (1 glass water): Rehydrate after sleep
4. Deep breathing (3 min): 4-7-8 breathing technique
5. Intention setting (2 min): "What's one intention for today?"

**Evening Wind-Down (20 minutes):**
1. Screen-free time (start 30 min before bed): No phones, TV, screens
2. Reflection journaling (5 min): "What went well today? What to release?"
3. Breathing exercise (3 min): Box breathing or progressive relaxation
4. Gratitude practice (2 min): "Three things from today I'm grateful for"
5. Sleep preparation: Dark, cool room, ready for rest

**Stress Reset (15 minutes):**
1. Find quiet space (1 min): Step away from stressor
2. Deep breathing (5 min): Focus on slowing breath
3. Body scan (5 min): Notice tension, consciously relax
4. Stress journaling (5 min): "What's causing stress? What's in my control?"

**Custom Routine Builder:**
- Add/remove steps from templates
- Define custom steps with name, duration, description
- Set routine frequency: Daily, Weekdays, Weekends, Specific days
- Time-based triggers: "Start at 7am"

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Routine ID | UUID | Required | System |
| Routine Name | String | 1-100 chars | User-only |
| Routine Type | Enum | morning/evening/stress/custom | User-only |
| Steps | Array<Step> | 2-10 steps | User-only |
| Step Name | String | Required | User-only |
| Step Duration | Integer (minutes) | 1-60 | User-only |
| Step Description | String | Optional | User-only |
| Frequency | Enum | daily/weekdays/weekends/specific | User-only |
| Trigger Time | Time | Optional | User-only |
| Based On Template | UUID | If from template | System |

**Behaviors:**
- Templates appear as starting points
- Customization saves as new routine (doesn't modify template)
- Routines appear in daily checklist at trigger time
- Multiple routines supported (morning AND evening)
- Routine completion tracked per day

### Acceptance Criteria

**AC1: Template Selection**
Given the user wants to start a routine,
When they view templates,
Then Morning Energizer, Evening Wind-Down, Stress Reset are available.

**AC2: Use Template As-Is**
Given the user selects Morning Energizer template,
When they confirm without changes,
Then the routine is created with all template steps.

**AC3: Customize Template**
Given the user selects a template,
When they remove/add steps or adjust durations,
Then customized routine saves as their own (template unchanged).

**AC4: Custom Routine Creation**
Given the user wants a unique routine,
When they select "Create Custom",
Then they can add steps, durations, and descriptions from scratch.

**AC5: Step Management**
Given the user is editing a routine,
When they add/remove/reorder steps,
Then changes save correctly.

**AC6: Frequency Setting**
Given the user creates a routine,
When they set frequency to "Weekdays only",
Then routine appears only Monday-Friday.

**AC7: Trigger Time Setting**
Given the user wants reminders,
When they set trigger time (e.g., 7:00 AM),
Then notification triggers at that time on applicable days.

**AC8: Multiple Routines**
Given the user has Morning Energizer routine,
When they create Evening Wind-Down,
Then both routines are active independently.

**AC9: Routine Step Detail**
Given a routine step is displayed,
When the user taps for details,
Then step description/instructions appear.

### Success Metrics
- Routine adoption: 65% of users create ≥1 routine
- Template usage: 70% of routines start from templates
- Customization rate: 40% customize templates (add/remove steps)
- Multiple routine adoption: 35% have morning AND evening routines

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Routine create <1s | Auth required | Routine data user-only | Voice input for steps | iOS 14+, Android 10+ |
| Template load <500ms | Encrypted | No sharing | 44x44pt touch targets | All channels |

### Dependencies
- **Prerequisite Stories:** S07.3.1 (Habit Creation - similar UX patterns)
- **Related Stories:** S07.6.1, S07.6.3
- **External Dependencies:** E4 (Mobile App UI)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Routine with 0 steps | Validation: "Routines need at least 2 steps" |
| Step duration >60 minutes | Warning: "Long steps may be hard to complete consistently" |
| Overlapping routine times | Allow but note: "Morning Energizer and Yoga Routine overlap at 7am" |
| Template updated by system | User's custom routine unaffected; templates are starting points only |
| Delete routine with completion history | Confirmation: "Delete routine? History will be preserved for reference." |

### Open Questions
- Should we offer audio/video guides for routine steps?
- Can users share custom routines with others?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 3 pre-built templates available
- [ ] Template customization functional
- [ ] Custom routine builder working
- [ ] Step add/remove/reorder functional
- [ ] Frequency and trigger time settings working
- [ ] Multiple routines supported
- [ ] Performance requirements verified

---

## S07.6.3: Routine Tracking & Analytics

### User Story
**As a** Habit Formation Seeker (P4),
**I want to** track my routine completion with streaks and see how routines affect my wellbeing,
**So that** I can stay motivated and understand which routines make the biggest difference.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Routine tracking provides daily checklists for routine steps, streak tracking for consistency, and analytics showing how routines correlate with mood, energy, and sleep. AI recommendations suggest routine optimizations based on data.

**Daily Routine Checklist:**
- Routine steps appear as checklist at trigger time
- Each step can be marked complete
- Partial completion tracked (3/5 steps = 60%)
- Completion time recorded

**Routine Streaks:**
| Streak | Milestone |
|--------|-----------|
| 3 days | "3-day routine streak! Building momentum." |
| 7 days | "7-day streak! This is becoming automatic." |
| 21 days | "21-day streak! Your routine is now a habit." |
| 30 days | "30-day streak! Routines are part of who you are." |

**Routine Analytics:**
- **Consistency Score:** Days completed / Days applicable (e.g., 5/7 = 71%)
- **Average Completion:** Steps completed per day
- **Best/Worst Days:** Which days are most/least consistent
- **Completion Time:** Average time to complete routine

**Routine-Outcome Correlations:**
| Correlation | Example Insight |
|-------------|-----------------|
| Routine → Mood | "Morning routine days have 25% better mood" |
| Routine → Energy | "Evening routine = +2 energy next morning" |
| Routine → Sleep | "Evening routine improves sleep quality 18%" |
| Routine → Recovery | "Routine completion = +5 Mental Recovery Score bonus" |

**AI Optimization Recommendations:**
- "Based on your patterns, adding meditation to morning routine could boost mood 20%"
- "Your stress is lowest on routine-completion days. Prioritize your morning routine."
- "Evening journaling step has highest impact. Consider extending it."

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Routine ID | UUID | Required | System |
| Date | Date | Required | System |
| Steps Completed | Array<Boolean> | Per step | User-only |
| Completion Rate | Float 0-1 | Calculated | User-only |
| Time Started | Time | Optional | User-only |
| Time Completed | Time | Optional | User-only |
| Current Streak | Integer | Calculated | User-only |
| Longest Streak | Integer | Calculated | User-only |

**Behaviors:**
- Routine checklist appears at trigger time (or accessible anytime)
- Steps can be completed in any order
- Partial completion counts toward analytics
- +5 Mental Recovery Score bonus when routine completed (100%)
- Streak resets if routine missed on applicable day

### Acceptance Criteria

**AC1: Daily Routine Checklist**
Given a routine is set for today,
When the user opens routines,
Then checklist appears with all routine steps.

**AC2: Step Completion**
Given a routine step is shown,
When the user taps the checkbox,
Then step marks complete with visual feedback.

**AC3: Partial Completion Tracking**
Given the user completes 3 of 5 steps,
When viewing routine status,
Then completion shows: "3/5 steps (60%)"

**AC4: Routine Streak Display**
Given the user has completed routine for 7 consecutive days,
When viewing routine,
Then streak displays: "🔥 7-day streak!"

**AC5: Streak Milestone Celebration**
Given the user reaches 7-day streak,
When they complete today's routine,
Then celebratory message appears.

**AC6: Consistency Score**
Given the user has routine data for 2+ weeks,
When viewing analytics,
Then consistency score displays (e.g., "71% consistency this month").

**AC7: Routine-Outcome Correlation**
Given the user has 14+ days of routine + mood data,
When correlations calculate,
Then insight appears: "Morning routine days have X% better mood."

**AC8: AI Optimization Recommendation**
Given routine correlation data shows meditation has high impact,
When recommendations generate,
Then suggestion appears: "Add meditation to your routine for better results."

**AC9: Mental Recovery Score Bonus**
Given the user completes routine 100%,
When Mental Recovery Score calculates,
Then +5 bonus is applied.

**AC10: Streak Reset**
Given the user misses routine on an applicable day,
When the next day loads,
Then streak resets to 0 with message: "Routine streak ended. Start fresh today!"

### Success Metrics
- Routine consistency: 60% maintain routine ≥5 days/week for 30+ days
- Streak achievement: 50% achieve 7-day routine streak
- Correlation insights: 70% receive routine-outcome insights within 14 days
- Morning routine impact: 70% report improved mood/energy on routine days

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Checklist load <1s | Auth required | Routine data user-only | 44x44pt touch targets | iOS 14+, Android 10+ |
| Analytics load <2s | Encrypted | Correlations user-only | Screen reader support | All channels |

### Dependencies
- **Prerequisite Stories:** S07.6.2 (Routine Templates), S07.1.1 (Mood), S07.4.1 (Energy)
- **Related Stories:** S07.6.1, S07.3.2 (Habit Streaks - similar patterns)
- **External Dependencies:** E5 (Sleep data), E8 (Cross-Domain Intelligence)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Routine never completed (0% for 7+ days) | Suggestion: "Haven't completed this routine. Make it easier or remove?" |
| Routine completed very late (10pm for morning routine) | Accept but note: "Morning routine completed at 10pm - consider adjusting schedule?" |
| Partial completion consistent (always 60%) | Insight: "You consistently complete X steps. Make those your core routine?" |
| User on vacation (unusual schedule) | Allow "pause" routine without breaking streak (manual flag) |
| Routine step takes much longer than expected | Note in analytics; suggest adjusting duration |

### Open Questions
- Should routine completion count if done in wrong order?
- How should we handle timezone changes for routine streaks?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Daily checklist rendering correctly
- [ ] Step completion tracking functional
- [ ] Partial completion analytics working
- [ ] Streak tracking and milestones functional
- [ ] Routine-outcome correlations generating
- [ ] AI recommendations displaying
- [ ] Mental Recovery Score bonus applying
- [ ] Performance requirements verified

---

# FEATURE F7.7: MINDFULNESS RECOMMENDATIONS

---

## S07.7.1: Mindfulness Practice Library

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** access a library of mindfulness practices with text-based instructions,
**So that** I can practice breathing exercises, meditation, and body scans without needing a separate meditation app.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The mindfulness practice library provides 15+ practices with clear text-based instructions. yHealth acts as a coach who recommends and explains practices, NOT as a meditation app with guided audio. Users can browse, learn, and practice mindfulness techniques for stress reduction, mood improvement, and better sleep.

**Important Design Principle:**
yHealth provides TEXT-BASED INSTRUCTIONS ONLY. No guided audio recordings. This positions yHealth as a coach/recommender, not a Headspace/Calm competitor.

**Practice Categories:**

| Category | Practices Included |
|----------|-------------------|
| **Breathing Exercises** | Box breathing, 4-7-8 breathing, Diaphragmatic breathing |
| **Meditation** | Body scan, Loving-kindness, Mindfulness meditation, Gratitude meditation |
| **Movement** | Mindful walking, Gentle stretching, Progressive muscle relaxation |
| **Quick Resets** | 1-minute breathing, 2-minute body awareness, 3-minute gratitude |
| **Evening Practices** | Sleep meditation prep, Evening reflection, Body scan for sleep |

**Practice Details (15+ Practices):**

**Box Breathing (3 min):**
- *When to use:* High stress, anxiety, need to calm down quickly
- *Why it helps:* Activates parasympathetic nervous system, reduces stress hormones
- *Instructions:* Inhale 4s → Hold 4s → Exhale 4s → Hold 4s → Repeat

**4-7-8 Breathing (3 min):**
- *When to use:* Before sleep, acute anxiety
- *Why it helps:* Naturally tranquilizing for the nervous system
- *Instructions:* Inhale 4s → Hold 7s → Exhale 8s → Repeat 4 times

**Body Scan Meditation (10 min):**
- *When to use:* Bedtime, after stressful day, muscle tension
- *Why it helps:* Releases physical tension, grounds in present moment
- *Instructions:* Progressive attention from toes to head, noticing sensations

**Loving-Kindness Meditation (5 min):**
- *When to use:* Low mood, feeling disconnected, need emotional warmth
- *Why it helps:* Activates compassion, reduces self-criticism
- *Instructions:* Self-directed well-wishes, then to loved ones, then all beings

**Mindful Walking (10 min):**
- *When to use:* Need movement, stuck indoors, low energy
- *Why it helps:* Combines mindfulness with movement, grounds in body
- *Instructions:* Slow, deliberate walking with attention to sensations

**Duration Options:**
Each practice available in multiple durations:
- 1-3 minutes (Quick Reset)
- 5 minutes (Short Practice)
- 10 minutes (Standard Practice)
- 20 minutes (Extended Practice)

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Practice ID | UUID | Required | System |
| Practice Name | String | From library | System |
| Practice Category | Enum | breathing/meditation/movement/quick/evening | System |
| Duration Options | Array<Integer> | Minutes | System |
| Instructions | String | Text-based | System |
| Benefits | String | Why it helps | System |
| Best Context | String | When to use | System |

**Behaviors:**
- Practices browsable by category
- Each practice has "Why it helps" explanation
- Duration selection before starting practice
- Timer available during practice (optional)
- Practice completion can be logged

### Acceptance Criteria

**AC1: Practice Library Access**
Given the user opens mindfulness section,
When library loads,
Then all 15+ practices are browsable by category.

**AC2: Practice Detail View**
Given the user selects a practice (e.g., Box Breathing),
When detail view opens,
Then: name, duration options, "why it helps," "when to use," and instructions are shown.

**AC3: Duration Selection**
Given the user wants to do Body Scan,
When they select duration,
Then options appear: 5 min, 10 min, 20 min.

**AC4: Text-Based Instructions**
Given the user starts a practice,
When instructions display,
Then they are text-based (NO audio recordings).

**AC5: Category Browsing**
Given the user wants breathing exercises specifically,
When they filter by "Breathing",
Then only breathing practices appear.

**AC6: Practice Timer (Optional)**
Given the user starts a 5-minute practice,
When they want timing assistance,
Then optional timer counts down.

**AC7: Practice Completion Logging**
Given the user finishes a practice,
When they complete it,
Then practice is logged to history with timestamp and duration.

**AC8: No Audio Content**
Given any practice in the library,
When viewing its content,
Then NO audio files or guided recordings are present.

### Success Metrics
- Library exploration: 60% of users browse practice library
- Practice completion: 50% complete at least one practice from library
- Category engagement: All 5 categories have >20% usage
- Repeat practice: 40% return to same practice within 7 days

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Library load <2s | Auth required | Practice history user-only | Screen reader support | iOS 14+, Android 10+ |
| Practice load <500ms | N/A | No tracking of instruction views | Min 4.5:1 contrast | All channels |

### Dependencies
- **Prerequisite Stories:** None (foundation for mindfulness)
- **Related Stories:** S07.7.2
- **External Dependencies:** E4 (Mobile App UI)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| User expects audio guidance | Clear message: "yHealth provides instructions, not guided audio. Use your preferred meditation app for audio." |
| Practice timer interrupted | Timer pauses; can resume or cancel |
| User has external meditation app | Acknowledge: "Already use Headspace? Great! We'll recommend practices, you can use your app to guide them." |
| Practice instructions unclear | Feedback option: "Was this helpful?" to improve instructions |
| Offline access | Practice library available offline (text content cached) |

### Open Questions
- Should we include video demonstrations of breathing techniques?
- Can users mark favorite practices for quick access?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 15+ practices implemented across 5 categories
- [ ] Practice details include: name, durations, why, when, instructions
- [ ] Category filtering working
- [ ] Timer functionality operational
- [ ] Completion logging functional
- [ ] NO audio content present (text-based only)
- [ ] Performance requirements verified

---

## S07.7.2: Context-Aware Recommendations

### User Story
**As a** Busy Professional (P2),
**I want to** receive mindfulness practice recommendations based on my current stress, mood, energy, and time of day,
**So that** I know what to do without needing to become a mindfulness expert.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Context-aware mindfulness recommendations surface the right practice at the right time. When the user is stressed, they get breathing exercises. When mood is low, loving-kindness meditation is suggested. The AI acts as a knowledgeable coach, not a meditation app.

**Recommendation Triggers:**

| Context | Recommendation Priority |
|---------|------------------------|
| **High stress (≥7)** | Calming: Box breathing, Body scan |
| **Low energy** | Gentle: Breathing exercises, Seated meditation |
| **Low mood** | Uplifting: Loving-kindness, Gratitude practice |
| **Anxious mood** | Grounding: Box breathing, Body scan |
| **Morning (6-9am)** | Energizing: Gratitude meditation, Intention setting |
| **Afternoon (2-5pm)** | Reset: Breathing exercises, Quick mindful break |
| **Evening (7-10pm)** | Wind-down: Sleep meditation prep, Evening body scan |
| **Post-workout** | Recovery: Breathing, Body scan |
| **Pre-sleep** | Sleep prep: 4-7-8 breathing, Body scan for sleep |

**Recommendation Delivery:**

| Mode | Experience |
|------|------------|
| **Light** | Simple recommendation: "Try 3 minutes of deep breathing right now." One-tap accept/decline. |
| **Deep** | Multiple options with explanations: "Here are 3 practices for your current state..." |

**Recommendation Logic:**
```
1. Assess current context:
   - Stress level (from S07.5.*)
   - Mood (from S07.1.1)
   - Energy (from S07.4.1)
   - Time of day
   - Recent activity (post-workout, pre-sleep)

2. Match practice to context:
   - High stress → Calming practices
   - Low mood → Compassion practices
   - Low energy → Gentle practices
   - Evening → Wind-down practices

3. Select duration based on context:
   - Stressed + busy → 1-3 minutes
   - Moderate stress → 5-10 minutes
   - Low stress + time → 10-20 minutes
   - User's historical preference

4. Avoid repetition:
   - Same practice not recommended 2 days in a row
   - Variety across categories over week

5. Learn from feedback:
   - Prioritize practices user has rated highly
   - Reduce frequency of declined practices
```

**Recommendation Frequency:**
- Maximum 2 recommendations per day (avoid overwhelm)
- Minimum 4 hours between recommendations
- Reduce if user consistently declines

**Data Captured:**

| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Recommendation ID | UUID | Required | System |
| Practice Recommended | UUID | From library | System |
| Context Used | JSON | Stress/mood/energy/time | System |
| User Response | Enum | accepted/declined/ignored | User-only |
| Practice Completed | Boolean | If accepted | User-only |
| Effectiveness Rating | Integer 1-10 | Post-practice | User-only |
| Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Recommendations delivered via app notification or in-app prompt
- WhatsApp delivery: "Quick stress reset: Try box breathing. [Accept] [Not now]"
- Voice delivery: AI coach verbally suggests practice
- Post-practice feedback: "Did this help?" (1-10 rating)
- AI learns from acceptance patterns and effectiveness ratings

### Acceptance Criteria

**AC1: Stress-Based Recommendation**
Given the user's stress is high (≥7),
When mindfulness recommendation triggers,
Then calming practice is recommended (e.g., "Your stress is high. Try 5 minutes of box breathing?").

**AC2: Mood-Based Recommendation**
Given the user's mood is low,
When mindfulness recommendation triggers,
Then uplifting practice is recommended (e.g., "Try loving-kindness meditation to lift your spirits").

**AC3: Time-of-Day Recommendation**
Given it's evening (8 PM),
When user opens mindfulness section,
Then wind-down practices are prioritized in suggestions.

**AC4: Light Mode One-Tap**
Given the user is in Light mode,
When recommendation appears,
Then simple accept/decline buttons are shown (no lengthy explanation).

**AC5: Deep Mode Multiple Options**
Given the user is in Deep mode,
When recommendation triggers,
Then 2-3 practice options are shown with brief explanations.

**AC6: Post-Practice Feedback**
Given the user completes a recommended practice,
When practice ends,
Then "Did this help? (1-10)" feedback prompt appears.

**AC7: Recommendation Frequency Limit**
Given the user received a mindfulness recommendation this morning,
When they're stressed in the afternoon,
Then max 1 more recommendation today (2 per day max).

**AC8: Declined Practice Learning**
Given the user declines "Box breathing" 3 times,
When future recommendations generate,
Then Box breathing frequency is reduced.

**AC9: WhatsApp Delivery**
Given the user prefers WhatsApp,
When recommendation triggers,
Then message is sent: "Quick stress reset: Try box breathing. Reply YES to start."

**AC10: No Repetition**
Given the user did Body Scan yesterday via recommendation,
When today's recommendation generates,
Then Body Scan is not recommended (variety maintained).

### Success Metrics
- Recommendation acceptance: 55% accept mindfulness recommendation when offered
- Practice completion: 70% complete recommended practice after accepting
- Stress reduction post-practice: 60% report lower stress after completing practice
- Regular practice adoption: 40% do mindfulness ≥3x/week after 30 days

### Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Recommendation gen <2s | Auth required | Recommendations user-only | Screen reader support | iOS 14+, Android 10+ |
| Context analysis <1s | Encrypted | Context not stored permanently | Voice delivery option | WhatsApp, Voice channels |

### Dependencies
- **Prerequisite Stories:** S07.7.1 (Practice Library), S07.5.* (Stress), S07.1.1 (Mood), S07.4.1 (Energy)
- **Related Stories:** S07.5.3 (Stress Interventions)
- **External Dependencies:** E3 (WhatsApp), E2 (Voice), E4 (App notifications)

### Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Recommendation rejected 3x in a row | Reduce frequency: "Noticed you've skipped suggestions. Prefer different practices or less often?" |
| Practice never completed after acceptance | Reduce confidence in that practice for user |
| Practice rated ineffective (<4) | Remove from recommendation pool for 30 days |
| User already uses meditation app | Acknowledge: "Great! I'll suggest practices to complement your app, not replace it." |
| No context data available | Default to time-of-day appropriate recommendation |
| Conflicting context (high stress + good mood) | Prioritize stress (safety first) |

### Open Questions
- Should we integrate with external meditation apps for seamless handoff?
- Can users set "do not recommend" for specific practices?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Context-aware recommendations generating based on stress/mood/energy/time
- [ ] Light and Deep mode delivery functional
- [ ] Post-practice feedback collecting
- [ ] Recommendation frequency limits enforced
- [ ] Learning from declined practices working
- [ ] Multi-channel delivery (app, WhatsApp, voice)
- [ ] No repetition logic functional
- [ ] Performance requirements verified

---

## Implementation Sequence (Recommended)

| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S07.1.1 | Mood input - foundation signal |
| 2 | S07.4.1 | Energy input - parallel foundation signal |
| 3 | S07.1.2 | Mood patterns - builds on S07.1.1 |
| 4 | S07.4.2 | Energy patterns - builds on S07.4.1 |
| 5 | S07.3.1 | Habit creation - foundation for tracking |
| 6 | S07.3.2 | Habit logging - builds on S07.3.1 |
| 7 | S07.2.1 | Journal prompts - foundation for journaling |
| 8 | S07.2.2 | Journal entry - builds on S07.2.1 |
| 9 | S07.3.3 | Habit correlations - requires mood/energy/habit data |
| 10 | S07.2.3 | Journal AI - requires mood/stress/journal data |
| 11 | S07.5.1 | Self-report stress - foundation for stress detection |
| 12 | S07.5.2 | Multi-signal stress - requires journal (sentiment), S07.5.1 |
| 13 | S07.5.3 | Stress alerts - requires S07.5.1, S07.5.2 |
| 14 | S07.6.1 | Wellbeing goals - requires mood/energy/stress baselines |
| 15 | S07.6.2 | Routine templates - foundation for routines |
| 16 | S07.6.3 | Routine tracking - builds on S07.6.2 |
| 17 | S07.7.1 | Practice library - foundation for mindfulness |
| 18 | S07.7.2 | Context recommendations - requires stress/mood/energy, S07.7.1 |

---

*Epic 07: Wellbeing Pillar Stories v1.0 | Xyric Solutions | 2025-12-11*
*Generated via EXPERT-13 Story Generator v3.0*
*Total Stories: 18 | All P0 Must Have | All Draft Status*
*KEY DIFFERENTIATOR: Daily Wellbeing as Equal Pillar with Multi-Signal Stress Detection*

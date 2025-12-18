# yHealth Platform - Design Decisions

> **Source:** Executive Vision Document v4.0 + PRD v4.1

---

## Core Design Philosophy

### User-Adaptive Flexibility

Every feature supports both Light and Deep engagement modes. No judgment - light mode is a valid long-term choice.

| Engagement Level | Characteristics |
|------------------|-----------------|
| **Light Mode** | Quick check-ins (30 sec), emoji logging, summary insights, brief nudges |
| **Deep Mode** | Detailed journaling (10+ min), rich narratives, granular analytics, extended sessions |

### Flexibility Spectrum by Feature

| Feature Area | Light Mode | Deep Mode |
|-------------|------------|-----------|
| **Onboarding** | 3-5 min questionnaire | 10-15 min AI conversation |
| **Daily Check-ins** | Emoji + energy rating | Full journaling + reflection |
| **Coaching Calls** | 5 min quick check | 20-30 min deep session |
| **Insights** | Key highlights only | Detailed correlation analysis |
| **Goal Tracking** | Simple progress bar | Comprehensive metrics dashboard |
| **Meal Logging** | Photo + AI estimate | Full macro/calorie breakdown |

---

## Interaction Design Decisions

### Multi-Channel Strategy

Three equally-supported interaction channels:

| Channel | Primary Use Cases | Unique Value |
|---------|-------------------|--------------|
| **Voice Coaching** | Scheduled check-ins, deep sessions, emotional support | Emotional intelligence via tone analysis |
| **WhatsApp** | Quick logs, photo meals, async coaching, reminders | Convenience, 24/7 access, low friction |
| **Mobile App** | Dashboard, visualization, journaling, goal management | Rich data display, offline support |

### Channel Design Principles

1. **Context preservation** - Conversations continue across channels
2. **Channel-appropriate interaction** - Each channel optimized for its strengths
3. **No channel is secondary** - Equal feature depth across all three
4. **User choice** - Users select preferred channel without penalty

---

## AI Coaching Design Decisions

### Coaching Personality

| Attribute | Decision | Rationale |
|-----------|----------|-----------|
| **Tone** | Supportive, non-judgmental | Encourages engagement without pressure |
| **Voice** | Warm, friendly, professional | Builds trust and comfort |
| **Boundaries** | Clear wellness (not medical) scope | Safety and liability |
| **Adaptation** | Learns user preferences | Personalization over time |

### AI Response Characteristics

- **Response time:** <2 seconds in voice coaching
- **Context memory:** Maintains conversation context across sessions
- **Emotional awareness:** Adapts based on detected mood/tone
- **Proactive:** Initiates relevant nudges based on patterns

---

## Data Integration Decisions

### Golden Source Priority

When multiple sources report same metric:

| Metric Type | Priority Order |
|-------------|----------------|
| **Heart Rate** | WHOOP > Apple Watch > Fitbit > Manual |
| **Sleep** | WHOOP > Oura > Apple Watch > Manual |
| **Activity** | Apple Health (aggregated) > Wearable > Strava > Manual |
| **Nutrition** | Manual > Nutritionix scan > AI photo estimate |
| **Mood** | Manual > Voice analysis > Text sentiment |

### Conflict Resolution Rules

1. Same timestamp: Higher priority source wins
2. Overlapping periods: Use more granular data source
3. Contradictory data: Flag for user if variance >20%
4. Manual override: User can always designate preferred source

---

## Privacy & Security Decisions

### Privacy-First Approach

| Decision | Implementation |
|----------|----------------|
| **User control** | Users own their data, full export available |
| **Transparency** | Clear explanation of data usage |
| **Minimal collection** | Only collect what's needed for features |
| **Secure storage** | Encryption at rest and in transit |

### GDPR Compliance

- 14-day cooling-off for deletion requests
- Data export within 48 hours
- Machine-readable format (JSON/CSV)
- 30-day deletion completion

---

## Accessibility Decisions

### Compliance Target

WCAG 2.1 Level AA for all user-facing features.

### Key Accommodations

| User Need | Accommodation |
|-----------|---------------|
| Deaf/Hard-of-hearing | Real-time transcription in voice calls |
| Speech impairment | Text input alternative during calls |
| Cognitive load | Adjustable pace "Take your time" mode |
| Motor accessibility | 44x44pt minimum touch targets |
| Screen readers | Full ARIA implementation |

---

## MVP Scope Decisions

### Included in MVP

| Category | Included |
|----------|----------|
| Users | Single-user accounts |
| Channels | Voice + WhatsApp + Mobile |
| AI | Full emotional intelligence |
| Pillars | All three equally |
| Integrations | 10 primary sources |

### Excluded from MVP

| Category | Excluded (Future) |
|----------|-------------------|
| Social | Groups, challenges, leaderboards |
| Gamification | Badges, points, streaks |
| Family | Family plans, teams |
| Enterprise | B2B, enterprise plans |

---

## First 7 Days Design

### Critical Path Focus

Day-by-day journey designed to achieve "aha moment" within first week:

| Day | Primary Goal |
|-----|--------------|
| 0 | Complete onboarding, connect first integration |
| 1 | First data sync, first insight, try second channel |
| 2-3 | Build routine, multi-pillar logging |
| 4-5 | Pattern preview, personalized nudges |
| 6-7 | First real cross-domain insight (aha moment) |

### Aha Moment Definition

User qualifies for "aha moment" when they:
1. Discover a connection they didn't know existed
2. Receive actionable advice that proves accurate
3. See a prediction that comes true
4. Achieve a goal with AI coach support

---

*Compiled from Vision Document v4.0 and PRD v4.1*

# Epic 05: Fitness Pillar - User Stories

> **Epic:** E05 - Fitness Pillar
> **Source:** `prd-epics/PRD-Epic-05-Fitness-Pillar.md`
> **Created:** 2025-12-09
> **Stories:** 17 (17 Must Have)
> **Workflow:** EXPERT-13 Story Generator v3.0

---

## Story Index

| Story ID | Title | Feature | Priority | Status |
|----------|-------|---------|----------|--------|
| S05.0.1 | Wearable Integration Infrastructure | Technical | P0 (Must) | Draft |
| S05.1.1 | Activity Wearable Sync | F5.1 | P0 (Must) | Draft |
| S05.1.2 | Activity Manual Logging & Timeline | F5.1 | P0 (Must) | Draft |
| S05.2.1 | Sleep Core Metrics & Stage Tracking | F5.2 | P0 (Must) | Draft |
| S05.2.2 | Sleep Cross-Pillar Insights | F5.2 | P0 (Must) | Draft |
| S05.3.1 | Dual Recovery Score Engine | F5.3 | P0 (Must) | Draft |
| S05.3.2 | Recovery-Based Recommendations | F5.3 | P0 (Must) | Draft |
| S05.3.3 | Recovery Alerts & Historical Trends | F5.3 | P0 (Must) | Draft |
| S05.4.1 | Goal Creation & AI Suggestions | F5.4 | P0 (Must) | Draft |
| S05.4.2 | Goal Progress Tracking | F5.4 | P0 (Must) | Draft |
| S05.5.1 | Workout Recommendation Engine | F5.5 | P0 (Must) | Draft |
| S05.5.2 | Exercise Library & Workout Plans | F5.5 | P0 (Must) | Draft |
| S05.5.3 | Workout Feedback & Progressive Overload | F5.5 | P0 (Must) | Draft |
| S05.6.1 | yHealth Strain Score Calculation | F5.6 | P0 (Must) | Draft |
| S05.6.2 | Strain-Recovery Balance | F5.6 | P0 (Must) | Draft |
| S05.6.3 | Strain Alerts & Weekly Analysis | F5.6 | P0 (Must) | Draft |

---

## Dependency Diagram

```
PHASE 1: FOUNDATION (Sprint 1)
S05.0.1 (Wearable Infra) ──┬──► S05.1.1 (Activity Sync)
                           │
                           └──► S05.2.1 (Sleep Core)
                                      │
                                      ▼
PHASE 2: CORE TRACKING (Sprint 2)
S05.1.1 ──► S05.1.2 (Activity Manual/Timeline)
         │
S05.2.1 ──► S05.2.2 (Sleep Insights) ◄─────────── E7 (Wellbeing)
         │
         └──► S05.4.1 (Goal Creation) ──► S05.4.2 (Progress)
                                                │
                                                ▼
PHASE 3: INTELLIGENCE (Sprint 3-4)
S05.2.1 + E7 ──► S05.3.1 (Dual Recovery) ──► S05.3.2 (Recommendations) ──► S05.3.3 (Alerts)
                        │
S05.1.1 ──► S05.6.1 (Strain Calc) ──► S05.6.2 (Balance) ──► S05.6.3 (Strain Alerts)
                        │                    │
                        └────────────────────┘
                                    │
                                    ▼
PHASE 4: OPTIMIZATION (Sprint 5)
S05.3.* + S05.4.* + S05.6.* ──► S05.5.1 (Workout Engine) ──► S05.5.2 (Library) ──► S05.5.3 (Feedback)
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| Technical Setup | S05.0.1 | 100% |
| F5.1: Activity Tracking | S05.1.1, S05.1.2 | 100% |
| F5.2: Sleep Tracking & Analysis | S05.2.1, S05.2.2 | 100% |
| F5.3: Recovery Monitoring | S05.3.1, S05.3.2, S05.3.3 | 100% |
| F5.4: Fitness Goal Setting & Progress | S05.4.1, S05.4.2 | 100% |
| F5.5: Workout Recommendations | S05.5.1, S05.5.2, S05.5.3 | 100% |
| F5.6: Strain/Load Management | S05.6.1, S05.6.2, S05.6.3 | 100% |

**Completeness Verification:** All 6 features + technical setup mapped to 17 stories with 100% coverage.

---

## Implementation Phases

| Phase | Sprint | Stories | Deliverable |
|-------|--------|---------|-------------|
| 1: Foundation | Sprint 1 | S05.0.1, S05.1.1, S05.2.1 | Wearable sync operational, basic activity/sleep tracking |
| 2: Core Tracking | Sprint 2 | S05.1.2, S05.2.2, S05.4.1, S05.4.2 | Manual logging, sleep insights, goal system |
| 3: Intelligence | Sprint 3-4 | S05.3.1-3.3, S05.6.1-6.3 | Dual Recovery Score, yHealth Strain Score, all alerts |
| 4: Optimization | Sprint 5 | S05.5.1-5.3 | AI workout recommendations, exercise library |

---

## Cross-Epic Dependencies

| Story | Depends On | Dependency Type | Status |
|-------|------------|-----------------|--------|
| S05.0.1 (Wearable Infra) | E09 | Detailed wearable OAuth flows | Awaiting E9 |
| S05.2.2 (Sleep Insights) | E7 | Mood, energy data for correlations | Awaiting E7 |
| S05.3.1 (Dual Recovery) | E7 | Mood, stress, energy, journaling | Awaiting E7 |
| S05.3.2 (Recommendations) | E2, E3 | Voice/WhatsApp coaching channels | E2, E3 Complete |
| S05.4.2 (Progress) | E8 | Cross-domain goal analysis | Awaiting E8 |
| S05.5.1 (Workout Engine) | E7 | Mood/stress inputs for customization | Awaiting E7 |
| All Display Stories | E4 | Mobile App UI components | E4 Complete |

---

## Competitive Advantage Summary

Epic 05 establishes yHealth's Fitness Pillar with two critical differentiators that no competitor offers:

1. **Dual Recovery Score (Physical + Mental):** While WHOOP and BEVEL track only physiological recovery (HRV, RHR, sleep), yHealth uniquely combines physical metrics with mental wellbeing data (mood, stress, energy, journaling) to provide a complete readiness picture. This is THE integration point between the fitness and wellbeing pillars.

2. **Universal Strain Tracking:** Unlike WHOOP's device-locked strain score, yHealth's Strain Score works for ALL users through three calculation methods: HR-based (most accurate), duration+type (good without HR), and perceived effort (basic fallback). This democratizes strain tracking for users without premium wearables.

Combined with AI-powered detailed workout plans (specific exercises, sets, reps - not generic "do cardio" suggestions) and cross-pillar correlations ("Your best workouts happen after 7+ hours sleep and morning journaling"), yHealth delivers a fitness tracking experience that is both more accessible and more holistic than any competitor.

---

# TECHNICAL SETUP

---

## S05.0.1: Wearable Integration Infrastructure

### User Story
**As a** yHealth Platform,
**I want to** have a robust wearable integration foundation,
**So that** all fitness features can reliably receive and normalize data from 10+ wearable sources.

### Story Type
- [ ] Feature | [ ] Enhancement | [x] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**Technical Foundation:**
This story establishes the infrastructure required for all fitness pillar features to receive wearable data. It does not implement specific device integrations (deferred to E9) but provides the framework for data flow, normalization, and conflict resolution.

**Wearable Source Support (Framework for 10+ sources):**
- WHOOP
- Apple Health / HealthKit
- Google Fit
- Fitbit
- Garmin Connect
- Oura Ring
- Samsung Health
- Strava
- Polar
- Others via Terra API (future)

**Golden Source Hierarchy:**
When multiple devices report conflicting data for the same metric (e.g., two sleep records), apply priority:
1. WHOOP (highest accuracy for HRV/recovery)
2. Oura Ring
3. Apple Watch
4. Garmin
5. Fitbit
6. Samsung
7. Manual Entry (lowest priority)

**Data Normalization Framework:**
| Data Type | Normalization Rule |
|-----------|-------------------|
| HRV | Standardize to ms (milliseconds) |
| Heart Rate Zones | Map to 5-zone system (0-60%, 60-70%, 70-80%, 80-90%, 90-100% of max HR) |
| Sleep Stages | Normalize to: Wake, Light, Deep, REM |
| Activity Types | Map to categories: Cardio, Strength, Flexibility, Recovery, Other |
| Steps | Direct passthrough (no normalization needed) |
| Calories | Distinguish active vs. total calories |

**Sync Infrastructure:**
- 15-minute sync window target
- Retry logic with exponential backoff
- Offline queue for sync failures
- Webhook support for real-time updates (device-dependent)

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Device Source | Enum | From supported list | System |
| Sync Timestamp | ISO 8601 | Required | System |
| Data Type | Enum | Activity/Sleep/HRV/HR | System |
| Raw Value | Varies | Source-specific | User-only |
| Normalized Value | Standard format | Post-normalization | User-only |
| Conflict Resolution | Enum | Applied rule logged | System |

**Behaviors:**
- Infrastructure initializes on app startup
- Sync scheduler runs every 15 minutes when app active
- Background sync when app inactive (platform-dependent)
- Conflict resolution applies automatically without user intervention
- Normalization occurs before data stored in yHealth database

### Acceptance Criteria

**AC1: Golden Source Hierarchy**
Given multiple wearables report data for the same metric and time period,
When the sync engine processes incoming data,
Then the data from the higher-priority source is used and the conflict is logged.

**AC2: Data Normalization**
Given raw data arrives from any supported wearable,
When the normalization framework processes the data,
Then all data types conform to yHealth standard formats (HRV in ms, 5-zone HR, 4-stage sleep).

**AC3: Sync Timing**
Given a connected wearable has new data,
When the sync scheduler executes,
Then data appears in yHealth within 15 minutes of wearable sync.

**AC4: Retry Logic**
Given a sync attempt fails (network error, API timeout),
When the retry logic activates,
Then the system retries with exponential backoff (1min, 2min, 4min, max 15min).

**AC5: Multi-Device Support**
Given a user has 2+ wearables connected,
When both devices sync data,
Then all data is received and conflicts resolved per golden source hierarchy.

### Success Metrics
- Sync success rate >95% within 15 minutes
- Data normalization accuracy 100% (no malformed data stored)
- Conflict resolution correctly applied in 100% of cases
- Zero data loss during sync failures (queued for retry)

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <15min sync latency | OAuth 2.0 tokens encrypted | Minimal scopes requested | N/A (backend) | iOS 14+, Android 10+ |
| Retry within 15min max | Token refresh automated | Data minimization | N/A | All supported wearables |

### Dependencies
- **Prerequisite Stories:** None (foundation story)
- **Related Stories:** S05.1.1, S05.2.1
- **External Dependencies:** E9 (Data Integrations - detailed OAuth flows and device-specific APIs)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Token expired during sync | Auto-refresh token; if fails, queue data and notify user to reconnect |
| Device disconnected | Continue syncing other devices; show "Disconnected" status for affected device |
| API rate limit hit | Backoff and retry; log for monitoring |
| Unsupported data type from new device | Log warning; skip unsupported fields; process supported data |
| Conflicting timestamps (DST, timezone) | Normalize all timestamps to UTC before comparison |

### Open Questions
- Should we show users which device "won" in conflict resolution?
- What's the maximum sync queue size before alerting user?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Golden source hierarchy implemented and tested
- [ ] Data normalization tested for all supported data types
- [ ] Sync retry logic functional
- [ ] Conflict resolution logging operational
- [ ] Performance requirements verified (<15min sync)

---

# FEATURE F5.1: ACTIVITY TRACKING

---

## S05.1.1: Activity Wearable Sync

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** automatically sync my activity data from my wearable device,
**So that** I can see my movement patterns and understand how physical activity connects to my energy levels and mood without manual effort.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
When a user has connected a wearable device, their activity data automatically syncs to yHealth. The user sees their daily steps, active minutes, heart rate data, and workout sessions without any manual intervention. This is the "wearable-first" approach - automatic tracking is the primary experience.

**Activity Data Synced:**
- **Steps:** Daily step count, hourly breakdown
- **Active Minutes:** Moderate-to-vigorous physical activity minutes
- **Heart Rate:** Average, max, resting, and zone distribution
- **Workout Sessions:** Detected workouts with type, duration, calories
- **Calories Burned:** Active calories (from movement) and total calories

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Daily step count, active minutes summary, simplified activity timeline. Quick glance at "Did I move enough today?" with yes/no feedback. |
| **Deep** | Detailed activity breakdown by hour, heart rate zones during activities, workout intensity analysis, movement patterns across weeks/months, export activity data. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Steps | Integer | 0-100,000 range | User-only |
| Active Minutes | Integer | 0-1440 range | User-only |
| Heart Rate Avg | Integer BPM | 30-250 range | User-only |
| Heart Rate Max | Integer BPM | 30-250 range | User-only |
| Heart Rate Zones | JSON object | 5 zones | User-only |
| Workout Type | Enum | From activity types | User-only |
| Workout Duration | Integer minutes | 1-720 range | User-only |
| Calories Active | Integer | 0-10,000 range | User-only |
| Source Device | Enum | From connected devices | System |
| Sync Timestamp | ISO 8601 | Required | System |

**Behaviors:**
- Activity data syncs automatically within 15 minutes of wearable sync
- Dashboard updates in real-time when new data arrives
- Tapping activity metrics navigates to detailed activity view
- Activity data feeds into holistic health score calculation
- Cross-pillar connections enabled: activity → energy correlation, mood-performance insights

### Acceptance Criteria

**AC1: Automatic Sync**
Given the user has a connected wearable with new activity data,
When the sync scheduler executes,
Then activity data appears in yHealth within 15 minutes.

**AC2: Daily Summary Display**
Given activity data has synced,
When the user views their fitness dashboard,
Then they see: daily step count, active minutes, and workout sessions prominently displayed.

**AC3: Light Mode Display**
Given the user is in Light mode,
When viewing activity data,
Then a simplified daily summary with "Did I move enough today?" feedback is shown.

**AC4: Deep Mode Display**
Given the user is in Deep mode,
When viewing activity data,
Then hourly activity breakdown, heart rate zones, and multi-week trends are available.

**AC5: Heart Rate Zone Display**
Given heart rate data is available from wearable,
When the user views workout details,
Then time spent in each of 5 heart rate zones is displayed.

**AC6: Multi-Source Support**
Given the user has multiple wearables connected,
When activity data syncs from multiple sources,
Then data is merged using golden source hierarchy (no duplicates, conflicts resolved).

**AC7: Cross-Pillar Integration**
Given activity data is available,
When the holistic health score calculates,
Then activity metrics contribute to the Fitness pillar score.

### Success Metrics
- Wearable sync success rate >95% within 15 minutes
- Daily activity data completeness >90% for users with connected wearables
- User satisfaction with auto-tracking: 4.5/5 rating

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <15min sync latency | Auth token required | Activity data user-only | Color-blind safe indicators | iOS 14+, Android 10+ |
| Dashboard load <3s | Encrypted at rest | No sharing without consent | Min 4.5:1 contrast | 10+ wearable sources |

### Dependencies
- **Prerequisite Stories:** S05.0.1 (Wearable Infrastructure)
- **Related Stories:** S05.1.2, S05.6.1
- **External Dependencies:** E9 (Data Integrations), E4 (Mobile App UI)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Wearable sync failure (no data >24h) | Retry hourly; notify after 48h: "Haven't synced from your [device] in 2 days. Everything okay?" |
| Conflicting activity data from multiple sources | Apply golden source hierarchy silently |
| Heart rate data gap during workout | Accept workout without HR zones: "Workout logged! HR data unavailable for this session." |
| Unrealistic step count (>100,000) | Flag for review; do not display until confirmed |
| Device battery died mid-day | Show partial data with note: "Activity data incomplete - device disconnected at [time]" |

### Open Questions
- Should we show a "sync status" indicator on the dashboard?
- How should we handle workout detection differences between devices?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Sync from 10+ wearable sources functional
- [ ] Light and Deep modes render correctly
- [ ] Heart rate zone visualization working
- [ ] Error scenarios handled per PRD
- [ ] Performance requirements verified (<15min sync, <3s load)

---

## S05.1.2: Activity Manual Logging & Timeline

### User Story
**As a** user without a wearable device,
**I want to** manually log my workouts and view my activity timeline,
**So that** I can still benefit from yHealth's fitness tracking and insights.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
For users without wearables or when automatic tracking misses an activity, manual logging provides a fallback. Users can log workouts with type, duration, and perceived effort. The activity timeline shows hourly movement patterns for users who want to understand their daily rhythm.

**Manual Workout Entry Fields:**
| Field | Type | Required | Options |
|-------|------|----------|---------|
| Workout Type | Select | Yes | Running, Walking, Cycling, Swimming, Strength Training, Yoga, HIIT, Other |
| Duration | Number | Yes | Minutes (5-480 range) |
| Perceived Effort | Scale | Yes | 1-10 (1=Very Easy, 10=Maximum) |
| Notes | Text | No | Free text (500 char max) |
| Time of Workout | DateTime | Yes | Default to now, adjustable |

**Activity Timeline (Deep Mode):**
- Hourly breakdown of movement/activity
- Visual representation of active vs. sedentary periods
- Workout sessions highlighted on timeline
- Week-over-week pattern comparison

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Quick workout log button; simple daily activity summary |
| **Deep** | Full activity timeline with hourly patterns, workout history, export capability |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Workout Type | Enum | From type list | User-only |
| Duration | Integer minutes | 5-480 range | User-only |
| Perceived Effort | Integer 1-10 | Required | User-only |
| Notes | String | Max 500 chars | User-only |
| Logged At | ISO 8601 | Required | System |
| Source | "manual" | Constant | System |

**Behaviors:**
- Manual entry available from dashboard quick action and fitness tab
- Offline mode queues manual entries for sync when reconnected
- Manual entries appear alongside wearable data in timeline
- Perceived effort used for strain calculation when HR unavailable (S05.6.1)
- Validation warns on unrealistic values

### Acceptance Criteria

**AC1: Manual Workout Entry**
Given the user wants to log a workout manually,
When they access the manual entry form,
Then they can enter: workout type, duration, perceived effort (1-10), optional notes.

**AC2: Entry Validation**
Given the user enters workout details,
When they submit with unrealistic values (e.g., 500 minutes, effort 15),
Then validation errors display with helpful messages.

**AC3: Offline Queue**
Given the user is offline,
When they submit a manual workout entry,
Then the entry is queued locally and syncs when connection restored.

**AC4: Timeline Display (Deep Mode)**
Given the user is in Deep mode,
When they view the activity timeline,
Then hourly activity patterns are visualized with workout sessions highlighted.

**AC5: Manual Entry Integration**
Given a manual workout is logged,
When viewing activity summaries,
Then manual entries appear alongside wearable data (marked as "Manual").

**AC6: Quick Log Access**
Given the user is on the dashboard,
When they tap "Log Workout" quick action,
Then the manual entry form opens immediately.

**AC7: Unrealistic Value Warning**
Given the user enters >50,000 steps or >6 hours workout manually,
When they attempt to save,
Then a confirmation prompt appears: "This seems unusually high. Is this correct?"

### Success Metrics
- Manual entry fallback usage <10% of total activity logs (indicates wearable-first working)
- Manual entry completion rate >90% (started entries that save successfully)
- Offline queue sync success rate 100%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Entry save <1s | Auth required | Manual data user-only | Voice input support | iOS 14+, Android 10+ |
| Offline queue sync <30s | Data encrypted | No analytics on notes | 44x44pt touch targets | Portrait + Landscape |

### Dependencies
- **Prerequisite Stories:** S05.1.1 (Activity Wearable Sync - for data integration)
- **Related Stories:** S05.6.1 (Strain uses perceived effort)
- **External Dependencies:** E4 (Mobile App), E3 (WhatsApp - voice workout logging)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Duplicate entry (same time, same type) | Warn: "You already logged a [type] at this time. Add anyway?" |
| Entry for future time | Reject: "Cannot log workout for future time" |
| Entry >7 days in past | Allow with note: "Adding to history for [date]" |
| Very short workout (<5 min) | Allow but don't count toward daily goals |
| Network restored with queued entries | Auto-sync with progress indicator; show success toast |

### Open Questions
- Should we support recurring workout scheduling (log same workout weekly)?
- Should manual entries affect the holistic health score differently than wearable data?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Manual entry form fully functional
- [ ] Offline queue implemented and tested
- [ ] Activity timeline renders in Deep mode
- [ ] Validation and error handling complete
- [ ] Integration with wearable data verified

---

# FEATURE F5.2: SLEEP TRACKING & ANALYSIS

---

## S05.2.1: Sleep Core Metrics & Stage Tracking

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** track my sleep quality and see detailed sleep stage breakdowns,
**So that** I can understand my rest patterns and identify areas for improvement.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Sleep data imports automatically from connected wearables. Users see their sleep duration, quality score, and stage breakdown. This provides feature parity with WHOOP/Oura for core sleep metrics while setting the foundation for yHealth's cross-pillar differentiation.

**Sleep Metrics Displayed:**
- **Total Sleep Time:** Hours and minutes of actual sleep
- **Sleep Quality Score:** 0-100 composite score
- **Sleep Stages:** Wake, Light, Deep, REM (time in each)
- **Sleep Efficiency:** Time asleep / time in bed
- **Sleep Onset Latency:** Time to fall asleep (if available)
- **Wake Events:** Number of times woken during night

**Sleep Quality Score Calculation:**
```
Sleep Quality Score (0-100) = Weighted average of:
- Sleep Duration vs. goal (30%)
- Deep Sleep % (25%)
- REM Sleep % (25%)
- Sleep Efficiency (10%)
- Wake Events penalty (10%)
```

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Sleep duration, quality score (0-100), simple "Good/Fair/Poor" rating. One-line insight: "7h 30min sleep, Quality: Good (85/100)". |
| **Deep** | Detailed sleep stages breakdown, time in each stage, sleep onset latency, wake-ups, HRV during sleep (if available), historical trends, sleep consistency score. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Sleep Start | ISO 8601 | Required | User-only |
| Sleep End | ISO 8601 | Required | User-only |
| Total Sleep Min | Integer | 0-840 range | User-only |
| Quality Score | Integer 0-100 | Calculated | User-only |
| Stage Wake Min | Integer | 0-480 range | User-only |
| Stage Light Min | Integer | 0-480 range | User-only |
| Stage Deep Min | Integer | 0-480 range | User-only |
| Stage REM Min | Integer | 0-480 range | User-only |
| HRV Avg | Integer ms | 0-200 range | User-only |
| Source Device | Enum | From connected devices | System |

**Behaviors:**
- Sleep data syncs automatically from connected wearables
- Quality score calculates after each sleep record imports
- Sleep stages normalized across different wearable formats
- Manual sleep entry available as fallback
- Sleep data feeds into Recovery Score calculation (S05.3.1)

### Acceptance Criteria

**AC1: Sleep Data Import**
Given the user has a connected wearable with sleep tracking,
When sleep data syncs,
Then total sleep time, sleep stages, and quality score display in yHealth.

**AC2: Sleep Quality Score**
Given sleep data is available,
When the quality score calculates,
Then a 0-100 score displays based on duration, stages, efficiency, and wake events.

**AC3: Stage Normalization**
Given sleep stage data arrives from different wearable formats,
When normalization applies,
Then all stages map to yHealth standard: Wake, Light, Deep, REM.

**AC4: Light Mode Display**
Given the user is in Light mode,
When viewing sleep data,
Then a simple summary shows: "7h 30min sleep, Quality: Good (85/100)".

**AC5: Deep Mode Display**
Given the user is in Deep mode,
When viewing sleep data,
Then detailed stage breakdown, HRV during sleep, and efficiency metrics display.

**AC6: Manual Sleep Entry**
Given the user's wearable doesn't track sleep or data is missing,
When they access manual sleep entry,
Then they can enter: bedtime, wake time, and subjective quality rating (1-10).

**AC7: Multi-Source Sleep Data**
Given multiple devices track sleep,
When data conflicts occur,
Then golden source hierarchy applies (WHOOP > Oura > Apple Watch > Fitbit).

### Success Metrics
- Sleep data sync success rate >95% for wearable users
- Sleep stage normalization accuracy 100%
- Manual sleep entry usage <10% (wearable-first working)

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Sync <15min | Encrypted at rest | Sleep data user-only | Color-blind safe stages | 8+ sleep data sources |
| Load <3s | Auth required | No sharing without consent | Screen reader labels | iOS 14+, Android 10+ |

### Dependencies
- **Prerequisite Stories:** S05.0.1 (Wearable Infrastructure)
- **Related Stories:** S05.2.2, S05.3.1 (Recovery uses sleep quality)
- **External Dependencies:** E9 (Data Integrations), E4 (Mobile App UI)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Missing sleep data >48h | Prompt manual entry: "We haven't tracked your sleep in 2 days. Add it manually?" |
| Sleep stages unavailable from device | Show duration/quality only: "Sleep tracked! Detailed stages unavailable from your device." |
| Unrealistic sleep (>14h or <1h) | Flag for confirmation: "Sleep duration seems unusual. Is this correct?" |
| Nap detected (short sleep <3h) | Categorize as nap, don't replace main sleep record |
| Multiple sleep records same day | Show all records (main sleep + naps) |

### Open Questions
- Should we detect and score naps separately from main sleep?
- How should we handle sleep data from users who work night shifts?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Sleep data imports from 8+ sources
- [ ] Stage normalization working for all sources
- [ ] Quality score calculation accurate
- [ ] Light and Deep modes render correctly
- [ ] Manual entry fallback functional

---

## S05.2.2: Sleep Cross-Pillar Insights

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** see how my sleep affects my workout performance and mood,
**So that** I can optimize my sleep routine for maximum health benefits across all areas of my life.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
This is where yHealth's "Better Together" integration strategy shines. While core sleep metrics match WHOOP/Oura, cross-pillar insights reveal connections that dedicated fitness apps cannot provide. Users discover how their sleep patterns affect and are affected by nutrition, mood, and exercise.

**Cross-Pillar Sleep Insights:**

| Connection | Example Insight |
|------------|-----------------|
| Sleep → Workout | "You perform 25% better in workouts after 7+ hours of sleep" |
| Sleep → Mood | "Your mood rating is 30% higher on days with quality sleep >80" |
| Sleep → Energy | "Low energy today correlates with <6 hours sleep last night" |
| Nutrition → Sleep | "Sleep quality drops 20% on days with >300mg caffeine after 2pm" |
| Exercise → Sleep | "Your best sleep happens when workouts complete before 6pm" |
| Journaling → Sleep | "Sleep quality improves 15% on nights you journal before bed" |

**Sleep Trends:**
- 7-day, 30-day, 90-day trend visualizations
- Sleep consistency score (how regular is sleep schedule)
- Week-over-week comparisons
- Pattern detection (e.g., worse sleep on weekends)

**Alerts for Poor Sleep Patterns:**
- 3+ consecutive nights with quality <50
- Sleep duration trending down over 7 days
- Irregular sleep schedule (>2h variance in bedtime)
- Poor sleep affecting next-day recovery

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | 1 featured sleep insight per day; simple trend indicator (improving/declining) |
| **Deep** | Multiple insights, detailed trend charts, correlation explorer, export data |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Insight Type | Enum | From insight categories | System |
| Correlation Strength | Float 0-1 | Calculated | System |
| Data Points Used | Integer | Min 7 for validity | System |
| Insight Displayed | Boolean | For engagement tracking | Aggregated |

**Behaviors:**
- Insights generate after minimum 7 days of sleep data
- Cross-pillar insights require data from multiple pillars (sleep + mood, sleep + nutrition)
- Insight relevance improves over time as more data collected
- Alerts trigger proactively when concerning patterns detected
- Sleep score integrated into holistic health score

### Acceptance Criteria

**AC1: Sleep Trend Display**
Given the user has 7+ days of sleep data,
When they view sleep trends,
Then 7/30/90-day trend charts with visual indicators display.

**AC2: Cross-Domain Insight Generation**
Given the user has sleep data AND data from another pillar (mood, nutrition, activity),
When correlation analysis runs,
Then relevant cross-pillar insights generate (e.g., "7+ hours sleep = better workout performance").

**AC3: Minimum Data Requirement**
Given the user has <7 days of sleep data,
When they view insights,
Then a message displays: "Keep logging to unlock personalized sleep insights!"

**AC4: Poor Sleep Pattern Alert**
Given the user has 3+ consecutive nights with sleep quality <50,
When the alert system checks patterns,
Then a proactive alert displays: "Your sleep quality has been low for 3 nights. Let's improve your rest."

**AC5: Holistic Score Integration**
Given sleep data is available,
When the holistic health score calculates,
Then sleep quality contributes to the Fitness pillar score.

**AC6: Light Mode Insight**
Given the user is in Light mode,
When viewing sleep section,
Then 1 featured insight displays with simple trend indicator.

**AC7: Deep Mode Correlation Explorer**
Given the user is in Deep mode,
When viewing sleep analytics,
Then multiple insights, detailed charts, and correlation explorer are available.

### Success Metrics
- 80% of users receive sleep correlation insights within 7 days
- 70% click/engage with sleep-related insights
- 60% of users improve sleep quality score by 10+ points in 30 days

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Insight generation <5s | Correlation data encrypted | Cross-pillar data user-only | Plain language insights | iOS 14+, Android 10+ |
| Chart render <2s | No external sharing | Aggregated for analytics | Chart accessible labels | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S05.2.1 (Sleep Core Metrics)
- **Related Stories:** S05.3.1 (Recovery uses sleep)
- **External Dependencies:** E7 (Wellbeing - mood, stress data), E6 (Nutrition - meal timing, caffeine), E8 (Cross-Domain Intelligence engine)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Only sleep data (no other pillars) | Show sleep-only trends; encourage logging in other pillars |
| Conflicting insights | Show strongest correlation first; note "multiple factors may contribute" |
| Correlation below significance threshold | Don't display insight; require minimum correlation strength |
| User ignores alerts repeatedly | Reduce frequency, don't spam; mark as "acknowledged" |
| Insufficient data for trend (sporadic logging) | Show available data with caveat: "Trends improve with consistent tracking" |

### Open Questions
- What minimum correlation strength makes an insight worth showing?
- Should we allow users to dismiss insights permanently?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 7/30/90-day trend charts functional
- [ ] Cross-pillar insights generating
- [ ] Alert system detecting poor patterns
- [ ] Light and Deep modes render correctly
- [ ] Integration with E7, E6, E8 verified

---

# FEATURE F5.3: RECOVERY MONITORING

---

## S05.3.1: Dual Recovery Score Engine

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** know if my body AND mind are ready for intense activity,
**So that** I can make informed decisions about workout intensity and rest without overtraining or burning out mentally.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
This is yHealth's PRIMARY DIFFERENTIATOR. While WHOOP and BEVEL track only physiological recovery, yHealth uniquely provides TWO SEPARATE SCORES: Physical Recovery and Mental Recovery. Both are displayed independently with color coding, enabling targeted recommendations that account for the whole person.

**Dual Recovery Score Display:**
- **Physical Recovery Score:** 0-100 (body readiness)
- **Mental Recovery Score:** 0-100 (mind readiness)
- **Color Coding:** Green (80-100), Yellow (50-79), Red (0-49)
- Both scores displayed prominently on dashboard and fitness tab

**Physical Recovery Score Calculation:**
```
Physical Recovery Score (0-100) = Weighted Average:
- HRV vs. 30-day baseline (40%)
- Resting Heart Rate vs. 30-day baseline (30%)
- Sleep Quality Score from S05.2.1 (20%)
- Sleep Duration vs. user's goal (10%)

Scoring:
- Metric above baseline = bonus points
- Metric below baseline = penalty points
- Normalized to 0-100 scale
```

**Mental Recovery Score Calculation:**
```
Mental Recovery Score (0-100) = Weighted Average:
- Morning Mood Rating 1-10 (40%) - from E7 Wellbeing
- Stress Level 1-10 inverted (30%) - from E7 Wellbeing
- Energy Level 1-10 (20%) - from E7 Wellbeing
- Journaling Completion bonus (10%) - from E7 Wellbeing

Scoring:
- Mood 8+ = 80-100 range
- Stress <4 = 80-100 range
- Energy 8+ = 80-100 range
- Journaling completed = +10 bonus
```

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Two scores with color coding (Physical: 85/Green, Mental: 72/Yellow) and one-line summary: "Body ready, mind needs some care." |
| **Deep** | Detailed breakdown of each score component, individual metric values, trend over time, component contribution visualization. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Physical Score | Integer 0-100 | Calculated | User-only |
| Mental Score | Integer 0-100 | Calculated | User-only |
| HRV Value | Integer ms | From wearable | User-only |
| HRV Baseline | Float ms | 30-day rolling | User-only |
| RHR Value | Integer BPM | From wearable | User-only |
| RHR Baseline | Float BPM | 30-day rolling | User-only |
| Mood Rating | Integer 1-10 | From E7 | User-only |
| Stress Level | Integer 1-10 | From E7 | User-only |
| Energy Level | Integer 1-10 | From E7 | User-only |
| Journaling Done | Boolean | From E7 | User-only |
| Calculation Time | ISO 8601 | Required | System |

**Behaviors:**
- Scores calculate daily, typically in morning after sleep data syncs
- Partial scores generate when some data missing (with disclaimer)
- Baseline builds over 7-14 days for new users
- Scores update if new data arrives (mood logged later, etc.)
- Scores feed into workout recommendations (S05.5.1)

### Acceptance Criteria

**AC1: Physical Recovery Calculation**
Given HRV, RHR, and sleep data are available,
When physical recovery score calculates,
Then a 0-100 score generates using: HRV (40%), RHR (30%), Sleep Quality (20%), Sleep Duration (10%).

**AC2: Mental Recovery Calculation**
Given mood, stress, energy data are available from E7,
When mental recovery score calculates,
Then a 0-100 score generates using: Mood (40%), Stress (30%), Energy (20%), Journaling (10%).

**AC3: Dual Score Display**
Given both recovery scores have calculated,
When the user views the fitness dashboard,
Then both Physical and Mental scores display with independent color coding.

**AC4: Color Coding**
Given a recovery score value,
When displayed,
Then color is: Green (80-100), Yellow (50-79), Red (0-49).

**AC5: Partial Score with Disclaimer**
Given some recovery data is missing (e.g., no mood rating),
When score calculates,
Then a partial score displays with disclaimer: "Recovery estimate based on limited data. Add [missing metric] for accuracy."

**AC6: New User Baseline**
Given a user has <7 days of HRV/RHR data,
When physical recovery calculates,
Then population averages are used with caveat: "Building your baseline. Scores will improve accuracy in 7-14 days."

**AC7: Light Mode Summary**
Given both scores are calculated,
When user is in Light mode,
Then a one-line summary displays: e.g., "Body ready, mind needs some care."

**AC8: Deep Mode Component Breakdown**
Given user is in Deep mode,
When viewing recovery details,
Then individual components (HRV, RHR, Sleep, Mood, etc.) display with their values and contribution to score.

### Success Metrics
- Recovery score accuracy: 75% user agreement with recommendations
- Dual score differentiation: 80% of users report value of mental recovery tracking
- Baseline establishment: 90% of users have personalized baseline within 14 days

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Score calculation <2s | All inputs encrypted | Recovery data user-only | Color-blind safe indicators | iOS 14+, Android 10+ |
| Real-time updates | Cross-pillar data secured | No external sharing | Screen reader announces score | Wearable + E7 required |

### Dependencies
- **Prerequisite Stories:** S05.2.1 (Sleep data for physical score)
- **Related Stories:** S05.3.2, S05.3.3, S05.5.1
- **External Dependencies:** E7 (Wellbeing - mood, stress, energy, journaling data)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No HRV data (device doesn't support) | Calculate physical score without HRV; redistribute weights |
| No E7 data (user hasn't logged mood) | Physical score only; prompt: "Add mood check-in for complete recovery picture" |
| HRV very high but mood very low | Show both scores independently; mental takes precedence for recommendations |
| Score calculation failure | Show last valid score with timestamp: "Using yesterday's recovery score. Recalculating..." |
| First day (no baseline) | Show provisional score with clear "building baseline" message |

### Open Questions
- Should we show a combined "Total Recovery" score alongside the two individual scores?
- How should we weight the scores when one data source is consistently missing?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Physical score calculation accurate per formula
- [ ] Mental score calculation accurate per formula
- [ ] Dual display with independent color coding
- [ ] Partial score handling with disclaimers
- [ ] Baseline building logic functional
- [ ] Integration with E7 wellbeing data verified

---

## S05.3.2: Recovery-Based Recommendations

### User Story
**As a** user,
**I want to** receive actionable guidance based on my dual recovery scores,
**So that** I know what type of activity suits today without second-guessing my body or mind state.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Based on the combination of Physical and Mental Recovery scores, the system provides personalized daily guidance. This goes beyond simple "recovered/not recovered" by accounting for the nuanced states where body and mind may disagree.

**Score Combination Recommendations:**

| Physical | Mental | Recommendation |
|----------|--------|----------------|
| High (80+) | High (80+) | "Great day for intense training! Your body and mind are both ready for a challenge." |
| High (80+) | Low (<50) | "Light activity recommended - your body is recovered but your mind needs rest. Try gentle yoga or a walk." |
| Low (<50) | High (80+) | "Focus on mobility and stretching today - your mind is sharp but your body needs recovery." |
| Low (<50) | Low (<50) | "Full rest day recommended. Both your body and mind need recovery. Take it easy!" |
| Medium (50-79) | Medium (50-79) | "Moderate activity is appropriate today. Listen to your body and don't push too hard." |
| High (80+) | Medium (50-79) | "Good day for training, but consider a moderate session rather than max effort." |
| Medium (50-79) | High (80+) | "Your mind is ready for a workout, but keep intensity moderate to support physical recovery." |
| Medium (50-79) | Low (<50) | "Easy movement recommended - a light walk or gentle stretching would be ideal." |
| Low (<50) | Medium (50-79) | "Active recovery day - light mobility work will help without adding stress." |

**Recommendation Delivery:**
- Dashboard card with daily recommendation
- Push notification in morning (if enabled)
- WhatsApp message option (via E3)
- Voice coaching query: "How's my recovery today?" (via E2)

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Physical Score | Integer 0-100 | Required | User-only |
| Mental Score | Integer 0-100 | Required | User-only |
| Recommendation Type | Enum | From matrix | System |
| Recommendation Text | String | Generated | User-only |
| User Followed | Boolean | Post-activity check | Aggregated |

**Behaviors:**
- Recommendation generates after both scores calculate
- Recommendation updates if scores change (e.g., mood logged later)
- Feeds into workout recommendation engine (S05.5.1)
- User can override recommendation (logged for learning)

### Acceptance Criteria

**AC1: Both High Recommendation**
Given Physical ≥80 AND Mental ≥80,
When recommendation generates,
Then message indicates "great day for intense training."

**AC2: Physical High, Mental Low**
Given Physical ≥80 AND Mental <50,
When recommendation generates,
Then message recommends "light activity - mind needs rest" (e.g., yoga, walking).

**AC3: Physical Low, Mental High**
Given Physical <50 AND Mental ≥80,
When recommendation generates,
Then message recommends "mobility and stretching - body needs rest."

**AC4: Both Low Recommendation**
Given Physical <50 AND Mental <50,
When recommendation generates,
Then message recommends "full rest day."

**AC5: Dashboard Display**
Given a recommendation has generated,
When the user views the dashboard,
Then the recommendation displays as a prominent card.

**AC6: Multi-Channel Delivery**
Given push notifications are enabled,
When the morning recommendation generates,
Then a push notification delivers the recommendation.

**AC7: Recommendation Update**
Given scores change after initial recommendation (e.g., mood logged later),
When the system detects score change,
Then the recommendation updates to reflect new scores.

### Success Metrics
- 75% user agreement with recommendations (post-workout survey)
- 70% of users adjust workouts based on recovery recommendations
- 50% reduction in user-reported burnout vs. baseline

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Recommendation <1s | Encrypted delivery | Recommendations user-only | Plain language | iOS 14+, Android 10+ |
| Update <2s on score change | Auth for push | No sharing without consent | Screen reader friendly | Multi-channel support |

### Dependencies
- **Prerequisite Stories:** S05.3.1 (Dual Recovery Score Engine)
- **Related Stories:** S05.5.1 (Workout Engine uses recommendations)
- **External Dependencies:** E2 (Voice), E3 (WhatsApp), E4 (Mobile App)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Only physical score available | Provide physical-only recommendation with note: "Add mood for complete picture" |
| Scores are borderline (e.g., 79 physical, 81 mental) | Use category boundaries strictly; consider neighboring recommendations |
| User consistently ignores recommendations | Adapt messaging tone; don't nag excessively |
| Recommendation conflicts with scheduled workout | Show both; let user decide: "Recovery suggests rest, but you have a workout scheduled. How do you want to proceed?" |

### Open Questions
- Should recommendations account for user's planned activity (from calendar)?
- How should we handle users who always want to train regardless of recovery?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 9 score combinations handled
- [ ] Dashboard recommendation card functional
- [ ] Push notification delivery working
- [ ] Multi-channel integration tested
- [ ] Recommendation update on score change

---

## S05.3.3: Recovery Alerts & Historical Trends

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** see my recovery trends over time and receive alerts for concerning patterns,
**So that** I can identify recovery issues early and prevent overtraining or burnout.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Beyond daily scores, users need to understand their recovery patterns over time. Trend visualization helps identify gradual decline before it becomes critical. Proactive alerts catch concerning patterns that users might miss day-to-day.

**Recovery Trend Visualizations:**
- 7-day trend chart (Physical and Mental as separate lines)
- 30-day trend chart with rolling average
- 90-day long-term view
- Recovery consistency indicator (variance in scores)

**Alert Triggers:**

| Alert | Trigger | Severity | Message |
|-------|---------|----------|---------|
| Chronic Low Recovery | 5+ consecutive days <50 (either score) | High | "Your [physical/mental] recovery has been low for 5 days. Consider a recovery day." |
| Declining Trend | 7-day average dropping >15 points | Medium | "Your recovery is trending down this week. Pay attention to rest and recovery." |
| Physical-Mental Mismatch | 3+ days with >30 point difference | Low | "Your body and mind recovery are out of sync. This pattern can lead to burnout." |
| Recovery Not Improving | 3+ rest days with no score improvement | Medium | "Rest days aren't improving your recovery. Consider: sleep quality, stress, nutrition." |

**Cross-Domain Recovery Insights:**
- "Your physical recovery is 25% higher on days you journal"
- "Mental recovery predicts workout enjoyment better than physical recovery"
- "Best overall recovery happens with 7+ hours sleep + morning mood >7"

**Deep Mode Features:**
- Component breakdown with individual metric trends
- Export recovery data (CSV, PDF)
- Recovery pattern analysis

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Alert Type | Enum | From alert types | System |
| Alert Triggered | ISO 8601 | Required | System |
| Alert Acknowledged | Boolean | User action | System |
| Trend Direction | Enum | Up/Down/Stable | User-only |
| Export Requested | Boolean | User action | Aggregated |

**Behaviors:**
- Alerts trigger proactively when patterns detected
- Alerts don't repeat daily (cooldown period)
- User can acknowledge/dismiss alerts
- Trends update daily after new score calculates
- Deep mode allows data export

### Acceptance Criteria

**AC1: 7-Day Trend Chart**
Given 7+ days of recovery data,
When user views recovery trends,
Then a chart shows both Physical and Mental scores over the past 7 days.

**AC2: 30/90-Day Trends**
Given 30+ days of recovery data,
When user views extended trends,
Then 30-day and 90-day trend options are available.

**AC3: Chronic Low Recovery Alert**
Given 5+ consecutive days with Physical OR Mental score <50,
When alert system checks,
Then alert triggers: "Your [type] recovery has been low for 5 days."

**AC4: Declining Trend Alert**
Given 7-day recovery average drops >15 points from previous week,
When trend analysis runs,
Then alert triggers: "Your recovery is trending down this week."

**AC5: Alert Acknowledgment**
Given an alert has triggered,
When the user acknowledges it,
Then the alert is marked as seen and won't repeat for 48 hours minimum.

**AC6: Deep Mode Component Breakdown**
Given user is in Deep mode,
When viewing recovery details,
Then individual component trends (HRV, RHR, Sleep, Mood, etc.) display over time.

**AC7: Cross-Domain Insight Display**
Given sufficient cross-pillar data,
When correlation analysis runs,
Then recovery-related cross-domain insights display (e.g., "Recovery 25% higher when you journal").

**AC8: Data Export**
Given user requests recovery data export,
When export generates,
Then CSV or PDF with recovery history downloads.

### Success Metrics
- Alert accuracy: 80% of alerts acknowledged as helpful
- Trend engagement: 60% of Deep mode users view trends weekly
- Overtraining prevention: 50% reduction in user-reported overtraining symptoms

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Chart render <2s | Encrypted export | Recovery history user-only | Chart accessible | iOS 14+, Android 10+ |
| Alert check <1s | Auth required | No external sharing | Plain language alerts | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S05.3.1 (Dual Recovery Engine), S05.3.2 (Recommendations)
- **Related Stories:** S05.6.3 (Strain Alerts)
- **External Dependencies:** E8 (Cross-Domain Intelligence for insights)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient data for trend (<7 days) | Show available data; message: "Keep tracking to see recovery trends" |
| User dismisses all alerts | Reduce alert frequency; don't spam |
| Score jumps dramatically (data error?) | Flag outliers; don't include in trend until confirmed |
| Export fails | Retry option; fallback to smaller date range |
| No cross-domain data | Show recovery trends only; encourage multi-pillar tracking |

### Open Questions
- Should users be able to set custom alert thresholds?
- How long should alert history be retained?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 7/30/90-day trend charts functional
- [ ] All 4 alert types triggering correctly
- [ ] Alert acknowledgment and cooldown working
- [ ] Deep mode component breakdown complete
- [ ] Data export functional
- [ ] Cross-domain insights displaying

---

# FEATURE F5.4: FITNESS GOAL SETTING & PROGRESS

---

## S05.4.1: Goal Creation & AI Suggestions

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** set specific fitness goals with AI guidance,
**So that** I can systematically improve my health while avoiding unrealistic targets that lead to burnout.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users set fitness goals through a guided wizard that ensures SMART goal creation. AI analyzes the user's baseline data and recovery capacity to suggest appropriate, achievable goals. The system detects potentially unrealistic goals and recommends alternatives.

**Goal Categories:**
| Category | Examples | Metrics |
|----------|----------|---------|
| Daily Steps | Walk 10,000 steps daily | Steps/day |
| Weekly Active Minutes | 150 minutes moderate activity/week | Minutes/week |
| Sleep Duration | Get 7+ hours sleep nightly | Hours/night |
| Workout Frequency | Exercise 4 times per week | Workouts/week |
| Custom | Improve sleep quality to 80+ | Any tracked metric |

**SMART Goal Wizard Steps:**
1. **Specific:** What exactly do you want to achieve?
2. **Measurable:** How will you track progress? (select metric)
3. **Achievable:** AI checks against baseline, suggests adjustment if >50% above current
4. **Relevant:** Which health goal does this support?
5. **Time-bound:** When do you want to achieve this? (1 week, 1 month, 3 months)

**AI Goal Suggestions:**
Based on user's current data, AI suggests personalized goals:
- "Based on your current 6,000 steps/day average, try 7,500 steps as your first goal"
- "Your sleep averages 6h. A goal of 6.5h is achievable in 2 weeks"
- "You work out 2x/week. Try 3x/week for the next month"

**Goal Conflict Detection:**
System warns when goals may conflict:
- Max workouts + max recovery = conflict
- Weight loss + muscle gain = needs careful planning
- Multiple high-intensity goals = overtraining risk

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Quick goal from presets: "Walk more", "Sleep better", "Exercise regularly" |
| **Deep** | Full SMART wizard, AI suggestions, custom goals, priority settings |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Goal Category | Enum | From categories | User-only |
| Target Metric | String | Valid metric name | User-only |
| Target Value | Number | Realistic range | User-only |
| Timeframe | Enum | Week/Month/Quarter | User-only |
| AI Suggested | Boolean | Flag if AI-generated | System |
| Baseline Value | Number | At goal creation | System |

**Behaviors:**
- Goal wizard guides user through SMART process
- AI suggestions appear based on baseline analysis
- Unrealistic goal detection triggers before save
- Goals persist and track over selected timeframe
- Recovery-aware: AI suggests rest days when appropriate

### Acceptance Criteria

**AC1: Goal Category Selection**
Given the user starts goal creation,
When they select a category,
Then options for: Steps, Active Minutes, Sleep Duration, Workout Frequency, Custom are available.

**AC2: SMART Goal Wizard**
Given the user is creating a goal,
When they go through the wizard,
Then all SMART components are captured: Specific, Measurable, Achievable, Relevant, Time-bound.

**AC3: AI Goal Suggestion**
Given the user has 7+ days of baseline data,
When they view goal suggestions,
Then personalized AI suggestions appear based on their current performance.

**AC4: Unrealistic Goal Warning**
Given the user sets a goal >50% above their baseline,
When they attempt to save,
Then a warning displays: "This goal is ambitious! Start with [lower target]?"

**AC5: Goal Conflict Detection**
Given the user has existing goals,
When they create a potentially conflicting goal,
Then a warning displays: "These goals may conflict. Prioritize one or adjust targets?"

**AC6: Light Mode Quick Goals**
Given the user is in Light mode,
When they create a goal,
Then preset quick options are available (e.g., "Walk more" → 8,000 steps/day).

**AC7: Goal Persistence**
Given a goal is created,
When the user closes and reopens the app,
Then the goal persists with current progress.

### Success Metrics
- AI recommendation accuracy: 65% of AI-suggested goals accepted
- Goal creation completion: 80% of started goal wizards completed
- Realistic goal adherence: 70% of goals adjusted when warned about unrealistic targets

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Wizard <3s per step | Auth required | Goals user-only | Voice input for goals | iOS 14+, Android 10+ |
| AI suggestion <2s | Encrypted storage | No external sharing | 44x44pt touch targets | Portrait + Landscape |

### Dependencies
- **Prerequisite Stories:** S05.1.1, S05.2.1 (Baseline data needed)
- **Related Stories:** S05.4.2 (Progress Tracking)
- **External Dependencies:** E4 (Mobile App UI), E8 (Cross-Domain for cross-pillar goals)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No baseline data (new user) | Suggest population average goals with caveat: "We'll personalize as we learn your patterns" |
| User insists on unrealistic goal | Allow with acknowledgment: "Got it! We'll track this ambitious goal and suggest adjustments if needed." |
| Goal for untracked metric | Prompt to enable tracking: "To track this goal, connect your wearable or log manually." |
| User has 10+ active goals | Warn about focus: "Many active goals can be overwhelming. Consider prioritizing your top 3." |

### Open Questions
- Should goals automatically expire after timeframe, or convert to ongoing?
- Should we support team/family shared goals?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 5 goal categories functional
- [ ] SMART wizard complete
- [ ] AI suggestions generating
- [ ] Unrealistic goal warning working
- [ ] Goal conflict detection functional
- [ ] Light and Deep modes operational

---

## S05.4.2: Goal Progress Tracking

### User Story
**As a** Busy Professional (P2),
**I want to** see my goal progress at a glance and receive milestone celebrations,
**So that** I stay motivated and know if I'm on track without deep analysis.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Goal progress is visible throughout the app - on dashboard, in fitness tab, and via notifications. Progress visualization includes bars, streaks, and trend indicators. The system celebrates milestones and suggests adjustments when goals are consistently missed.

**Progress Visualization:**
- **Progress Bar:** Visual fill showing % complete
- **Streak Counter:** Days/weeks of consecutive goal completion
- **Trend Indicator:** Arrow showing if progress is improving/declining
- **Success Rate:** % of goal-eligible days where goal was met

**Milestone Celebrations:**
- First goal completion: "You did it! First step towards your goal."
- 7-day streak: "One week strong! Keep it up!"
- 30-day streak: "A whole month of consistency! Amazing!"
- 50% progress: "Halfway there! You're making great progress."
- Goal achieved: "GOAL COMPLETE! Time to set a new challenge?"

**Goal Adjustment Prompts:**
When goals are consistently missed (>70% failure rate over 7+ days):
- "Struggling with this goal. Let's adjust it together?"
- Suggest scaled-back version
- Option to keep current goal or adjust

**Recovery-Aware Goal Suggestions:**
- When recovery is low, suggest rest day even if it breaks streak
- "Your recovery is low today. Taking rest won't hurt your progress - it'll help it!"

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | 1-3 top priority goals with simple progress bars and streak counters |
| **Deep** | All active goals, detailed analytics, historical performance, success rate charts |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Goal ID | UUID | Required | System |
| Daily Progress | Number | Against target | User-only |
| Current Streak | Integer | Days consecutive | User-only |
| Success Rate | Float % | Calculated | User-only |
| Milestone Achieved | Enum | From milestones | User-only |
| Adjustment Accepted | Boolean | User action | Aggregated |

**Behaviors:**
- Progress updates in real-time as data syncs
- Milestones trigger celebrations immediately
- Adjustment prompts appear after 7 days of >70% failure
- Recovery-aware suggestions integrate with S05.3.2
- Dashboard shows priority goals; full list in fitness tab

### Acceptance Criteria

**AC1: Progress Bar Display**
Given a user has active goals,
When they view the dashboard or fitness tab,
Then progress bars show current % completion for each goal.

**AC2: Streak Counter**
Given a user is on a streak (consecutive days meeting goal),
When viewing goal progress,
Then streak counter displays: "7 day streak!" etc.

**AC3: Milestone Celebration**
Given a user achieves a milestone (7-day streak, goal complete, etc.),
When the milestone is reached,
Then a celebration message/animation displays.

**AC4: Goal Adjustment Prompt**
Given a user has <30% success rate over 7+ days,
When viewing the struggling goal,
Then prompt appears: "Struggling with this goal. Let's adjust it together?"

**AC5: Recovery-Aware Suggestion**
Given recovery score is <50,
When user views goals,
Then a note suggests: "Your recovery is low today. Rest is okay!"

**AC6: Light Mode Display**
Given user is in Light mode,
When viewing goals,
Then only top 1-3 priority goals show with simple status.

**AC7: Deep Mode Analytics**
Given user is in Deep mode,
When viewing goals,
Then all goals, historical charts, and success rate analytics are available.

**AC8: Goal Complete Flow**
Given a user achieves their goal target,
When the goal completes,
Then celebration displays and prompt asks: "Set a new goal?" or "Extend this goal?"

### Success Metrics
- Goal completion rate: 60% of set goals achieved within timeframe
- Goal adjustment adoption: 70% of users adjust unrealistic goals when prompted
- Sustainable adherence: 75% of users maintain goals for 30+ days

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Progress update <1s | Auth required | Progress data user-only | Color-blind safe progress | iOS 14+, Android 10+ |
| Celebration <500ms | Encrypted storage | No external sharing | Celebration screen reader | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S05.4.1 (Goal Creation)
- **Related Stories:** S05.3.2 (Recovery-aware suggestions)
- **External Dependencies:** E4 (Mobile App UI), E3 (WhatsApp goal nudges)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Goal data unavailable for day | Mark as "no data" not "failed"; don't break streak |
| User manually marks goal complete | Allow with logging; may affect tracking accuracy |
| Streak broken | Acknowledge: "Streak ended at X days. Ready to start a new one?" |
| Multiple goals complete same day | Celebrate each; don't overwhelm with notifications |
| User refuses all adjustment suggestions | Accept; track that user prefers ambitious goals |

### Open Questions
- Should we support public/social goal sharing?
- Should goals integrate with calendar for scheduled goal activities?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Progress bars and streaks functional
- [ ] All milestone celebrations implemented
- [ ] Goal adjustment prompts working
- [ ] Recovery-aware suggestions integrated
- [ ] Light and Deep modes operational
- [ ] Goal completion flow tested

---

# FEATURE F5.5: WORKOUT RECOMMENDATIONS

---

## S05.5.1: Workout Recommendation Engine

### User Story
**As a** Busy Professional (P2),
**I want to** have AI tell me exactly what workout to do today based on my recovery, schedule, and goals,
**So that** I don't waste time planning and can maximize results with limited time.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Each day, the AI generates a personalized workout recommendation based on multiple inputs: recovery scores, user goals, workout history, cross-pillar data, and time/equipment constraints. This is NOT generic "do cardio" advice - it's a specific plan with exercises, sets, and duration.

**Recommendation Generation Process:**
```
1. Recovery Assessment (from S05.3.1):
   - Both scores >80: High-intensity option available
   - Either score 50-79: Moderate intensity recommended
   - Either score <50: Light activity or rest recommended

2. Goal Alignment (from S05.4.1):
   - Strength goal → Strength training emphasis
   - Endurance goal → Cardio emphasis
   - Weight loss goal → Higher calorie burn focus
   - General health → Balanced variety

3. Workout History Analysis:
   - Muscle group rotation (avoid same groups consecutive days)
   - Workout type variety (avoid 5+ days same activity)
   - Progressive overload consideration

4. Cross-Pillar Inputs (from E7):
   - Low energy → Shorter, less intense workout
   - High stress → Mind-body exercises (yoga, tai chi)
   - Poor sleep → Active recovery recommended

5. Time/Equipment Constraints:
   - User's available time
   - User's equipment access (home, gym, outdoors)

6. Generate Plan:
   - Select workout type
   - Choose specific exercises
   - Set volume (sets/reps/duration)
   - Provide rationale
```

**Recommendation Output:**
- Workout type (e.g., "Upper Body Strength")
- Duration estimate (e.g., "35 minutes")
- Intensity level (Light/Moderate/High)
- Brief rationale (e.g., "Based on your high recovery and strength goal")
- Link to full workout plan (S05.5.2)

**Safety Checks:**
- Warns against high-intensity with poor recovery
- Suggests rest days when appropriate
- Flags potential injury risk (e.g., same muscle group 3 days in a row)

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Single "Workout of the Day" recommendation with duration and intensity. One-tap start. Example: "30-min Moderate Cardio recommended today". |
| **Deep** | Full recommendation with rationale, alternative options, ability to request different workout type. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Recommendation ID | UUID | Required | System |
| Workout Type | Enum | From categories | User-only |
| Intensity | Enum | Light/Moderate/High | User-only |
| Duration Minutes | Integer | 10-120 range | User-only |
| Rationale | String | Generated | User-only |
| Physical Recovery | Integer 0-100 | Input | User-only |
| Mental Recovery | Integer 0-100 | Input | User-only |
| User Accepted | Boolean | User action | Aggregated |

**Behaviors:**
- Recommendation generates after morning recovery scores calculate
- Updates if significant input changes (e.g., time constraint added)
- User can reject and request alternative
- Accepted recommendation feeds into strain calculation (S05.6.1)
- Available via mobile app, WhatsApp, and voice coaching

### Acceptance Criteria

**AC1: Recovery-Based Intensity**
Given recovery scores are available,
When recommendation generates,
Then intensity aligns with recovery: Both High (80+) → High intensity available; Either Low (<50) → Light/rest recommended.

**AC2: Goal Alignment**
Given user has active fitness goals,
When recommendation generates,
Then workout type aligns with goal (strength goal → strength workout).

**AC3: Workout History Consideration**
Given user did upper body strength yesterday,
When recommendation generates today,
Then upper body is NOT recommended (muscle rotation).

**AC4: Cross-Pillar Input**
Given user logged high stress in E7,
When recommendation generates,
Then mind-body exercises (yoga, breathing) are suggested.

**AC5: Light Mode Display**
Given user is in Light mode,
When viewing recommendation,
Then single "Workout of the Day" displays with one-tap start.

**AC6: Deep Mode Rationale**
Given user is in Deep mode,
When viewing recommendation,
Then full rationale and alternative options display.

**AC7: Safety Warning**
Given physical recovery is <50 AND recommendation would be High intensity,
When generating recommendation,
Then system overrides to lower intensity with warning: "Recovery low - intense workout not recommended today."

**AC8: Multi-Channel Availability**
Given recommendation is generated,
When user queries via WhatsApp ("What should I do today?") or Voice,
Then the recommendation is delivered via that channel.

### Success Metrics
- Workout recommendation acceptance: 70% of recommendations started by user
- Recovery alignment accuracy: 85% match between workout and recovery state
- User satisfaction: 4.5/5 rating on workout diversity

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Generation <3s | Auth required | Recommendations user-only | Plain language | iOS 14+, Android 10+ |
| Update <2s | Encrypted storage | No external sharing | Screen reader support | Multi-channel delivery |

### Dependencies
- **Prerequisite Stories:** S05.3.1 (Recovery), S05.4.1 (Goals)
- **Related Stories:** S05.5.2 (Exercise Library), S05.5.3 (Feedback)
- **External Dependencies:** E7 (Wellbeing inputs), E2 (Voice), E3 (WhatsApp)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No recovery score available | Generate based on other factors; note: "Personalization improves with recovery tracking" |
| User rejects 3+ recommendations | Ask for feedback: "What would you prefer today?" Learn preference |
| Conflicting inputs (high recovery + high stress) | Prioritize mental health: suggest moderate intensity |
| No workout history | Start with balanced, beginner-friendly recommendations |
| Equipment constraint not set | Ask user: "What equipment do you have access to today?" |

### Open Questions
- Should we support scheduled recommendations (e.g., generate for whole week)?
- How do we handle users who always override AI recommendations?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 6 recommendation inputs considered
- [ ] Safety checks preventing overtraining
- [ ] Light and Deep modes functional
- [ ] Multi-channel delivery working
- [ ] Rejection/alternative flow implemented

---

## S05.5.2: Exercise Library & Workout Plans

### User Story
**As a** user,
**I want to** receive detailed workout plans with specific exercises, sets, and reps,
**So that** I can execute workouts without guessing what to do or how much.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
When a user accepts a workout recommendation, they receive a complete workout plan with specific exercises, sets/reps (or duration for cardio), rest periods, and intensity guidance. The exercise library supports this with detailed exercise information.

**Exercise Library Structure (5 Categories, 10+ exercises each):**

| Category | Example Exercises |
|----------|-------------------|
| **Strength (Bodyweight)** | Push-ups, Squats, Lunges, Planks, Pull-ups, Dips, Burpees, Mountain Climbers, Glute Bridges, Tricep Dips |
| **Strength (Weights)** | Bench Press, Deadlifts, Barbell Squats, Bent-Over Rows, Overhead Press, Bicep Curls, Lateral Raises, Leg Press, Romanian Deadlifts, Face Pulls |
| **Cardio** | Running, Cycling, Swimming, Rowing, Jump Rope, HIIT Intervals, Stair Climbing, Elliptical, Dancing, Boxing |
| **Flexibility** | Sun Salutation, Standing Forward Fold, Pigeon Pose, Cat-Cow, Child's Pose, Hamstring Stretch, Quad Stretch, Shoulder Stretch, Hip Opener, Spinal Twist |
| **Recovery** | Foam Rolling (Back), Foam Rolling (Legs), Light Walking, Gentle Yoga Flow, Breathing Exercises, Meditation, Static Stretching, Mobility Drills, Balance Work, Self-Massage |

**Workout Plan Structure:**
```
WORKOUT: Upper Body Strength
Duration: 35 minutes
Intensity: Moderate
Equipment: Dumbbells

WARM-UP (5 min):
- Arm circles: 30 seconds
- Jumping jacks: 1 minute
- Dynamic stretches: 3 minutes

MAIN WORKOUT (25 min):
1. Push-ups: 3 sets x 12 reps (Rest: 60s)
2. Dumbbell Rows: 3 sets x 10 reps each arm (Rest: 60s)
3. Overhead Press: 3 sets x 10 reps (Rest: 60s)
4. Tricep Dips: 3 sets x 12 reps (Rest: 45s)
5. Plank: 3 sets x 30 seconds (Rest: 30s)

COOL-DOWN (5 min):
- Chest stretch: 30 seconds each side
- Tricep stretch: 30 seconds each arm
- Shoulder stretch: 30 seconds each side
- Deep breathing: 1 minute
```

**Pre-Built Workout Templates:**
- Beginner Full Body (20 min)
- Intermediate Upper Body (35 min)
- Advanced HIIT (25 min)
- Recovery Day Mobility (20 min)
- Quick Cardio Blast (15 min)
- Strength + Cardio Combo (45 min)

**Alternative Exercise Support:**
When equipment unavailable, system suggests alternatives:
- Bench Press → Push-ups (bodyweight alternative)
- Barbell Squats → Goblet Squats (dumbbell alternative)

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Simplified plan: Exercise names + sets/reps only. Quick reference for experienced users. |
| **Deep** | Full plan with warm-up/cool-down, rest periods, exercise tips, video links (future), alternatives. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Exercise ID | UUID | From library | System |
| Exercise Name | String | Required | User-only |
| Category | Enum | From categories | System |
| Sets | Integer | 1-10 range | User-only |
| Reps | Integer | 1-100 range | User-only |
| Duration Seconds | Integer | For timed exercises | User-only |
| Rest Seconds | Integer | 0-300 range | User-only |
| Equipment Required | Enum array | From equipment list | System |

**Behaviors:**
- Workout plan generates alongside recommendation (S05.5.1)
- User can view full plan before starting
- Alternative exercises available for equipment constraints
- Plan adapts based on user's fitness level (beginner/intermediate/advanced)
- Exercise library searchable and browsable

### Acceptance Criteria

**AC1: Complete Workout Plan**
Given a workout recommendation is accepted,
When user views the plan,
Then complete structure displays: warm-up, main exercises with sets/reps/rest, cool-down.

**AC2: Exercise Library Coverage**
Given the exercise library,
When browsing or searching,
Then 50+ exercises across 5 categories are available.

**AC3: Equipment Alternatives**
Given an exercise requires unavailable equipment,
When user indicates equipment constraint,
Then alternative exercises are suggested.

**AC4: Pre-Built Templates**
Given user wants a quick workout,
When browsing templates,
Then 6+ pre-built workout templates are available.

**AC5: Light Mode Simplified View**
Given user is in Light mode,
When viewing workout plan,
Then simplified list shows: exercise names + sets/reps only.

**AC6: Deep Mode Full Details**
Given user is in Deep mode,
When viewing workout plan,
Then full details display: warm-up, cool-down, rest periods, exercise tips.

**AC7: Fitness Level Adaptation**
Given user's fitness level is known (from onboarding),
When plan generates,
Then difficulty scales appropriately (beginner = fewer reps, longer rest).

### Success Metrics
- Workout completion rate: 80% of started workouts completed
- Exercise library satisfaction: 4.5/5 user rating on variety
- Alternative exercise usage: Tracked for equipment constraint patterns

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Plan display <2s | Auth required | Plans user-only | Exercise names readable | iOS 14+, Android 10+ |
| Search <1s | Encrypted storage | No external sharing | Clear visual hierarchy | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S05.5.1 (Workout Engine)
- **Related Stories:** S05.5.3 (Feedback)
- **External Dependencies:** E4 (Mobile App UI)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Exercise not in library | Allow custom exercise entry; track for future addition |
| User modifies plan mid-workout | Allow; log modifications for learning |
| No equipment at all | Default to full bodyweight plan |
| User requests specific duration | Generate plan fitting requested time |
| Recovery day plan requested | Provide gentle mobility/stretching plan |

### Open Questions
- Should we include exercise demonstration videos (future enhancement)?
- Should users be able to save custom workout plans?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 50+ exercises in library across 5 categories
- [ ] Complete workout plan structure implemented
- [ ] Alternative exercise suggestions working
- [ ] Pre-built templates available
- [ ] Light and Deep modes functional
- [ ] Fitness level adaptation working

---

## S05.5.3: Workout Feedback & Progressive Overload

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** provide feedback after workouts so AI learns my preferences, and see gradual difficulty increases as I improve,
**So that** recommendations get better over time and I continuously progress.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
After completing a workout, users provide simple feedback. This feedback trains the recommendation algorithm to better match user preferences. Additionally, the system implements progressive overload by gradually increasing difficulty when users consistently complete workouts.

**Post-Workout Feedback:**
Simple prompt after workout completion:
- "How was this workout?"
  - Too Easy (will increase difficulty)
  - Just Right (perfect match)
  - Too Hard (will decrease difficulty)
  - Not My Style (learn preference)

**Optional Detail Feedback:**
- Which exercises did you enjoy?
- Which exercises were too difficult?
- Any exercises you'd like to skip next time?
- How do you feel now? (energy level 1-5)

**Progressive Overload Logic:**
```
After 3+ consecutive "completed" workouts at same level:
- Strength: +5% weight or +1 rep per set
- Cardio: +5% duration or +1 intensity level
- HIIT: +1 interval or -5s rest period

After 2+ consecutive "Too Hard" feedback:
- Reduce to previous difficulty level
- Flag for review: suggest easier alternatives

After 3+ consecutive "Too Easy" feedback:
- Immediate increase in difficulty
- Consider moving to advanced templates
```

**Algorithm Learning:**
| Feedback | System Response |
|----------|-----------------|
| "Too Easy" multiple times | Increase baseline intensity for this user |
| "Not My Style" on running | Reduce running recommendations, suggest alternatives |
| Skipped leg exercises | Note preference; still include legs but offer alternatives |
| High post-workout energy | This workout type is well-suited to user |
| Low post-workout energy | May have been too intense; adjust |

**Injury Handling:**
- User reports injury or pain → Immediately remove exercises affecting that area
- "I hurt my [body part]" → System adjusts all future recommendations
- Recovery period suggestions provided
- Gradual reintroduction of affected exercises after recovery

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Workout ID | UUID | Required | System |
| Difficulty Rating | Enum | Easy/Right/Hard | User-only |
| Style Match | Boolean | True/False | User-only |
| Enjoyed Exercises | UUID array | From workout | User-only |
| Difficult Exercises | UUID array | From workout | User-only |
| Skip Requests | UUID array | From workout | User-only |
| Post Energy | Integer 1-5 | Optional | User-only |
| Injury Report | String | Free text | User-only |

**Behaviors:**
- Feedback prompt appears immediately after workout marked complete
- Progressive overload applies automatically based on consistency
- Algorithm adjustments happen in real-time
- Injury reports trigger immediate safety responses
- Feedback optional but encouraged

### Acceptance Criteria

**AC1: Post-Workout Feedback Prompt**
Given a user completes a workout,
When they mark it done,
Then a feedback prompt appears: "How was this workout?" with options.

**AC2: Difficulty Adjustment - Too Easy**
Given a user rates 3+ workouts as "Too Easy",
When the next recommendation generates,
Then difficulty is increased (more reps, weight, or intensity).

**AC3: Difficulty Adjustment - Too Hard**
Given a user rates 2+ workouts as "Too Hard",
When the next recommendation generates,
Then difficulty is decreased.

**AC4: Progressive Overload**
Given a user completes 3+ consecutive workouts at same level without "Too Hard" feedback,
When the next recommendation generates,
Then slight progression is applied (+5% weight/duration or +1 rep).

**AC5: Preference Learning**
Given a user marks an exercise as "Not My Style" multiple times,
When future recommendations generate,
Then that exercise type is reduced in frequency or replaced.

**AC6: Injury Handling**
Given a user reports "I hurt my shoulder",
When future recommendations generate,
Then shoulder exercises are removed and alternatives provided.

**AC7: Optional Detailed Feedback**
Given a user wants to provide more detail,
When they expand feedback options,
Then they can rate individual exercises and provide post-workout energy level.

### Success Metrics
- Feedback submission rate: 60% of completed workouts receive feedback
- Algorithm accuracy improvement: 10% increase in "Just Right" ratings over 30 days
- Injury response satisfaction: 90% report appropriate exercise removal

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Feedback save <1s | Auth required | Feedback user-only | Simple rating UI | iOS 14+, Android 10+ |
| Adjustment apply <2s | Encrypted storage | No external sharing | Voice input option | Multi-channel |

### Dependencies
- **Prerequisite Stories:** S05.5.1 (Workout Engine), S05.5.2 (Exercise Library)
- **Related Stories:** S05.6.1 (Strain tracking post-workout)
- **External Dependencies:** E4 (Mobile App UI)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| User never provides feedback | Use completion/skip patterns as implicit feedback |
| Conflicting feedback (easy one day, hard next) | Weight recent feedback more; detect pattern changes |
| Injury reported then recovered | After 2 weeks, gently suggest reintroducing exercises |
| User always says "Too Hard" | Suggest reassessing fitness level; provide very beginner options |
| Feedback provided via WhatsApp | Accept: "That workout was too easy" parsed as feedback |

### Open Questions
- How long should we wait before reintroducing exercises after injury?
- Should we show users how their feedback affected recommendations?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Post-workout feedback flow implemented
- [ ] Progressive overload logic functional
- [ ] Preference learning working
- [ ] Injury handling with exercise removal
- [ ] Algorithm adjustments applying correctly

---

# FEATURE F5.6: STRAIN/LOAD MANAGEMENT

---

## S05.6.1: yHealth Strain Score Calculation

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** understand my training load for each workout and day,
**So that** I can optimize my workout distribution and avoid overtraining without needing expensive wearables.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The yHealth Strain Score (0-100) measures training load for each activity and aggregates into daily/weekly totals. Unlike WHOOP, yHealth calculates strain using ANY available data source - making strain tracking accessible to all users, not just those with premium wearables.

**Three Calculation Methods:**

**Method A: HR-Based (Most Accurate - requires wearable HR data)**
```
1. Calculate average % of max HR during activity
2. Weight by activity duration
3. Apply activity type multiplier:
   - HIIT: 1.5x
   - Strength: 1.2x
   - Cardio: 1.0x
   - Yoga/Flexibility: 0.6x
   - Recovery: 0.3x
4. Normalize to 0-100 scale based on user baseline
```

**Method B: Duration + Type (Good - no HR required)**
```
1. Activity type baseline strain per hour:
   - HIIT: 15/hour
   - Strength: 12/hour
   - Cardio: 10/hour
   - Yoga: 5/hour
   - Recovery: 3/hour
2. Multiply by duration in hours
3. Adjust for user fitness level:
   - Beginner: +20%
   - Intermediate: 0%
   - Advanced: -10%
4. Normalize to 0-100 scale
```

**Method C: Perceived Effort (Basic - manual entry fallback)**
```
1. User rates effort 1-10
2. Multiply by duration in 10-minute increments
3. Convert to 0-100 scale
4. Less accurate but maintains tracking continuity
```

**Strain Aggregation:**
- **Daily Strain:** Sum of all activities that day
- **Weekly Strain:** 7-day rolling total
- **Activity Strain:** Individual activity contribution

**Strain Categories:**
| Range | Category | Description |
|-------|----------|-------------|
| 0-20 | Very Light | Recovery activities only |
| 21-40 | Light | Easy workouts, active recovery |
| 41-60 | Moderate | Typical training day |
| 61-80 | High | Challenging workout |
| 81-100+ | Very High | Peak effort, race day |

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Daily strain score (0-100) with color coding and simple guidance: "Today's strain: 65 (Moderate). You have capacity for more." |
| **Deep** | Detailed strain breakdown by activity, calculation method used, accuracy indicator, contribution chart. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Activity ID | UUID | Required | System |
| Strain Score | Float 0-100+ | Calculated | User-only |
| Calculation Method | Enum | A/B/C | System |
| HR Average | Integer BPM | If available | User-only |
| Duration Minutes | Integer | Required | User-only |
| Activity Type | Enum | Required | User-only |
| User Effort Rating | Integer 1-10 | If manual | User-only |
| Daily Total | Float | Calculated | User-only |
| Weekly Total | Float | Calculated | User-only |

**Behaviors:**
- Strain calculates immediately after activity data syncs or manual entry
- Method selection automatic based on available data (HR preferred)
- Daily and weekly totals update in real-time
- Strain feeds into recovery calculation and workout recommendations

### Acceptance Criteria

**AC1: HR-Based Calculation (Method A)**
Given activity has HR data from wearable,
When strain calculates,
Then Method A (most accurate) is used with HR zones and activity multiplier.

**AC2: Duration-Based Calculation (Method B)**
Given activity has no HR data but has type and duration,
When strain calculates,
Then Method B is used with activity baseline and fitness level adjustment.

**AC3: Perceived Effort Calculation (Method C)**
Given activity is manually entered with effort rating,
When strain calculates,
Then Method C is used with effort x duration formula.

**AC4: Daily Strain Total**
Given multiple activities in a day,
When viewing daily strain,
Then total equals sum of all activity strains.

**AC5: Weekly Strain Tracking**
Given 7+ days of activity data,
When viewing weekly strain,
Then 7-day rolling total displays.

**AC6: Light Mode Display**
Given user is in Light mode,
When viewing strain,
Then daily score with color coding and simple guidance displays.

**AC7: Deep Mode Breakdown**
Given user is in Deep mode,
When viewing strain,
Then activity-by-activity breakdown with calculation method and contribution % displays.

**AC8: Method Accuracy Indicator**
Given strain is calculated,
When displaying the score,
Then accuracy indicator shows: "High accuracy (HR-based)" or "Estimated (duration-based)" or "Approximate (perceived effort)".

### Success Metrics
- Strain accuracy vs. perceived effort: 75% correlation
- Method A usage: 60%+ for wearable-connected users
- Universal accessibility: 100% of users can track strain (regardless of device)

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Calculation <1s | Encrypted storage | Strain data user-only | Color-blind safe categories | Works without wearable |
| Real-time update | Auth required | No external sharing | Plain language guidance | All calculation methods |

### Dependencies
- **Prerequisite Stories:** S05.1.1 (Activity data source), S05.0.1 (Wearable infrastructure for HR)
- **Related Stories:** S05.6.2 (Strain-Recovery Balance), S05.6.3 (Alerts)
- **External Dependencies:** None (self-contained)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No HR and no perceived effort | Use Method B (duration + type only); note lower accuracy |
| Activity type unknown | Default to "Other" with 1.0x multiplier |
| Unrealistic strain spike | Flag for review: "This activity seems unusually intense. Confirm details?" |
| Very long activity (>3 hours) | Apply fatigue factor; don't scale linearly |
| Multiple activities same time | Merge if overlap >50%; otherwise keep separate |

### Open Questions
- Should we show users which calculation method was used?
- How should we handle sleep as "negative strain" (recovery)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All three calculation methods implemented
- [ ] Daily and weekly aggregation working
- [ ] Category thresholds applied correctly
- [ ] Light and Deep modes functional
- [ ] Accuracy indicators displaying

---

## S05.6.2: Strain-Recovery Balance

### User Story
**As a** user,
**I want to** understand if my training load matches my recovery capacity,
**So that** I can train optimally without overreaching or undertraining.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The strain-recovery balance shows users whether their training load is appropriate for their recovery capacity. This prevents overtraining (too much strain vs. recovery) and undertraining (wasting recovery potential).

**Strain-Recovery Ratio:**
```
Weekly Strain ÷ (Weekly Average Recovery × Factor) = Ratio

Healthy Balance Ranges:
- Ratio ~1.0: Balanced (training matches recovery)
- Ratio >1.5: Overreaching (reduce load or improve recovery)
- Ratio <0.5: Undertraining (can push more if goals warrant)
```

**Recommended Strain Ranges by Goal:**
| Goal | Weekly Strain Target | Description |
|------|---------------------|-------------|
| Maintenance | 40-60 | Maintain current fitness |
| Progressive Training | 60-80 | Gradual improvement |
| Peak Performance | 80-100+ | Short-term max effort |
| Recovery Week | 0-40 | Deload period |

**Balance Visualization:**
- Visual gauge showing current position
- Green zone: Balanced
- Yellow zone: Approaching overreach
- Red zone: Overtraining risk

**Balance Insights:**
- "Your strain is 20% higher than your recovery supports. Consider a lighter day."
- "You have recovery capacity available. Today is a good day to push."
- "Great balance this week! You're training optimally for your recovery."

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Simple balance indicator (Balanced/Over/Under) with one-line guidance |
| **Deep** | Detailed ratio, weekly trend chart, strain vs. recovery overlay, goal-specific targets |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Weekly Strain | Float | Calculated | User-only |
| Weekly Avg Recovery | Float | Calculated | User-only |
| Balance Ratio | Float | Calculated | User-only |
| Balance Status | Enum | Over/Under/Balanced | User-only |
| User Goal | Enum | Maintenance/Progressive/Peak/Recovery | User-only |

**Behaviors:**
- Balance calculates daily as new strain/recovery data arrives
- Ratio compared against user's current goal
- Insights generated based on balance status
- Balance feeds into workout recommendations (reduce if overreaching)

### Acceptance Criteria

**AC1: Balance Ratio Calculation**
Given weekly strain and recovery data available,
When balance calculates,
Then ratio = Weekly Strain ÷ (Weekly Avg Recovery × Factor).

**AC2: Balance Status Classification**
Given balance ratio calculated,
When displaying status,
Then: >1.5 = "Overreaching", <0.5 = "Undertraining", 0.5-1.5 = "Balanced".

**AC3: Goal-Specific Targets**
Given user has selected training goal,
When viewing balance,
Then recommended strain range for that goal displays.

**AC4: Balance Visualization**
Given balance data available,
When viewing strain section,
Then visual gauge shows current position with green/yellow/red zones.

**AC5: Balance Insight Generation**
Given balance status determined,
When displaying balance,
Then actionable insight displays (e.g., "Consider a lighter day").

**AC6: Light Mode Display**
Given user is in Light mode,
When viewing balance,
Then simple indicator (Balanced/Over/Under) with one-line guidance shows.

**AC7: Deep Mode Analysis**
Given user is in Deep mode,
When viewing balance,
Then detailed ratio, weekly trend, strain vs. recovery overlay displays.

### Success Metrics
- Optimal strain adherence: 70% of users maintain strain within recommended range
- Strain-recovery balance achievement: 80% of users achieve ~1:1 ratio weekly
- Overtraining prevention: 60% reduction in user-reported overtraining symptoms

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Balance calc <1s | Auth required | Balance data user-only | Color-blind safe gauge | iOS 14+, Android 10+ |
| Update on new data | Encrypted storage | No external sharing | Plain language insights | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S05.6.1 (Strain Calculation), S05.3.1 (Recovery Scores)
- **Related Stories:** S05.6.3 (Alerts), S05.5.1 (Workout recommendations)
- **External Dependencies:** None

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No recovery data | Show strain only; prompt: "Add recovery tracking for balance analysis" |
| Very low strain week | Note as "Recovery week pattern" not necessarily undertraining |
| High strain + high recovery | Show as balanced; "Your body is handling the load well" |
| Sudden strain spike | Flag: "Big increase this week. Make sure to support with recovery." |
| Goal not set | Default to "General Health" balance targets |

### Open Questions
- Should we show historical balance trends (how balanced were you last month)?
- Should balance warnings be more aggressive for injury prevention?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Balance ratio calculation correct
- [ ] Status classification working
- [ ] Goal-specific targets displaying
- [ ] Visual gauge functional
- [ ] Light and Deep modes operational

---

## S05.6.3: Strain Alerts & Weekly Analysis

### User Story
**As a** user,
**I want to** receive alerts when my training load becomes concerning,
**So that** I can prevent overtraining before it impacts my performance or health.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Proactive alerts catch dangerous training patterns before users realize there's a problem. Weekly analysis helps users understand their training distribution and plan future weeks.

**Alert Triggers:**

| Alert | Trigger | Severity | Message |
|-------|---------|----------|---------|
| **High Strain Streak** | 3+ consecutive days >80 strain with recovery <50 | Critical | "You've been pushing hard for 3 days with low recovery. Rest day strongly recommended." |
| **Weekly Overreach** | Weekly strain >150% of previous week | High | "Your training volume jumped significantly this week. Watch for overtraining signs." |
| **Chronic High Load** | 7+ consecutive days >80 strain | Critical | "High strain for 7 days. Your body needs recovery time." |
| **No Recovery Days** | 7+ days without a day <40 strain | Medium | "You haven't had a recovery day in a week. Consider a lighter day." |
| **Acute:Chronic Imbalance** | This week's strain >140% of 4-week average | High | "Training spike detected. Ease back to prevent injury." |

**Weekly Analysis:**
- Total weekly strain with comparison to previous week
- Strain distribution by day (which days were hardest?)
- Activity type breakdown (what contributed most to strain?)
- Strain vs. recovery correlation
- Recommendation for next week

**7-Day Strain Chart:**
- Bar chart showing daily strain
- Color-coded by intensity category
- Recovery score overlay (optional)
- Average line for context

**Data Export:**
- CSV export of strain history
- PDF report with weekly analysis

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Active alerts only with dismiss option |
| **Deep** | Weekly analysis, detailed charts, export, historical comparison |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Alert Type | Enum | From alert types | System |
| Alert Triggered | ISO 8601 | Required | System |
| Alert Acknowledged | Boolean | User action | System |
| Weekly Strain | Float | Calculated | User-only |
| Previous Week Strain | Float | Historical | User-only |
| Strain by Day | Float array | 7 values | User-only |
| Strain by Type | JSON | Activity breakdown | User-only |

**Behaviors:**
- Alerts trigger proactively when patterns detected
- Alert cooldown prevents spam (same alert max 1x per 48h)
- Weekly analysis generates every Monday (or user-selected day)
- Export available anytime in Deep mode
- Alerts integrate with workout recommendations

### Acceptance Criteria

**AC1: High Strain Streak Alert**
Given 3+ consecutive days with strain >80 AND recovery <50,
When alert system checks,
Then critical alert triggers: "Rest day strongly recommended."

**AC2: Weekly Overreach Alert**
Given this week's strain >150% of previous week,
When weekly analysis runs,
Then alert triggers: "Training volume jumped significantly."

**AC3: Chronic High Load Alert**
Given 7+ consecutive days with strain >80,
When alert system checks,
Then critical alert triggers: "Your body needs recovery time."

**AC4: Alert Acknowledgment**
Given an alert has triggered,
When user acknowledges it,
Then alert dismissed and won't repeat for 48 hours.

**AC5: Weekly Analysis Generation**
Given it's the start of a new week,
When weekly analysis runs,
Then report generates with: total strain, comparison, distribution, recommendations.

**AC6: 7-Day Strain Chart**
Given 7+ days of strain data,
When viewing strain section,
Then bar chart displays daily strain color-coded by intensity.

**AC7: Data Export**
Given user requests strain export,
When export generates,
Then CSV or PDF with strain history downloads.

**AC8: Light Mode Alert Display**
Given user is in Light mode,
When alerts exist,
Then only active alerts show with dismiss option (no full analysis).

### Success Metrics
- Alert effectiveness: 70% of users take action after critical alert
- Overtraining prevention: 60% reduction in user-reported overtraining symptoms
- Weekly analysis engagement: 50% of Deep mode users review weekly analysis

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Alert check <1s | Encrypted storage | Strain alerts user-only | Plain language alerts | iOS 14+, Android 10+ |
| Export <5s | Auth required | Export encrypted | Screen reader charts | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S05.6.1 (Strain Calculation), S05.6.2 (Balance)
- **Related Stories:** S05.3.3 (Recovery Alerts), S05.5.1 (Workout recommendations)
- **External Dependencies:** E4 (Mobile App UI)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| User dismisses all alerts | Reduce frequency; don't nag. Track dismissal pattern. |
| First week (no previous week data) | Skip weekly comparison; show absolute metrics only |
| Very sporadic logging | Note: "Incomplete data this week. Strain totals may be underestimated." |
| Multiple alerts same day | Prioritize by severity; show most critical first |
| Export fails | Retry option; fallback to smaller date range |

### Open Questions
- Should users be able to set custom alert thresholds?
- Should alerts integrate with calendar (suggest rest day on specific date)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 5 alert types triggering correctly
- [ ] Alert acknowledgment and cooldown working
- [ ] Weekly analysis generating
- [ ] 7-day strain chart functional
- [ ] Data export working
- [ ] Light and Deep modes operational

---

<!-- PIPELINE: S05.0.1, S05.1.1, S05.1.2, S05.2.1, S05.2.2, S05.3.1, S05.3.2, S05.3.3, S05.4.1, S05.4.2, S05.5.1, S05.5.2, S05.5.3, S05.6.1, S05.6.2, S05.6.3 -->

---

*Epic 05: Fitness Pillar - User Stories v1.0*
*yHealth Platform | Generated: 2025-12-09*
*EXPERT-13 Story Generator Workflow*

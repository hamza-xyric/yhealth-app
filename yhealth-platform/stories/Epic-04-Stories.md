# Epic 04: Mobile App - User Stories

> **Epic:** E04 - Mobile App
> **Source:** `prd-epics/PRD-Epic-04-Mobile-App.md`
> **Created:** 2025-12-09
> **Stories:** 20 (20 Must Have)
> **Workflow:** EXPERT-13 Story Generator v3.0

---

## Story Index

| Story ID | Title | Feature | Priority | Status |
|----------|-------|---------|----------|--------|
| S04.1.1 | Dashboard Core Layout & Three-Pillar Scores | F4.1 | P0 (Must) | Draft |
| S04.1.2 | Dashboard Insights & Quick Actions | F4.1 | P0 (Must) | Draft |
| S04.1.3 | Dashboard Adaptation & Personalization | F4.1 | P0 (Must) | Draft |
| S04.2.1 | Bottom Tab Navigation & Pillar Access | F4.2 | P0 (Must) | Draft |
| S04.2.2 | Channel Switching & Navigation State | F4.2 | P0 (Must) | Draft |
| S04.3.1 | Core Chart Rendering | F4.3 | P0 (Must) | Draft |
| S04.3.2 | Advanced Charts & Interactivity | F4.3 | P0 (Must) | Draft |
| S04.3.3 | Chart Time Ranges & Export | F4.3 | P0 (Must) | Draft |
| S04.4.1 | Notification Infrastructure | F4.4 | P0 (Must) | Draft |
| S04.4.2 | Notification Types & Delivery | F4.4 | P0 (Must) | Draft |
| S04.4.3 | Smart Timing & Frequency Control | F4.4 | P0 (Must) | Draft |
| S04.5.1 | Offline Detection & Data Caching | F4.5 | P0 (Must) | Draft |
| S04.5.2 | Offline Queue Management | F4.5 | P0 (Must) | Draft |
| S04.5.3 | Sync Engine & Reconnection | F4.5 | P0 (Must) | Draft |
| S04.5.4 | Conflict Resolution & Storage Management | F4.5 | P0 (Must) | Draft |
| S04.6.1 | Core Settings & Preferences | F4.6 | P0 (Must) | Draft |
| S04.6.2 | Privacy, Account & Device Management | F4.6 | P0 (Must) | Draft |
| S04.7.1 | Visual Accessibility & Screen Reader Support | F4.7 | P0 (Must) | Draft |
| S04.7.2 | Motor & Cognitive Accessibility | F4.7 | P0 (Must) | Draft |
| S04.7.3 | Auditory Accessibility & Testing Requirements | F4.7 | P0 (Must) | Draft |

---

## Dependency Diagram

```
PHASE 1: FOUNDATION (Sprint 1-2)
S04.2.1 (Navigation) ──┬──────────────────────────────────────────┐
                       │                                          │
S04.2.2 (Channel) ─────┤                                          │
                       │                                          │
S04.6.1 (Settings) ────┼──► S04.6.2 (Privacy/Account)             │
                       │                                          │
S04.7.1 (Visual A11y) ─┘                                          │
                                                                  │
                       ┌──────────────────────────────────────────┘
                       │
                       ▼
PHASE 2: CORE EXPERIENCE (Sprint 3-4)
S04.1.1 (Dashboard Core) ──► S04.1.2 (Insights/Actions) ──► S04.1.3 (Adaptation)
       │
       ├──► S04.3.1 (Core Charts) ──► S04.3.2 (Advanced) ──► S04.3.3 (Ranges/Export)
       │
       ▼
PHASE 3: ENGAGEMENT (Sprint 5)
S04.4.1 (Notif Infra) ──► S04.4.2 (Types/Delivery) ──► S04.4.3 (Timing/Frequency)
       │
S04.7.2 (Motor/Cognitive A11y) ◄────────────────────────┘
       │
       ▼
PHASE 4: RESILIENCE (Sprint 6)
S04.5.1 (Offline Detection) ──► S04.5.2 (Queue) ──► S04.5.3 (Sync) ──► S04.5.4 (Conflict)
       │
S04.7.3 (Auditory A11y) ◄───────┘
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F4.1: Unified Dashboard | S04.1.1, S04.1.2, S04.1.3 | 100% |
| F4.2: Navigation & IA | S04.2.1, S04.2.2 | 100% |
| F4.3: Data Visualization | S04.3.1, S04.3.2, S04.3.3 | 100% |
| F4.4: Push Notifications | S04.4.1, S04.4.2, S04.4.3 | 100% |
| F4.5: Offline Mode | S04.5.1, S04.5.2, S04.5.3, S04.5.4 | 100% |
| F4.6: Settings & Preferences | S04.6.1, S04.6.2 | 100% |
| F4.7: Accessibility Features | S04.7.1, S04.7.2, S04.7.3 | 100% |

**Completeness Verification:** All 7 features mapped to 20 stories with 100% coverage.

---

## Implementation Phases

| Phase | Sprint | Stories | Deliverable |
|-------|--------|---------|-------------|
| 1: Foundation | Sprint 1-2 | S04.2.1, S04.2.2, S04.6.1, S04.6.2, S04.7.1 | Navigation shell, settings framework, accessibility foundation |
| 2: Core Experience | Sprint 3-4 | S04.1.1, S04.1.2, S04.1.3, S04.3.1, S04.3.2, S04.3.3 | Unified dashboard, data visualizations |
| 3: Engagement | Sprint 5 | S04.4.1, S04.4.2, S04.4.3, S04.7.2 | Push notification system, motor/cognitive accessibility |
| 4: Resilience | Sprint 6 | S04.5.1, S04.5.2, S04.5.3, S04.5.4, S04.7.3 | Offline mode, sync engine, auditory accessibility |

---

## Cross-Epic Dependencies

| Story | Depends On | Dependency Type | Status |
|-------|------------|-----------------|--------|
| S04.1.1-1.3 (Dashboard) | E5, E6, E7 | Pillar scores and data | Awaiting E5-E7 |
| S04.1.2 (Insights) | E8 | Cross-domain AI insights | Awaiting E8 |
| S04.2.2 (Channel Switch) | E2, E3 | Voice and WhatsApp channels | E2, E3 Complete |
| S04.3.* (Visualization) | E5, E6, E7, E10 | Pillar data and analytics | Awaiting E5-E7, E10 |
| S04.6.2 (Connected Devices) | E9 | Data integrations | Awaiting E9 |

---

## Competitive Advantage Summary

Epic 04 establishes yHealth's mobile app as the **primary interface and home base** for holistic health management. Unlike competitors who focus on single domains (WHOOP on recovery, MyFitnessPal on nutrition), yHealth delivers a **three-pillar unified dashboard** with equal weight to Fitness, Nutrition, and Wellbeing. The **adaptive Light/Deep mode system** serves both busy professionals seeking quick glances and optimization enthusiasts diving into correlation charts. Combined with **WCAG 2.1 AA compliance** and **comprehensive offline mode**, yHealth delivers an industry-leading accessible, reliable mobile experience.

---

# FEATURE F4.1: UNIFIED DASHBOARD

---

## S04.1.1: Dashboard Core Layout & Three-Pillar Scores

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** see my complete health picture at a glance when I open the app,
**So that** I can quickly understand my status across fitness, nutrition, and wellbeing without navigating through multiple screens.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
When the user opens the app, the dashboard displays as the home screen with a visually balanced layout showing all three pillar scores prominently. Each pillar (Fitness, Nutrition, Wellbeing) receives equal visual weight, reinforcing yHealth's holistic approach. The dashboard shell provides the foundation for all dashboard content.

**Dashboard Core Elements:**
- **Header:** App branding, current date, user greeting (time-of-day aware)
- **Three-Pillar Score Display:**
  - Fitness Score (0-100) with pillar-specific icon
  - Nutrition Score (0-100) with pillar-specific icon
  - Wellbeing Score (0-100) with pillar-specific icon
- **Score Color Coding:**
  - Green: 80-100 (Excellent)
  - Yellow: 50-79 (Needs Attention)
  - Red: 0-49 (Priority Focus)
- **Today's Summary Section:** Placeholder for key daily metrics

**Skeleton Loading:**
When data is loading, display skeleton UI elements (gray placeholder boxes) matching the layout shape. Never show a blank screen during data fetch.

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Fitness Score | Integer 0-100 | From E5 | User-only |
| Nutrition Score | Integer 0-100 | From E6 | User-only |
| Wellbeing Score | Integer 0-100 | From E7 | User-only |
| Last Updated | ISO Timestamp | Required | System |

**Behaviors:**
- Dashboard is the default landing screen after authentication
- Pillar scores update in real-time when new data syncs
- Tapping a pillar score navigates to that pillar's detail view (via F4.2 navigation)
- Score colors update immediately when threshold crossed

### Acceptance Criteria

**AC1: Dashboard Layout**
Given the user is authenticated,
When they open the app or navigate to Dashboard tab,
Then the dashboard displays with three-pillar scores prominently visible above the fold.

**AC2: Score Color Coding**
Given the dashboard is displaying pillar scores,
When a pillar score is 80-100,
Then the score displays with green color indicator.

Given a pillar score is 50-79,
When rendered on dashboard,
Then the score displays with yellow color indicator.

Given a pillar score is 0-49,
When rendered on dashboard,
Then the score displays with red color indicator.

**AC3: Skeleton Loading**
Given the dashboard is fetching data,
When the API request is in progress,
Then skeleton loading placeholders display in place of content (no blank screen).

**AC4: Pillar Navigation**
Given the dashboard is displaying,
When the user taps on a pillar score,
Then the app navigates to that pillar's detail view.

**AC5: Equal Visual Weight**
Given the dashboard layout,
When all three pillars are displayed,
Then each pillar occupies equal visual space and prominence.

### Success Metrics
- Dashboard renders within 3 seconds on average network
- 90% of active users open dashboard daily
- Pillar score tap-through rate >40%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <3s load time | Auth required | Scores user-only | WCAG 2.1 AA colors | iOS 14+, Android 10+ |
| Skeleton <500ms | Token validation | No PII in cache key | Min 4.5:1 contrast | Portrait + Landscape |

### Dependencies
- **Prerequisite Stories:** S04.2.1 (Navigation must exist for pillar drill-down)
- **Related Stories:** S04.1.2, S04.1.3
- **External Dependencies:** E5, E6, E7 (Pillar score calculations)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Dashboard load failure (API timeout) | Show cached dashboard with timestamp: "Showing data from [time]. Pull to refresh when online." |
| Partial data load (some pillars unavailable) | Display available data, show placeholder with message for missing: "Fitness data syncing..." |
| No data yet (new user Day 1) | Welcome message with onboarding prompts: "Welcome! Start by connecting a wearable or logging your first meal." |
| Stale cached data (>24h old) | Visual indicator badge: "Data from yesterday. Connect to update." |

### Open Questions
- Should pillar scores animate on value change?
- Should score history be accessible via long-press on score?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Error scenarios handled per PRD
- [ ] Accessibility requirements verified (contrast, screen reader labels)
- [ ] Performance requirements verified (<3s load)
- [ ] Cross-platform parity (iOS + Android)

---

## S04.1.2: Dashboard Insights & Quick Actions

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** see actionable insights and have one-tap access to common actions,
**So that** I can understand what to focus on and quickly log data without navigating through menus.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Below the pillar scores, the dashboard displays insight cards and quick action buttons. Insights are AI-prioritized to show the most actionable information first. Quick actions enable common tasks with a single tap.

**Featured Insight Cards:**
- **Light Mode:** 1 featured insight card (most actionable)
- **Deep Mode:** 3-5 insight cards with rotation
- Card content: Title, brief description, CTA button
- AI priority algorithm determines card ordering (most relevant/actionable first)
- Cards link to relevant detail views or actions

**Quick Action Buttons:**
- Log Meal → Opens meal logging (E6)
- Log Mood → Opens mood check-in (E7)
- Start Voice Coaching → Initiates voice session (E2)
- View Full Insights → Navigates to Insights tab (E10)
- Log Workout → Opens workout logging (E5)

**Pull-to-Refresh:**
- Swipe down gesture triggers data refresh
- Loading indicator during refresh
- Content updates upon completion

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Insight ID | UUID | From E8 | System |
| Insight Priority | Integer 1-5 | Required | System |
| Quick Action Taps | Event log | Analytics | Aggregated |

**Behaviors:**
- Insight cards rotate based on AI priority (E8 Cross-Domain Intelligence)
- Quick action buttons remain fixed for consistent access
- Pull-to-refresh triggers full dashboard data reload
- Insight engagement tracked for personalization

### Acceptance Criteria

**AC1: Insight Card Display**
Given the dashboard is loaded,
When insights are available from E8,
Then the dashboard displays featured insight card(s) based on mode (1 for Light, 3-5 for Deep).

**AC2: AI Priority Ordering**
Given multiple insights are available,
When the dashboard renders insight cards,
Then insights display in priority order (most actionable first per AI algorithm).

**AC3: Quick Action Buttons**
Given the dashboard is displayed,
When the user views the quick actions area,
Then 5 quick action buttons are visible: Log Meal, Log Mood, Start Voice Coaching, View Full Insights, Log Workout.

**AC4: Quick Action Navigation**
Given a quick action button is displayed,
When the user taps "Log Meal",
Then the app opens the meal logging interface.

Given a quick action button is displayed,
When the user taps "Start Voice Coaching",
Then the app initiates a voice coaching session (E2).

**AC5: Pull-to-Refresh**
Given the dashboard is displayed,
When the user performs pull-down gesture,
Then the dashboard data refreshes and loading indicator displays during fetch.

**AC6: Insight Click-Through**
Given an insight card is displayed,
When the user taps the insight card,
Then the app navigates to the relevant detail view or action.

### Success Metrics
- 70% of users use quick actions 3+ times/week
- 60% click-through rate on dashboard insights
- Pull-to-refresh used by 80% of daily active users

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Card render <500ms | Insight source validated | No PII in insights | Cards have alt text | iOS + Android |
| Touch response <100ms | Action auth check | Analytics anonymized | 44x44pt touch targets | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S04.1.1 (Dashboard core layout)
- **Related Stories:** S04.1.3, S04.2.1
- **External Dependencies:** E2 (Voice), E5-E7 (Pillars), E8 (Cross-Domain AI), E10 (Analytics)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No insights available (new user) | Display welcome card: "Keep logging to unlock personalized insights!" |
| Insight load failure | Show cached insights with timestamp or generic tips |
| Quick action target unavailable | Show toast: "[Feature] is currently unavailable. Try again later." |
| Pull-to-refresh with no network | Show offline indicator and cached data timestamp |

### Open Questions
- Should quick actions be customizable by user?
- How many insight cards maximum before scrolling required?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Error scenarios handled
- [ ] Quick actions functional for all 5 types
- [ ] Pull-to-refresh works reliably
- [ ] Insight engagement tracking implemented

---

## S04.1.3: Dashboard Adaptation & Personalization

### User Story
**As a** Busy Professional (P2),
**I want to** have my dashboard adapt to my preferences and time of day,
**So that** I see the most relevant information without configuring everything manually.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The dashboard automatically adapts based on user's Light/Deep mode preference (set during onboarding E1) and time of day. This creates a personalized experience without requiring manual configuration.

**Light/Deep Mode Rendering:**

| Element | Light Mode | Deep Mode |
|---------|------------|-----------|
| Pillar Scores | Large, prominent display | Large with 7-day trend sparklines |
| Today's Summary | Steps, meals logged, mood rating | + Active minutes, sleep, energy, calories |
| Insight Cards | 1 featured card | 3-5 cards with full descriptions |
| Quick Actions | 5 primary buttons | 5 buttons + secondary actions |
| Scrolling | Essential info above fold | Full scrollable feed |

**Time-of-Day Personalization:**
- **Morning (5am-12pm):** Recovery focus - sleep summary, recovery score, breakfast prompt
- **Afternoon (12pm-6pm):** Activity focus - step count, lunch logging, energy check
- **Evening (6pm-10pm):** Day summary - achievements, dinner log, mood reflection
- **Night (10pm-5am):** Rest focus - minimal content, sleep preparation tips

**Dashboard Caching:**
- Cache dashboard data locally for 7 days
- Display cached data immediately on app open
- Background refresh for fresh data
- Cache invalidation on significant data changes

**Behaviors:**
- Mode preference persists across sessions
- Time-of-day content rotates automatically
- Cached data serves immediately, fresh data loads in background
- Smooth transitions between content states

### Acceptance Criteria

**AC1: Light Mode Rendering**
Given the user has selected Light mode preference,
When the dashboard loads,
Then the dashboard displays simplified view: 3 pillar scores, 1 insight card, essential summary above fold.

**AC2: Deep Mode Rendering**
Given the user has selected Deep mode preference,
When the dashboard loads,
Then the dashboard displays comprehensive view: scores with sparklines, 3-5 insights, detailed summary, scrollable feed.

**AC3: Time-of-Day Morning**
Given the current time is between 5am-12pm,
When the dashboard loads,
Then the dashboard emphasizes recovery content: sleep summary, recovery score, breakfast prompt.

**AC4: Time-of-Day Evening**
Given the current time is between 6pm-10pm,
When the dashboard loads,
Then the dashboard emphasizes day summary: achievements, dinner logging, mood reflection.

**AC5: Dashboard Caching**
Given the user has previously loaded the dashboard,
When the app opens with cached data available,
Then cached dashboard displays immediately (<1 second) while fresh data loads in background.

**AC6: Cache Freshness**
Given cached data is >24 hours old,
When the dashboard displays,
Then a visual indicator shows data age: "Last updated [time]".

### Success Metrics
- 70% of Light mode users complete check-ins in <2 minutes
- 60% of Deep mode users engage with 3+ features per session
- Cached dashboard loads in <1 second

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Cached load <1s | Cache encrypted | Mode preference user-only | Mode switch announced | All timezones |
| Background refresh | Secure storage | Time detection local | No flashing content | iOS + Android |

### Dependencies
- **Prerequisite Stories:** S04.1.1, S04.1.2
- **Related Stories:** S04.5.1 (Offline caching infrastructure)
- **External Dependencies:** E1 (Onboarding mode selection)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Mode preference not set | Default to Light mode, prompt to set preference |
| Timezone change | Recalculate time-of-day content immediately |
| Cache corrupted | Clear cache, fetch fresh data, show loading state |
| Background refresh fails | Keep cached data, retry on next app foreground |

### Open Questions
- Should users be able to override time-of-day content?
- Should Deep mode include dashboard widget customization?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Light/Deep mode rendering correct
- [ ] Time-of-day personalization working
- [ ] Dashboard caching functional (7 days)
- [ ] Background refresh implemented

---

# FEATURE F4.2: NAVIGATION & INFORMATION ARCHITECTURE

---

## S04.2.1: Bottom Tab Navigation & Pillar Access

### User Story
**As a** Busy Professional (P2),
**I want to** quickly navigate between fitness tracking, meal logging, and mood check-ins,
**So that** I can complete my health tasks efficiently during short breaks.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The app uses a persistent bottom tab bar (standard iOS/Android pattern) for primary navigation. The tab bar is optimized for one-handed thumb usage and provides consistent access to all major app sections.

**Bottom Tab Bar (4 Tabs):**
1. **Dashboard** (Home icon) - Unified dashboard view (F4.1)
2. **Pillars** (Layers icon) - Access to Fitness, Nutrition, Wellbeing detail views
3. **Insights** (Lightbulb icon) - Analytics dashboard (E10)
4. **Profile** (Person icon) - Settings, account, connected devices

**Pillars Sub-Navigation:**
When user taps Pillars tab, secondary navigation displays:
- **Fitness** (Activity icon) - Activity, sleep, recovery, workouts (E5)
- **Nutrition** (Food icon) - Meals, calories, hydration (E6)
- **Wellbeing** (Heart icon) - Mood, journaling, habits (E7)

**Tab Badges:**
- Unread insights count on Insights tab
- Notification count (if applicable)
- Visual indicator for pending actions

**Touch Targets:**
All interactive elements meet minimum 44x44pt touch target for accessibility.

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Tab Tap Events | Event log | Analytics | Aggregated |
| Current Tab State | String | Required | Session |

**Behaviors:**
- Tab bar persists across all screens (except full-screen modals)
- Active tab visually highlighted
- Tab badges update in real-time
- Pillars sub-nav appears on Pillars tab selection

### Acceptance Criteria

**AC1: Four Tab Display**
Given the app is loaded,
When the main interface displays,
Then a bottom tab bar with 4 tabs is visible: Dashboard, Pillars, Insights, Profile.

**AC2: Tab Navigation**
Given the bottom tab bar is displayed,
When the user taps on a tab,
Then the app navigates to that section's primary view.

**AC3: Pillars Sub-Navigation**
Given the user is on the Pillars tab,
When they view the Pillars section,
Then secondary navigation displays with Fitness, Nutrition, Wellbeing options.

**AC4: Tab Badges**
Given unread insights exist,
When the Insights tab is displayed,
Then a badge shows the unread count.

**AC5: Touch Target Size**
Given all interactive tab elements,
When measured,
Then each touch target is at least 44x44pt.

**AC6: Active Tab Indicator**
Given the user is on a specific tab,
When viewing the tab bar,
Then the active tab is visually highlighted (distinct from inactive tabs).

### Success Metrics
- 90% of actions accessible within 3 taps
- 70% of users use 3+ tabs weekly
- One-handed usability score 4.5/5

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Tab switch <200ms | Nav state secured | Tab usage aggregated | 44x44pt targets | iOS + Android |
| Persist across screens | Auth check on Profile | No PII in events | Screen reader labels | All devices |

### Dependencies
- **Prerequisite Stories:** None (foundation story)
- **Related Stories:** S04.2.2, S04.1.1
- **External Dependencies:** E5, E6, E7 (Pillar detail screens)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Navigation state loss (crash recovery) | Restore last screen or default to Dashboard |
| Feature access restriction (free tier) | Show upgrade prompt: "This feature requires Premium. Upgrade to access." |
| Offline tab navigation | Allow offline-capable screens, block sync-required with message |

### Open Questions
- Should tab order be customizable?
- Should Pillars use dropdown vs dedicated screen?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Four tabs functional
- [ ] Pillars sub-navigation working
- [ ] Tab badges updating
- [ ] Touch targets verified (44x44pt)
- [ ] Screen reader labels implemented

---

## S04.2.2: Channel Switching & Navigation State

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** easily switch between the app, voice coaching, and WhatsApp,
**So that** I can interact with yHealth through my preferred channel at any moment.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The top navigation bar includes channel switcher icons for Voice Coaching (E2) and WhatsApp (E3). Users can quickly switch channels without losing their place in the app. Navigation state persists across channel switches and app restarts.

**Top Navigation Bar:**
- Left: App logo/branding
- Center-Right: Channel switcher icons (Voice, WhatsApp)
- Right: Notifications bell, Search (magnifying glass)

**Channel Switching:**
- **Voice Icon:** Initiates voice coaching session (E2)
- **WhatsApp Icon:** Opens WhatsApp conversation or prompts linking (E3)
- Channel switch preserves app navigation state

**Deep Linking:**
- Support for notification deep links to specific screens
- Handle invalid/expired deep links gracefully
- Maintain navigation stack for back button behavior

**Navigation State Persistence:**
- Remember last visited screen on app close
- Restore navigation state on app reopen
- Handle back button per platform conventions (Android hardware back, iOS swipe)

**Behaviors:**
- Channel switcher always accessible from top nav
- Navigation state saved on app background
- Deep links override current navigation to target screen
- Back button returns to previous screen in stack

### Acceptance Criteria

**AC1: Top Navigation Display**
Given the app is loaded,
When the main interface displays,
Then the top navigation bar shows app branding, channel switchers (Voice, WhatsApp), notification bell.

**AC2: Voice Channel Switch**
Given the user taps the Voice icon,
When the icon is pressed,
Then the app initiates a voice coaching session (E2 integration).

**AC3: WhatsApp Channel Switch**
Given the user taps the WhatsApp icon,
When the icon is pressed,
Then the app opens WhatsApp conversation or prompts for linking if not connected.

**AC4: Navigation State Persistence**
Given the user is on a specific screen,
When they close and reopen the app,
Then the app restores to the last visited screen.

**AC5: Deep Linking**
Given a notification with deep link is received,
When the user taps the notification,
Then the app navigates to the linked screen.

**AC6: Invalid Deep Link Handling**
Given a deep link to invalid/unavailable content,
When processed,
Then the app navigates to Dashboard with toast: "Content unavailable. Showing your dashboard."

**AC7: Back Button Behavior**
Given the user is not on the root screen,
When they press back (Android) or swipe (iOS),
Then the app navigates to the previous screen in the stack.

### Success Metrics
- Channel switch success rate >95%
- Deep link resolution success >90%
- Navigation state restoration success >99%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Channel switch <1s | Deep link validation | State stored locally | Icons have labels | iOS + Android |
| State restore <500ms | Auth on channel access | No sensitive data in links | Keyboard navigable | All devices |

### Dependencies
- **Prerequisite Stories:** S04.2.1 (Tab navigation)
- **Related Stories:** S04.4.2 (Notification deep linking)
- **External Dependencies:** E2 (Voice Coaching), E3 (WhatsApp Integration)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Voice channel unavailable (no mic permission) | Prompt for permission or show error |
| WhatsApp not linked | Show linking prompt with instructions |
| Deep link to premium feature (free user) | Show upgrade prompt |
| Navigation stack overflow | Clear older entries, maintain recent 10 |

### Open Questions
- Should search be accessible from all screens?
- Should channel history be visible (recent voice calls, WhatsApp messages)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Channel switching functional (Voice, WhatsApp)
- [ ] Navigation state persistence working
- [ ] Deep linking implemented
- [ ] Back button behavior correct per platform

---

# FEATURE F4.3: DATA VISUALIZATION

---

## S04.3.1: Core Chart Rendering

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** see my health data visualized in clear charts and graphs,
**So that** I can understand trends and track progress over time.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The app renders various chart types to visualize health data. Core charts include line charts for trends, bar charts for comparisons, progress rings for goals, and sparklines for dashboard summaries.

**Core Chart Types:**

1. **Line Charts (Trends)**
   - Primary visualization for time-series data
   - Smooth curves with data points
   - Support for multiple series (overlays)
   - Y-axis labels, X-axis dates

2. **Bar Charts (Comparisons)**
   - Daily/weekly comparison data
   - Grouped bars for multi-category
   - Value labels on bars (optional)

3. **Progress Rings (Goals)**
   - Circular progress indicator (0-100%)
   - Color fills: Green >75%, Yellow 50-75%, Red <50%
   - Center displays percentage and target text
   - Animated fill on load

4. **Sparklines (Dashboard)**
   - Mini line charts (40px height) for dashboard
   - 7-day default view
   - No axes labels (minimal noise)
   - Color indicates trend: green (up), red (down), gray (flat)

**Loading States:**
- Skeleton chart placeholders during data fetch
- Match layout shape of actual chart

**Color Consistency:**
- Fitness: Blue (#2196F3)
- Nutrition: Green (#4CAF50)
- Wellbeing: Purple (#9C27B0)
- Score colors: Green (80-100), Yellow (50-79), Red (0-49)

**Behaviors:**
- Charts render within 2 seconds for 90 days of data
- Respect dark mode with appropriate contrast
- Loading state shows skeleton charts

### Acceptance Criteria

**AC1: Line Chart Rendering**
Given time-series health data is available,
When a line chart is requested,
Then the chart renders with smooth curves, data points, and appropriate axes.

**AC2: Bar Chart Rendering**
Given comparison data is available,
When a bar chart is requested,
Then the chart renders with properly sized bars and labels.

**AC3: Progress Ring Rendering**
Given a goal with completion percentage,
When a progress ring is rendered,
Then it displays circular progress with correct color fill based on percentage.

**AC4: Sparkline Rendering**
Given 7-day trend data,
When a sparkline is rendered on dashboard,
Then a minimal 40px height chart displays with trend color indicator.

**AC5: Performance**
Given 90 days of data,
When any chart type is rendered,
Then rendering completes within 2 seconds.

**AC6: Skeleton Loading**
Given chart data is being fetched,
When the chart area is displayed,
Then a skeleton placeholder shows in the chart's position.

**AC7: Color Consistency**
Given any chart rendering,
When pillar-specific data is shown,
Then the correct pillar color is used (Fitness: Blue, Nutrition: Green, Wellbeing: Purple).

### Success Metrics
- Chart load time <2 seconds for 90 days
- 60% of users interact with charts weekly
- 80% users correctly interpret trend direction

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s for 90 days | Data source validated | User data only | Text summaries for charts | iOS + Android |
| Skeleton <300ms | No data in logs | Aggregated metrics | Contrast compliant | Dark mode support |

### Dependencies
- **Prerequisite Stories:** S04.1.1 (Dashboard for sparklines)
- **Related Stories:** S04.3.2, S04.3.3
- **External Dependencies:** E5, E6, E7 (Data sources)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient data (<3 points) | Show empty state: "Need [X] more days of data for this view." |
| Chart rendering failure | Display text summary fallback: "Chart unavailable. Summary: [text data]" |
| Data spike anomaly (>3x std dev) | Visual indicator + tooltip: "Unusually high value on [date]. Tap to review." |

### Open Questions
- Should chart animations be configurable?
- Should users be able to change default colors?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Four chart types rendering correctly
- [ ] Performance verified (<2s for 90 days)
- [ ] Dark mode support working
- [ ] Accessibility text summaries implemented

---

## S04.3.2: Advanced Charts & Interactivity

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** explore my data with interactive charts including heatmaps and correlation plots,
**So that** I can discover patterns and relationships in my health metrics.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Deep mode users can access advanced visualizations including heatmaps for activity patterns, scatter plots for correlations, and interactive features like tooltips and zoom.

**Advanced Chart Types:**

1. **Heatmaps (Activity Patterns)**
   - 7x24 grid for weekly patterns (hour by hour)
   - Color intensity indicates activity level
   - Used in Fitness pillar for workout timing insights
   - Tap cell for exact value

2. **Scatter Plots (Correlations)**
   - X-axis: One metric (e.g., sleep hours)
   - Y-axis: Another metric (e.g., workout performance)
   - Each point represents a day
   - Trend line shows correlation strength
   - Used in E8/E10 for cross-domain insights

**Interactive Features (Deep Mode):**
- **Tooltips:** Tap-and-hold reveals exact values
- **Zoom/Pan:** Pinch to zoom, drag to pan
- **Legend Filters:** Show/hide series by tapping legend items

**Behaviors:**
- Advanced charts available in Deep mode only
- Light mode shows simplified static charts
- Interactions provide haptic feedback
- Charts responsive to device orientation

### Acceptance Criteria

**AC1: Heatmap Rendering**
Given weekly activity pattern data,
When a heatmap is rendered,
Then a 7x24 grid displays with color intensity representing activity levels.

**AC2: Scatter Plot Rendering**
Given two correlated metrics over time,
When a scatter plot is rendered,
Then points display with trend line indicating correlation strength.

**AC3: Tooltips**
Given a chart is displayed in Deep mode,
When the user tap-and-holds on a data point,
Then a tooltip displays exact values for that point.

**AC4: Zoom/Pan**
Given a chart is displayed in Deep mode,
When the user pinches to zoom or drags to pan,
Then the chart view adjusts accordingly.

**AC5: Legend Filters**
Given a chart with multiple series,
When the user taps a legend item,
Then that series toggles visibility (show/hide).

**AC6: Deep Mode Only**
Given the user is in Light mode,
When viewing chart areas,
Then advanced interactive features are not available (simplified static view).

### Success Metrics
- 50% of Deep mode users use heatmaps
- Correlation charts engagement >40%
- Tooltip usage rate >60% in Deep mode

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Interaction <100ms | Data validated | User data only | Alt text for heatmaps | Touch + mouse |
| Smooth 60fps zoom | No external calls | Local processing | Haptic feedback optional | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S04.3.1 (Core chart rendering)
- **Related Stories:** S04.3.3
- **External Dependencies:** E8 (Cross-domain correlations), E10 (Analytics)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No correlation data available | Show placeholder: "Not enough data to show correlations yet." |
| Heatmap with sparse data | Show available data, gray out empty cells |
| Zoom beyond data range | Snap back to data bounds |
| Gesture conflict (zoom vs scroll) | Prioritize zoom on chart area, scroll elsewhere |

### Open Questions
- Should heatmap color scheme be customizable?
- Should correlation strength be shown numerically?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Heatmaps and scatter plots rendering
- [ ] Tooltips, zoom/pan, legend filters working
- [ ] Deep mode restriction enforced
- [ ] Haptic feedback implemented

---

## S04.3.3: Chart Time Ranges & Export

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** customize the time range of my charts and export them for my records,
**So that** I can analyze specific periods and share my progress.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users can select different time ranges for chart views. Deep mode includes custom date ranges and export functionality. All charts include accessibility text summaries.

**Time Range Options:**
- **Light Mode:** Fixed 7-day view only
- **Deep Mode:** 7, 30, 90, 365 days + custom date range

**Time Range Selector:**
- Positioned above chart
- Segmented control for preset ranges (7/30/90/365)
- Custom picker for date range selection
- Chart updates on selection

**Export Functionality (Deep Mode):**
- Export chart as PNG image
- Include chart title, legend, timestamp
- Save to device gallery or share
- Export button visible on each chart

**Accessibility Text Summaries:**
- All charts include screen reader descriptions
- Format: "[Metric] [trend] [X] points from [Y] to [Z] over the last [period]"
- Example: "Fitness score decreased 5 points from 80 to 75 over the last 7 days"

**Behaviors:**
- Time range changes trigger chart re-render
- Export generates high-quality PNG
- Accessibility text announces on chart focus

### Acceptance Criteria

**AC1: Light Mode Fixed Range**
Given the user is in Light mode,
When viewing a chart,
Then only 7-day data is displayed with no time range selector.

**AC2: Deep Mode Range Selector**
Given the user is in Deep mode,
When viewing a chart,
Then a time range selector displays with options: 7, 30, 90, 365 days, and Custom.

**AC3: Range Selection**
Given the time range selector is displayed,
When the user selects a different range (e.g., 30 days),
Then the chart re-renders with data for the selected period.

**AC4: Custom Date Range**
Given the user selects "Custom" range,
When they choose start and end dates,
Then the chart displays data for that specific period.

**AC5: Chart Export**
Given the user is in Deep mode viewing a chart,
When they tap the export button,
Then a PNG of the chart (with title, legend, timestamp) is generated and save/share options appear.

**AC6: Accessibility Text**
Given any chart is rendered,
When a screen reader focuses on the chart,
Then an accessibility description is announced describing the trend and key values.

### Success Metrics
- 30% of Deep mode users export charts monthly
- Time range changes per session >2 (Deep mode)
- Accessibility text coverage 100%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Range switch <1s | Export local only | No PII in export | ARIA labels required | iOS + Android |
| Export <3s | No cloud upload | User-initiated only | Screen reader tested | Share sheet support |

### Dependencies
- **Prerequisite Stories:** S04.3.1, S04.3.2
- **Related Stories:** S04.6.1 (Settings for preferences)
- **External Dependencies:** Device gallery permissions

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Custom range with no data | Show empty state: "No data available for selected period." |
| Export failure (storage permission) | Show prompt: "Unable to save chart. Check storage permissions?" |
| 365-day load slow | Show progress indicator, cancel option |
| Accessibility text for empty chart | "No data available for this chart." |

### Open Questions
- Should export include raw data (CSV) option?
- Should favorite time ranges be saveable?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Time range selector working (Deep mode)
- [ ] Export to PNG functional
- [ ] Accessibility text implemented for all charts
- [ ] Storage permissions handled

---

# FEATURE F4.4: PUSH NOTIFICATIONS

---

## S04.4.1: Notification Infrastructure

### User Story
**As a** Habit Formation Seeker (P4),
**I want** the app to be able to send me notifications,
**So that** I can receive timely reminders and updates even when not using the app.

### Story Type
- [ ] Feature | [ ] Enhancement | [x] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
This is a technical foundation story. Users won't directly interact with infrastructure, but it enables all notification features.

**Push Notification Infrastructure:**

1. **Platform Integration:**
   - iOS: Apple Push Notification Service (APNs)
   - Android: Firebase Cloud Messaging (FCM)
   - Cross-platform notification handling

2. **Token Management:**
   - Register device token on app install/update
   - Refresh token on expiration
   - Handle token rotation securely
   - Backend token storage and association with user

3. **Permission Handling:**
   - Request notification permission on appropriate trigger (not first launch)
   - Handle permission denied gracefully
   - Provide in-app prompt to re-enable if disabled

4. **Platform Compliance:**
   - iOS provisional authorization for quiet delivery
   - Android notification channels setup
   - Badge count management

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Device Token | String | Platform-specific | Encrypted |
| Permission Status | Enum | Required | Local |
| Platform | iOS/Android | Required | System |

**Behaviors:**
- Token registered silently on permission grant
- Token refresh happens in background
- Permission status cached locally

### Acceptance Criteria

**AC1: Token Registration**
Given the user grants notification permission,
When the permission is confirmed,
Then the device token is registered with the backend.

**AC2: Token Refresh**
Given a device token is about to expire,
When the refresh cycle runs,
Then a new token is obtained and registered without user action.

**AC3: Permission Request**
Given the user has not been asked for notification permission,
When an appropriate trigger occurs (e.g., after onboarding, first reminder setup),
Then a system permission dialog appears with context.

**AC4: Permission Denied Handling**
Given notification permission is denied,
When the user accesses notification settings in-app,
Then they see explanation and link to system settings to enable.

**AC5: iOS APNs Integration**
Given the app is running on iOS,
When notifications are sent,
Then they are delivered via APNs.

**AC6: Android FCM Integration**
Given the app is running on Android,
When notifications are sent,
Then they are delivered via FCM.

### Success Metrics
- Token registration success rate >99%
- Permission opt-in rate 80%
- Token refresh failure rate <1%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Token reg <2s | Token encrypted | Token not logged | N/A (infrastructure) | iOS 14+, Android 10+ |
| Background refresh | Secure transmission | User consent required | N/A | FCM + APNs |

### Dependencies
- **Prerequisite Stories:** None (foundation story)
- **Related Stories:** S04.4.2, S04.4.3
- **External Dependencies:** APNs (Apple), FCM (Firebase)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Permission denied by system | In-app prompt explaining value, link to settings |
| Token registration failure | Retry 3x with exponential backoff, log for support |
| Token expiration | Automatic re-registration on next app open |
| Network unavailable during registration | Queue and retry when connected |

### Open Questions
- Should we support provisional (quiet) notifications on iOS?
- Should notification channels be user-configurable on Android?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] APNs integration working (iOS)
- [ ] FCM integration working (Android)
- [ ] Token registration and refresh functional
- [ ] Permission handling complete

---

## S04.4.2: Notification Types & Delivery

### User Story
**As a** Habit Formation Seeker (P4),
**I want to** receive different types of notifications (reminders, insights, celebrations),
**So that** I can stay engaged with my health goals through relevant, timely prompts.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users receive personalized notifications based on their health data, goals, and activity patterns. Each notification type serves a specific purpose in the engagement journey.

**7 Notification Types:**

| Type | Example | Trigger | Deep Link |
|------|---------|---------|-----------|
| **Check-in Reminder** | "Good morning! How are you feeling today?" | Daily at user's preferred time | Mood check-in screen |
| **Featured Insight** | "New insight: Your best workouts happen after 7+ hours sleep." | New insight generated (E8) | Insight detail view |
| **Goal Milestone** | "Congrats! 7-day logging streak achieved!" | Milestone reached | Achievement screen |
| **Recovery Alert** | "Low recovery today. Consider light activity." | Recovery <50 (morning) | Recovery detail |
| **Workout Reminder** | "Time for your workout? Here's today's recommendation." | User's typical workout time | Workout recommendations |
| **Meal Logging Prompt** | "Don't forget to log dinner!" | No meal logged by 7pm | Meal logging |
| **Coaching Nudge** | "Haven't chatted in a while. I'm here if you need support!" | 3+ days inactive | Voice coaching or chat |

**Rich Notifications:**
- Include images where relevant (e.g., achievement badge)
- Action buttons: "Log Now", "View Insight", "Snooze"
- Expandable content for longer messages

**Deep Linking:**
- Each notification links to relevant app screen
- Handle deep link if app is open or closed
- Track notification tap-through

**Notification History:**
- View last 30 days of notifications in Profile > Notifications
- Mark as read/unread
- Clear history option

**Behaviors:**
- Notifications personalized with user's name
- Deep links open correct screen in all app states
- History persists across sessions

### Acceptance Criteria

**AC1: Check-in Reminder**
Given the user has check-in reminders enabled,
When the user's preferred time arrives,
Then a "Check-in Reminder" notification is sent.

**AC2: Insight Notification**
Given a new insight is generated (E8),
When the insight is actionable,
Then a "Featured Insight" notification is sent with the insight summary.

**AC3: Goal Milestone**
Given the user achieves a milestone (e.g., 7-day streak),
When the milestone is recorded,
Then a "Goal Milestone" celebration notification is sent immediately.

**AC4: Rich Notifications**
Given a notification is sent,
When it supports rich content,
Then images and action buttons are included.

**AC5: Deep Linking**
Given the user taps a notification,
When the app opens,
Then the user is navigated to the relevant screen (per notification type).

**AC6: Notification History**
Given the user navigates to Profile > Notifications,
When the notification history screen loads,
Then the last 30 days of notifications are displayed.

**AC7: Action Buttons**
Given a notification with action buttons,
When the user taps an action button (e.g., "Log Now"),
Then the corresponding action is triggered (e.g., open meal logging).

### Success Metrics
- 40% average notification open rate
- 70% increase in check-in consistency (vs no notifications)
- <10% users disable all notifications

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Delivery <5s | Notification auth | No PII in payload | Screen reader announces | iOS + Android |
| Deep link <1s | Signed payloads | User name optional | Action button labels | Rich notifications |

### Dependencies
- **Prerequisite Stories:** S04.4.1 (Infrastructure)
- **Related Stories:** S04.4.3, S04.2.2 (Deep linking)
- **External Dependencies:** E5, E6, E7 (Data triggers), E8 (Insights)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Deep link to deleted content | Navigate to Dashboard with toast |
| Notification for unlinked feature | Don't send, or show feature preview |
| Multiple notifications queued | Deliver in priority order, not all at once |
| App uninstalled then reinstalled | Clear history, re-register token |

### Open Questions
- Should notifications include user's name?
- Should notification history sync across devices?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 7 notification types implemented
- [ ] Rich notifications with images and buttons
- [ ] Deep linking working for all types
- [ ] Notification history screen complete

---

## S04.4.3: Smart Timing & Frequency Control

### User Story
**As a** Habit Formation Seeker (P4),
**I want to** control when and how often I receive notifications,
**So that** I stay engaged without feeling overwhelmed by constant alerts.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users have granular control over notification timing and frequency. The system respects quiet hours and applies intelligent timing based on user engagement patterns.

**Quiet Hours:**
- User defines sleep window (default: 10pm - 7am)
- No notifications sent during quiet hours
- Queued notifications delivered after quiet hours end

**Frequency Caps:**
- **Light Mode:** Maximum 1-3 notifications/day
- **Deep Mode:** Maximum up to 8 notifications/day
- User can adjust within mode limits

**Category Controls:**
- Master on/off toggle
- Per-category toggles:
  - Check-in Reminders
  - Insights & Discoveries
  - Coaching Nudges
  - Goal Milestones
  - Recovery Alerts
  - Meal/Workout Prompts

**Adaptive Timing (AI-optimized):**
- Learn optimal send times from engagement patterns
- Send workout reminder at user's typical exercise time
- Send meal prompt based on eating schedule
- Adjust timing based on open rates

**Behaviors:**
- Quiet hours strictly enforced
- Frequency caps enforced daily
- Category toggles take effect immediately
- Adaptive timing improves over time

### Acceptance Criteria

**AC1: Quiet Hours Configuration**
Given the user navigates to notification settings,
When they set quiet hours (e.g., 10pm - 7am),
Then no notifications are delivered during that window.

**AC2: Quiet Hours Enforcement**
Given a notification would be sent during quiet hours,
When the send is attempted,
Then the notification is queued and delivered after quiet hours end.

**AC3: Frequency Cap - Light Mode**
Given the user is in Light mode,
When notifications are sent,
Then no more than 3 notifications are delivered per day.

**AC4: Frequency Cap - Deep Mode**
Given the user is in Deep mode,
When notifications are sent,
Then no more than 8 notifications are delivered per day.

**AC5: Category Toggle**
Given the user disables "Meal/Workout Prompts",
When a meal prompt notification would be sent,
Then the notification is suppressed.

**AC6: Master Toggle**
Given the user disables the master notification toggle,
When any notification would be sent,
Then all notifications are suppressed.

**AC7: Adaptive Timing**
Given the user consistently opens workout reminders at 6pm,
When the system learns this pattern,
Then workout reminders are scheduled for ~6pm.

### Success Metrics
- Quiet hours satisfaction 4.5/5
- Notification unsubscribe rate <10%
- Adaptive timing improves open rate by 20%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Settings save <500ms | Secure storage | Timing data local | Settings accessible | iOS + Android |
| Queue management | No external logging | Pattern analysis local | VoiceOver support | All timezones |

### Dependencies
- **Prerequisite Stories:** S04.4.1, S04.4.2
- **Related Stories:** S04.6.1 (Settings)
- **External Dependencies:** None

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Quiet hours end = start (invalid) | Validation error: "End time must be after start time." |
| User in multiple timezones (travel) | Use device timezone for quiet hours |
| Frequency cap hit early in day | Prioritize remaining notifications by importance |
| Adaptive timing insufficient data | Fall back to user-set or default times |

### Open Questions
- Should quiet hours be overridable for urgent alerts?
- Should there be a "Do Not Disturb" mode beyond quiet hours?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Quiet hours configuration and enforcement
- [ ] Frequency caps (Light/Deep mode)
- [ ] Category toggles working
- [ ] Adaptive timing implemented

---

# FEATURE F4.5: OFFLINE MODE

---

## S04.5.1: Offline Detection & Data Caching

### User Story
**As a** Busy Professional (P2),
**I want** the app to work even without internet connection,
**So that** I can view my health data and continue using the app during flights or in areas with poor connectivity.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The app automatically detects network status and displays cached data when offline. A visual indicator shows offline status. Core features remain usable with cached data.

**Offline Detection:**
- Automatic network status monitoring
- Immediate detection of connectivity changes
- Persistent offline indicator (top banner)
- Banner dismissible but reappears on screen navigation

**Data Caching (7-Day Window):**
- Cache last 7 days of data locally
- Maximum 100MB storage allocation:
  - Dashboard data: 50MB
  - Queued entries: 20MB
  - Conversation history: 20MB
  - Insights cache: 10MB
- Encrypted local storage

**Cached Data Includes:**
- Dashboard data (pillar scores, summaries)
- Recent activity logs
- Goal progress data
- Last 20 featured insights
- User settings and preferences

**Cache Freshness:**
- Display timestamp of cached data
- Visual indicator when data >24h old
- Automatic cleanup of data >7 days

**Behaviors:**
- Cached data served immediately on app open
- Background fetch when online
- Cache encrypted at rest
- Storage limits enforced automatically

### Acceptance Criteria

**AC1: Offline Detection**
Given the device loses network connectivity,
When the connection is lost,
Then an offline indicator banner appears: "Offline Mode - Data will sync when online."

**AC2: Cached Dashboard Display**
Given the app is offline,
When the user views the dashboard,
Then cached dashboard data displays with a "Last updated [time]" indicator.

**AC3: 7-Day Cache Window**
Given data has been cached,
When data is older than 7 days,
Then it is automatically cleared from cache.

**AC4: Storage Limit Enforcement**
Given the cache approaches 100MB,
When new data needs caching,
Then oldest data is cleared to make room.

**AC5: Cache Freshness Indicator**
Given cached data is more than 24 hours old,
When displayed,
Then a visual badge shows: "Data from [date]. Connect to update."

**AC6: Offline Indicator Persistence**
Given the offline banner is dismissed,
When the user navigates to a new screen,
Then the banner reappears to remind of offline status.

### Success Metrics
- 40% of users use app offline at least once/month
- 90% of dashboard data available offline
- Cache storage efficiency >80%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Cache read <500ms | Encrypted at rest | Local storage only | Banner announced | iOS + Android |
| Detection <1s | Secure delete | No PII in cache keys | Dismissible banner | All storage types |

### Dependencies
- **Prerequisite Stories:** S04.1.3 (Dashboard caching concept)
- **Related Stories:** S04.5.2, S04.5.3, S04.5.4
- **External Dependencies:** Local storage APIs

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Cache corrupted | Clear cache, show loading, re-download on reconnect |
| Storage quota exceeded by OS | Reduce cache aggressively, notify user |
| Long offline period (>7 days) | Show message: "Data from [date]. Connect to refresh all data." |
| Airplane mode toggle | Update status immediately on detection |

### Open Questions
- Should cache size be user-configurable?
- Should certain data types be prioritized in storage?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Offline detection working
- [ ] 7-day cache implemented
- [ ] Storage limits enforced (100MB)
- [ ] Cache encryption verified

---

## S04.5.2: Offline Queue Management

### User Story
**As a** Busy Professional (P2),
**I want to** log my meals and mood even when offline,
**So that** I can maintain my tracking habits without interruption.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users can create new entries while offline. Entries are queued locally and sync automatically when connectivity returns. Users can view and manage their queue.

**Supported Offline Entry Types:**
- Mood check-ins
- Meal logs (text only - photo analysis requires online)
- Activity logs (manual entry)
- Journal entries

**Offline-Restricted Features:**
- Voice coaching (requires real-time connection)
- WhatsApp integration (requires connection)
- Photo meal analysis (AI processing online)
- Wearable sync (requires connection)
- Real-time insights generation

**Queue Management:**
- All entries timestamped when created
- Queue stored in encrypted local storage
- Queue visible in Settings with entry count
- Manual "Sync Now" button available

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Entry Type | Enum | Required | Local |
| Entry Data | JSON | Type-specific | Encrypted |
| Created Timestamp | ISO | Required | Local |
| Synced Status | Boolean | Required | Local |

**Behaviors:**
- Offline entries accepted immediately with visual confirmation
- Queue persists across app restarts
- Photo meal prompts for text description if offline
- Graceful degradation messaging for restricted features

### Acceptance Criteria

**AC1: Mood Check-in Offline**
Given the app is offline,
When the user completes a mood check-in,
Then the entry is saved to local queue with confirmation message.

**AC2: Meal Log Offline (Text)**
Given the app is offline,
When the user logs a meal with text description,
Then the entry is queued for sync.

**AC3: Photo Analysis Unavailable**
Given the app is offline,
When the user attempts photo meal logging,
Then a prompt appears: "Photo analysis available when online. Add text description?"

**AC4: Voice Coaching Unavailable**
Given the app is offline,
When the user attempts to start voice coaching,
Then a message appears: "Voice requires internet. Try again when online."

**AC5: Queue Visibility**
Given entries are queued offline,
When the user views Settings > Sync,
Then the queue displays with entry count and types.

**AC6: Entry Timestamps**
Given an entry is created offline,
When it is queued,
Then it includes the creation timestamp (not sync time).

### Success Metrics
- 95% of queued entries sync successfully
- Offline entry completion rate same as online
- Queue management satisfaction 4.3/5

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Entry save <200ms | Queue encrypted | Data local only | Entry confirmation | iOS + Android |
| Queue limit 20MB | Secure storage | Timestamps accurate | Queue accessible | All entry types |

### Dependencies
- **Prerequisite Stories:** S04.5.1 (Offline detection)
- **Related Stories:** S04.5.3, S04.5.4
- **External Dependencies:** E5, E6, E7 (Entry formats)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Queue storage full (20MB) | Warn user, suggest syncing soon |
| Duplicate entry (same timestamp) | Allow both, deduplicate on sync |
| Entry validation failure offline | Basic validation only, full validation on sync |
| App crash with unsaved entry | Recover from draft if available |

### Open Questions
- Should photo be queued for later analysis, or text-only offline?
- Should queue entries be editable before sync?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Mood, meal (text), activity, journal entries queueable
- [ ] Restricted features show appropriate messages
- [ ] Queue visible in Settings
- [ ] Entry timestamps preserved

---

## S04.5.3: Sync Engine & Reconnection

### User Story
**As a** Busy Professional (P2),
**I want** my offline entries to automatically sync when I'm back online,
**So that** I don't have to manually upload data or lose my tracking progress.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
When connectivity returns, the app automatically syncs queued entries. Users see progress indicators and completion notifications. Sync happens in background without blocking UI.

**Auto-Sync on Reconnect:**
- Triggered within 30 seconds of connection restoration
- Runs in background (non-blocking)
- Progress indicator during sync
- Completion notification: "Synced [X] entries"

**Sync Priority Queue:**
1. User-generated entries (mood, meals, journaling) - Highest
2. User actions (goal updates, preferences) - High
3. Analytics/usage data - Medium
4. Non-critical metadata - Low

**Sync Order:**
- Chronological within priority (oldest first)
- Prevents out-of-order data issues

**Progress Indication:**
- Sync progress bar or indicator
- Entry count: "Syncing 3 of 5 entries..."
- Success/failure status per entry

**Behaviors:**
- Sync continues if app backgrounded
- Failed entries retry automatically
- Manual "Sync Now" available anytime
- Clear feedback on completion

### Acceptance Criteria

**AC1: Auto-Sync Trigger**
Given the device reconnects after being offline,
When connectivity is restored,
Then sync begins automatically within 30 seconds.

**AC2: Background Sync**
Given sync is in progress,
When the user continues using the app,
Then sync runs in background without blocking UI.

**AC3: Sync Progress Indicator**
Given multiple entries are queued,
When sync is in progress,
Then a progress indicator shows: "Syncing X of Y entries..."

**AC4: Sync Completion Notification**
Given sync completes successfully,
When all entries are uploaded,
Then a notification/toast shows: "Synced [X] entries. Everything's up to date!"

**AC5: Priority Queue Order**
Given entries of different types are queued,
When sync executes,
Then user-generated entries sync before analytics data.

**AC6: Chronological Order**
Given multiple entries of same type,
When syncing,
Then entries sync oldest-first.

**AC7: Manual Sync**
Given the user wants to force sync,
When they tap "Sync Now" in settings,
Then sync begins immediately regardless of auto-sync timer.

### Success Metrics
- >95% sync success rate
- Sync completion <30 seconds for typical queue
- Auto-sync reliability >99%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Start <30s | Secure transmission | Entry data encrypted | Progress announced | iOS + Android |
| Complete <30s typical | Retry with backoff | No PII in logs | Completion announced | Background modes |

### Dependencies
- **Prerequisite Stories:** S04.5.1, S04.5.2
- **Related Stories:** S04.5.4
- **External Dependencies:** Backend sync API

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Network lost during sync | Pause, resume when reconnected |
| Individual entry sync failure | Retry 3x, mark as failed, continue others |
| Server unavailable | Retry with exponential backoff, notify if prolonged |
| App killed during sync | Resume on next app open |

### Open Questions
- Should sync continue in true background (app closed)?
- Should large syncs (>100 entries) be split into batches?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Auto-sync on reconnect working
- [ ] Background sync functional
- [ ] Progress indicators implemented
- [ ] Priority queue ordering correct

---

## S04.5.4: Conflict Resolution & Storage Management

### User Story
**As a** Busy Professional (P2),
**I want** to be able to resolve conflicts when my offline changes conflict with server data,
**So that** I don't lose important data and maintain accurate records.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
When offline edits conflict with server changes (e.g., both modified same entry), the user is presented with a resolution interface. Storage is managed automatically with user notification.

**Conflict Detection:**
- Compare offline timestamp with server last-modified
- Identify conflicting data fields
- Queue conflicts for user resolution

**Conflict Resolution UI:**
- Display both versions side-by-side
- Options: "Keep my version", "Use server version", "Merge" (if applicable)
- Preview changes before confirming
- Resolution saves permanently (no undo)

**Storage Management:**
- Automatic cleanup of data >7 days old
- Warning when approaching 100MB limit
- Manual cache clear option
- Data integrity checks on app start

**Data Integrity:**
- Checksum verification on cached data
- Detect and handle corrupted data
- Recovery from corruption: clear and re-download

**Behaviors:**
- Conflicts presented before full sync completion
- User choice required to proceed
- Storage warnings are non-blocking
- Integrity checks run silently

### Acceptance Criteria

**AC1: Conflict Detection**
Given an offline entry conflicts with server data,
When sync is attempted,
Then the conflict is detected and queued for resolution.

**AC2: Conflict Resolution UI**
Given a conflict is detected,
When the user is prompted,
Then they see both versions with options: "Keep my version", "Use server version", "Merge".

**AC3: Resolution Persistence**
Given the user resolves a conflict,
When they choose an option,
Then the resolution is applied permanently and sync completes.

**AC4: Storage Warning**
Given storage approaches 100MB limit,
When threshold is reached (e.g., 90%),
Then a warning appears: "Storage almost full. Older cached data will be cleared."

**AC5: Automatic Cleanup**
Given cached data is older than 7 days,
When the cleanup cycle runs,
Then old data is automatically removed.

**AC6: Data Integrity Check**
Given cached data may be corrupted,
When the app starts,
Then integrity checks run and corrupted data is flagged for re-download.

**AC7: Manual Cache Clear**
Given the user wants to clear cache,
When they tap "Clear Cache" in settings,
Then all cached data is cleared (with confirmation).

### Success Metrics
- Conflict resolution success rate >95%
- Storage warning acknowledgment rate >80%
- Data integrity issues <0.1% of users

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Conflict UI <500ms | Secure comparison | Local processing | UI accessible | iOS + Android |
| Cleanup <5s | No server exposure | User data shown | Screen reader | All storage |

### Dependencies
- **Prerequisite Stories:** S04.5.1, S04.5.2, S04.5.3
- **Related Stories:** S04.6.2 (Settings for cache management)
- **External Dependencies:** Backend conflict API

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Multiple conflicts simultaneously | Queue and present one at a time |
| User ignores conflict | Block sync for that item, allow others |
| Storage warning ignored | Auto-clear oldest, proceed with warning toast |
| Corrupted data detected | Clear corrupted portion, re-download on next sync |

### Open Questions
- Should conflict resolution be skippable with "always use server"?
- Should storage thresholds be user-configurable?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Conflict detection working
- [ ] Resolution UI functional
- [ ] Storage management (warnings, cleanup)
- [ ] Data integrity checks implemented

---

# FEATURE F4.6: SETTINGS & PREFERENCES

---

## S04.6.1: Core Settings & Preferences

### User Story
**As a** Holistic Health Seeker (P1),
**I want** to customize my app experience and notification preferences,
**So that** yHealth works exactly the way I want it to.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Settings are organized into logical categories for easy navigation. Changes save immediately without requiring a "Save" button. Light mode shows essential settings; Deep mode includes all options.

**Settings Categories Covered:**
1. **Notifications**
2. **Display & Accessibility**
3. **Channels (Voice/WhatsApp)**
4. **Goals & Coaching**

**Notification Settings:**
- Master on/off toggle
- Category toggles (Check-in, Insights, Coaching, Milestones, Recovery, Prompts)
- Quiet hours (start/end time pickers)
- Frequency preference (Light: 1-3/day, Deep: up to 8/day)

**Display Settings:**
- Theme: Light, Dark, Auto (follow system)
- Text size: Small, Medium, Large, Extra Large
- Deep mode: Reduce motion toggle

**Channel Settings:**
- Preferred interaction channel: Mobile App, WhatsApp, Voice, No preference
- Voice coaching: Scheduled call times
- WhatsApp: Opt-in/opt-out, message frequency

**Goals & Coaching Settings:**
- Default goal focus: Fitness, Nutrition, Wellbeing, Balanced
- Coaching tone: Supportive, Motivational, Direct, Gentle
- Flexibility mode: Light, Deep

**Behaviors:**
- Settings save immediately (auto-save)
- Changes take effect immediately
- Settings sync across devices (if multiple)
- Search available in Deep mode

### Acceptance Criteria

**AC1: Settings Organization**
Given the user navigates to Settings,
When the settings screen loads,
Then categories are displayed: Notifications, Display, Channels, Goals & Coaching.

**AC2: Notification Master Toggle**
Given the user toggles master notifications off,
When the toggle is changed,
Then all notifications are disabled immediately.

**AC3: Theme Selection**
Given the user selects Dark theme,
When the selection is made,
Then the app immediately switches to dark theme.

**AC4: Text Size Adjustment**
Given the user changes text size to Large,
When the selection is made,
Then app-wide text size increases immediately.

**AC5: Instant Save**
Given the user changes any setting,
When the change is made,
Then it saves automatically (no "Save" button required).

**AC6: Settings Sync**
Given the user has multiple devices,
When they change a setting on one device,
Then the setting syncs to other devices.

**AC7: Deep Mode Settings Search**
Given the user is in Deep mode,
When they view settings,
Then a search bar is available to find settings by keyword.

### Success Metrics
- 80% of users access settings at least once
- 60% of users modify at least 3 settings
- Settings satisfaction 4.5/5

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Save <500ms | Encrypted storage | Local + sync | All controls accessible | iOS + Android |
| Load <1s | Auth required | User preference only | VoiceOver labels | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S04.2.1 (Navigation to Profile)
- **Related Stories:** S04.6.2, S04.4.3 (Notification settings)
- **External Dependencies:** E2 (Voice), E3 (WhatsApp)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Settings save failure (offline) | Queue and sync when online, show "Saved offline" |
| Invalid setting value | Validation error inline, prevent save |
| Theme change mid-session | Apply immediately without restart |
| Sync conflict (multi-device) | Most recent change wins |

### Open Questions
- Should settings have reset-to-default option?
- Should some settings require confirmation?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All 4 categories implemented
- [ ] Instant save working
- [ ] Theme switching functional
- [ ] Settings sync across devices

---

## S04.6.2: Privacy, Account & Device Management

### User Story
**As a** Holistic Health Seeker (P1),
**I want** to manage my privacy settings, account, and connected devices,
**So that** I have full control over my data and can configure integrations.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Privacy, account, and device settings give users full control over their data and connections. GDPR-compliant data export and deletion are available.

**Settings Categories Covered:**
1. **Privacy & Data**
2. **Account**
3. **Connected Devices**
4. **About & Support**

**Privacy & Data Settings:**
- Data sharing: Anonymous analytics (on/off), Product research (on/off)
- Data retention: Auto-delete after 1 year / 2 years / Never
- Data export: Request full data export (ZIP with JSON/CSV)
- Data deletion: Delete my account (14-day cooling-off period)
- Deep mode: Per-category consent (fitness, nutrition, wellbeing, AI training)

**Account Settings:**
- Profile: Name, Email, Date of Birth, Profile Picture
- Password: Change password
- Phone: WhatsApp number (E3 integration)
- Subscription: View plan, Upgrade/Downgrade, Billing history, Cancel

**Connected Devices (E9 Integration):**
- List of connected wearables/apps
- Connect new device (OAuth flow)
- Disconnect device (per device)
- Sync status (last synced time)
- Preferred device priority (conflict resolution)

**About & Support:**
- App version and build number
- Terms of Service (link)
- Privacy Policy (link)
- Help & Support (contact form, FAQs)
- Send Feedback
- Rate the App (store link)
- Logout

**Behaviors:**
- Data export generates asynchronously, emails download link
- Account deletion has 14-day cooling-off
- Device connection uses OAuth flow
- Logout clears local data

### Acceptance Criteria

**AC1: Data Export Request**
Given the user requests data export,
When they tap "Export My Data",
Then the request is queued and user is notified: "Export processing. We'll email a download link."

**AC2: Account Deletion Flow**
Given the user initiates account deletion,
When they confirm deletion,
Then they see: "Your account will be deleted in 14 days. You can cancel anytime before then."

**AC3: Connected Device List**
Given the user has connected devices,
When they view Connected Devices,
Then a list shows each device with name, type, last sync time, and disconnect option.

**AC4: Device Connection OAuth**
Given the user taps "Connect New Device",
When they select a device type (e.g., WHOOP),
Then the OAuth flow initiates to authorize connection.

**AC5: Device Disconnect**
Given the user taps "Disconnect" on a device,
When confirmed,
Then the device is removed from the list and data sync stops.

**AC6: Privacy Toggle Persistence**
Given the user toggles "Anonymous Analytics" off,
When the toggle is changed,
Then analytics collection stops immediately and setting persists.

**AC7: Logout Functionality**
Given the user taps "Logout",
When confirmed,
Then the app logs out, clears local data, and returns to login screen.

### Success Metrics
- 70% of users review privacy settings
- Data export completion rate >95%
- Device connection success rate >90%

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| OAuth <3s | Secure token storage | GDPR compliant | All controls labeled | iOS + Android |
| Export async | Encrypted export | Data portable | VoiceOver support | OAuth providers |

### Dependencies
- **Prerequisite Stories:** S04.6.1
- **Related Stories:** S04.5.4 (Storage management)
- **External Dependencies:** E9 (Data Integrations), OAuth providers

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Data export timeout (>5 minutes) | Continue in background, email when ready |
| Device disconnect failure | Retry with timeout, offer manual disconnect |
| Account deletion cancelled | Restore account fully, no data loss |
| OAuth provider unavailable | Error message, retry option |

### Open Questions
- Should device sync frequency be configurable?
- Should data retention periods be more granular?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Privacy settings functional (GDPR compliant)
- [ ] Account management working
- [ ] Connected devices with OAuth flow
- [ ] Data export and deletion implemented

---

# FEATURE F4.7: ACCESSIBILITY FEATURES

---

## S04.7.1: Visual Accessibility & Screen Reader Support

### User Story
**As a** user with visual impairment,
**I want** to use yHealth with my screen reader,
**So that** I can track my health independently with full feature access.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The app achieves WCAG 2.1 Level AA compliance for visual accessibility. All elements are accessible via screen readers (VoiceOver on iOS, TalkBack on Android). Colors and contrast meet standards.

**Color Contrast:**
- Normal text (<18pt): Minimum 4.5:1 contrast ratio
- Large text (≥18pt or ≥14pt bold): Minimum 3:1 contrast ratio
- UI components and graphics: 3:1 minimum

**Color Independence:**
- Never use color alone to convey information
- Icons or text accompany all color indicators
- Score colors include text labels (e.g., "Excellent", "Needs Attention")

**Text Scaling:**
- Support up to 200% text zoom
- No loss of functionality at maximum zoom
- Layout adapts to larger text

**Focus Indicators:**
- Visible 2px solid outline (high contrast) on all interactive elements
- Focus visible during keyboard/switch navigation

**Dark Mode:**
- Full dark theme with WCAG-compliant contrast
- Tested separately for compliance
- Toggle in settings

**Screen Reader Support:**
- All interactive elements have descriptive labels
- Charts include text summaries
- Progress indicators announce values
- Dynamic content announces updates (aria-live)
- Logical heading hierarchy

**Behaviors:**
- Screen reader labels comprehensive and descriptive
- Focus order follows logical reading sequence
- Dynamic content changes announced appropriately
- VoiceOver and TalkBack fully supported

### Acceptance Criteria

**AC1: Color Contrast Compliance**
Given any text element in the app,
When contrast is measured,
Then normal text achieves ≥4.5:1 and large text achieves ≥3:1 ratio.

**AC2: Color Independence**
Given any color-coded element (e.g., pillar score),
When displayed,
Then additional indicator (icon or text) conveys the same information.

**AC3: Text Scaling**
Given the user sets device text size to maximum,
When the app renders,
Then all text scales up to 200% with no functionality loss.

**AC4: Screen Reader Labels**
Given any interactive element,
When focused with screen reader,
Then a descriptive label is announced.

**AC5: Chart Text Summaries**
Given any chart or graph,
When a screen reader focuses on it,
Then a text summary announces: "[Metric] [trend] from [X] to [Y] over [period]."

**AC6: Focus Indicators**
Given keyboard or switch navigation,
When an element is focused,
Then a visible 2px outline appears around the element.

**AC7: Dark Mode Contrast**
Given dark mode is enabled,
When text and UI are displayed,
Then all elements maintain WCAG contrast requirements.

### Success Metrics
- 100% WCAG 2.1 AA compliance (automated testing)
- Screen reader usability rating 4.5/5
- 100% of text/UI elements pass contrast ratio

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| No perf impact | N/A | N/A | WCAG 2.1 AA | iOS VoiceOver |
| Labels instant | N/A | N/A | Screen reader tested | Android TalkBack |

### Dependencies
- **Prerequisite Stories:** S04.2.1 (Navigation structure)
- **Related Stories:** S04.7.2, S04.7.3, S04.3.1 (Chart accessibility)
- **External Dependencies:** Platform accessibility APIs

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Screen reader label missing | Fallback to element type (e.g., "Button") + log for fix |
| Contrast failure in dynamic content | Apply theme colors consistently |
| Text scaling breaks layout | Use flexible layouts, test at all sizes |
| Dark mode contrast issue | Test dark mode separately, adjust colors |

### Open Questions
- Should we support custom color schemes?
- Should screen reader announcements be configurable?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 100% WCAG 2.1 AA compliance verified
- [ ] VoiceOver tested (iOS)
- [ ] TalkBack tested (Android)
- [ ] Contrast ratios verified
- [ ] Chart text summaries implemented

---

## S04.7.2: Motor & Cognitive Accessibility

### User Story
**As a** user with motor impairment,
**I want** to navigate the app with large touch targets and gesture alternatives,
**So that** I can use yHealth without fine motor precision.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The app supports users with motor and cognitive disabilities through appropriate touch targets, gesture alternatives, and simplified interactions.

**Touch Targets:**
- Minimum 44x44pt for all interactive elements
- Adequate spacing between targets
- One-handed use optimization (key actions reachable with thumb)

**Gesture Alternatives:**
- Single-tap alternatives for all swipe gestures
- No complex gestures required for essential functions
- Example: Swipe-to-delete has delete button alternative

**Timeout Extensions:**
- Configurable session timeouts
- Users can extend or disable timeouts
- Warning before timeout with extend option

**Switch Control Support:**
- Full app navigation via external switches (iOS Switch Control, Android Switch Access)
- Focus moves in logical order
- All actions accessible via switch

**Voice Control Support (iOS):**
- Voice commands for navigation and data entry
- Labels match visible text for voice activation

**Reduce Motion:**
- Setting to disable animations and transitions
- Respects OS-level preference automatically
- In-app toggle also available

**Cognitive Accessibility:**
- Simplified language throughout
- Consistent navigation patterns
- Clear error messages with recovery steps
- Confirmation prompts for destructive actions

**Behaviors:**
- Touch targets verified at design time
- Gesture alternatives always present
- Reduce motion respects both OS and app settings
- Language kept simple and clear

### Acceptance Criteria

**AC1: Touch Target Size**
Given any interactive element,
When measured,
Then the touch target is at least 44x44pt.

**AC2: Gesture Alternatives**
Given any swipe gesture (e.g., swipe to delete),
When the gesture is available,
Then a visible button alternative exists.

**AC3: Switch Control Navigation**
Given Switch Control is enabled,
When the user navigates the app,
Then all screens and actions are accessible via switch.

**AC4: Reduce Motion Respect OS**
Given the device has "Reduce Motion" enabled,
When the app renders,
Then animations are disabled automatically.

**AC5: Reduce Motion In-App Toggle**
Given the user enables "Reduce Motion" in app settings,
When set,
Then all animations are disabled regardless of OS setting.

**AC6: Clear Error Messages**
Given an error occurs,
When the error is displayed,
Then the message is descriptive with actionable recovery steps.

**AC7: Destructive Action Confirmation**
Given the user initiates a destructive action (e.g., delete account),
When initiated,
Then a confirmation prompt requires explicit confirmation.

### Success Metrics
- 100% touch targets ≥44x44pt
- Switch Control usability rating 4.0/5
- Error message clarity rating 4.5/5

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| No perf impact | N/A | N/A | Motor accessible | Switch Control |
| Instant animation disable | N/A | N/A | Cognitive accessible | Voice Control |

### Dependencies
- **Prerequisite Stories:** S04.7.1 (Visual accessibility foundation)
- **Related Stories:** S04.7.3
- **External Dependencies:** Platform accessibility services

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Touch target overlap | Increase spacing, prioritize larger target |
| Switch gets stuck on element | Ensure focus can always move |
| Voice command not recognized | Suggest alternative: "Try 'tap [element name]' instead." |
| Complex gesture performed accidentally | Provide undo option |

### Open Questions
- Should all gestures have toggleable alternatives?
- Should haptic feedback intensity be configurable?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All touch targets verified ≥44x44pt
- [ ] Gesture alternatives present
- [ ] Switch Control tested
- [ ] Reduce motion working
- [ ] Error messages clear and actionable

---

## S04.7.3: Auditory Accessibility & Testing Requirements

### User Story
**As a** user who is deaf or hard-of-hearing,
**I want** visual alternatives to audio content,
**So that** I can fully use yHealth's voice coaching and other audio features.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Deaf and hard-of-hearing users have full access to all features through visual alternatives for audio content. Testing requirements ensure accessibility across all disability types.

**Voice Coaching Transcription:**
- Real-time text transcription of AI speech during voice calls (E2)
- Text displayed on screen as coach speaks
- "Type your response" option for users who cannot speak

**Visual Alerts:**
- All audio alerts have visual equivalents
- Notification badges + banners
- Flashing or animation (respecting reduce motion preference)

**Captions:**
- Any video content includes captions
- Captions synchronized with audio
- Captions follow WCAG caption guidelines

**Audio Feedback (Optional):**
- Optional audio cues for interactions
- Configurable in settings
- Useful for blind users, disable for deaf users

**Haptic Feedback:**
- Tactile feedback for key interactions
- Configurable intensity or disable
- Works alongside or instead of audio

**Testing Requirements:**

**Automated Testing:**
- Axe DevTools integration in CI/CD
- Color contrast checker on all screens
- Touch target size validation

**Manual Testing:**
- VoiceOver testing: Navigate entire app with screen off
- TalkBack testing: Navigate entire app with screen off
- Keyboard-only navigation: Complete key flows
- Color blindness simulation: Test with filters
- Reduced motion verification

**User Testing:**
- Beta testing with users with disabilities
- Accessibility consultant review (external audit)
- Quarterly accessibility audits ongoing

**Behaviors:**
- Transcription displays in real-time during voice sessions
- Visual alerts appear for all audio notifications
- Testing runs as part of development process

### Acceptance Criteria

**AC1: Voice Coaching Transcription**
Given a voice coaching session (E2),
When the AI coach speaks,
Then real-time transcription displays on screen.

**AC2: Text Response Option**
Given a voice coaching session,
When the user cannot speak,
Then a "Type your response" text input is available.

**AC3: Visual Notification Alerts**
Given an audio notification would play,
When the notification triggers,
Then a visual indicator (badge, banner) appears.

**AC4: Haptic Feedback**
Given a key interaction (button tap, success),
When the interaction occurs,
Then haptic feedback is provided (if enabled).

**AC5: Automated Testing Integration**
Given the CI/CD pipeline,
When code is built,
Then automated accessibility tests run (Axe DevTools or equivalent).

**AC6: Manual Testing Checklist**
Given a new feature or screen,
When development is complete,
Then manual accessibility testing is performed per checklist.

**AC7: User Testing Inclusion**
Given the beta testing program,
When beta testers are recruited,
Then users with disabilities are included.

### Success Metrics
- 100% screens pass automated accessibility testing
- 4.5/5 rating from screen reader users
- Quarterly audits identify <5 new issues

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Transcription real-time | Transcription secure | Audio not stored | Deaf/HoH accessible | iOS + Android |
| Testing in CI/CD | No PII in logs | User consent for testing | All disability types | Testing tools |

### Dependencies
- **Prerequisite Stories:** S04.7.1, S04.7.2
- **Related Stories:** S04.4.2 (Visual notifications)
- **External Dependencies:** E2 (Voice coaching transcription), Testing tools (Axe)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Transcription service fails | Show error, offer text-only interaction |
| Haptic hardware unavailable | Gracefully degrade, no error |
| Automated test fails | Block deployment, flag for review |
| Accessibility regression | Prioritize fix in next sprint |

### Open Questions
- Should transcription be available post-session as transcript?
- Should accessibility audit results be public?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Voice coaching transcription working
- [ ] Visual alerts for all audio
- [ ] Haptic feedback configurable
- [ ] Automated testing in CI/CD
- [ ] Manual testing checklist complete
- [ ] User testing with disabled users conducted

---

## Document Governance

**Created:** 2025-12-09
**Epic PRD Version:** 1.0
**Story Generator:** EXPERT-13 v3.0

**Review Triggers:**
- User feedback from beta testing
- Accessibility audit findings
- Platform OS updates (iOS/Android major releases)

**Next Steps:**
- Task breakdown for each story (EXPERT-14)
- Sprint planning based on implementation phases
- Design specifications for UI components

---

*yHealth Platform - E04: Mobile App Stories v1.0*
*20 stories | 7 features | 100% coverage*
*Generated: 2025-12-09*

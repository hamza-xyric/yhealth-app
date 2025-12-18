# yHealth Platform: Epic → Story Breakdown Progress

> **Purpose**: Session continuity document for breaking down yHealth Epics into Stories
> **Usage**: Copy the Quick Start prompt to begin each session
> **Last Updated**: 2025-12-11

---

## QUICK START: Copy This Prompt

```markdown
# yHealth Epic → Story Breakdown Session

## Session Context
I'm continuing work on the yHealth Platform Epic → Story breakdown.

**Reference This Document:** @PRODUCTS/yhealth-platform/PROGRESS.md
**Reference Vision:** @COMPANY/Xyric-Vision-Document.md
**Reference PRD:** @PRODUCTS/yhealth-platform/Product-Requirements-Document.md

## Activate Claude Skills
1. EXPERT-10 (Product Manager) - @claude-skills/10-expert-agents/EXPERT-10-product-manager.md
2. EXPERT-03 (Software Architect) - @claude-skills/10-expert-agents/EXPERT-03-software-architect.md
3. BI-02 (Question Framework) - @claude-skills/11-bi-data-analytics/BI-02-question-hypothesis-framework.md
4. DEV-02 (Test Generator) - @claude-skills/05-development/DEV-02-test-generator.md

## Core Philosophy (Do Not Deviate)
- Stories define WHAT, not HOW
- All stories combined = 100% Epic coverage
- Flexible sizing based on complexity
- Split based on cognitive load, not arbitrary rules

## Current Focus
Epic [XX]: [Name] - @PRODUCTS/yhealth-platform/prd-epics/PRD-Epic-[XX]-[Name].md

## Session Goal
[Describe what you want to accomplish this session]
```

---

## SESSION PROTOCOL

### Starting a New Session
1. Copy the Quick Start prompt above
2. Replace `[XX]` with Epic number (01-10)
3. Replace `[Name]` with Epic name
4. Add your session goal
5. Paste into new Claude Code conversation

### During the Session
- Claude will ask clarification questions → Answer them
- Review generated stories for coverage
- Request splits/merges as needed
- Confirm when satisfied

### Ending a Session
After completing work, ask Claude to:
```
Update PROGRESS.md with:
1. Epic status change (if completed)
2. Key decisions made this session
3. Any open questions for next session
```

---

## CORE PHILOSOPHY

### Stories Define WHAT, Not HOW
- Each story comprehensively describes what needs to be accomplished
- Implementation details (the "how") are deferred to task breakdown
- All stories combined must fully cover the Epic scope with no gaps

### Completeness Over Count
- No predetermined number of stories per Epic
- Split based on complexity and cognitive load
- If a story's context becomes too large, split it

### Flexible Sizing
- Story size determined by natural scope
- Avoid artificial constraints

### Competitive Analysis
- At Epic-level only, not per story

---

## PROGRESS TRACKER

### Epic Status Overview

| Epic | Name | Status | Stories | Completed |
|------|------|--------|---------|-----------|
| E01 | Onboarding & Assessment | 🔄 In Progress | 15 | 0 |
| E02 | Voice Coaching | ✅ Complete | 16 | 0 |
| E03 | WhatsApp Integration | ✅ Complete | 16 | 0 |
| E04 | Mobile App | ✅ Complete | 20 | 0 |
| E05 | Fitness Pillar | ✅ Complete | 17 | 0 |
| E06 | Nutrition Pillar | ✅ Complete | 18 | 0 |
| E07 | Wellbeing Pillar | ✅ Complete | 18 | 0 |
| E08 | Cross-Domain Intelligence | ⏳ Not Started | - | - |
| E09 | Data Integrations | ⏳ Not Started | - | - |
| E10 | Analytics & Insights Dashboard | ⏳ Not Started | - | - |

**Status Legend:**
- ⏳ Not Started
- 🔄 In Progress
- ✅ Complete
- 🔍 Under Review

### Detailed Progress

#### E01: Onboarding & Assessment
- **Status:** 🔄 In Progress
- **Sessions:** 1
- **Stories Created:** 15 (12 Must Have, 3 Should Have)
- **Stories File:** `stories/Epic-01-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 6 features (F1.1-F1.6)
  - Story sequence established for 5 sprint implementation
  - All stories follow WHAT not HOW philosophy
  - Feature → Story coverage matrix verified at 100%

#### E02: Voice Coaching
- **Status:** ✅ Complete
- **Sessions:** 1
- **Stories Created:** 16 (16 Must Have)
- **Stories File:** `stories/Epic-02-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 6 features (F2.1-F2.6)
  - 4-phase implementation sequence (Foundation → Core → Sessions → Enhancement)
  - All stories P0 Must Have per PRD (all features MVP Core)
  - Emergency Support (S02.4.2) kept atomic for safety protocols
  - Voice Tone Analysis split into 3 stories (detection, adaptation, integration)
  - Feature → Story coverage matrix verified at 100%

#### E03: WhatsApp Integration
- **Status:** ✅ Complete
- **Sessions:** 1
- **Stories Created:** 16 (16 Must Have)
- **Stories File:** `stories/Epic-03-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 7 features (F3.1-F3.7)
  - 4-phase implementation sequence (Foundation → Core → Media → Intelligence)
  - All stories P0 Must Have per PRD (all 7 features MVP Core)
  - Technical foundation story (S03.0.1) for WhatsApp Business API configuration
  - Photo Analysis split 2 ways: pipeline (S03.3.1), confirmation flow (S03.3.2)
  - Voice Processing split 2 ways: transcription (S03.4.1), sentiment response (S03.4.2)
  - Proactive Nudges split 3 ways: engine (S03.5.1), timing (S03.5.2), 24h window (S03.5.3)
  - Cross-Channel Sync split 3 ways: app sync (S03.7.1), context continuity (S03.7.2), multi-channel delivery (S03.7.3)
  - Quick Logging split 2 ways: button-based (S03.6.1), natural language (S03.6.2)
  - Feature → Story coverage matrix verified at 100%

#### E04: Mobile App
- **Status:** ✅ Complete
- **Sessions:** 1
- **Stories Created:** 20 (20 Must Have)
- **Stories File:** `stories/Epic-04-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 7 features (F4.1-F4.7)
  - 4-phase implementation sequence (Foundation → Core Experience → Engagement → Resilience)
  - All stories P0 Must Have per PRD (all features MVP Core)
  - Dashboard split 3 ways: core layout (S04.1.1), insights/actions (S04.1.2), adaptation (S04.1.3)
  - Navigation split 2 ways: tab navigation (S04.2.1), channel switching (S04.2.2)
  - Visualization split 3 ways: core charts (S04.3.1), advanced/interactive (S04.3.2), ranges/export (S04.3.3)
  - Notifications split 3 ways: infrastructure (S04.4.1), types/delivery (S04.4.2), timing/frequency (S04.4.3)
  - Offline Mode split 4 ways: detection/cache (S04.5.1), queue (S04.5.2), sync (S04.5.3), conflict resolution (S04.5.4)
  - Settings split 2 ways: core settings (S04.6.1), privacy/account/devices (S04.6.2)
  - Accessibility split 3 ways: visual/screen reader (S04.7.1), motor/cognitive (S04.7.2), auditory/testing (S04.7.3)
  - Cross-Epic dependencies documented (E5-E10 awaiting, E1-E3 complete)
  - Feature → Story coverage matrix verified at 100%

#### E05: Fitness Pillar
- **Status:** ✅ Complete
- **Sessions:** 1
- **Stories Created:** 17 (17 Must Have)
- **Stories File:** `stories/Epic-05-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 6 features (F5.1-F5.6) + technical foundation (S05.0.1)
  - 4-phase implementation sequence (Foundation → Core Tracking → Intelligence → Optimization)
  - All stories P0 Must Have per PRD (all features MVP Core)
  - Technical foundation story (S05.0.1) for wearable integration infrastructure
  - Activity Tracking split 2 ways: wearable sync (S05.1.1), manual/timeline (S05.1.2)
  - Sleep Tracking split 2 ways: core metrics (S05.2.1), cross-pillar insights (S05.2.2)
  - Recovery Monitoring split 3 ways: dual score engine (S05.3.1), recommendations (S05.3.2), alerts/trends (S05.3.3)
  - Goal Setting split 2 ways: creation/AI (S05.4.1), progress tracking (S05.4.2)
  - Workout Recommendations split 3 ways: engine (S05.5.1), library (S05.5.2), feedback/progression (S05.5.3)
  - Strain Management split 3 ways: calculation (S05.6.1), balance (S05.6.2), alerts (S05.6.3)
  - Key differentiators emphasized: Dual Recovery Score (Physical + Mental), Universal Strain Tracking, AI Workout Planning
  - Cross-Epic dependencies documented (E7 Wellbeing critical for Mental Recovery, E9 for detailed wearable OAuth)
  - Competitive research incorporated: WHOOP, Oura, Fitbit, Apple, BEVEL patterns analyzed
  - Feature → Story coverage matrix verified at 100%

#### E06: Nutrition Pillar
- **Status:** ✅ Complete
- **Sessions:** 1
- **Stories Created:** 18 (18 Must Have)
- **Stories File:** `stories/Epic-06-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 6 features (F6.1-F6.6) + technical foundation (S06.0.1)
  - 4-phase implementation sequence (Foundation → Core Tracking → Intelligence → Enhancement)
  - All stories P0 Must Have per PRD (all features MVP Core)
  - Technical foundation story (S06.0.1) for Nutritionix API integration and food database infrastructure
  - Meal Logging split 3 ways: Photo AI (S06.1.1), Barcode/Manual (S06.1.2), Voice/WhatsApp (S06.1.3)
  - Calorie & Macro Tracking split 2 ways: dashboard (S06.2.1), personalized targets (S06.2.2)
  - Hydration Tracking split 2 ways: logging (S06.3.1), smart reminders/score (S06.3.2)
  - Goals & Plans split 3 ways: templates (S06.4.1), AI generation (S06.4.2), progress (S06.4.3)
  - AI Coaching split 4 ways: guidance (S06.5.1), Q&A (S06.5.2), interventions (S06.5.3), education (S06.5.4)
  - Emotional Eating split 3 ways: custom foods (S06.6.1), detection/tagging (S06.6.2), reports (S06.6.3)
  - Key differentiators: Multi-modal logging (<30s), Emotional eating integration, Cross-pillar insights
  - Competitive research: MyFitnessPal, Noom, Cronometer, MacroFactor, Yazio, Lose It!, HealthifyMe, Lifesum
  - Cross-Epic dependencies documented (E5 Fitness, E7 Wellbeing, E8 Cross-Domain, E9 Integrations)
  - Feature → Story coverage matrix verified at 100%

#### E07: Wellbeing Pillar
- **Status:** ✅ Complete
- **Sessions:** 1
- **Stories Created:** 18 (18 Must Have)
- **Stories File:** `stories/Epic-07-Stories.md`
- **Last Session Notes:**
  - Completed full story breakdown covering all 7 features (F7.1-F7.7)
  - 4-phase implementation sequence (Foundation → Core Tracking → Intelligence → Enhancement)
  - All stories P0 Must Have per PRD (all 7 features MVP Core)
  - Mood Check-ins split 2 ways: logging (S07.1.1), patterns/timeline (S07.1.2)
  - Energy Monitoring split 2 ways: logging (S07.4.1), pattern analysis (S07.4.2)
  - Habit Tracking split 3 ways: creation (S07.3.1), logging/streaks (S07.3.2), correlations (S07.3.3)
  - Daily Journaling split 3 ways: prompts (S07.2.1), entry/voice (S07.2.2), AI personalization (S07.2.3)
  - Stress Detection split 3 ways: self-report (S07.5.1), multi-signal (S07.5.2), alerts/interventions (S07.5.3)
  - Wellbeing Goals & Routines split 3 ways: goal setting (S07.6.1), templates/builder (S07.6.2), tracking/analytics (S07.6.3)
  - Mindfulness split 2 ways: practice library (S07.7.1), context-aware recommendations (S07.7.2)
  - Key differentiators: Daily Wellbeing as Equal Pillar, Multi-signal Stress Detection, Cross-pillar correlations
  - Cross-Epic dependencies: E5 (Physical Recovery Score receives mood/stress/energy), E8 (Cross-Domain Intelligence), E9 (Wearable HRV/RHR)
  - Bootstrap AI approach: Research-based prompts first, AI personalizes as data accumulates
  - Feature → Story coverage matrix verified at 100%

#### E08: Cross-Domain Intelligence
- **Status:** ⏳ Not Started
- **Sessions:** 0
- **Stories Created:** 0
- **Last Session Notes:** -

#### E09: Data Integrations
- **Status:** ⏳ Not Started
- **Sessions:** 0
- **Stories Created:** 0
- **Last Session Notes:** -

#### E10: Analytics & Insights Dashboard
- **Status:** ⏳ Not Started
- **Sessions:** 0
- **Stories Created:** 0
- **Last Session Notes:** -

---

## ACCUMULATED INSIGHTS

### Global Decisions (Apply to All Epics)
*Captured decisions that apply across all story breakdowns*

| Decision | Rationale | Date |
|----------|-----------|------|
| Stories define WHAT not HOW | Implementation deferred to tasks | 2025-12-07 |
| Flexible story sizing | Natural scope determines size | 2025-12-07 |
| Split by cognitive load | Not by arbitrary rules | 2025-12-07 |
| Competitive at Epic level | Not per-story tagging | 2025-12-07 |

### Epic-Specific Decisions
*Decisions made for specific Epics*

#### E01 Decisions
- **MoSCoW Priorities:** Keep all 6 features as Must Have (all required for MVP)
- **Story Granularity:** Flexible - focus on completeness and sequence, no arbitrary constraints
- **Light/Deep Modes:** Split only when complexity demands (combine by default)
- **Error Handling:** Embedded in feature stories as acceptance criteria (not separate stories)
- **Story Naming:** `S01.[Feature#].[Story#]` convention (e.g., S01.1.1)
- **Implementation Sequence:** 5 sprint approach (Account → Assessment → Integrations → Plan → Enhancement)

#### E02 Decisions
- **MoSCoW Priorities:** All 16 stories as P0 Must Have (all 6 features MVP Core per PRD)
- **Story Granularity:** 16 stories across 6 features, split by natural cognitive boundaries
- **Implementation Phases:** 4 sprints (Foundation → Core Capabilities → Full Sessions → Enhancement)
- **Emergency Support:** S02.4.2 kept atomic - safety protocols cannot be partially deployed
- **Voice Tone Analysis:** Split 3 ways - detection (S02.3.1), adaptation (S02.3.2), integration (S02.3.3)
- **Transcription:** Separated as S02.2.3 for dedicated WCAG 2.1 AA compliance attention
- **Session Types:** Quick Check-In + Coaching combined (S02.4.1), Emergency separate (S02.4.2), Goal Review + Orchestration combined (S02.4.3)
- **Story Naming:** `S02.[Feature#].[Story#]` convention (e.g., S02.1.1)

#### E03 Decisions
- **MoSCoW Priorities:** All 16 stories as P0 Must Have (all 7 features MVP Core per PRD)
- **Story Granularity:** 16 stories across 7 features, split by natural cognitive boundaries
- **Implementation Phases:** 4 phases (Foundation → Core Coaching → Media Processing → Intelligence & Sync)
- **Tech Stack:** Tool-agnostic - stories describe WHAT, implementation details deferred to tasks (research needed for specific tools like ElevenLabs, n8n options)
- **Light/Deep Modes:** Combined in single stories unless complexity warrants split
- **Error Handling:** Comprehensive - all PRD error scenarios embedded in acceptance criteria
- **WhatsApp API Policy:** Both approaches - technical foundation story (S03.0.1) + constraints embedded in feature stories
- **Cross-Epic Dependencies:** Explicitly referenced (E1 Onboarding, E2 Voice, E4 Mobile, E5-E7 Pillars)
- **Story Naming:** `S03.[Feature#].[Story#]` convention (S03.0.1 for technical foundation)
- **Photo Analysis:** Split 2 ways - processing pipeline separate from confirmation flow
- **Voice Messages:** Split 2 ways - transcription separate from sentiment-based response
- **Proactive Nudges:** Split 3 ways - engine, timing/quiet hours, 24h window policy
- **Cross-Channel Sync:** Split 3 ways - app sync, context continuity, multi-channel delivery

#### E04 Decisions
- **MoSCoW Priorities:** All 20 stories as P0 Must Have (all 7 features MVP Core per PRD)
- **Story Granularity:** 20 stories across 7 features, flexible sizing based on complexity
- **Implementation Phases:** 4 phases (Foundation → Core Experience → Engagement → Resilience)
- **Tech Stack:** Tech-agnostic - stories describe WHAT, implementation details deferred to tasks
- **Light/Deep Modes:** Combined in single stories unless complexity demands split (per global decision)
- **Error Handling:** Comprehensive - all PRD error scenarios embedded in acceptance criteria
- **Accessibility:** WCAG 2.1 AA compliance mandatory, split into 3 stories (visual, motor/cognitive, auditory)
- **Offline Mode:** Split 4 ways for natural cognitive boundaries (detection, queue, sync, conflict)
- **Cross-Epic Dependencies:** E5-E10 dependencies documented, await completion before integration
- **Story Naming:** `S04.[Feature#].[Story#]` convention (e.g., S04.1.1)

#### E05 Decisions
- **MoSCoW Priorities:** All 17 stories as P0 Must Have (all 6 features MVP Core per PRD)
- **Story Granularity:** 17 stories across 6 features + technical, flexible sizing based on complexity
- **Implementation Phases:** 4 phases (Foundation → Core Tracking → Intelligence → Optimization)
- **Tech Stack:** Tech-agnostic - stories describe WHAT, implementation details deferred to tasks
- **Dual Recovery Score:** Two separate scores (Physical + Mental) displayed independently with color coding - NOT combined
- **Wearable Setup:** Include S05.0.1 technical foundation for golden source hierarchy, normalization, sync infrastructure
- **Exercise Library Detail:** High-level categories (5 categories, 10+ exercises each); specific exercises at implementation
- **Light/Deep Modes:** Combined in single stories unless complexity demands split (per global decision)
- **Error Handling:** Comprehensive - all PRD error scenarios embedded in acceptance criteria
- **Recovery Monitoring:** Split 3 ways - engine (S05.3.1), recommendations (S05.3.2), alerts/trends (S05.3.3) for cognitive separation
- **Workout Recommendations:** Split 3 ways - engine (S05.5.1), library (S05.5.2), feedback/progression (S05.5.3)
- **Strain Management:** Split 3 ways - calculation (S05.6.1), balance (S05.6.2), alerts (S05.6.3)
- **Cross-Epic Dependencies:** E7 (Wellbeing) critical for Mental Recovery Score inputs (mood, stress, energy, journaling)
- **Story Naming:** `S05.[Feature#].[Story#]` convention (S05.0.1 for technical foundation)
- **Competitive Differentiation:** Emphasized Dual Recovery Score and Universal Strain Tracking as key moats vs WHOOP/BEVEL

#### E06 Decisions
- **MoSCoW Priorities:** All 18 stories as P0 Must Have (all 6 features MVP Core per PRD)
- **Story Granularity:** 18 stories across 6 features + technical, flexible sizing based on complexity
- **Implementation Phases:** 4 phases (Foundation → Core Tracking → Intelligence → Enhancement)
- **Tech Stack:** Tech-agnostic - stories describe WHAT, implementation details deferred to tasks
- **Light/Deep Modes:** Combined in single stories unless complexity demands split (per global decision)
- **Error Handling:** Enterprise-grade - all PRD error scenarios + additional edge cases embedded in acceptance criteria
- **Channel Integration:** All channels MVP (App + WhatsApp + Voice Coaching) for meal logging
- **Photo AI Recognition:** S06.1.1 includes multi-food detection, portion estimation, confidence thresholds
- **Nutritionix API:** S06.0.1 technical foundation for 5M+ food database, barcode lookup, NLP parsing
- **Hydration Features:** Split 2 ways - quick logging (S06.3.1), smart reminders with hydration score (S06.3.2)
- **AI Meal Plans:** S06.4.2 includes dietary preferences, allergies, cultural considerations (halal, vegetarian)
- **Emotional Eating:** Unique differentiator - integrated with E7 Wellbeing for mood correlation
- **Cross-Epic Dependencies:** E5 (activity level), E7 (mood/stress), E8 (cross-domain patterns), E9 (API setup)
- **Story Naming:** `S06.[Feature#].[Story#]` convention (S06.0.1 for technical foundation)
- **Competitive Differentiation:** Multi-modal <30s logging, emotional eating detection, regional food support (Pakistani, Middle Eastern)

#### E07 Decisions
- **MoSCoW Priorities:** All 18 stories as P0 Must Have (all 7 features MVP Core per PRD)
- **Story Granularity:** Mixed approach - granular for complex features (F7.2, F7.3, F7.5), combined for simpler features (F7.1, F7.4, F7.7)
- **Implementation Phases:** 4 sprints (Foundation → Core Tracking → Intelligence → Enhancement)
- **Tech Stack:** Tech-agnostic - stories describe WHAT, implementation details deferred to tasks
- **Light/Deep Modes:** Combined in single stories with mode-specific sections in scope descriptions
- **Error Handling:** Embedded in feature stories as acceptance criteria (no separate safety story)
- **Stress Signals:** All 4 MVP (self-report, biometrics via HRV/RHR, text sentiment, app usage patterns)
- **Mindfulness:** Self-contained (text-based instructions only, no external app integrations)
- **Routines:** Generic template system (Morning, Evening, Stress Reset) with custom builder
- **Cross-Pillar Integration:** Embedded within feature stories (not separate stories)
- **AI Personalization:** Bootstrap approach - research-based prompts first, AI enhances over time as data accumulates
- **Mood Check-ins:** Split 2 ways - logging (S07.1.1), patterns/timeline (S07.1.2)
- **Energy Monitoring:** Split 2 ways - logging (S07.4.1), pattern analysis (S07.4.2)
- **Habit Tracking:** Split 3 ways - creation/config (S07.3.1), logging/streaks (S07.3.2), correlations (S07.3.3)
- **Daily Journaling:** Split 3 ways - prompts (S07.2.1), entry/voice (S07.2.2), AI personalization (S07.2.3)
- **Stress Detection:** Split 3 ways - self-report (S07.5.1), multi-signal (S07.5.2), alerts/interventions (S07.5.3)
- **Wellbeing Goals & Routines:** Split 3 ways - goal setting (S07.6.1), templates/builder (S07.6.2), tracking/analytics (S07.6.3)
- **Mindfulness:** Split 2 ways - practice library (S07.7.1), context-aware recommendations (S07.7.2)
- **Cross-Epic Dependencies:** E5 (Mental Recovery Score 30% weight), E8 (Cross-Domain Intelligence), E9 (Wearable HRV/RHR data)
- **Story Naming:** `S07.[Feature#].[Story#]` convention (e.g., S07.1.1)
- **Competitive Differentiation:** Daily Wellbeing as Equal Pillar, Multi-signal Stress Detection, Cross-pillar correlation insights

#### E08 Decisions
- None yet

#### E09 Decisions
- None yet

#### E10 Decisions
- None yet

### Patterns Identified
*Recurring patterns noticed during breakdown*

| Pattern | Example | Guidance |
|---------|---------|----------|
| Technical foundation stories | S03.0.1 (WhatsApp API Config) | When Epic requires external API/platform integration, create S0X.0.1 technical setup story |
| Media processing split | Photo (pipeline + confirmation), Voice (transcription + response) | Split input processing from output/confirmation for complex media features |
| Proactive features split 3 ways | Nudges: engine, timing, policy | For AI-initiated features: core engine, timing logic, policy compliance |
| Cross-channel sync split 3 ways | Sync: data, context, delivery | For multi-channel: data sync, context continuity, notification delivery |
| Notification features split 3 ways | Infrastructure, types/delivery, timing/frequency | For push notifications: platform setup, content types, user controls |
| Offline mode split 4 ways | Detection, queue, sync, conflict | For offline: detection/cache, queue management, sync engine, conflict resolution |
| Accessibility split 3 ways | Visual, motor/cognitive, auditory | For WCAG compliance: visual + screen reader, motor + cognitive, auditory + testing |
| Dashboard features split 3 ways | Core layout, content/actions, adaptation | For dashboard: structure/scores, dynamic content, personalization/caching |

---

## OPEN QUESTIONS

### Unresolved for Next Session
| Question | Epic | Added | Priority |
|----------|------|-------|----------|
| None yet | - | - | - |

### Resolved Questions (Archive)
| Question | Resolution | Resolved Date |
|----------|------------|---------------|
| None yet | - | - |

---

## CLAUDE SKILLS REFERENCE

### Primary Skills for Epic → Story Breakdown

| Skill | Activation | Use Case |
|-------|------------|----------|
| **EXPERT-10** | `Act as EXPERT-10 (Product Manager)` | MoSCoW prioritization, PRD structure |
| **EXPERT-03** | `Act as EXPERT-03 (Software Architect)` | Technical feasibility, scalability |
| **BI-02** | `Use BI-02 framework` | Breaking into testable hypotheses |
| **DEV-02** | `Apply DEV-02 patterns` | Acceptance criteria, test cases |
| **EXPERT-04** | `Act as EXPERT-04 (QA Engineer)` | BDD story structure |

### Skill Activation Examples

**For prioritization questions:**
```
Using EXPERT-10, help me prioritize these features with MoSCoW
```

**For technical complexity assessment:**
```
Using EXPERT-03, assess the technical feasibility of this story
```

**For acceptance criteria:**
```
Using DEV-02 patterns, generate acceptance criteria for this story
```

---

## STORY TEMPLATE

When generating stories, use this template:

```markdown
## S[Epic#].[Feature#].[Story#]: [Story Title]

### User Story
**As a** [persona],
**I want to** [action/capability],
**So that** [benefit/value].

### Story Type
- [ ] Feature | Enhancement | Technical | Integration

### Priority
- [ ] Must Have | Should Have | Could Have | Won't Have

### Scope Description
[Comprehensive WHAT - user experience, data, behaviors, constraints, modes]

### Acceptance Criteria
Given [context], When [action], Then [expected outcome].

### Success Metrics
- [Measurable outcomes]

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|

### Dependencies
- Prerequisite Stories:
- Related Stories:
- External Dependencies:

### Edge Cases & Errors
| Scenario | Expected Behavior |

### Open Questions
- [Questions for task breakdown]

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Error scenarios handled
- [ ] Requirements verified
```

---

## OUTPUT CHECKLIST

After each Epic breakdown, verify:

### Completeness
- [ ] All Epic features have at least one story
- [ ] Feature → Story Coverage Matrix created
- [ ] No gaps between stories

### Quality
- [ ] Each story describes WHAT (not HOW)
- [ ] Acceptance criteria are testable
- [ ] Dependencies are documented

### Files Created
- [ ] `stories/Epic-[XX]-Stories.md` saved
- [ ] `PROGRESS.md` updated with status
- [ ] `00-STORY-INDEX.md` updated (if exists)

---

## SESSION LOG

### Session History
| Date | Epic | Activities | Stories Created |
|------|------|------------|-----------------|
| 2025-12-07 | Setup | Created PROGRESS.md and stories directory | 0 |
| 2025-12-07 | E01 | Full story breakdown: analyzed 6 features, captured decisions, wrote 15 detailed story cards | 15 |
| 2025-12-07 | E02 | Full story breakdown: analyzed 6 features (F2.1-F2.6), 4-phase implementation, wrote 16 detailed story cards | 16 |
| 2025-12-08 | E03 | Full story breakdown: analyzed 7 features (F3.1-F3.7), 4-phase implementation, wrote 16 detailed story cards using EXPERT-13 Story Generator skill | 16 |
| 2025-12-09 | E04 | Full story breakdown: analyzed 7 features (F4.1-F4.7), 4-phase implementation, wrote 20 detailed story cards using EXPERT-13 Story Generator skill | 20 |
| 2025-12-09 | E05 | Full story breakdown: analyzed 6 features (F5.1-F5.6) + technical foundation, 4-phase implementation, competitive research (WHOOP, Oura, Fitbit, Apple, BEVEL), wrote 17 detailed story cards using EXPERT-13 Story Generator skill | 17 |
| 2025-12-10 | E06 | Full story breakdown: analyzed 6 features (F6.1-F6.6) + technical foundation, 4-phase implementation, competitive research (MyFitnessPal, Noom, Cronometer, MacroFactor), wrote 18 detailed story cards using EXPERT-13 Story Generator skill | 18 |
| 2025-12-11 | E07 | Full story breakdown: analyzed 7 features (F7.1-F7.7), 4-phase implementation (Foundation → Core Tracking → Intelligence → Enhancement), bootstrap AI approach for personalization, wrote 18 detailed story cards using EXPERT-13 Story Generator skill | 18 |

---

*PROGRESS.md v1.0 | yHealth Platform*
*Created: 2025-12-07*

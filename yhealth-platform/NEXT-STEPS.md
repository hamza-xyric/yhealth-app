# yHealth Platform - Next Steps Queue

> **Purpose**: Curated work queue for Epic → Story breakdown sessions
> **Owner**: Hamza
> **Last Updated**: 2025-12-22
> **Status**: Active
> **Context Document**: See [PROGRESS.md](./PROGRESS.md) for session history and patterns

---

## QUICK START: Copy This Prompt

```markdown
# yHealth Epic → Story Breakdown Session

## Session Context
I'm continuing work on the yHealth Platform Epic → Story breakdown.

**Reference This Document:** @PRODUCTS/yhealth-platform/NEXT-STEPS.md
**Reference Progress:** @PRODUCTS/yhealth-platform/PROGRESS.md
**Reference PRD:** @PRODUCTS/yhealth-platform/Product-Requirements-Document.md

## Activate Claude Skills
1. EXPERT-10 (Product Manager)
2. EXPERT-03 (Software Architect)
3. EXPERT-13 (Story Generator)
4. DEV-02 (Test Generator)

## Current Focus
[Epic XX: Name]

## Session Goal
Generate stories for the specified Epic following established patterns.
```

---

## NEXT STEPS QUEUE

### Currently In Progress

*No item currently in progress - select from Queued*

---

### Queued (Priority Order)

#### [NS-001] Complete E01 Story Review

| Field | Value |
|-------|-------|
| **Status** | Queued |
| **Priority** | P1 |
| **Type** | Documentation |
| **Source** | @PRODUCTS/yhealth-platform/PROGRESS.md |
| **Curated** | 2025-12-20 |

**Description**
E01 (Onboarding & Assessment) has 15 stories created but status is "In Progress". Review and finalize to mark complete.

**AI Context**

| Context Type | Reference |
|--------------|-----------|
| **Skills to Activate** | EXPERT-10 (Product Manager), EXPERT-13 (Story Generator) |
| **Patterns to Apply** | E02-E07 completion patterns from PROGRESS.md |
| **Stories File** | `stories/Epic-01-Stories.md` |

**Acceptance Criteria**
- [ ] Review all 15 stories for completeness
- [ ] Verify Feature → Story coverage matrix at 100%
- [ ] Update PROGRESS.md status to ✅ Complete
- [ ] Document any decisions made

---

#### [NS-002] E08 Cross-Domain Intelligence Story Breakdown

| Field | Value |
|-------|-------|
| **Status** | Queued |
| **Priority** | P0 |
| **Type** | Documentation |
| **Source** | @PRODUCTS/yhealth-platform/PROGRESS.md |
| **Curated** | 2025-12-20 |

**Description**
Generate user stories for Epic 08: Cross-Domain Intelligence. This is the AI brain that connects Fitness, Nutrition, and Wellbeing insights.

**AI Context**

| Context Type | Reference |
|--------------|-----------|
| **Skills to Activate** | EXPERT-10, EXPERT-03, EXPERT-13, DEV-02 |
| **Patterns to Apply** | 4-phase implementation, technical foundation story, split patterns from E02-E07 |
| **Epic PRD** | @PRODUCTS/yhealth-platform/prd-epics/PRD-Epic-08-Cross-Domain-Intelligence.md |
| **Dependencies** | E05 (Fitness), E06 (Nutrition), E07 (Wellbeing) patterns |

**Acceptance Criteria**
- [ ] All features have stories
- [ ] Feature → Story coverage matrix at 100%
- [ ] Cross-epic dependencies documented
- [ ] Stories follow WHAT not HOW philosophy
- [ ] `stories/Epic-08-Stories.md` created

---

#### [NS-003] E09 Data Integrations Story Breakdown

| Field | Value |
|-------|-------|
| **Status** | Queued |
| **Priority** | P1 |
| **Type** | Documentation |
| **Source** | @PRODUCTS/yhealth-platform/PROGRESS.md |
| **Curated** | 2025-12-20 |
| **Blocked By** | NS-002 (E08 completion) |

**Description**
Generate user stories for Epic 09: Data Integrations. Covers wearable integrations, health app connections, and data sync.

**AI Context**

| Context Type | Reference |
|--------------|-----------|
| **Skills to Activate** | EXPERT-10, EXPERT-03, EXPERT-13, DEV-02 |
| **Patterns to Apply** | Technical foundation story (S09.0.1), OAuth flows, API integration patterns |
| **Epic PRD** | @PRODUCTS/yhealth-platform/prd-epics/PRD-Epic-09-Data-Integrations.md |
| **Dependencies** | E05 wearable infrastructure (S05.0.1) |

**Acceptance Criteria**
- [ ] All features have stories
- [ ] Feature → Story coverage matrix at 100%
- [ ] Wearable-specific stories (Fitbit, Garmin, Apple, Samsung)
- [ ] Health app integration stories
- [ ] `stories/Epic-09-Stories.md` created

---

#### [NS-004] E10 Analytics Dashboard Story Breakdown

| Field | Value |
|-------|-------|
| **Status** | Queued |
| **Priority** | P1 |
| **Type** | Documentation |
| **Source** | @PRODUCTS/yhealth-platform/PROGRESS.md |
| **Curated** | 2025-12-20 |
| **Blocked By** | NS-003 (E09 completion) |

**Description**
Generate user stories for Epic 10: Analytics & Insights Dashboard. Personal health analytics, trend visualization, and reporting.

**AI Context**

| Context Type | Reference |
|--------------|-----------|
| **Skills to Activate** | EXPERT-10, EXPERT-03, EXPERT-13, BI-01 (Dashboard) |
| **Patterns to Apply** | Dashboard split 3 ways pattern, Xyric Dashboard Philosophy |
| **Epic PRD** | @PRODUCTS/yhealth-platform/prd-epics/PRD-Epic-10-Analytics-Dashboard.md |
| **Design Reference** | @FRAMEWORKS/Xyric-Dashboard-Philosophy.md |

**Acceptance Criteria**
- [ ] All features have stories
- [ ] Feature → Story coverage matrix at 100%
- [ ] Dashboard philosophy applied
- [ ] Cross-pillar analytics stories
- [ ] `stories/Epic-10-Stories.md` created

---

#### [NS-005] Complete Core App UI

| Field | Value |
|-------|-------|
| **Status** | Queued |
| **Priority** | P1 |
| **Type** | Development |
| **Source** | @PRODUCTS/yhealth-platform/PROGRESS-DEV.md |
| **Curated** | 2025-12-22 |

**Description**
Continue development of the yHealth mobile app UI. Core app structure started (P1-P6) but needs additional work and refinements before it can be considered complete. Add remaining components, polish existing ones, and ensure design consistency.

**AI Context**

| Context Type | Reference |
|--------------|-----------|
| **Skills to Activate** | EXPERT-01 (Frontend), DEV-01 (Code Review) |
| **Patterns to Apply** | Design system from PROGRESS-DEV.md, pillar theming |
| **Development Reference** | yhealth-app/ repository |

**Acceptance Criteria**
- [ ] All P4 components polished and consistent
- [ ] All P5 pages complete with real interactions
- [ ] State management (P7) implemented
- [ ] Design system consistently applied
- [ ] Dark mode working across all pages

---

## ARCHIVE (Completed)

### Story Breakdown Sessions - December 2025
- E02: Voice Coaching - 16 stories
- E03: WhatsApp Integration - 16 stories
- E04: Mobile App - 20 stories
- E05: Fitness Pillar - 17 stories
- E06: Nutrition Pillar - 18 stories
- E07: Wellbeing Pillar - 18 stories

**Total Stories Generated:** 120 (excluding E01 in progress)

---

## FUTURE CANDIDATES

| Item | Source | Type | Notes | Added |
|------|--------|------|-------|-------|
| Story prioritization pass | After E08-E10 | Documentation | MoSCoW review across all epics | 2025-12-20 |
| Sprint planning | After stories | Planning | Map stories to sprints | 2025-12-20 |
| Technical architecture doc | E01-E10 stories | Documentation | Cross-cutting technical decisions | 2025-12-20 |
| API design document | E03, E09 | Documentation | WhatsApp, wearable APIs | 2025-12-20 |

---

## REFERENCE

### Story Generation Patterns (from E02-E07)

| Pattern | Example | When to Use |
|---------|---------|-------------|
| Technical foundation | S05.0.1, S06.0.1 | Epic requires external API/platform setup |
| Split by phase | Detection → Processing → Response | Multi-step processing features |
| Split 3 ways | Engine, Timing, Policy | AI-initiated/proactive features |
| Dashboard split | Layout, Content, Adaptation | Dashboard features |
| Accessibility split | Visual, Motor, Auditory | WCAG compliance features |

### Epic PRD Files

| Epic | PRD File |
|------|----------|
| E08 | `prd-epics/PRD-Epic-08-Cross-Domain-Intelligence.md` |
| E09 | `prd-epics/PRD-Epic-09-Data-Integrations.md` |
| E10 | `prd-epics/PRD-Epic-10-Analytics-Dashboard.md` |

### Skills Quick Lookup

| Skill | Use Case |
|-------|----------|
| EXPERT-10 | MoSCoW prioritization, PRD structure |
| EXPERT-03 | Technical feasibility, scalability |
| EXPERT-13 | Story generation, template |
| DEV-02 | Acceptance criteria, test cases |
| BI-01 | Dashboard design philosophy |

---

*NEXT-STEPS.md v1.0 | yHealth Platform*
*Created: 2025-12-20*

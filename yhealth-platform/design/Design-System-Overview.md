# yHealth Design System

> The comprehensive design foundation for yHealth - Your AI Life Coach

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| **Primary Color** | Warm Teal `#00BCD4` |
| **Fitness Pillar** | Orange `#FF9800` |
| **Nutrition Pillar** | Green `#4CAF50` |
| **Wellbeing Pillar** | Soft Blue `#5C9CE6` |
| **Primary Font** | Lato / Open Sans |
| **Theme** | Dark Mode Primary |
| **Tech Stack** | shadcn/ui + Tailwind CSS |

---

## Design System Documents

### Foundation Layer

| Document | Purpose | Status |
|----------|---------|--------|
| [Brand Identity](./Brand-Identity.md) | Brand story, voice, messaging, positioning | Active |
| [Color System](./Color-System.md) | Complete color palette with dark mode | Active |
| [Typography System](./Typography-System.md) | Font stack, type scale, readability | Active |
| [Spacing & Layout](./Spacing-Layout.md) | Grid, spacing tokens, touch targets | Active |

### Component Layer

| Document | Purpose | Status |
|----------|---------|--------|
| [Component Library](./Component-Library.md) | UI components specification | Active |
| [Motion Design](./Motion-System.md) | Animation timing, principles, patterns | Active |
| [Data Visualization](./Data-Visualization.md) | Charts, progressive disclosure, hierarchy | Active |

### Guidelines Layer

| Document | Purpose | Status |
|----------|---------|--------|
| [Accessibility](./Accessibility.md) | WCAG 2.1 AA compliance standards | Active |
| [Voice & Tone](./Voice-Tone.md) | Direct Coach personality, writing guidelines | Active |

---

## Design Principles

### 1. Warmer Than Clinical
Add soul to the science. yHealth should feel human and supportive, not sterile or medical. Every interaction should convey care.

### 2. Modern Minimal
Clean lines, generous whitespace, purposeful elements. Remove anything that doesn't serve the user's goals.

### 3. Context-Aware Emotion
**Energizing** when users are succeeding, **Supportive** when they're struggling. The design adapts to emotional context.

### 4. Progressive Disclosure
Show what's needed when it's needed. Glanceable home → detailed insights → rich analytics. Don't overwhelm.

### 5. Three Equal Pillars
Fitness, Nutrition, and Wellbeing receive equal visual weight and importance. No pillar is secondary.

### 6. Direct Coach Voice
Honest, action-oriented communication that respects users' time. Tell it like it is, with care.

---

## Brand Identity Summary

### Positioning
**"Your AI Life Coach"** - Not just a health tracker. A trusted companion that helps you achieve your life goals through invisible intelligence and visible coaching.

### Core Promise
> *"The AI health companion that knows you better than you know yourself - delivering insights impossible to discover alone by connecting everything about your health."*

### Target Audience
- **Primary**: Health-conscious adults 25-55
- **Market**: US/Western
- **Personas**: Holistic Health Seekers, Busy Professionals, Optimization Enthusiasts

### Competitive Differentiation
| vs Competitors | yHealth Advantage |
|----------------|-------------------|
| WHOOP, Bevel | Daily Wellbeing as EQUAL pillar (not monthly surveys) |
| Noom, MyFitnessPal | Three equal pillars + Multi-modal AI coaching |
| Apple Health | Conversational AI coach, not passive dashboards |

---

## Visual Identity Summary

### Color Philosophy
- **Warm Teal/Cyan**: Balance of calm (blue) + vitality (green). Unique positioning between clinical and playful.
- **Three Distinct Pillar Colors**: Clear visual language for each health domain.
- **Dark Mode Primary**: Premium, immersive, modern. Battery-efficient and easier on eyes.

### Typography Philosophy
- **Humanist Sans**: Warm, friendly, approachable. Balance of modern and human.
- **Accessibility First**: Minimum 16px body, 44px touch targets, 4.5:1 contrast.

### Motion Philosophy
- **Subtle & Refined**: Apple-style micro-interactions. Calming, doesn't distract.
- **Purposeful Animation**: Every motion serves UX, not decoration.
- **Adaptive Celebrations**: Energetic for wins, calm for support.

---

## Implementation Guide

### For Developers (Tailwind/shadcn)

```css
/* Primary brand color */
--primary: 187 100% 42%; /* #00BCD4 */

/* Pillar colors */
--fitness: 36 100% 50%;  /* #FF9800 */
--nutrition: 122 39% 49%; /* #4CAF50 */
--wellbeing: 214 74% 63%; /* #5C9CE6 */

/* Dark mode surfaces */
--background: 0 0% 7%;     /* #121212 */
--card: 0 0% 12%;          /* #1E1E1E */
--foreground: 0 0% 98%;    /* #FAFAFA */
```

### For Designers

1. Use the color palette exactly as specified
2. Maintain 16px minimum body text
3. Ensure 44×44px minimum touch targets
4. Test all designs in dark mode first
5. Apply pillar colors consistently across all contexts

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-07 | Initial design system creation |

---

*yHealth Design System v1.0 | Foundation for shadcn/Tailwind implementation*

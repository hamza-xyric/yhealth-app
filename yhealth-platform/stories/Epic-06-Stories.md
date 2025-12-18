# Epic 06: Nutrition Pillar - User Stories

> **Epic:** E06 - Nutrition Pillar
> **Source:** `prd-epics/PRD-Epic-06-Nutrition-Pillar.md`
> **Created:** 2025-12-10
> **Stories:** 18 (18 Must Have)
> **Workflow:** EXPERT-13 Story Generator v3.0

---

## Story Index

| Story ID | Title | Feature | Priority | Status |
|----------|-------|---------|----------|--------|
| S06.0.1 | Food Database & API Integration Infrastructure | Technical | P0 (Must) | Draft |
| S06.1.1 | Photo AI Meal Recognition | F6.1 | P0 (Must) | Draft |
| S06.1.2 | Barcode Scanning & Manual Search | F6.1 | P0 (Must) | Draft |
| S06.1.3 | Voice & WhatsApp Meal Logging | F6.1 | P0 (Must) | Draft |
| S06.2.1 | Real-Time Calorie & Macro Dashboard | F6.2 | P0 (Must) | Draft |
| S06.2.2 | Personalized Targets & Dynamic Adjustment | F6.2 | P0 (Must) | Draft |
| S06.3.1 | Hydration Logging & Progress Tracking | F6.3 | P0 (Must) | Draft |
| S06.3.2 | Smart Hydration Reminders & Score | F6.3 | P0 (Must) | Draft |
| S06.4.1 | Nutrition Goal Setting & Templates | F6.4 | P0 (Must) | Draft |
| S06.4.2 | AI Meal Plan Generation | F6.4 | P0 (Must) | Draft |
| S06.4.3 | Meal Plan Interaction & Progress Tracking | F6.4 | P0 (Must) | Draft |
| S06.5.1 | Real-Time Nutrition Guidance | F6.5 | P0 (Must) | Draft |
| S06.5.2 | Nutrition Q&A & Personalized Answers | F6.5 | P0 (Must) | Draft |
| S06.5.3 | Proactive Pattern Interventions | F6.5 | P0 (Must) | Draft |
| S06.5.4 | Educational Content Delivery | F6.5 | P0 (Must) | Draft |
| S06.6.1 | Custom Food & Recipe Builder | F6.6 | P0 (Must) | Draft |
| S06.6.2 | Emotional Eating Detection & Tagging | F6.6 | P0 (Must) | Draft |
| S06.6.3 | Behavioral Analysis & Emotional Eating Reports | F6.6 | P0 (Must) | Draft |

---

## Dependency Diagram

```
PHASE 1: FOUNDATION (Sprint 1)
S06.0.1 (Food DB/API Infra) ──┬──► S06.1.1 (Photo AI)
                              │
                              ├──► S06.1.2 (Barcode/Manual)
                              │
                              └──► S06.6.1 (Custom Food/Recipes)

PHASE 2: CORE TRACKING (Sprint 1-2)
S06.1.1 + S06.1.2 ──► S06.1.3 (Voice/WhatsApp Logging)
         │
         ├──► S06.2.1 (Macro Dashboard) ──► S06.2.2 (Personalized Targets)
         │                                         │
         │                                         ▼
         └──► S06.3.1 (Hydration Logging) ──► S06.3.2 (Smart Reminders)

PHASE 3: INTELLIGENCE (Sprint 2-3)
S06.2.2 ──► S06.4.1 (Goal Setting) ──► S06.4.2 (AI Meal Plans) ──► S06.4.3 (Plan Progress)
                                               │
S06.2.1 + S06.4.1 ──► S06.5.1 (Real-Time Guidance)
                              │
                              ├──► S06.5.2 (Q&A)
                              │
                              └──► S06.5.3 (Pattern Interventions) ──► S06.5.4 (Education)

PHASE 4: ENHANCEMENT (Sprint 3-4)
S06.5.3 + E7 (Wellbeing) ──► S06.6.2 (Emotional Tagging) ──► S06.6.3 (Emotional Eating Reports)
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| Technical Setup | S06.0.1 | 100% |
| F6.1: Meal Logging (Multi-Modal Input) | S06.1.1, S06.1.2, S06.1.3 | 100% |
| F6.2: Calorie & Macro Tracking | S06.2.1, S06.2.2 | 100% |
| F6.3: Hydration Tracking | S06.3.1, S06.3.2 | 100% |
| F6.4: Nutrition Goals & Plans | S06.4.1, S06.4.2, S06.4.3 | 100% |
| F6.5: AI Nutrition Coaching | S06.5.1, S06.5.2, S06.5.3, S06.5.4 | 100% |
| F6.6: Food Database & Emotional Eating | S06.6.1, S06.6.2, S06.6.3 | 100% |

**Completeness Verification:** All 6 features + technical setup mapped to 18 stories with 100% coverage.

---

## Implementation Phases

| Phase | Sprint | Stories | Deliverable |
|-------|--------|---------|-------------|
| 1: Foundation | Sprint 1 | S06.0.1, S06.1.1, S06.1.2 | Food database operational, Photo AI + Barcode scanning functional |
| 2: Core Tracking | Sprint 1-2 | S06.1.3, S06.2.1, S06.2.2, S06.3.1, S06.3.2 | All logging methods, macro dashboard, hydration tracking |
| 3: Intelligence | Sprint 2-3 | S06.4.1-4.3, S06.5.1-5.4 | Goal system, AI meal plans, coaching capabilities |
| 4: Enhancement | Sprint 3-4 | S06.6.1, S06.6.2, S06.6.3 | Custom foods, emotional eating integration |

---

## Cross-Epic Dependencies

| Story | Depends On | Dependency Type | Status |
|-------|------------|-----------------|--------|
| S06.0.1 (Food DB Infra) | E9 | Nutritionix API configuration | Awaiting E9 |
| S06.1.1, S06.2.2 | E5 | Activity level for calorie adjustment | E5 Complete |
| S06.1.3 (Voice/WhatsApp) | E2, E3 | Voice Coaching, WhatsApp integration | E2, E3 Complete |
| S06.5.* (AI Coaching) | E8 | Cross-Domain Intelligence patterns | Awaiting E8 |
| S06.6.2, S06.6.3 (Emotional) | E7 | Wellbeing Pillar mood/stress data | Awaiting E7 |
| All Display Stories | E4 | Mobile App UI components | E4 Complete |

---

## Competitive Advantage Summary

Epic 06 establishes yHealth's Nutrition Pillar with three critical differentiators that no competitor offers:

1. **Multi-Modal Logging (4 methods):** While MyFitnessPal focuses on barcode/manual and newer apps add photo AI, yHealth uniquely combines Photo AI + Barcode + Manual + Voice across all channels (App, WhatsApp, Voice Coaching). This targets the 37% who abandon due to logging friction.

2. **Emotional Eating Integration:** Unlike Noom's psychology focus or standalone apps like Bea, yHealth deeply integrates emotional eating detection with the Wellbeing Pillar (E7). Mood, stress, and journaling data automatically correlate with meal patterns to reveal "When you're stressed, you eat 40% more snacks" insights without manual tagging.

3. **Cross-Pillar Nutrition Intelligence:** Beyond calorie counting, yHealth connects nutrition to fitness performance ("Protein-rich breakfasts correlate with 15% higher workout intensity") and wellbeing ("Low fiber days correlate with poor sleep quality") - insights impossible without the three-pillar architecture.

Combined with <30 second Light mode logging, regional food databases (Pakistani, Middle Eastern cuisines), and non-judgmental AI coaching, yHealth delivers a nutrition experience that is both faster and more holistic than any competitor.

---

# TECHNICAL SETUP

---

## S06.0.1: Food Database & API Integration Infrastructure

### User Story
**As a** yHealth Platform,
**I want to** have a robust food database and API integration foundation,
**So that** all nutrition features can reliably search, retrieve, and store nutritional data from 5M+ foods.

### Story Type
- [ ] Feature | [ ] Enhancement | [x] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**Technical Foundation:**
This story establishes the infrastructure required for all nutrition pillar features to access food data. It integrates Nutritionix API as the primary source while building the framework for custom regional databases and user-contributed foods.

**Three-Tier Database Architecture:**

| Tier | Source | Content | Priority |
|------|--------|---------|----------|
| **Tier 1** | Nutritionix API | 5M+ global foods, branded products, restaurant items | Primary lookup |
| **Tier 2** | yHealth Custom DB | Regional cuisines (Pakistani, Middle Eastern, Indian), local restaurant chains | Secondary lookup |
| **Tier 3** | User Personal DB | Custom foods, homemade recipes, AI-corrected foods | User-specific |

**Nutritionix API Integration:**
- Natural language search endpoint (instant)
- Barcode lookup endpoint (UPC/EAN)
- Branded food search
- Common food search with portion intelligence
- Rate limiting: Implement caching to stay within API limits

**Search Priority Logic:**
1. Check user's personal database (fastest, most relevant)
2. Check yHealth custom database (regional foods)
3. Query Nutritionix API (comprehensive)
4. Return combined results ranked by relevance

**Data Normalization Framework:**
| Data Type | Normalization Rule |
|-----------|-------------------|
| Calories | Standardize to kcal |
| Macros | Protein/Carbs/Fats in grams |
| Serving Sizes | Support grams, cups, pieces, custom units |
| Micronutrients | Optional fields, pass through when available |

**Caching Strategy:**
- Top 1000 common foods cached locally (offline support)
- User's recently logged foods cached (quick access)
- Nutritionix responses cached for 24 hours
- Regional database fully cached on device

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Food ID | UUID | Required | System |
| Food Name | String | Required, max 255 chars | Public |
| Source | Enum | nutritionix/custom/user | System |
| Calories | Integer | Required, 0-10000 | Public |
| Protein/Carbs/Fats | Float | Required, 0-1000g | Public |
| Serving Size | Float + Unit | Required | Public |
| Barcode | String | Optional, UPC/EAN format | Public |
| Photo URL | String | Optional | User-only |

**Behaviors:**
- Search returns results in <1 second
- Barcode lookup returns in <3 seconds
- Offline mode provides cached results
- Failed API calls gracefully fall back to local database
- New user foods automatically added to personal database

### Acceptance Criteria

**AC1: Nutritionix API Integration**
Given the Nutritionix API is configured,
When a food search query is submitted,
Then results are returned from Nutritionix within 1 second.

**AC2: Three-Tier Search Priority**
Given a user searches for "biryani",
When the search executes,
Then results are returned prioritizing: user's saved biryanis → yHealth regional database → Nutritionix API.

**AC3: Barcode Lookup**
Given a user scans a product barcode,
When the barcode is submitted to the API,
Then nutritional data is returned within 3 seconds or "not found" message displayed.

**AC4: Offline Support**
Given the device has no internet connection,
When a user searches for common foods,
Then cached results (top 1000 foods + user's recent foods) are available.

**AC5: Data Normalization**
Given nutritional data arrives from any source,
When the normalization framework processes the data,
Then all calories are in kcal and macros are in grams.

**AC6: API Rate Limiting**
Given the Nutritionix API has rate limits,
When multiple searches are performed,
Then caching prevents unnecessary API calls and rate limits are respected.

### Success Metrics
- Search response time <1 second (95th percentile)
- Barcode lookup <3 seconds (95th percentile)
- API cache hit rate >60% (reducing API costs)
- Zero data normalization errors
- Offline availability for 1000+ common foods

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <1s search, <3s barcode | API keys encrypted | Minimal data stored | N/A (backend) | iOS 14+, Android 10+ |
| 24hr cache expiry | Rate limit protection | User foods private | N/A | All supported devices |

### Dependencies
- **Prerequisite Stories:** None (foundation story)
- **Related Stories:** S06.1.1, S06.1.2, S06.6.1
- **External Dependencies:** E9 (Nutritionix API credentials and configuration)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Nutritionix API timeout | Return cached/local results, log error, retry in background |
| Nutritionix API rate limit exceeded | Queue requests, serve from cache, alert monitoring |
| Invalid barcode format | Show "Invalid barcode" message, suggest manual search |
| Food not found in any database | Prompt user to create custom food entry |
| Nutritionix returns incomplete data | Use available data, mark missing fields as "estimated" |
| Network switch during search | Complete with cached data, sync when connected |
| Duplicate foods in results | Deduplicate by name+brand, prioritize verified sources |

### Open Questions
- What's the Nutritionix API tier/rate limit for yHealth?
- Should we pre-populate regional database before launch or grow organically?
- How long should user search history be retained?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Nutritionix API integrated and tested
- [ ] Three-tier search priority implemented
- [ ] Caching strategy operational
- [ ] Offline mode functional with 1000+ foods
- [ ] Data normalization tested for all sources
- [ ] Performance requirements verified (<1s search)

---

# FEATURE F6.1: MEAL LOGGING (MULTI-MODAL INPUT)

---

## S06.1.1: Photo AI Meal Recognition

### User Story
**As a** Busy Professional (P2),
**I want to** snap a quick photo of my meal and get instant calorie/macro estimates,
**So that** I can track nutrition without disrupting my day or manually searching for foods.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users take a photo of their meal, and AI automatically identifies foods, estimates portions, and calculates nutritional values. This is the "magic" experience - snap and done. The system learns from user corrections to improve accuracy over time.

**Photo AI Capabilities:**
- **Multi-food detection:** Identify multiple items on a plate (e.g., chicken, rice, salad = 3 separate items)
- **Portion estimation:** Use plate/hand as reference for serving size
- **Cuisine recognition:** Support global + regional cuisines (Pakistani, Middle Eastern, Indian, Western)
- **Confidence scoring:** Low (<60%), Medium (60-85%), High (>85%)
- **Learning from corrections:** User feedback improves model accuracy

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Photo → AI estimate auto-accepted → Quick confirmation → Done. ~30 seconds total. No macro details shown unless tapped. One-tap "Looks good!" confirmation. |
| **Deep** | Photo → AI estimate with confidence scores → Manual adjustment UI for each food → Portion size refinement → Detailed macro breakdown → Option to save to personal database. ~3-5 minutes for precision. |

**Processing Pipeline:**
1. User captures/selects photo
2. Photo uploaded to AI service (<2 seconds upload)
3. AI processes image (<10 seconds standard, <15 seconds complex)
4. Results returned with food items, portions, macros
5. User confirms or adjusts
6. Meal logged to database

**Photo Requirements:**
- Supported formats: JPEG, PNG, HEIC (iOS)
- Maximum size: 10MB per photo
- Minimum resolution: 640x480 pixels
- Recommended: Well-lit, top-down or 45-degree angle

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Photo | Image file | Max 10MB, supported format | User-only, encrypted |
| Detected Foods | Array | From AI response | User-only |
| Confidence Score | Float | 0-100% per food | System |
| Portion Estimate | Float + Unit | Per food item | User-only |
| User Corrections | Object | Changes from AI estimate | System (for learning) |
| Final Macros | Object | Calories, P/C/F | User-only |

**Behaviors:**
- Camera opens with meal-optimized settings (auto-focus, good exposure)
- Progress indicator shows during AI processing
- Results display immediately upon completion
- Light mode auto-accepts high confidence (>85%) estimates
- Deep mode always shows adjustment options
- Corrections feed back to improve AI model

### Acceptance Criteria

**AC1: Photo Capture**
Given a user opens meal logging,
When they tap "Photo" option,
Then the camera opens with meal-optimized settings and captures a clear image.

**AC2: AI Processing Time**
Given a user submits a meal photo,
When the AI processes the image,
Then results are returned within 10 seconds for standard photos and 15 seconds for complex multi-food photos.

**AC3: Multi-Food Detection**
Given a photo contains multiple food items (e.g., plate with chicken, rice, vegetables),
When AI analyzes the photo,
Then each food item is identified separately with individual calorie/macro estimates.

**AC4: Confidence Scoring**
Given AI returns food recognition results,
When results are displayed,
Then each food item shows a confidence score (Low/Medium/High) indicating estimation reliability.

**AC5: Light Mode Quick Confirmation**
Given a user is in Light mode and AI returns high-confidence results (>85%),
When results are displayed,
Then user can confirm with one tap ("Looks good!") and meal is logged in <30 seconds total.

**AC6: Deep Mode Adjustment**
Given a user is in Deep mode,
When AI results are displayed,
Then user can tap each food item to adjust portion size, swap for different food, or add missing items.

**AC7: Learning from Corrections**
Given a user corrects an AI estimate (e.g., "That's not rice, it's quinoa"),
When the correction is submitted,
Then the correction is logged for model improvement and the corrected food is saved to user's personal database.

**AC8: Accuracy Target**
Given the Photo AI system is operational,
When measuring across all meal photos,
Then calorie estimates are within ±10-15% of actual values for 85%+ of photos.

### Success Metrics
- Photo AI adoption: 60% of meals logged via photo (primary method)
- Processing time: 95% complete in <10 seconds
- Accuracy: ±10-15% calorie variance
- Correction rate: <20% of AI estimates manually corrected
- Light mode completion: 90% complete log in <45 seconds

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <10s processing | Photos encrypted in transit | Photos auto-delete after 90 days | Alt text for detected foods | iOS 14+, Android 10+ |
| <15s complex photos | AI service authenticated | Option for on-device only | Voice confirmation option | Camera permission required |

### Dependencies
- **Prerequisite Stories:** S06.0.1 (Food Database Infrastructure)
- **Related Stories:** S06.1.2, S06.1.3, S06.2.1
- **External Dependencies:** Photo AI service (Azure/Google Cloud Vision or custom model)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Photo too dark/blurry | Show "Photo unclear. Try better lighting or closer angle?" with retake option |
| AI confidence <40% for all items | Prompt manual entry: "Couldn't recognize this meal. Can you help identify it?" with photo attached |
| Processing timeout (>20 seconds) | Show timeout message, offer manual entry option, log for monitoring |
| Multiple plates in photo | Detect and ask: "Found multiple plates. Which one is your meal?" |
| Packaged food in photo | Suggest: "This looks packaged. Try barcode scanning for exact nutrition?" |
| AI detects non-food items | Filter out non-food detections, only show recognized foods |
| Photo upload fails | Retry automatically, show "Upload failed. Check connection?" after 3 retries |
| User denies camera permission | Show explanation why camera needed, link to settings |

### Open Questions
- Should we offer "Scan receipt" for restaurant meals?
- What's the photo retention policy (90 days default - configurable)?
- Should corrections be shared anonymously to improve global model?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Photo capture optimized for meals
- [ ] AI processing <10 seconds (95th percentile)
- [ ] Multi-food detection working
- [ ] Confidence scoring displayed
- [ ] Light/Deep mode flows functional
- [ ] Correction feedback loop implemented
- [ ] Accuracy validated (±15% target)

---

## S06.1.2: Barcode Scanning & Manual Search

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** scan product barcodes and search for foods manually,
**So that** I can get precise nutritional data for packaged foods and find exactly what I ate.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users can scan barcodes on packaged products for instant nutritional lookup, or search the database manually for any food. Both methods prioritize speed while offering precision for users who want detailed tracking.

**Barcode Scanning:**
- Scan UPC/EAN barcodes via camera
- Instant recognition (<2 seconds)
- Nutritional data retrieval from Nutritionix (<3 seconds total)
- Support for 5M+ packaged products globally
- Offline support for top 1000 common products

**Manual Search Features:**
- **Autocomplete:** Type-ahead suggestions as user types
- **Recent Foods:** Quick access to last 20 logged foods
- **Favorites:** Star foods for instant access
- **Serving Presets:** Small/Medium/Large + custom entry
- **Smart Ranking:** User's foods first, then verified, then community

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Scan/search → Select food → One-tap serving size (S/M/L) → Logged. ~15 seconds. |
| **Deep** | Scan/search → Select food → Custom serving size (grams/cups/pieces) → View full macro breakdown → Adjust if needed → Logged. ~1-2 minutes for precision. |

**Search Database Priority:**
1. User's personal foods (created, corrected, frequently logged)
2. User's favorites (starred foods)
3. yHealth verified regional foods
4. Nutritionix verified foods
5. Nutritionix community-contributed foods

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Food Selected | UUID | From database | User-only |
| Serving Size | Float | Required, 0.1-10000 | User-only |
| Serving Unit | Enum | grams/cups/pieces/custom | User-only |
| Meal Type | Enum | breakfast/lunch/dinner/snack | User-only |
| Timestamp | ISO 8601 | Auto or manual | User-only |

**Behaviors:**
- Barcode scanner auto-focuses on barcode
- Search shows results as user types (debounced 300ms)
- Recently logged foods appear at top of search
- Favorites accessible via star icon
- Serving size remembers last used for each food
- All entries sync across channels (App, WhatsApp, Voice)

### Acceptance Criteria

**AC1: Barcode Scanning Speed**
Given a user points camera at a product barcode,
When the barcode is detected,
Then nutritional data is retrieved and displayed within 3 seconds.

**AC2: Barcode Not Found**
Given a user scans a barcode not in the database,
When lookup returns no results,
Then user is prompted: "Barcode not found. Add this product manually?" with option to create custom entry.

**AC3: Manual Search Autocomplete**
Given a user starts typing in the search field,
When at least 2 characters are entered,
Then autocomplete suggestions appear within 500ms.

**AC4: Search Results Speed**
Given a user submits a search query,
When the search executes,
Then relevant results are displayed within 1 second.

**AC5: Recent Foods Quick Access**
Given a user opens manual search,
When the search field is empty,
Then the last 20 logged foods are displayed for quick selection.

**AC6: Favorites Access**
Given a user has starred favorite foods,
When they tap the favorites icon,
Then all starred foods are displayed for quick selection.

**AC7: Serving Size Presets (Light Mode)**
Given a user selects a food in Light mode,
When choosing serving size,
Then they can tap Small/Medium/Large for quick selection based on standard portions.

**AC8: Custom Serving Size (Deep Mode)**
Given a user selects a food in Deep mode,
When choosing serving size,
Then they can enter precise amounts in grams, cups, pieces, or custom units.

**AC9: Offline Barcode Support**
Given the device has no internet connection,
When a user scans a common product barcode,
Then cached nutritional data (top 1000 products) is available.

### Success Metrics
- Barcode scan success rate: >95% for valid barcodes
- Search results in <1 second: 95th percentile
- Autocomplete suggestions: 100% within 500ms
- Offline barcode availability: 1000+ products
- User engagement: 80% try 2+ logging methods in first 30 days

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <3s barcode lookup | Camera permission required | Search history local only | Voice search option | iOS 14+, Android 10+ |
| <1s search results | API calls authenticated | No tracking of searches | Screen reader support | Camera permission required |

### Dependencies
- **Prerequisite Stories:** S06.0.1 (Food Database Infrastructure)
- **Related Stories:** S06.1.1, S06.1.3, S06.2.1
- **External Dependencies:** Nutritionix API (barcode database)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Barcode damaged/partial | Show "Couldn't read barcode. Try again or search manually?" |
| Multiple barcodes in frame | Focus on centered/largest barcode, ignore others |
| Search returns no results | Show "No results found. Try different spelling or create custom food?" |
| Typo in search query | Show "Did you mean...?" suggestions based on fuzzy matching |
| Very long food name | Truncate with ellipsis, show full name on tap |
| Duplicate results | Deduplicate, prioritize verified over user-submitted |
| API timeout during search | Show cached/local results, indicate "More results loading..." |
| User offline during search | Show only cached/local results, indicate offline status |

### Open Questions
- Should we support scanning nutrition labels (not just barcodes)?
- What's the maximum search history length?
- Should favorites sync across devices?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Barcode scanning <3 seconds
- [ ] Manual search <1 second with autocomplete
- [ ] Recent foods and favorites functional
- [ ] Serving size presets (Light) and custom entry (Deep)
- [ ] Offline support for 1000+ products
- [ ] Cross-channel sync verified

---

## S06.1.3: Voice & WhatsApp Meal Logging

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** log meals via WhatsApp messages or voice commands,
**So that** I can maintain consistent tracking without always opening the app.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users can log meals through natural language - either by sending WhatsApp messages/photos or speaking to the Voice Coaching system. The AI extracts food items, estimates portions, and logs meals seamlessly across all channels.

**WhatsApp Meal Logging:**
- **Text messages:** "I had scrambled eggs and toast for breakfast"
- **Photo messages:** Send meal photo for AI analysis (same as S06.1.1)
- **Voice messages:** Transcribed and processed as text
- **Quick confirmations:** Reply "yes" to confirm AI suggestions

**Voice Coaching Meal Logging:**
- **Conversational input:** "Log my lunch: chicken biryani, one plate"
- **Clarification dialogue:** AI asks follow-ups if details missing
- **Multi-turn conversation:** Handle complex meals with multiple items
- **Context awareness:** Remembers meal context during conversation

**Natural Language Processing:**
| Input Example | AI Extraction |
|---------------|---------------|
| "I had scrambled eggs and toast for breakfast" | Foods: scrambled eggs, toast; Meal: breakfast; Portions: estimated standard |
| "Log my lunch: chicken biryani, one plate" | Foods: chicken biryani; Meal: lunch; Portion: 1 plate (~400g) |
| "Just had a coffee with milk" | Foods: coffee with milk; Meal: snack; Portion: 1 cup |
| "Ate leftover pizza, 2 slices" | Foods: pizza; Portion: 2 slices |

**Clarification Triggers:**
- Portion unclear: "Did you say 'one cup' or 'one plate' of rice?"
- Food ambiguous: "Was that regular coffee or espresso?"
- Meal type missing: "What meal was this - breakfast, lunch, dinner, or snack?"
- Multiple interpretations: "Did you mean chicken biryani or vegetable biryani?"

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Single message → AI extracts → Auto-confirms high confidence → Logged with brief confirmation. |
| **Deep** | Message → AI extracts → Shows detailed breakdown → User confirms/adjusts each item → Full macro summary provided. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Input Text | String | From user message | User-only |
| Input Type | Enum | text/voice/photo | System |
| Channel | Enum | whatsapp/voice_coaching | System |
| Extracted Foods | Array | From NLP | User-only |
| NLP Confidence | Float | 0-100% | System |
| User Confirmations | Object | Changes from extraction | User-only |

**Behaviors:**
- Messages processed within 5 seconds
- High confidence (>85%) auto-confirms in Light mode
- Low confidence (<70%) triggers clarification
- All logs sync to Mobile App immediately
- WhatsApp acknowledges with summary message
- Voice Coaching confirms verbally

### Acceptance Criteria

**AC1: WhatsApp Text Logging**
Given a user sends "I had scrambled eggs and toast for breakfast" via WhatsApp,
When the message is processed,
Then AI extracts foods (scrambled eggs, toast), meal type (breakfast), and logs with estimated portions.

**AC2: WhatsApp Photo Logging**
Given a user sends a meal photo via WhatsApp,
When the photo is processed,
Then AI analyzes it (same as S06.1.1) and responds with detected foods and nutritional summary.

**AC3: WhatsApp Voice Message**
Given a user sends a voice message describing their meal,
When the voice is transcribed and processed,
Then meal is logged as if it were a text message.

**AC4: Voice Coaching Logging**
Given a user says "Log my lunch: chicken biryani, one plate" during a Voice Coaching session,
When the AI processes the input,
Then the meal is logged and AI confirms: "Got it! Logged chicken biryani, one plate for lunch - about 550 calories."

**AC5: Clarification Dialogue**
Given a user input has ambiguous details (e.g., "I had some rice"),
When NLP confidence is below 70%,
Then AI asks clarifying question: "How much rice - one cup, one bowl, or one plate?"

**AC6: NLP Accuracy**
Given various natural language meal descriptions,
When NLP processes the inputs,
Then food items are correctly extracted with 85%+ accuracy.

**AC7: Cross-Channel Sync**
Given a user logs a meal via WhatsApp,
When the log is complete,
Then the meal appears in the Mobile App within 5 minutes with full details.

**AC8: Multi-Item Logging**
Given a user describes multiple foods ("eggs, toast, orange juice, and coffee"),
When the message is processed,
Then all four items are extracted and logged as part of the same meal.

### Success Metrics
- Voice/WhatsApp logging adoption: 30% of users try within first month
- NLP extraction accuracy: 85%+ correct food identification
- Clarification rate: <30% of logs require follow-up questions
- Cross-channel sync: 100% within 5 minutes
- User satisfaction: 4.3/5 for voice/WhatsApp logging

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <5s message processing | WhatsApp E2E encryption | Voice recordings not stored | Native voice input | WhatsApp integration (E3) |
| <5min sync latency | Voice data encrypted | Transcriptions deleted after processing | Multi-language support | Voice Coaching (E2) |

### Dependencies
- **Prerequisite Stories:** S06.0.1, S06.1.1, S06.1.2
- **Related Stories:** S06.2.1
- **External Dependencies:** E2 (Voice Coaching), E3 (WhatsApp Integration)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Voice message too noisy | "I couldn't understand that clearly. Could you try again or type it out?" |
| Unknown food mentioned | "I don't recognize 'makhani'. Is that a type of curry?" with suggestions |
| Very long message | Process first 5-10 food items, ask if there's more |
| Mixed languages | Support English + common regional terms (biryani, daal, etc.) |
| User says "nevermind" or "cancel" | Cancel current logging, confirm cancellation |
| Conflicting information | "You said breakfast but it's 7pm. Did you mean dinner?" |
| WhatsApp rate limiting | Queue messages, process in order, acknowledge receipt |
| Voice coaching disconnection | Save partial log, resume when reconnected |

### Open Questions
- Should we support logging by emoji (e.g., "🍕🍕" = 2 slices pizza)?
- What languages should NLP support beyond English?
- Should WhatsApp support "quick log" buttons (breakfast/lunch/dinner)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] WhatsApp text, photo, voice logging functional
- [ ] Voice Coaching logging functional
- [ ] NLP extraction accuracy validated (85%+)
- [ ] Clarification dialogue working
- [ ] Cross-channel sync <5 minutes
- [ ] Multi-item logging working

---

# FEATURE F6.2: CALORIE & MACRO TRACKING

---

## S06.2.1: Real-Time Calorie & Macro Dashboard

### User Story
**As a** Busy Professional (P2),
**I want to** see a simple visual showing if I'm on track with calories,
**So that** I don't need to analyze numbers constantly throughout the day.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users see real-time tracking of calories and macronutrients against their daily targets. Light mode shows a simple "on track" indicator while Deep mode provides detailed breakdowns. The dashboard updates instantly as meals are logged.

**Dashboard Components:**

**Light Mode:**
- **Progress Ring:** Outer ring showing calories consumed vs. target
- **Color Coding:** Green (on track), Yellow (close to limit), Red (over target)
- **Simple Text:** "1,450 / 2,000 kcal (73%)"
- **Optional Focus Macro:** One additional ring (e.g., protein for muscle gain)

**Deep Mode:**
- **Macro Breakdown:** Stacked bar chart (Protein/Carbs/Fats) showing consumed vs. target
- **Meal Timeline:** Chronological view of all logged meals with macro contribution
- **Pie Chart:** Meal distribution (breakfast/lunch/dinner/snacks)
- **Trend Graphs:** 7/30/90 day rolling averages
- **Traffic Lights:** Red/Yellow/Green indicators for each macro
- **Export Option:** Download data as CSV

**Background Tracking (All Users):**
Even Light mode users have complete tracking in the background:
- Calories, Protein, Carbs, Fats, Fiber, Sugar, Sodium, Cholesterol
- Micronutrients (when available): Vitamins, Minerals
- Meal timing and frequency
- Hydration status (linked to F6.3)

This enables AI insights even for users who don't actively view detailed data.

**Real-Time Updates:**
- Dashboard refreshes within 2 seconds of any meal logged
- Updates propagate from any channel (App, WhatsApp, Voice)
- Offline changes sync and update when connected

**Data Displayed:**
| Metric | Light Mode | Deep Mode |
|--------|------------|-----------|
| Total Calories | Progress ring + number | Ring + timeline + trends |
| Protein | Optional focus ring | Detailed grams + % of target |
| Carbs | Hidden | Detailed grams + % of target |
| Fats | Hidden | Detailed grams + % of target |
| Fiber | Hidden | Available in expanded view |
| Micronutrients | Hidden | Available in expanded view |

**Behaviors:**
- Dashboard is primary screen in Nutrition section
- Tap progress ring to toggle Light/Deep view
- Tap meal in timeline to see detailed breakdown
- Pull-to-refresh updates from server
- Animations smooth and non-distracting

### Acceptance Criteria

**AC1: Real-Time Updates**
Given a user logs a meal via any channel,
When the dashboard is viewed,
Then calorie/macro totals update within 2 seconds.

**AC2: Progress Ring Display (Light Mode)**
Given a user is in Light mode,
When viewing the dashboard,
Then a progress ring shows calories consumed vs. target with color-coded status.

**AC3: Color Coding Logic**
Given calorie progress is displayed,
When consumption is 0-90% of target, status is Green (on track),
When consumption is 90-110% of target, status is Yellow (close),
When consumption is >110% of target, status is Red (over).

**AC4: Macro Breakdown (Deep Mode)**
Given a user is in Deep mode,
When viewing the dashboard,
Then Protein, Carbs, and Fats are shown with grams consumed, grams remaining, and % of daily target.

**AC5: Meal Timeline**
Given a user has logged multiple meals,
When viewing the timeline in Deep mode,
Then meals are shown chronologically with time, name, and macro contribution.

**AC6: Trend Visualization**
Given a user has 7+ days of logging history,
When viewing trends in Deep mode,
Then 7-day and 30-day rolling average graphs are available.

**AC7: Background Tracking**
Given a user is in Light mode,
When AI generates insights,
Then complete nutritional data (including hidden metrics) is available for analysis.

**AC8: Cross-Channel Sync**
Given a user logs via WhatsApp and views dashboard on Mobile App,
When the dashboard loads,
Then all WhatsApp-logged meals appear with full macro data.

### Success Metrics
- Dashboard load time: <2 seconds (95th percentile)
- Real-time update latency: <2 seconds after meal logged
- User engagement: 70% check dashboard at least once daily
- Deep mode adoption: 40% of users explore Deep mode within first week
- Feature satisfaction: 4.6/5 for macro tracking

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s load time | Data encrypted at rest | Personal data only | High contrast mode | iOS 14+, Android 10+ |
| <2s update latency | Session authentication | No sharing without consent | Screen reader labels | All screen sizes |

### Dependencies
- **Prerequisite Stories:** S06.0.1, S06.1.1, S06.1.2
- **Related Stories:** S06.2.2, S06.4.1
- **External Dependencies:** E4 (Mobile App UI components)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No meals logged today | Show empty state: "No meals logged yet. Start tracking!" |
| Missing macro data for a food | Use estimates, show "~" indicator, don't break totals |
| Extremely high calories (>5000) | Display accurately, no judgment, gentle insight later |
| Offline mode | Show cached data with "Last updated: X ago" indicator |
| Target not set | Prompt to set target, show absolute values only |
| Data sync conflict | Use most recent timestamp, log conflict for review |
| Very old historical data | Lazy load, prioritize recent 30 days |

### Open Questions
- Should Light mode show one macro (e.g., protein) or just calories?
- What's the maximum historical data to display in trends?
- Should we show "remaining" calories or "consumed" as primary?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Light mode progress ring functional
- [ ] Deep mode macro breakdown functional
- [ ] Real-time updates <2 seconds
- [ ] Meal timeline functional
- [ ] Trend graphs for 7/30/90 days
- [ ] Background tracking verified
- [ ] Accessibility requirements met

---

## S06.2.2: Personalized Targets & Dynamic Adjustment

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** have personalized calorie/macro targets that adjust based on my activity level,
**So that** my nutrition supports my fitness goals whether it's a rest day or intense training day.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The system calculates personalized daily calorie and macro targets based on user goals, biometrics, and activity level. Targets automatically adjust on high-activity days and recalculate weekly based on progress.

**Target Calculation Inputs:**
1. **User Goals:** Weight loss, maintenance, muscle gain, performance
2. **Biometric Data:** Age, weight, height, gender (from onboarding)
3. **Activity Level:** Sedentary, lightly active, moderately active, very active, athlete
4. **Activity Data:** Daily calories burned from Fitness Pillar (E5)
5. **Progress Data:** Weight trends, adherence patterns

**TDEE (Total Daily Energy Expenditure) Calculation:**
- BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
- Activity multiplier based on activity level
- Dynamic adjustment from wearable/fitness data

**Goal-Based Adjustments:**
| Goal | Calorie Adjustment | Macro Split (P/C/F) |
|------|-------------------|---------------------|
| Weight Loss | -500 kcal deficit | 30% / 40% / 30% |
| Muscle Gain | +300 kcal surplus | 35% / 45% / 20% |
| Maintenance | TDEE | 30% / 40% / 30% |
| Performance | TDEE | 30% / 45% / 25% |
| Body Recomp | -200 kcal deficit | 35% / 35% / 30% |

**Dynamic Adjustments:**
- **High Activity Day:** Increase carb target based on workout intensity (from E5)
- **Rest Day:** Slight calorie reduction if body recomposition goal
- **Missed Meals:** Redistribute remaining macros across remaining meals
- **Weekly Recalculation:** Adjust based on weight trends and adherence

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | System calculates targets automatically. User sees simple "2,100 kcal today" with no manual adjustment needed. |
| **Deep** | User can view calculation breakdown, manually override any target, set custom macro percentages, and see how activity affects daily targets. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Goal Type | Enum | Required | User-only |
| Target Calories | Integer | Calculated or manual | User-only |
| Target Protein % | Float | 0-100%, sum to 100% | User-only |
| Target Carbs % | Float | 0-100%, sum to 100% | User-only |
| Target Fats % | Float | 0-100%, sum to 100% | User-only |
| Activity Adjustment | Integer | From E5 | System |

**Behaviors:**
- Targets calculated during onboarding
- Dashboard shows today's targets (may differ from base)
- Activity data from E5 automatically adjusts targets
- Manual overrides persist until changed
- Weekly summary shows target vs. actual trends

### Acceptance Criteria

**AC1: Initial Target Calculation**
Given a user completes onboarding with goal, biometrics, and activity level,
When targets are calculated,
Then personalized calorie and macro targets are set based on TDEE and goal adjustments.

**AC2: Activity-Based Adjustment**
Given a user has an intense workout day (high strain from E5),
When the system calculates daily targets,
Then calorie target increases by 200-500 kcal and carb target increases proportionally.

**AC3: Rest Day Adjustment**
Given a user has a body recomposition goal and a rest day,
When the system calculates daily targets,
Then calorie target decreases slightly (-100-200 kcal) compared to base.

**AC4: Manual Override (Deep Mode)**
Given a user is in Deep mode,
When they tap to edit targets,
Then they can manually set calorie target and macro percentages (with validation that percentages sum to 100%).

**AC5: Weekly Recalculation**
Given a user has 7+ days of tracking data,
When the weekly recalculation runs,
Then targets adjust based on weight trend and adherence (e.g., if losing faster than target, increase calories slightly).

**AC6: Missing Biometric Data**
Given a user hasn't entered weight or height,
When targets are requested,
Then safe defaults are used (2,000 kcal) and user is prompted to complete profile for personalized targets.

**AC7: Cross-Pillar Integration**
Given activity data is available from Fitness Pillar (E5),
When daily targets are calculated,
Then E5 calorie burn data is factored into the day's targets.

**AC8: Target Display**
Given targets are calculated,
When user views the macro dashboard,
Then today's targets (base + adjustments) are clearly displayed with breakdown available.

### Success Metrics
- Target calculation accuracy: 95%+ use correct TDEE formula
- Dynamic adjustment activation: 80% of high-activity days trigger adjustment
- Manual override usage: <20% (indicates auto-calculation is accurate)
- Weekly adherence: 70% of users meet targets 5+ days/week

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <1s target calculation | Biometric data encrypted | Weight data highly private | Clear target display | iOS 14+, Android 10+ |
| Real-time activity adjustment | No external sharing | No fitness data shared | Numeric accessibility | E5 integration required |

### Dependencies
- **Prerequisite Stories:** S06.0.1, S06.2.1
- **Related Stories:** S06.4.1, S06.5.1
- **External Dependencies:** E5 (Fitness Pillar - activity data for dynamic adjustment)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Macro percentages don't sum to 100% | Validation error: "Percentages must equal 100%. Currently: X%" |
| Extremely low calorie target (<1200) | Warning: "This target is below recommended minimum. Consider consulting a professional." |
| Extremely high calorie target (>5000) | Allow but verify: "This is a high target. Is this correct?" |
| No activity data from E5 | Use base targets without dynamic adjustment, note in UI |
| Rapid weight change detected | Alert user, suggest reviewing targets, don't auto-adjust dramatically |
| User changes goal mid-week | Recalculate immediately, apply new targets from today |
| E5 sync delayed | Use yesterday's activity pattern as estimate |

### Open Questions
- Should we show the math/formula to users in Deep mode?
- How aggressive should weekly recalculation be?
- Should we suggest target changes or auto-apply them?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] TDEE calculation implemented correctly
- [ ] Goal-based adjustments working
- [ ] Dynamic activity adjustment from E5 working
- [ ] Manual override (Deep mode) functional
- [ ] Weekly recalculation logic implemented
- [ ] Validation for edge cases (low calories, etc.)

---

# FEATURE F6.3: HYDRATION TRACKING

---

## S06.3.1: Hydration Logging & Progress Tracking

### User Story
**As a** Busy Professional (P2),
**I want to** quickly log water intake with one tap,
**So that** I can track hydration without interrupting my workflow.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users track daily water intake through quick one-tap logging with preset volumes. Progress visualization shows how close they are to their daily goal. Multiple logging methods support different contexts.

**Quick Logging Methods:**
- **One-Tap Presets:** Small glass (250ml), Large glass (500ml), Bottle (750ml)
- **Custom Entry:** Manual ml/oz input for precise tracking
- **WhatsApp:** "Logged 500ml" or photo of water bottle
- **Voice:** "I drank a bottle of water"

**Beverage Types (Deep Mode):**
| Beverage | Hydration Multiplier | Notes |
|----------|---------------------|-------|
| Water | 1.0x | Default, fully counts |
| Herbal Tea | 1.0x | No caffeine |
| Coffee | 0.7x | Diuretic effect |
| Black Tea | 0.7x | Caffeine content |
| Sports Drink | 1.1x | Electrolyte bonus |
| Other | 1.0x | Custom beverages |

**Daily Goal Calculation:**
- Baseline: 30-35ml per kg body weight
- Activity adjustment: +500-1000ml for high-intensity workouts (from E5)
- Caffeine adjustment: +200ml per cup of coffee/tea logged

**Example:** 70kg user, moderate activity = ~2,500ml (2.5L) base target

**Progress Visualization:**

| Mode | Display |
|------|---------|
| **Light** | Simple progress bar: "1,500 / 2,500 ml (60%)" with color coding |
| **Deep** | Wave animation showing water level rising, hourly distribution chart, beverage breakdown pie chart |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Volume | Integer (ml) | 1-5000ml per entry | User-only |
| Beverage Type | Enum | water/coffee/tea/sports/other | User-only |
| Timestamp | ISO 8601 | Auto-captured | User-only |
| Log Method | Enum | tap/manual/whatsapp/voice | System |

**Behaviors:**
- One-tap logging takes <2 seconds
- Progress updates immediately after logging
- Daily goal resets at midnight (user timezone)
- Historical data available for trend analysis
- Syncs across all channels

### Acceptance Criteria

**AC1: One-Tap Logging Speed**
Given a user taps a preset volume button (250ml/500ml/750ml),
When the tap is registered,
Then the hydration is logged and progress updated within 2 seconds.

**AC2: Progress Bar Display**
Given a user has logged hydration today,
When viewing the hydration tracker,
Then a progress bar shows current intake vs. daily goal with percentage.

**AC3: Daily Goal Calculation**
Given a user has entered their weight,
When the daily goal is calculated,
Then it equals 30-35ml per kg body weight, adjusted for activity level.

**AC4: Custom Volume Entry**
Given a user wants to log a non-preset amount,
When they tap "Custom",
Then they can enter exact ml/oz and log.

**AC5: Beverage Type Selection (Deep Mode)**
Given a user is in Deep mode,
When logging a beverage,
Then they can select beverage type (water, coffee, tea, etc.) with appropriate hydration multiplier applied.

**AC6: WhatsApp Logging**
Given a user sends "Logged 500ml" or "drank a glass of water" via WhatsApp,
When the message is processed,
Then hydration is logged and confirmation sent.

**AC7: Voice Logging**
Given a user says "I drank a bottle of water" during Voice Coaching,
When the AI processes the input,
Then 750ml is logged and confirmed verbally.

**AC8: Cross-Channel Sync**
Given a user logs hydration via WhatsApp,
When viewing the Mobile App,
Then the log appears with full details within 5 minutes.

### Success Metrics
- One-tap logging: 90% complete in <2 seconds
- Daily goal achievement: 70% of users hit target 5+ days/week
- Logging frequency: Average 5+ logs per day
- Multi-channel usage: 40% use 2+ logging methods

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s one-tap logging | Data encrypted | Hydration data private | Large tap targets | iOS 14+, Android 10+ |
| Real-time sync | Session auth | No external sharing | Voice input option | All channels (E2, E3) |

### Dependencies
- **Prerequisite Stories:** S06.0.1
- **Related Stories:** S06.3.2, S06.2.1
- **External Dependencies:** E2 (Voice Coaching), E3 (WhatsApp), E5 (Activity data for goal adjustment)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Unrealistic volume (>2000ml single entry) | Confirm: "Did you mean 2000ml? That's a lot for one drink!" |
| Negative total (too many undos) | Reset to 0, preserve history, show "Hydration reset" |
| Missing weight for goal calculation | Use default 2000ml, prompt to add weight for personalization |
| Midnight timezone edge case | Use user's set timezone, handle DST gracefully |
| Rapid repeated taps | Debounce, log once per 500ms minimum |
| Offline logging | Queue locally, sync when connected |

### Open Questions
- Should we track caffeine separately from hydration?
- Should hydration integrate with meal logging (drink with meal)?
- What's the undo window for accidental logs?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] One-tap presets functional (<2s)
- [ ] Custom entry working
- [ ] Daily goal calculated correctly
- [ ] Progress visualization accurate
- [ ] WhatsApp and Voice logging working
- [ ] Cross-channel sync verified

---

## S06.3.2: Smart Hydration Reminders & Score

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** receive intelligent hydration reminders and see a hydration score,
**So that** I can optimize my water intake timing and understand my hydration quality.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users receive smart reminders that adapt to their activity levels and learn their drinking patterns. Deep mode users see a hydration score that goes beyond volume to measure timing and consistency.

**Smart Reminder Types:**
| Reminder | Trigger | Message Example |
|----------|---------|-----------------|
| Morning | Wake time (from E5 sleep data) | "Good morning! Start your day with water." |
| Pre-Workout | 30 min before scheduled workout | "Hydrate before your workout in 30 minutes." |
| Post-Workout | After workout detected | "Great session! Drink 500ml to recover." |
| Afternoon Slump | Low energy detected (from E7) | "Low energy? You might be dehydrated." |
| Gap Detection | 3+ hours since last log | "It's been a while. Time for water?" |
| Evening Cutoff | 2 hours before sleep time | "Last call for hydration before bed." |

**Reminder Intelligence:**
- Learn user's typical drinking times
- Reduce frequency if user consistently hydrates
- Increase frequency on high-activity days
- Pause during meals (don't interrupt meal logging)
- Respect quiet hours (default: 10pm - 7am)

**Hydration Score (Deep Mode):**
Score calculation (0-100):
| Component | Points | Criteria |
|-----------|--------|----------|
| Daily Goal Achievement | 50 | 100% of goal = 50 pts, proportional below |
| Consistency | 25 | Even distribution throughout day |
| Pre/Post-Workout | 15 | Proper workout hydration timing |
| Morning Hydration | 10 | 500ml before 10am |

**Score Color Coding:**
- 90-100: Excellent (dark blue)
- 70-89: Good (light blue)
- 50-69: Fair (yellow)
- <50: Poor (red)

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Reminder Type | Enum | From trigger | System |
| Reminder Time | ISO 8601 | Calculated | System |
| User Response | Enum | dismissed/logged/snoozed | System |
| Hydration Score | Integer | 0-100, calculated daily | User-only |
| Score Breakdown | Object | Components and points | User-only |

**Behaviors:**
- Reminders respect user notification preferences
- "Do Not Disturb" during quiet hours
- Adaptive timing based on user patterns
- Score updates in real-time with each log
- Weekly score trends available in Deep mode

### Acceptance Criteria

**AC1: Morning Reminder**
Given a user has enabled reminders and wake time is detected,
When the user wakes up,
Then a morning hydration reminder is sent within 30 minutes.

**AC2: Pre-Workout Reminder**
Given a user has a workout scheduled (from E5) in 30 minutes,
When the reminder time is reached,
Then a pre-workout hydration reminder is sent.

**AC3: Gap Detection Reminder**
Given a user hasn't logged hydration for 3+ hours during active hours,
When the gap is detected,
Then a gentle reminder is sent: "It's been a while. Time for water?"

**AC4: Quiet Hours Respect**
Given it's within quiet hours (default 10pm-7am),
When a reminder would normally trigger,
Then the reminder is suppressed until quiet hours end.

**AC5: Reminder Fatigue Prevention**
Given a user has dismissed 5+ reminders in a row,
When the next reminder would trigger,
Then frequency is reduced and user is asked: "Too many reminders? Adjust settings here."

**AC6: Hydration Score Calculation**
Given a user is in Deep mode and has logged hydration today,
When viewing the hydration section,
Then a score (0-100) is displayed with component breakdown.

**AC7: Score Real-Time Update**
Given a user logs hydration,
When the log is complete,
Then the hydration score updates within 2 seconds to reflect the new log.

**AC8: Cross-Pillar Integration**
Given activity data is available from E5 and energy data from E7,
When calculating reminders,
Then workout times and low-energy periods are factored into reminder timing.

### Success Metrics
- Reminder effectiveness: 60% of users log water within 30 min of reminder
- Reminder satisfaction: <10% disable reminders (indicates good timing)
- Score engagement: 50% of Deep mode users view score daily
- Cross-pillar discovery: 80% receive hydration-performance/energy insights within 30 days

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <1s score calculation | Notification auth | Reminder patterns private | Notification accessibility | iOS 14+, Android 10+ |
| Adaptive timing | No external notification | No third-party sharing | Haptic feedback option | E5, E7 integration |

### Dependencies
- **Prerequisite Stories:** S06.3.1
- **Related Stories:** S06.2.1, S06.5.1
- **External Dependencies:** E5 (Fitness - workout times, activity), E7 (Wellbeing - energy levels, sleep)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No workout data from E5 | Skip workout-based reminders, use time-based only |
| User in different timezone | Adjust all reminders to local time |
| System notification permission denied | Show in-app prompts only, guide to enable notifications |
| User hasn't logged in days | Gentle re-engagement: "We miss you! How's your hydration?" |
| Score components missing data | Calculate with available data, note incomplete in breakdown |
| Very irregular schedule | Adapt reminder times weekly based on actual patterns |

### Open Questions
- Should score be visible in Light mode as simplified indicator?
- How many reminders per day maximum?
- Should reminders include motivational messages or be purely informational?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All reminder types implemented
- [ ] Quiet hours respected
- [ ] Adaptive reminder timing working
- [ ] Reminder fatigue prevention active
- [ ] Hydration score calculation accurate
- [ ] Cross-pillar integration with E5/E7 verified

---

# FEATURE F6.4: NUTRITION GOALS & PLANS

---

## S06.4.1: Nutrition Goal Setting & Templates

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** set nutrition goals that align with my fitness and wellbeing objectives,
**So that** all three pillars work together toward my health transformation.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users select from pre-built goal templates or create custom goals that integrate with their fitness and wellbeing objectives. Goals determine daily calorie/macro targets and influence AI coaching recommendations.

**Pre-Built Goal Templates:**

| Template | Calorie Adjustment | Macro Split (P/C/F) | Focus |
|----------|-------------------|---------------------|-------|
| **Weight Loss** | -500 kcal deficit | 30% / 40% / 30% | High satiety (fiber, protein), sustainable pace |
| **Muscle Gain** | +300 kcal surplus | 35% / 45% / 20% | Protein timing, progressive overload support |
| **Performance** | Maintenance | 30% / 45% / 25% | Pre/post-workout nutrition, carb focus |
| **General Health** | Maintenance | 30% / 40% / 30% | Micronutrient diversity, Mediterranean principles |
| **Body Recomposition** | -200 kcal deficit | 35% / 35% / 30% | High protein, strength training alignment |

**Custom Goal Builder (Deep Mode):**
- Manual calorie target input
- Custom macro percentages (with validation: must sum to 100%)
- Micronutrient targets (e.g., 30g fiber, <2300mg sodium)
- Meal timing preferences (e.g., intermittent fasting 16:8)
- Dietary restrictions (allergies, vegetarian, vegan, halal, kosher)
- Cuisine preferences (Mediterranean, Asian, Middle Eastern, etc.)

**Goal Integration:**
- Goals sync with Fitness Pillar (E5) for activity-adjusted targets
- Goals influence AI coaching (E5.5) recommendations
- Goals feed into meal plan generation (S06.4.2)
- Progress tracked against goal criteria

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Select pre-built template → Answer 2-3 simple questions → Goal set. ~1 minute. |
| **Deep** | Review template details → Customize any parameter → Set micronutrient targets → Define meal timing → Full control. ~5-10 minutes. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Goal Type | Enum | From templates or "custom" | User-only |
| Target Calories | Integer | 800-6000 kcal | User-only |
| Protein % | Float | 10-60%, sum to 100% | User-only |
| Carbs % | Float | 10-60%, sum to 100% | User-only |
| Fats % | Float | 10-60%, sum to 100% | User-only |
| Restrictions | Array | Valid restriction types | User-only |
| Start Date | Date | Today or future | User-only |
| Target Duration | String | Optional end date | User-only |

**Behaviors:**
- Goals can be changed anytime
- Previous goals archived for comparison
- Changing goals triggers target recalculation
- Weekly check-ins review goal appropriateness
- AI may suggest goal adjustments based on progress

### Acceptance Criteria

**AC1: Template Selection**
Given a user is setting up nutrition goals,
When they view goal templates,
Then 5 pre-built templates are available with clear descriptions of each.

**AC2: Quick Goal Setup (Light Mode)**
Given a user selects a goal template in Light mode,
When they complete 2-3 simple questions (e.g., current weight, activity level),
Then the goal is set with calculated targets in under 1 minute.

**AC3: Custom Goal Builder (Deep Mode)**
Given a user wants custom goals in Deep mode,
When they access the goal builder,
Then they can set manual calorie targets, custom macro percentages, and dietary restrictions.

**AC4: Macro Validation**
Given a user enters custom macro percentages,
When percentages don't sum to 100%,
Then a validation error is shown: "Percentages must equal 100%. Currently: X%"

**AC5: Dietary Restrictions**
Given a user selects dietary restrictions (e.g., vegetarian, halal),
When the goal is saved,
Then restrictions are applied to meal plan generation and food recommendations.

**AC6: Goal Change**
Given a user has an active goal,
When they change to a different goal,
Then new targets are calculated immediately and old goal is archived.

**AC7: Cross-Pillar Integration**
Given a user sets a "Muscle Gain" goal,
When viewing the Fitness Pillar,
Then workout recommendations align with the nutrition goal (strength training emphasis).

**AC8: Goal Progress Tracking**
Given a user has an active goal,
When viewing the goals section,
Then progress toward goal (e.g., weight trend, adherence rate) is displayed.

### Success Metrics
- Goal setting adoption: 85% of users set a goal within first 7 days
- Template usage: 70% select pre-built template vs. custom
- Goal completion: 65% maintain goal for 30+ days
- Goal satisfaction: 4.5/5 rating for goal setting experience

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <1 minute Light setup | Goal data encrypted | Goals private by default | Clear goal descriptions | iOS 14+, Android 10+ |
| Instant target calculation | No external goal sharing | Optional coach sharing | Large touch targets | E5 integration |

### Dependencies
- **Prerequisite Stories:** S06.2.2
- **Related Stories:** S06.4.2, S06.4.3, S06.5.1
- **External Dependencies:** E5 (Fitness - goal alignment), E8 (Cross-Domain Intelligence - goal recommendations)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Impossible macro combo (e.g., 200g protein on 1200 kcal) | Warning: "This protein target needs ~2200 kcal. Adjust calories or protein?" |
| Conflicting restrictions (e.g., vegan + high protein) | Suggest: "Vegan high-protein can be challenging. Here are plant protein sources." |
| User changes goal frequently | Note pattern, ask: "You've changed goals 3 times this month. Want help finding the right fit?" |
| Goal set but no meals logged | Reminder: "You set a goal but haven't logged meals. Start tracking!" |
| External goal change (e.g., doctor's advice) | Allow manual override with note field |

### Open Questions
- Should we support multiple simultaneous goals (e.g., weight loss + protein target)?
- How long to archive old goals?
- Should goals have recommended durations?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] 5 pre-built templates available
- [ ] Quick setup (Light) in <1 minute
- [ ] Custom goal builder (Deep) functional
- [ ] Macro validation working
- [ ] Dietary restrictions applied
- [ ] Cross-pillar integration verified

---

## S06.4.2: AI Meal Plan Generation

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** receive AI-generated meal plans that hit my macro targets while respecting my food preferences,
**So that** I can achieve my body composition goals efficiently without spending hours planning.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
AI generates personalized 7-day meal plans based on user's goals, preferences, restrictions, and past behavior. Plans include specific meals with recipes, macros, and preparation guidance.

**Meal Plan Generation Inputs:**
1. Nutritional goals (from S06.4.1)
2. Dietary restrictions and preferences
3. Past meal history (learns what user actually eats)
4. Regional food availability (Pakistani, Middle Eastern, Western, etc.)
5. Cooking skill level (quick meals vs. complex recipes)
6. Budget range (optional)
7. Activity schedule (high-carb before workout days)

**Plan Output Structure:**
```
7-Day Meal Plan
├── Day 1 (Monday)
│   ├── Breakfast: [Recipe] - [Calories] - [P/C/F]
│   ├── Lunch: [Recipe] - [Calories] - [P/C/F]
│   ├── Dinner: [Recipe] - [Calories] - [P/C/F]
│   ├── Snack 1: [Item] - [Calories] - [P/C/F]
│   └── Snack 2: [Item] - [Calories] - [P/C/F]
├── Day 2 (Tuesday)
│   └── ...
└── Daily Totals: [Calories] - [P/C/F] vs Targets
```

**Smart Plan Features:**
- **Batch Cooking:** Suggest recipes that prep in bulk
- **Ingredient Reuse:** Minimize shopping list by reusing ingredients
- **Variety Optimization:** Ensure diverse nutrients across week
- **Leftover Planning:** Dinner portions sized for next-day lunch
- **Quick Meal Flags:** Mark 15-minute meals for busy days
- **Regional Cuisines:** Support Pakistani, Middle Eastern, Indian, Western meals

**Generation Performance:**
- Full 7-day plan: <30 seconds
- Single day regeneration: <10 seconds
- Meal swap suggestions: <5 seconds

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Simple meal suggestions (breakfast/lunch/dinner names) without detailed recipes. Focus on "what to eat" not "how to cook." |
| **Deep** | Full recipes with ingredients, quantities, instructions, prep time, cooking instructions, and substitution suggestions. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Plan ID | UUID | Generated | User-only |
| Plan Days | Array | 7 days | User-only |
| Meals per Day | Object | 3-5 meals | User-only |
| Total Macros per Day | Object | Calculated | User-only |
| Generation Parameters | Object | From user preferences | System |

**Behaviors:**
- Plan generated on demand or scheduled weekly
- User can regenerate any single day
- Plans respect all dietary restrictions 100%
- AI learns from which plans user follows vs. skips
- Plans sync across channels (viewable in App, sendable via WhatsApp)

### Acceptance Criteria

**AC1: Generation Speed**
Given a user requests a 7-day meal plan,
When the AI generates the plan,
Then it completes in <30 seconds.

**AC2: Dietary Restrictions Compliance**
Given a user has dietary restrictions (e.g., vegetarian, halal),
When the meal plan is generated,
Then 100% of meals comply with all restrictions.

**AC3: Macro Target Alignment**
Given a user has set calorie/macro targets,
When the meal plan is generated,
Then daily totals are within ±5% of targets for each day.

**AC4: Regional Cuisine Support**
Given a user prefers Pakistani cuisine,
When the meal plan is generated,
Then regional dishes (biryani, daal, roti, etc.) are included appropriately.

**AC5: Quick Meal Options**
Given a user has indicated limited cooking time,
When the meal plan is generated,
Then at least 50% of meals are flagged as "15-minute meals."

**AC6: Single Day Regeneration**
Given a user doesn't like Monday's plan,
When they tap "Regenerate Monday",
Then a new Monday plan is generated in <10 seconds while keeping other days intact.

**AC7: Light Mode Simplicity**
Given a user is in Light mode,
When viewing the meal plan,
Then they see meal names and basic macros without detailed recipes.

**AC8: Deep Mode Detail**
Given a user is in Deep mode,
When viewing a meal in the plan,
Then they see full recipe with ingredients, quantities, instructions, and prep time.

**AC9: Adaptive Learning**
Given a user consistently skips breakfast recipes but follows dinner recipes,
When generating future plans,
Then breakfast suggestions become simpler while dinner variety is maintained.

### Success Metrics
- Plan generation: 70% of goal-setting users generate at least one plan in first month
- Generation speed: 95% complete in <30 seconds
- Restriction compliance: 100% of meals respect restrictions
- Plan adherence: 60% follow meal plan 4+ days per week
- Satisfaction: 4.5/5 rating for AI meal plan quality

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <30s full plan | Plan data encrypted | Plans private by default | Screen reader support | iOS 14+, Android 10+ |
| <10s single day | API auth required | No meal history shared | Clear recipe formatting | Cross-channel viewable |

### Dependencies
- **Prerequisite Stories:** S06.0.1, S06.4.1
- **Related Stories:** S06.4.3, S06.6.1
- **External Dependencies:** E8 (Cross-Domain Intelligence - AI generation engine)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Impossible constraints (vegan + low-carb + <$5/meal) | "These constraints are challenging. Relax budget to $8?" |
| Generation timeout (>30s) | "Complex plan taking longer. Trying simpler approach..." with retry |
| No recipes match restrictions | "Couldn't find meals matching all restrictions. Which can we relax?" |
| User never follows plans | After 2 weeks <20% adherence: "Not using meal plans? We can focus on other features." |
| Activity schedule unavailable (E5) | Generate without workout-day optimization, note limitation |

### Open Questions
- Should we integrate with grocery delivery (Instacart, local options)?
- How detailed should cooking instructions be?
- Should plans include estimated cost per meal?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Generation <30 seconds
- [ ] 100% dietary restriction compliance
- [ ] Macro targets within ±5%
- [ ] Regional cuisine support
- [ ] Single day regeneration working
- [ ] Light/Deep mode differentiation
- [ ] Adaptive learning implemented

---

## S06.4.3: Meal Plan Interaction & Progress Tracking

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** easily log meals from my plan and track weekly progress,
**So that** I can see how well I'm following my nutrition goals without extra effort.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users interact with their meal plans through easy actions - tap to log, swap meals, mark as skipped. Weekly progress reports show adherence and help users understand what's working.

**Plan Interaction Features:**
- **Tap-to-Log:** One tap logs the planned meal with exact macros
- **Swap Meals:** Drag-and-drop to rearrange days or meals
- **Substitute Items:** AI suggests macro-equivalent swaps
- **Regenerate Meal:** Don't like this meal? Generate alternative
- **Skip/Mark Eaten:** Mark meals as skipped or eaten off-plan
- **Freestyle Days:** Mark days as "I'll figure it out" (no plan)

**Weekly Progress Reports:**
| Metric | Display |
|--------|---------|
| Goal Adherence | % of days targets hit |
| Plan Adherence | % of planned meals actually eaten |
| Calorie Variance | Average daily variance from target |
| Macro Consistency | Which macros hit most/least |
| Weight Trend | If weight goal (requires E5 data) |
| Qualitative Score | "How sustainable does this feel?" (1-5) |

**Weekly Check-In Flow:**
1. End of week notification: "Time for your weekly nutrition check-in!"
2. Show key metrics and trends
3. Ask: "How sustainable does this feel?" (1-5 scale)
4. AI provides insight and suggestions
5. Optional: Adjust goals for next week

**Progress Insights:**
- "You hit protein targets 6/7 days this week - great consistency!"
- "Your calorie variance is ±8% - very accurate tracking."
- "You skipped meal plans 3 days. Want simpler suggestions?"
- "Weight down 0.6kg this week, on pace for your goal."

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Meal Status | Enum | planned/logged/skipped/off-plan | User-only |
| Log Timestamp | ISO 8601 | When meal logged | User-only |
| Swap History | Array | Original → new meal | System |
| Weekly Metrics | Object | Calculated weekly | User-only |
| Check-In Response | Integer | 1-5 sustainability score | User-only |

**Behaviors:**
- Planned meals appear in Today's schedule
- Logged meals cross off from plan
- Skipped meals don't count against adherence negatively (acknowledges reality)
- Reports generated every Sunday evening
- AI adjusts future plans based on adherence patterns

### Acceptance Criteria

**AC1: Tap-to-Log**
Given a user views their meal plan for today,
When they tap "Log" on a planned meal,
Then the meal is logged to their food diary with exact macros in <2 seconds.

**AC2: Meal Swap**
Given a user wants to eat Tuesday's dinner on Monday,
When they drag Tuesday's dinner to Monday,
Then the meals swap and daily totals recalculate.

**AC3: Substitute Suggestion**
Given a user doesn't like a planned meal,
When they tap "Substitute",
Then AI suggests 3 alternatives with similar macros in <5 seconds.

**AC4: Skip Meal**
Given a user skips a planned meal,
When they mark it as "Skipped",
Then it's recorded without negative judgment and remaining daily macros adjust.

**AC5: Weekly Report Generation**
Given a user has completed a week of tracking,
When Sunday evening arrives,
Then a weekly progress report is generated and notification sent.

**AC6: Adherence Metrics**
Given a user has followed their plan for a week,
When viewing the weekly report,
Then they see % goal adherence, % plan adherence, and calorie variance.

**AC7: Qualitative Check-In**
Given a user views their weekly report,
When they complete the check-in,
Then they can rate sustainability (1-5) and see personalized insights.

**AC8: AI Recommendations**
Given a user has 2+ weeks of data and low plan adherence (<50%),
When generating insights,
Then AI suggests adjustments: "You skipped meal plans 3 days. Want simpler suggestions?"

### Success Metrics
- Tap-to-log usage: 70% of planned meals logged via tap-to-log
- Plan adherence: 60% follow plan 4+ days per week
- Weekly check-in completion: 80% complete weekly check-in
- Goal achievement: 65% make measurable progress in 90 days

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s tap-to-log | Report data encrypted | Progress private | Clear progress visuals | iOS 14+, Android 10+ |
| <5s substitute | No external sharing | Optional sharing | Accessibility labels | Cross-channel sync |

### Dependencies
- **Prerequisite Stories:** S06.4.1, S06.4.2
- **Related Stories:** S06.2.1, S06.5.1
- **External Dependencies:** E5 (Fitness - weight data for trends)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| User logs different meal than planned | Record as "off-plan", still count toward daily totals |
| All meals skipped for a day | Don't penalize, note in insights, ask if plan needs adjustment |
| Plan not generated but tracking | Show progress without plan adherence metrics |
| Week incomplete (started mid-week) | Partial week report with available data |
| User ignores check-in | Reminder once, then generate report without qualitative data |

### Open Questions
- Should we support exporting meal plans to PDF?
- How should we handle "cheat days" in metrics?
- Should progress be shareable (social features)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Tap-to-log functional
- [ ] Meal swap and substitute working
- [ ] Weekly reports generating
- [ ] Check-in flow complete
- [ ] AI recommendations based on patterns

---

# FEATURE F6.5: AI NUTRITION COACHING

---

## S06.5.1: Real-Time Nutrition Guidance

### User Story
**As a** Busy Professional (P2),
**I want to** receive contextual nutrition guidance throughout the day,
**So that** I can make better food choices without constantly checking my targets.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The AI provides proactive, contextual nutrition prompts at key moments - before meals, after logging, when approaching targets. Guidance is timely, helpful, and never judgmental.

**Contextual Prompt Types:**

| Timing | Example Prompt |
|--------|----------------|
| **Pre-Meal** | "Planning lunch? You have 650 kcal and 35g protein left for the day." |
| **Post-Meal** | "Great choice! That salmon hit your protein target for dinner." |
| **Macro Shortfall** | "You're low on fiber today. Add veggies to your evening snack?" |
| **Macro Excess** | "You've hit your calorie target. Dinner should be light tonight." |
| **Approaching Target** | "Just 15g protein to go! Greek yogurt or chicken would do it." |
| **Achievement** | "You hit your protein target 5 days this week. Nice consistency!" |

**Meal Optimization Suggestions:**
- "Your usual breakfast has 45g carbs. Want a lower-carb option for better energy?"
- "You're eating late (9pm). Earlier dinners improve your sleep quality." (Cross-pillar)
- "No protein logged yet today. Start with eggs or Greek yogurt?"
- "Post-workout window! High-protein snack would help recovery." (Cross-pillar)

**Guidance Delivery Channels:**
- **Mobile App:** In-app cards and contextual tips on dashboard
- **WhatsApp:** Proactive messages at key times
- **Voice Coaching:** Verbal guidance during sessions
- **Push Notifications:** Important prompts (configurable)

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Brief daily nudges (1-2 per day). Simple suggestions. No detailed explanations. |
| **Deep** | Detailed guidance with explanations. Multiple prompts daily. Full macro context provided. |

**AI Tone:**
- Non-judgmental: Never shame for "bad" choices
- Encouraging: Celebrate progress, no matter how small
- Practical: Specific, actionable suggestions
- Adaptive: Learn user's preference for formal vs. casual

**Data Used for Guidance:**
| Source | How Used |
|--------|----------|
| Today's logged meals | Calculate remaining macros |
| Goals (S06.4.1) | Target comparison |
| Time of day | Meal timing appropriateness |
| Fitness data (E5) | Post-workout recommendations |
| Historical patterns | Personalized suggestions |

### Acceptance Criteria

**AC1: Pre-Meal Guidance**
Given it's approaching a typical meal time and user hasn't logged that meal,
When the guidance engine evaluates context,
Then a pre-meal prompt is delivered: "Planning lunch? You have X kcal and Yg protein left."

**AC2: Post-Meal Acknowledgment**
Given a user logs a meal that contributes significantly to their targets,
When the log is complete,
Then positive acknowledgment is shown: "Great choice! That [food] helped with your [macro] goal."

**AC3: Macro Shortfall Alert**
Given a user is significantly behind on a macro with few meals remaining,
When the guidance engine evaluates end-of-day proximity,
Then a suggestion is made: "You're low on [macro] today. Try [specific food suggestion]?"

**AC4: Over-Target Warning**
Given a user has exceeded their calorie target,
When the next meal timing approaches,
Then gentle guidance is provided: "You've hit your calorie target. Light dinner tonight?"

**AC5: Multi-Channel Delivery**
Given guidance is generated,
When determining delivery channel,
Then it's sent via the user's preferred channel (App/WhatsApp) respecting notification preferences.

**AC6: Non-Judgmental Tone**
Given a user logs a high-calorie meal,
When post-meal guidance is generated,
Then the tone is supportive, not shaming: "Big meal! Tomorrow's a fresh start."

**AC7: Cross-Pillar Integration**
Given workout data is available from E5,
When the user completes a workout,
Then nutrition guidance references it: "Great workout! Time for protein to help recovery."

**AC8: Light Mode Frequency**
Given a user is in Light mode,
When guidance is generated,
Then maximum 2 prompts per day are delivered.

### Success Metrics
- Guidance engagement: 70% of users interact with guidance weekly
- Suggestion action rate: 40% act on recommendation within 2 hours
- User satisfaction: 4.5/5 for guidance helpfulness
- Macro adherence improvement: 15% better target achievement with guidance

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s guidance generation | Session auth | Guidance private | Screen reader support | iOS 14+, Android 10+ |
| Respect notification prefs | No external sharing | No tracking sold | Clear, simple language | Multi-channel (E2, E3, E4) |

### Dependencies
- **Prerequisite Stories:** S06.2.1, S06.2.2, S06.4.1
- **Related Stories:** S06.5.2, S06.5.3
- **External Dependencies:** E5 (Fitness - workout data), E4 (Mobile App), E3 (WhatsApp), E2 (Voice)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| No meals logged all day | Gentle prompt, not aggressive: "Haven't logged today. Need help getting started?" |
| User disables all notifications | In-app only guidance, respect preferences |
| Conflicting guidance (yesterday vs today) | Clarify context: "Yesterday I suggested X, but today's a rest day so Y." |
| User in different timezone | Use local time for meal timing guidance |
| Extreme deviation (200% calories) | Supportive, not alarming: "Big day! No judgment - life happens." |

### Open Questions
- Should guidance include specific food brand suggestions?
- How to handle guidance during travel/vacation?
- Should we offer "guidance-free" days?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All prompt types implemented
- [ ] Multi-channel delivery working
- [ ] Light/Deep mode frequency respected
- [ ] Non-judgmental tone verified
- [ ] Cross-pillar integration with E5

---

## S06.5.2: Nutrition Q&A & Personalized Answers

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** ask specific nutrition questions and get personalized answers based on my data,
**So that** I can optimize my performance and understand how food choices affect me specifically.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users ask nutrition questions in natural language and receive personalized answers that reference their own data, history, and goals. The AI combines general nutrition science with individual insights.

**Question Categories:**
| Category | Example Questions |
|----------|-------------------|
| **Macro Timing** | "Should I eat carbs before or after my run?" |
| **Food Swaps** | "What's a healthier alternative to white rice?" |
| **Portion Control** | "How much protein should I eat per meal?" |
| **Nutrient Benefits** | "Why is fiber important?" |
| **Meal Prep** | "How can I prep meals for the week?" |
| **Dining Out** | "What should I order at a steakhouse?" |
| **Supplements** | "Do I need protein powder?" |
| **Personalized** | "Why am I tired after lunch?" |

**Response Personalization:**
- Reference user's own data when relevant
- Acknowledge user's goals and restrictions
- Provide specific recommendations based on patterns
- Compare to user's historical behavior

**Example Q&A:**

**User:** "Should I eat carbs before my run?"
**AI:** "Based on your data: Your 5k runs are 12% faster when you eat 30-50g carbs 1-2 hours before. Try a banana or oatmeal. Your usual pre-run breakfast (toast with peanut butter) has worked well!"

**User:** "Is honey better than sugar?"
**AI:** "For your weight loss goal, both are similar in calories (~60 kcal/tbsp). Honey has trace nutrients but same blood sugar impact. Given you're tracking carbs closely, use either sparingly."

**Response Quality:**
- Include evidence from user's data when available
- Cite general nutrition principles when giving advice
- Clarify personalized vs. general guidance
- Avoid medical claims (defer to doctor)

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Brief answers (2-3 sentences). Simple recommendations. No detailed explanations. |
| **Deep** | Detailed answers with explanations. Data citations. Links to resources. Follow-up suggestions. |

**Channels:**
- Mobile App: In-app chat interface
- WhatsApp: Text-based Q&A
- Voice Coaching: Conversational Q&A with follow-ups

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Question | String | User input | User-only |
| Answer | String | AI generated | User-only |
| User Feedback | Enum | thumbs_up/thumbs_down | System |
| Data Referenced | Array | Which user data used | System |
| Response Time | Integer | ms | System |

### Acceptance Criteria

**AC1: Response Speed**
Given a user asks a nutrition question,
When the AI processes the question,
Then a response is returned within 3 seconds.

**AC2: Personalized Response**
Given a user asks "Should I eat carbs before my workout?",
When the AI generates a response,
Then it references the user's workout data and eating patterns if available.

**AC3: General Nutrition Question**
Given a user asks "Is honey healthier than sugar?",
When the AI generates a response,
Then it provides accurate nutrition science information.

**AC4: Goal-Aware Answers**
Given a user has a weight loss goal and asks about food choices,
When the AI generates a response,
Then recommendations consider the user's calorie deficit goal.

**AC5: Feedback Collection**
Given a user receives an AI answer,
When viewing the response,
Then they can provide thumbs up/down feedback.

**AC6: Medical Boundary**
Given a user asks a medical question (e.g., "Should I take metformin?"),
When the AI evaluates the question,
Then it politely declines: "I can't give medical advice. Please consult your doctor."

**AC7: Multi-Channel Support**
Given a user asks a question via WhatsApp,
When the AI processes it,
Then the response is delivered via WhatsApp within 3 seconds.

**AC8: Uncertainty Acknowledgment**
Given a question where the AI is uncertain,
When generating the response,
Then it acknowledges uncertainty: "I'm not certain about that. Want me to find resources?"

### Success Metrics
- Question response accuracy: 90% rated helpful (thumbs up)
- Response time: 95% within 3 seconds
- Question volume: Average 3+ questions per user per week
- Personalization rate: 60% of answers reference user data

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <3s response time | Session auth | Questions private | Screen reader support | iOS 14+, Android 10+ |
| Context-aware | No query logging for ads | User data stays private | Voice input option | Multi-channel |

### Dependencies
- **Prerequisite Stories:** S06.2.1, S06.4.1, S06.5.1
- **Related Stories:** S06.5.3, S06.5.4
- **External Dependencies:** E8 (Cross-Domain Intelligence - AI engine)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Question unrelated to nutrition | "That's outside my nutrition expertise. Can I help with food or diet questions?" |
| Dangerous diet question (e.g., extreme fasting) | Provide cautious answer, recommend consulting professional |
| Follow-up question | Maintain context from previous Q&A in conversation |
| Very complex question | Break into parts, answer sequentially |
| AI doesn't understand question | "I'm not sure I understand. Could you rephrase that?" |
| User data unavailable for personalization | Provide general answer, note "I'll personalize better as you track more." |

### Open Questions
- Should we save Q&A history for user reference?
- How to handle contradictory nutrition science debates?
- Should we provide source citations for claims?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Response time <3 seconds
- [ ] Personalization using user data
- [ ] Medical boundary enforced
- [ ] Feedback collection working
- [ ] Multi-channel support verified

---

## S06.5.3: Proactive Pattern Interventions

### User Story
**As a** Habit Formation Seeker (P4),
**I want to** receive proactive interventions when the AI detects concerning patterns,
**So that** I can address nutrition issues before they become problems.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
The AI analyzes nutrition patterns over time and proactively intervenes when it detects concerning trends. Interventions are supportive, not alarming, and offer actionable suggestions.

**Pattern Detection Types:**

| Pattern | Detection Method | Intervention |
|---------|------------------|--------------|
| **Meal Skipping** | 3+ days of skipped breakfast/lunch | "You've skipped breakfast 3 days this week. Low energy connected?" |
| **Late-Night Eating** | Regular eating after 9pm | "Late dinners may affect sleep. Want meal timing tips?" |
| **Protein Consistently Low** | <80% target for 5+ days | "Protein intake low this week. Here's why it matters for [goal]..." |
| **Calorie Variance** | ±30% daily swing | "Your calories swing wildly day-to-day. Let's stabilize." |
| **Weekend Overeating** | Sat/Sun 150%+ of weekday average | "Weekends are tough! Here's a strategy that works..." |
| **Dehydration Pattern** | <50% hydration goal 3+ days | "You've been under-hydrated. Energy feeling low?" |

**Intervention Timing:**
- Evening check-in for daily patterns
- Weekly summary for weekly patterns
- Real-time for urgent patterns (e.g., several days no logging)

**Intervention Tone:**
- **Non-Judgmental:** No shaming or guilt
- **Curious:** Ask questions, don't assume
- **Helpful:** Offer specific solutions
- **Encouraging:** Acknowledge difficulty, support progress

**Behavioral Nudges:**
| Type | Example |
|------|---------|
| **Streaks** | "7-day meal logging streak! You're building a powerful habit." |
| **Milestones** | "You've logged 100 meals! Your AI coach knows your preferences well now." |
| **Recovery** | "Tough week. Remember, one bad day doesn't erase progress." |
| **Progress** | "Your average protein intake increased 15% this month. Great focus!" |

**Data Used:**
| Source | Pattern Detection |
|--------|-------------------|
| Meal logs | Timing, frequency, content |
| Macro history | Consistency, variance, trends |
| Goal progress | Adherence, improvement |
| Cross-pillar (E5, E7) | Workout correlation, mood correlation |

### Acceptance Criteria

**AC1: Meal Skipping Detection**
Given a user has skipped breakfast 3+ days in the past week,
When the pattern detection runs,
Then an intervention is triggered: "You've skipped breakfast 3 days this week. Everything okay?"

**AC2: Calorie Variance Detection**
Given a user's daily calories vary by >30% for 5+ days,
When the pattern detection runs,
Then an intervention is triggered: "Your calories swing wildly. Want help stabilizing?"

**AC3: Intervention Timing**
Given a pattern is detected,
When determining delivery time,
Then interventions are sent at appropriate times (evening for daily, Sunday for weekly).

**AC4: Non-Judgmental Tone**
Given an intervention for overeating is triggered,
When the message is generated,
Then the tone is supportive: "Big meals this week! No judgment - want to talk about what's going on?"

**AC5: Actionable Suggestions**
Given an intervention is sent,
When the user views it,
Then it includes a specific, actionable suggestion (not just identification of problem).

**AC6: Cross-Pillar Pattern Detection**
Given fitness data shows workouts at 6am and nutrition shows no breakfast,
When the pattern detection analyzes,
Then it identifies: "You work out at 6am but skip breakfast. Pre-workout nutrition could boost performance."

**AC7: Streak Recognition**
Given a user has logged meals for 7 consecutive days,
When the milestone is reached,
Then a celebration nudge is sent: "7-day streak! You're building a powerful habit."

**AC8: Intervention Effectiveness Tracking**
Given an intervention is sent,
When measuring effectiveness,
Then the system tracks if user behavior improves within 7 days.

### Success Metrics
- Pattern detection accuracy: 85%+ interventions are relevant (not false positives)
- Intervention effectiveness: 70% of users show improvement within 7 days
- User response: <10% mark interventions as "not helpful"
- Engagement: 80% of users interact with at least one intervention per month

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Daily pattern analysis | Pattern data encrypted | No sharing of patterns | Clear intervention text | iOS 14+, Android 10+ |
| <5s intervention generation | Session auth | User controls intervention freq | Voice delivery option | Multi-channel |

### Dependencies
- **Prerequisite Stories:** S06.2.1, S06.5.1
- **Related Stories:** S06.5.4, S06.6.2
- **External Dependencies:** E5 (Fitness), E7 (Wellbeing), E8 (Cross-Domain Intelligence)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| User is traveling (unusual patterns) | Reduce intervention sensitivity, acknowledge context |
| User dismisses multiple interventions | Reduce frequency, ask: "Too many messages?" |
| Pattern is actually intentional (e.g., intermittent fasting) | Learn from user feedback, don't repeat same intervention |
| Conflicting patterns | Prioritize most impactful intervention |
| New user (<7 days data) | Don't send pattern interventions until enough data |
| Concerning pattern (eating disorder signs) | Very gentle approach with resources (see S06.6.3) |

### Open Questions
- How many interventions per week maximum?
- Should interventions be dismissable permanently?
- Should we A/B test intervention messaging?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] All pattern types detecting correctly
- [ ] Intervention timing appropriate
- [ ] Tone verified as non-judgmental
- [ ] Actionable suggestions included
- [ ] Cross-pillar patterns working
- [ ] Effectiveness tracking operational

---

## S06.5.4: Educational Content Delivery

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** receive nutrition education that builds my knowledge over time,
**So that** I can make better food choices independently.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users receive progressive nutrition education through micro-lessons and deep-dive sessions. Content is personalized to their goals and delivered at appropriate times.

**Micro-Lessons (Light Mode):**
- Daily nutrition tip (150 characters max)
- Delivered via WhatsApp or push notification
- Examples:
  - "Tip: Protein helps you feel full longer. Aim for 20-30g per meal."
  - "Tip: Eating slowly helps you recognize when you're full."
  - "Tip: Pre-logging your meals helps you stay on track."

**Deep-Dive Sessions (Deep Mode):**
- Voice coaching mini-lessons (3-5 minutes)
- In-app articles with interactive elements
- Topics requested by user or suggested by AI

**Content Topics:**
| Level | Topics |
|-------|--------|
| **Beginner (Week 1-2)** | Macros 101, Why calories matter, Getting started with tracking |
| **Intermediate (Week 2-4)** | Meal timing, Food quality vs. quantity, Hydration importance |
| **Advanced (Month 2+)** | Nutrient timing, Carb cycling, Supplements basics |

**Topic Examples:**
- "Macros 101: What They Are and Why They Matter"
- "Pre-Workout Nutrition: Timing and Composition"
- "Reading Nutrition Labels: What to Look For"
- "Meal Prep Mastery: Save Time and Stay on Track"
- "Dining Out Smart: Restaurant Strategies"
- "Emotional Eating: Understanding Your Triggers" (links to S06.6.2)

**Progressive Education:**
- Content difficulty increases over time
- Unlocked based on tracking experience
- Personalized to user's goal (muscle gain → protein-focused content)
- Re-surfaces relevant content when patterns suggest need

**Content Delivery:**
| Channel | Format |
|---------|--------|
| WhatsApp | Daily tips (text), occasional voice messages |
| Mobile App | In-app articles, interactive quizzes |
| Voice Coaching | Audio lessons, Q&A follow-up |
| Push Notifications | Tip highlights, new content alerts |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Content ID | UUID | From content library | System |
| Delivery Time | ISO 8601 | When delivered | System |
| Engagement | Enum | viewed/completed/skipped | System |
| User Feedback | Integer | 1-5 rating | System |
| Progress Level | Enum | beginner/intermediate/advanced | User-only |

### Acceptance Criteria

**AC1: Daily Micro-Lesson Delivery**
Given a user has enabled daily tips,
When a new day begins,
Then a nutrition micro-lesson is delivered via preferred channel.

**AC2: Progressive Difficulty**
Given a user has been tracking for 3+ weeks,
When content is selected,
Then intermediate-level content is prioritized over beginner content.

**AC3: Goal-Personalized Content**
Given a user has a "Muscle Gain" goal,
When content is selected,
Then protein-focused and workout nutrition content is prioritized.

**AC4: Deep-Dive Availability**
Given a user requests to learn more about a topic,
When they tap "Learn More",
Then a 3-5 minute deep-dive article or voice lesson is available.

**AC5: Voice Coaching Lessons**
Given a user is in a Voice Coaching session,
When they ask to learn about a nutrition topic,
Then the AI delivers a 3-5 minute audio lesson with option for Q&A.

**AC6: Content Engagement Tracking**
Given a user views educational content,
When the content is completed,
Then engagement is recorded (viewed, completed time, feedback if given).

**AC7: Re-Surfacing Relevant Content**
Given a user shows a pattern (e.g., low protein intake),
When content recommendation runs,
Then related educational content is suggested: "Want to learn more about protein timing?"

**AC8: User-Requested Topics**
Given a user asks "Teach me about meal prep",
When the request is processed,
Then relevant content is surfaced immediately.

### Success Metrics
- Micro-lesson engagement: 60% read/view within 24 hours
- Deep-dive completion: 40% complete full article/lesson
- Content satisfaction: 4.3/5 average rating
- Knowledge application: 30% show behavior change after related content

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s content load | Content delivery auth | Learning progress private | Screen reader support | iOS 14+, Android 10+ |
| Audio streaming quality | No ads in content | No third-party tracking | Audio transcripts | Multi-channel |

### Dependencies
- **Prerequisite Stories:** S06.5.1, S06.5.3
- **Related Stories:** S06.6.2
- **External Dependencies:** E2 (Voice Coaching), E3 (WhatsApp), E4 (Mobile App)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| User has seen all content at their level | Advance to next level or show "You've completed this level!" |
| User skips multiple lessons | Reduce frequency, ask if they want to pause |
| Content outdated (nutrition science changes) | Flag for review, prioritize recent content |
| Voice lesson interrupted | Save progress, allow resume |
| User explicitly declines all education | Respect preference, allow re-enabling later |

### Open Questions
- Should content be available offline?
- How often to refresh content library?
- Should we include video content?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Micro-lessons delivering daily
- [ ] Progressive difficulty implemented
- [ ] Goal-personalized content working
- [ ] Voice coaching lessons functional
- [ ] Engagement tracking operational
- [ ] Content re-surfacing logic working

---

# FEATURE F6.6: FOOD DATABASE & EMOTIONAL EATING

---

## S06.6.1: Custom Food & Recipe Builder

### User Story
**As an** Optimization Enthusiast (P3),
**I want to** create custom recipes with precise macro calculations,
**So that** I can track my homemade meal prep accurately.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users create custom foods and recipes that save to their personal database for quick future logging. The recipe builder calculates per-serving macros automatically from ingredients.

**Custom Food Entry (Simple):**
| Field | Required | Description |
|-------|----------|-------------|
| Food Name | Yes | Name for the custom food |
| Serving Size | Yes | Amount per serving (grams, cups, pieces) |
| Calories | Yes | Calories per serving |
| Protein | Yes | Grams per serving |
| Carbs | Yes | Grams per serving |
| Fats | Yes | Grams per serving |
| Fiber | No | Grams per serving |
| Sugar | No | Grams per serving |
| Sodium | No | mg per serving |
| Photo | No | Reference image |

**Recipe Builder (Complex):**

| Step | Action |
|------|--------|
| 1 | Enter recipe name + servings (e.g., "Protein Pancakes - serves 3") |
| 2 | Add ingredients by searching database or entering custom |
| 3 | Specify quantity for each ingredient |
| 4 | System auto-calculates total nutrition |
| 5 | System divides by servings for per-serving macros |
| 6 | Add cooking instructions (optional) |
| 7 | Upload photo (optional) |
| 8 | Add tags (meal type, cuisine, dietary flags) |
| 9 | Save to personal database |

**Example Recipe Flow:**
```
Recipe: Homemade Protein Pancakes (serves 3)
Ingredients:
- 100g oats (search → 389 kcal, 13g P, 66g C, 7g F)
- 2 eggs (search → 156 kcal, 12g P, 1g C, 11g F)
- 30g protein powder (search → 120 kcal, 24g P, 3g C, 1g F)
- 200ml almond milk (search → 30 kcal, 1g P, 1g C, 3g F)

Total: 695 kcal, 50g P, 71g C, 22g F
Per Serving (÷3): 232 kcal, 17g P, 24g C, 7g F
```

**Auto-Save from Corrections:**
When user corrects a Photo AI estimate, the corrected food is automatically offered to save to personal database.

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Simple custom food entry (name + macros). Quick save. No recipe building. |
| **Deep** | Full recipe builder with ingredients, instructions, photos, tags. Export recipes. |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Food/Recipe ID | UUID | Generated | User-only |
| Name | String | Required, max 100 chars | User-only |
| Type | Enum | custom_food / recipe | User-only |
| Ingredients | Array | For recipes only | User-only |
| Nutrition | Object | Calculated or manual | User-only |
| Tags | Array | Optional | User-only |
| Is Public | Boolean | Default false | User-controlled |

**Behaviors:**
- Created foods appear in search results (prioritized)
- Recipes can be logged as single item or per-ingredient
- Duplicate detection warns if similar food exists
- Edit history preserved for corrections

### Acceptance Criteria

**AC1: Custom Food Entry**
Given a user wants to add a custom food,
When they enter name, serving size, and macros,
Then the food is saved to their personal database and searchable.

**AC2: Recipe Builder**
Given a user creates a recipe with multiple ingredients,
When they specify quantities and servings,
Then total and per-serving macros are automatically calculated.

**AC3: Ingredient Search**
Given a user is adding ingredients to a recipe,
When they search for an ingredient,
Then they can select from the full food database (Nutritionix + custom).

**AC4: Recipe Serving Calculation**
Given a recipe has 4 servings and total calories of 1200,
When the user views per-serving nutrition,
Then it shows 300 kcal per serving.

**AC5: Auto-Save from Correction**
Given a user corrects a Photo AI estimate,
When the correction is saved,
Then user is prompted: "Save 'Homemade Biryani' to your foods for quick access?"

**AC6: Recipe Quick-Log**
Given a user has saved a recipe,
When they want to log it,
Then they can log 1 serving with one tap, auto-filling all macros.

**AC7: Macro Validation**
Given a user enters macros manually,
When calories don't match macro math (P*4 + C*4 + F*9 ≈ calories),
Then a warning is shown: "Macros don't match calories. Check your entries?"

**AC8: Search Priority**
Given a user has custom foods and searches,
When results are displayed,
Then custom foods appear first, followed by database foods.

### Success Metrics
- Custom food creation: 40% of users create 5+ custom foods in first 3 months
- Recipe builder usage: 30% of Deep mode users create 3+ recipes
- Auto-save acceptance: 60% accept prompt to save corrected foods
- Search efficiency: Custom foods selected 70% of time when available

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <1s save time | Custom foods encrypted | Default private | Form accessibility | iOS 14+, Android 10+ |
| <2s recipe calculation | No sharing without consent | User controls publicity | Voice input option | Cross-device sync |

### Dependencies
- **Prerequisite Stories:** S06.0.1
- **Related Stories:** S06.1.1, S06.4.2
- **External Dependencies:** None (uses existing food database infrastructure)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Recipe macro total = 0 (all ingredients have no data) | Warning: "Couldn't calculate macros. Add ingredients with nutritional data." |
| Duplicate food name | Warning: "You already have 'Chicken Curry'. Update existing or create new?" |
| Very long ingredient list (>20 items) | Allow, but suggest simplifying for tracking ease |
| User deletes ingredient mid-recipe | Recalculate totals immediately |
| Recipe serving size = 0 | Validation error: "Servings must be at least 1" |
| Ingredient not found | Option to add as custom food inline |

### Open Questions
- Should we support importing recipes from URLs?
- Should recipes be shareable (community features)?
- How to handle recipe versioning (user updates recipe)?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Custom food entry functional
- [ ] Recipe builder with auto-calculation
- [ ] Auto-save from corrections working
- [ ] Search priority implemented
- [ ] Macro validation working

---

## S06.6.2: Emotional Eating Detection & Tagging

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** understand when I eat emotionally vs. physically hungry,
**So that** I can build a healthier relationship with food.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users can optionally tag their emotional state when logging meals. The system also automatically correlates meals with mood/stress data from the Wellbeing Pillar (E7) to detect emotional eating patterns without manual tagging.

**Manual Emotional Tagging (Optional):**
| Emotion | Emoji | Description |
|---------|-------|-------------|
| Stressed | 😰 | Feeling pressured or anxious |
| Sad | 😢 | Feeling down or low |
| Anxious | 😟 | Worried or nervous |
| Bored | 😐 | Eating out of boredom |
| Happy | 😊 | Positive mood |
| Neutral | 😶 | No particular emotion |
| Celebratory | 🎉 | Special occasion eating |

**Automatic Correlation (E7 Integration):**
The system cross-references meal logs with:
- Mood check-ins from Wellbeing Pillar
- Journal entries mentioning food/eating
- Stress level ratings
- Energy levels before/after meals
- Time of day and context patterns

**Pattern Detection:**
| Pattern Type | Detection Method | Minimum Data |
|--------------|------------------|--------------|
| **Stress Eating** | High-calorie snacks within 2 hours of "stressed" mood | 3+ instances |
| **Emotional Triggers** | Specific emotions correlate with specific food types | 5+ instances |
| **Boredom Eating** | Frequent snacking during low-engagement periods | 7+ instances |
| **Celebration Excess** | Large meals after positive events | 3+ instances |
| **Anxiety Skipping** | Missed meals correlate with anxiety ratings | 3+ instances |

**Real-Time Intervention (When Pattern Detected):**
- AI detects user logged "stressed" mood
- Proactive message: "Stressful day? Before reaching for a snack, let's check in. Are you physically hungry or seeking comfort?"
- Coping suggestions offered (see below)

**Coping Strategy Suggestions:**
| Strategy | Example |
|----------|---------|
| **Alternative Activity** | "Try a 5-min walk or breathing exercise before eating." |
| **Mindful Eating Prompt** | "If you do eat, savor it slowly. No judgment - just awareness." |
| **Healthier Substitution** | "Craving sweets? Try Greek yogurt with honey - satisfies with protein." |
| **Journaling Prompt** | "What's triggering this? Writing it down might help." |

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | Automatic detection only (no manual tagging required). Occasional insights surfaced. |
| **Deep** | Manual tagging option on every meal. Detailed correlation analysis. Proactive interventions. Weekly emotional eating summary. |

**Privacy & Sensitivity:**
- Emotional data encrypted separately (highest protection)
- Non-judgmental language always
- User can disable emotional eating tracking entirely
- No external sharing under any circumstances

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Emotional Tag | Enum | Optional, from list | Highly sensitive |
| Auto-Detected Correlation | Object | From E7 data | System |
| Intervention Sent | Boolean | Trigger timestamp | System |
| Intervention Response | Enum | accepted/dismissed/acted | System |

### Acceptance Criteria

**AC1: Manual Emotional Tagging**
Given a user is logging a meal in Deep mode,
When they complete the meal entry,
Then they can optionally tag their emotional state from the emoji list.

**AC2: Automatic E7 Correlation**
Given a user logs a high-calorie snack within 2 hours of logging "stressed" mood in E7,
When the correlation engine runs,
Then the meal is flagged as potential stress eating.

**AC3: Pattern Detection**
Given a user has 3+ instances of stress-related snacking,
When the pattern detection runs,
Then a "stress eating" pattern is identified and stored.

**AC4: Real-Time Intervention**
Given a user logs "stressed" mood in E7,
When they haven't eaten recently,
Then a proactive message is sent: "Stressful day? Pause before snacking."

**AC5: Coping Strategy Delivery**
Given an emotional eating intervention is triggered,
When the user views it,
Then at least one coping strategy suggestion is included.

**AC6: Non-Judgmental Tone**
Given any emotional eating communication,
When the message is generated,
Then the tone is supportive and non-judgmental (e.g., "no judgment - just awareness").

**AC7: Disable Option**
Given a user finds emotional eating tracking triggering,
When they go to settings,
Then they can disable all emotional eating features with one toggle.

**AC8: Privacy Protection**
Given emotional eating data is stored,
When the data is accessed,
Then it uses highest-level encryption and is never shared externally.

### Success Metrics
- Emotional tagging adoption: 30% of Deep mode users tag emotions on 20%+ of meals
- Pattern detection accuracy: 75%+ patterns confirmed by user behavior
- Intervention effectiveness: 50% show reduced emotional eating after 90 days
- User comfort: <5% disable emotional eating features

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <2s correlation | AES-256 encryption | Highest privacy level | Clear emotion labels | iOS 14+, Android 10+ |
| Real-time intervention | Separate data store | Never shared | Voice tagging option | E7 integration required |

### Dependencies
- **Prerequisite Stories:** S06.5.3
- **Related Stories:** S06.6.3
- **External Dependencies:** E7 (Wellbeing Pillar - mood, stress, journaling data)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| E7 data unavailable | Rely on manual tagging only, note limitation |
| User tags every meal as "stressed" | Don't trigger constant interventions, aggregate to weekly insight |
| Intervention sent but user eats anyway | No negative follow-up, just track silently |
| User reports false positive pattern | Adjust algorithm sensitivity for that user |
| Concerning pattern (possible eating disorder) | Very gentle approach with resources (see S06.6.3) |
| User declines all interventions | Reduce frequency, ask if they want to pause feature |

### Open Questions
- Should we allow custom emotion tags?
- How to handle shared meal contexts (eating with friends)?
- Should interventions vary based on time of day?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Manual tagging functional
- [ ] E7 automatic correlation working
- [ ] Pattern detection operational
- [ ] Real-time interventions triggering
- [ ] Coping strategies delivered
- [ ] Disable toggle working
- [ ] Privacy requirements verified

---

## S06.6.3: Behavioral Analysis & Emotional Eating Reports

### User Story
**As a** Holistic Health Seeker (P1),
**I want to** see detailed reports on my emotional eating patterns,
**So that** I can understand my triggers and track improvement over time.

### Story Type
- [x] Feature | [ ] Enhancement | [ ] Technical | [ ] Integration

### Priority
- [x] Must Have (P0) | [ ] Should Have (P1) | [ ] Could Have (P2) | [ ] Won't Have (P3)

### Scope Description

**User Experience:**
Users in Deep mode receive weekly and monthly reports analyzing their emotional eating patterns, trigger foods, successful coping instances, and progress over time.

**Weekly Emotional Eating Report:**
| Section | Content |
|---------|---------|
| **Instance Count** | "Emotional eating instances: 4 this week (down from 7 last week)" |
| **Common Trigger** | "Most common trigger: Work stress (3 instances)" |
| **Trigger Foods** | "When stressed, you reached for: chocolate (2x), chips (1x)" |
| **Successful Pauses** | "You paused before eating 2 times this week!" |
| **Intervention Effectiveness** | "Breathing exercise suggestion helped 1 time" |

**Monthly Deep-Dive Report:**
| Section | Content |
|---------|---------|
| **Eating Patterns by Emotion** | Chart showing calorie intake vs. emotional state |
| **Trigger Food Analysis** | Which foods for which emotions over 30 days |
| **Success Stories** | Times you successfully managed emotional eating |
| **Coping Strategy Effectiveness** | Which AI interventions worked best for you |
| **Recommendations** | Personalized strategies based on patterns |
| **Progress Trend** | Emotional eating frequency over time |

**Visual Timeline:**
Overlay emotional states on meal timeline to see patterns visually:
```
Monday:   😊 ────────── 😰 ──🍫── 😶 ────────
Tuesday:  😶 ────────── 😶 ────── 😊 ────────
Wednesday: 😟 ──🍪── 😰 ──🍕── 😢 ────────
```

**Progress Tracking:**
| Metric | Display |
|--------|---------|
| Weekly instances | Line graph trending over 8 weeks |
| Trigger frequency | Bar chart by emotion type |
| Successful pauses | Percentage improvement |
| Overall trend | "Emotional eating down 35% this month!" |

**Concerning Pattern Handling (Eating Disorder Awareness):**

If concerning patterns detected (extreme restriction, binge patterns, purge mentions in journal):
- Very gentle, non-alarming approach
- Resource provision: "I've noticed some patterns. Would you like resources for eating disorder support?"
- Never diagnose or alarm
- Option to connect with professional support
- Respect user's choice if they decline

**Data Used:**
| Source | Analysis |
|--------|----------|
| Emotional tags | Direct correlation |
| E7 mood data | Automated correlation |
| Meal macros | Calorie/food type patterns |
| Intervention responses | Effectiveness tracking |
| Journal mentions | Context understanding |

**Flexibility Modes:**

| Mode | Experience |
|------|------------|
| **Light** | No reports (emotional eating feature minimal in Light mode) |
| **Deep** | Full weekly and monthly reports with visualizations and recommendations |

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| Report ID | UUID | Generated weekly/monthly | User-only |
| Report Period | Date range | Weekly or monthly | User-only |
| Key Findings | Object | From analysis | Highly sensitive |
| Recommendations | Array | AI generated | User-only |
| User Rating | Integer | 1-5 report helpfulness | System |

### Acceptance Criteria

**AC1: Weekly Report Generation**
Given a user has enabled emotional eating tracking and has 7+ days of data,
When Sunday arrives,
Then a weekly emotional eating report is generated and available.

**AC2: Instance Count Tracking**
Given emotional eating instances have been detected,
When the report is generated,
Then the count is accurate and compared to previous week.

**AC3: Trigger Analysis**
Given multiple emotional eating instances occurred,
When the report is generated,
Then the most common trigger emotion is identified and displayed.

**AC4: Trigger Food Identification**
Given the user ate specific foods during emotional episodes,
When the report is generated,
Then trigger foods are listed with frequency.

**AC5: Monthly Deep-Dive**
Given a user has 30+ days of data,
When the monthly report is generated,
Then it includes eating patterns chart, success stories, and personalized recommendations.

**AC6: Progress Trend Visualization**
Given a user has 4+ weeks of data,
When viewing reports,
Then a trend line shows emotional eating frequency over time.

**AC7: Concerning Pattern Detection**
Given patterns suggest possible disordered eating (extreme restriction, binge patterns),
When the pattern is detected,
Then a very gentle, non-alarming resource offer is made: "I've noticed some patterns. Would you like support resources?"

**AC8: Report Privacy**
Given a user views their emotional eating report,
When the data is accessed,
Then it's encrypted and never leaves the device/user account.

### Success Metrics
- Report engagement: 60% of eligible users view weekly report
- Report helpfulness: 4.2/5 average rating
- Behavioral change: 50% show reduced emotional eating frequency after 90 days
- Resource utilization: <2% trigger concerning pattern detection (indicates appropriate threshold)

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| <3s report load | Highest encryption | Most sensitive data class | Clear visualizations | iOS 14+, Android 10+ |
| Weekly generation | Separate storage | Never shared | Alt text for charts | E7 integration |

### Dependencies
- **Prerequisite Stories:** S06.6.2
- **Related Stories:** S06.5.3
- **External Dependencies:** E7 (Wellbeing Pillar), E8 (Cross-Domain Intelligence for pattern analysis)

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| Insufficient data for report | "Not enough data yet. Keep tracking for your first report!" |
| No emotional eating detected | Positive report: "Great week! No emotional eating patterns detected." |
| User disputes pattern | Allow feedback: "If this doesn't feel accurate, let me know." Adjust algorithm. |
| Report generation fails | Retry, notify user if persistent failure |
| User deletes emotional data | Respect deletion, regenerate reports without deleted data |
| Concerning pattern false positive | User can indicate "not a concern", algorithm adjusts |

### Open Questions
- Should reports be exportable/shareable (for therapist)?
- How to balance pattern sensitivity (too sensitive = false positives, too loose = miss issues)?
- Should we partner with mental health organizations for resources?

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Weekly reports generating
- [ ] Monthly deep-dive reports working
- [ ] Trigger analysis accurate
- [ ] Progress trends visualizing
- [ ] Concerning pattern detection functional
- [ ] Resource provision gentle and appropriate
- [ ] Privacy requirements verified

---

## Validation Summary

### Coverage Check
- [x] All 6 Epic features covered
- [x] Technical foundation story included
- [x] 100% feature-to-story mapping verified

### Duplicate Check
- [x] No overlapping story scopes
- [x] Clear boundaries between stories

### Template Check
- [x] All 18 stories have 11 required sections
- [x] BDD acceptance criteria (Given/When/Then)
- [x] Quantified success metrics

### Quality Check
- [x] Enterprise-grade error handling in all stories
- [x] Cross-pillar dependencies documented
- [x] Light/Deep mode flexibility addressed

---

*Epic 06: Nutrition Pillar - "Your AI Nutrition Coach That Understands Your Whole Self"*
*yHealth Platform | Xyric Solutions | User Stories Document*
*Created: 2025-12-10 | Stories: 18 | All P0 Must Have*
*Workflow: EXPERT-13 Story Generator v3.0*

# yHealth Platform - Credentials Setup Guide

This guide walks you through obtaining all required credentials for yHealth, organized by priority.

---

## Quick Reference

| Phase | Required Services | Est. Cost/mo | Setup Time |
|-------|-------------------|--------------|------------|
| **Phase 1** | Railway, Vercel, GitHub, Anthropic, DeepSeek | $20-90 | 1-2 hours |
| **Phase 2** | Twilio, WhatsApp, Deepgram | $45-110 | 1-2 weeks* |
| **Phase 3** | Nutritionix, WHOOP, Google Fit | $0-100 | 1-2 weeks* |
| **Mobile** | Firebase, Apple Push | $0 | 1-3 days |

*Includes business verification time

---

## Phase 1: Foundation (Start Here)

### 1. Railway (Database)

**What:** PostgreSQL database hosting
**Cost:** $5-20/month
**Setup Time:** 10 minutes

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Click on the PostgreSQL service → "Variables" tab
5. Copy `DATABASE_URL`

**Tips:**
- Free tier: 500 hours/month (enough for development)
- Upgrade to Hobby ($5/mo) for always-on

---

### 2. Vercel (Frontend Hosting)

**What:** Next.js hosting with auto-deploy
**Cost:** Free (Hobby tier)
**Setup Time:** 10 minutes

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Configure environment variables from .env.example

**Tips:**
- Hobby tier supports 1 person (free)
- Pro tier ($20/mo) for team collaboration

---

### 3. GitHub (CI/CD)

**What:** Repository + deployment triggers
**Cost:** Free
**Setup Time:** 5 minutes

**Steps:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`
4. Copy token immediately (won't be shown again)

---

### 4. DeepSeek (Budget AI)

**What:** High-volume AI coaching (55x cheaper than Claude)
**Cost:** ~$0.27/1M input tokens
**Setup Time:** 5 minutes

**Steps:**
1. Go to [platform.deepseek.com](https://platform.deepseek.com)
2. Sign up and verify email
3. Go to API Keys section
4. Create new API key

**Usage:**
- Use for: Routine coaching, meal logging, general Q&A
- Daily usage estimate: 100K-500K tokens = $0.03-$0.14/day

---

### 5. Anthropic (Quality AI)

**What:** Premium AI for critical coaching moments
**Cost:** ~$15/1M input tokens
**Setup Time:** 5 minutes

**Steps:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up and verify
3. Go to Settings → API Keys
4. Create new key

**Usage:**
- Use for: Complex health insights, emotional support, critical decisions
- Daily usage estimate: 10K-50K tokens = $0.15-$0.75/day

---

## Phase 2: Channels

### 6. Twilio (Voice + SMS)

**What:** Voice calls and SMS verification
**Cost:** ~$0.013/min voice, $0.0079/SMS
**Setup Time:** 30 minutes (+ 3-5 days for toll-free verification)

**Steps:**
1. Go to [console.twilio.com](https://console.twilio.com)
2. Sign up with business details
3. Get Account SID and Auth Token from dashboard
4. Buy a phone number (Voice + SMS capable)
5. **Important:** Apply for A2P 10DLC registration for SMS

**Verification Required:**
- Business verification for toll-free: 3-5 business days
- A2P 10DLC for SMS: 1-2 weeks

**Tips:**
- Start verification immediately - it blocks SMS functionality
- Test with trial account first, then upgrade

---

### 7. WhatsApp Business API

**What:** WhatsApp messaging channel
**Cost:** ~$0.005-$0.08 per message (varies by country)
**Setup Time:** 1-2 weeks (Meta Business verification)

**Steps:**
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new App → Type: Business
3. Add WhatsApp product
4. Complete Meta Business Verification
5. Get Phone Number ID and Access Token

**Verification Required:**
- Meta Business Verification: 1-2 weeks
- Documents needed: Business registration, utility bill, or bank statement

**Critical:**
- Start verification IMMEDIATELY - it's the longest blocker
- Need a dedicated phone number for WhatsApp

---

### 8. Deepgram (Speech-to-Text)

**What:** Real-time speech recognition for voice coaching
**Cost:** $0.0043/minute
**Setup Time:** 10 minutes

**Steps:**
1. Go to [console.deepgram.com](https://console.deepgram.com)
2. Sign up
3. Create new project
4. Generate API key

**Tips:**
- $200 free credit for new accounts
- Use Nova-2 model for best accuracy

---

## Phase 3: Health Features

### 9. Nutritionix (Food Database)

**What:** 5M+ food database with barcode scanning
**Cost:** Free tier (50 requests/day) or $0-500/mo
**Setup Time:** 15 minutes

**Steps:**
1. Go to [developer.nutritionix.com](https://developer.nutritionix.com)
2. Sign up for developer account
3. Create new application
4. Get App ID and API Key

**Tips:**
- Free tier: 50 natural language requests/day
- Track API ($299/mo) for barcode + branded foods
- Contact for volume pricing

---

### 10. WHOOP (Wearable - Tier 1)

**What:** Elite recovery and HRV tracking
**Cost:** Free API access
**Setup Time:** 1-2 weeks (application review)

**Steps:**
1. Go to [developer.whoop.com](https://developer.whoop.com)
2. Apply for API access
3. Wait for approval (1-2 weeks)
4. Create OAuth application
5. Get Client ID and Secret

**Application Tips:**
- Describe your health coaching use case
- Mention data privacy compliance
- Be specific about data types needed

---

### 11. Google Fit (Wearable - Tier 1)

**What:** Aggregated Android health data
**Cost:** Free
**Setup Time:** 30 minutes

**Steps:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable Fitness API
4. Create OAuth 2.0 credentials
5. Configure consent screen

**Scopes Needed:**
- `fitness.activity.read`
- `fitness.body.read`
- `fitness.heart_rate.read`
- `fitness.sleep.read`

---

### 12. Apple HealthKit (Wearable - Tier 1)

**What:** iOS health data hub
**Cost:** Apple Developer ($99/year)
**Setup Time:** 1-3 days

**Steps:**
1. Go to [developer.apple.com](https://developer.apple.com)
2. Enroll in Apple Developer Program ($99/year)
3. In Xcode: Add HealthKit capability
4. Configure entitlements for read access

**No API Key Needed:**
- HealthKit is configured in Xcode, not via environment variables
- Requires iOS app with proper entitlements

---

## Mobile App Setup

### 13. Firebase (Android Push)

**What:** Push notifications for Android
**Cost:** Free (generous limits)
**Setup Time:** 20 minutes

**Steps:**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create new project
3. Add Android app
4. Download `google-services.json`
5. Go to Project Settings → Service Accounts
6. Generate new private key (JSON)

**Env vars from JSON:**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

---

### 14. Apple APNS (iOS Push)

**What:** Push notifications for iOS
**Cost:** Included in Apple Developer ($99/year)
**Setup Time:** 15 minutes

**Steps:**
1. Go to [developer.apple.com](https://developer.apple.com)
2. Certificates, Identifiers & Profiles → Keys
3. Create new key with APNs enabled
4. Download .p8 file
5. Note Key ID and Team ID

**Env vars:**
- `APNS_KEY_ID` - From key creation
- `APNS_TEAM_ID` - From account membership
- `APNS_PRIVATE_KEY` - Contents of .p8 file
- `APNS_BUNDLE_ID` - Your app's bundle identifier

---

## Recommended Setup Order

### Week 1: Core Infrastructure
```
Day 1-2:
✅ 1. Create GitHub repository
✅ 2. Set up Railway PostgreSQL
✅ 3. Deploy to Vercel
✅ 4. Get DeepSeek API key
✅ 5. Get Anthropic API key

Day 3-5:
✅ 6. Start Twilio setup + business verification
✅ 7. Start WhatsApp Meta Business verification
```

### Week 2: Communication APIs
```
Day 6-8:
✅ 8. Complete Twilio setup
✅ 9. Get Deepgram API key
✅ 10. Apply for WHOOP developer access

Day 9-12:
⏳ Wait for WhatsApp verification
⏳ Wait for WHOOP approval
```

### Week 3: Health Integrations
```
Day 13-15:
✅ 11. Get Nutritionix API keys
✅ 12. Set up Google Fit OAuth
✅ 13. Set up Apple Developer + HealthKit
```

### Week 4: Polish & Launch
```
Day 16-18:
✅ 14. Firebase setup (Android push)
✅ 15. Apple APNS setup (iOS push)
✅ 16. Sentry error tracking
✅ 17. PostHog analytics
```

---

## Cost Summary

### MVP (Phase 1-2)

| Service | Monthly Cost |
|---------|--------------|
| Railway PostgreSQL | $5-20 |
| Vercel | $0 |
| DeepSeek | $5-20 |
| Anthropic | $10-50 |
| Twilio | $20-50 |
| WhatsApp | $15-30 |
| Deepgram | $10-30 |
| **Total** | **$65-200** |

### Growth (Phase 3-4)

| Service | Additional Cost |
|---------|-----------------|
| Nutritionix | $0-100 |
| Wearable APIs | $0 |
| Firebase | $0 |
| Apple APNS | $0 (included in $99/yr) |
| Sentry | $0-29 |
| PostHog | $0 |
| **Total** | **$0-129** |

---

## Checklist

```
Phase 1: Foundation
[ ] Railway PostgreSQL - DATABASE_URL
[ ] Vercel account connected
[ ] GitHub PAT - GITHUB_TOKEN
[ ] DeepSeek - DEEPSEEK_API_KEY
[ ] Anthropic - ANTHROPIC_API_KEY

Phase 2: Channels
[ ] Twilio - TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
[ ] WhatsApp - WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN
[ ] Deepgram - DEEPGRAM_API_KEY

Phase 3: Health Features
[ ] Nutritionix - NUTRITIONIX_APP_ID, NUTRITIONIX_API_KEY
[ ] WHOOP - WHOOP_CLIENT_ID, WHOOP_CLIENT_SECRET
[ ] Google Fit - GOOGLE_FIT_CLIENT_ID, GOOGLE_FIT_CLIENT_SECRET
[ ] Apple HealthKit - Xcode configured

Mobile
[ ] Firebase - FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL
[ ] Apple APNS - APNS_KEY_ID, APNS_TEAM_ID, APNS_PRIVATE_KEY
```

---

## Troubleshooting

### WhatsApp verification taking too long
- Ensure business documents are clear and match registered name
- Contact Meta support if >2 weeks

### WHOOP application rejected
- Reapply with more detail about health use case
- Emphasize data privacy and user consent

### Google Fit quota errors
- Apply for production quota increase
- Implement caching to reduce API calls

### Twilio A2P registration issues
- Use a verified business address
- Complete 10DLC registration before sending SMS at scale

---

## Security Notes

1. **Never commit .env files** - Add to .gitignore
2. **Rotate keys periodically** - Every 90 days
3. **Use environment-specific keys** - Separate dev/staging/production
4. **Store production secrets** in Railway/Vercel env vars, not files
5. **Health data encryption** - Generate strong ENCRYPTION_KEY (32+ chars)

---

## Next Steps After Setup

1. Copy `.env.example` to `.env`
2. Fill in credentials as you obtain them
3. Test each integration individually
4. Set up Vercel environment variables
5. Configure Railway environment variables

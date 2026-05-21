# Lead Capture System — Technical & Strategy Doc

## System Overview
A hybrid email capture system that stores lead data in Sanity CMS (for analytics and CRM) while simultaneously syncing subscribers to Kit (ConvertKit) for email automation.

## Architecture

### API Route: `POST /api/lead`
**Accepts:**
```json
{
  "email": "user@example.com",
  "source": "burnout-quiz",
  "responses": { "e1": 3, "e2": 2, ... },
  "resultTier": "high"
}
```

**Does:**
1. Validates email
2. Creates `leadCapture` document in Sanity (if SANITY_WRITE_TOKEN configured)
3. Creates/finds subscriber in Kit via API
4. Tags subscriber with source-specific tag
5. Returns `{ success: true }`

### Sanity Schema: `leadCapture`
Fields: email, source (dropdown), resultTier, responses (JSON text), capturedAt (datetime), kitSynced (boolean)

### Kit Tag Mapping
| Source | Env Variable | Purpose |
|--------|-------------|---------|
| emotional-checkin | KIT_TAG_CHECKIN | Weekly check-in reminder sequence |
| burnout-quiz | KIT_TAG_BURNOUT | Burnout recovery roadmap sequence |
| guided-reflection | KIT_TAG_REFLECTION | Reflection tips sequence |
| ai-journal | KIT_TAG_JOURNAL | Journaling prompts sequence |
| newsletter | KIT_TAG_NEWSLETTER | General newsletter (default: 19665257) |

### Reusable Component: `<EmailCapture />`
Props: source, responses, resultTier, headline, description, buttonText, className, onSuccess
States: idle → loading → success / error
UI: rounded card, email input with icon, submit button, success state with check icon

## Environment Variables Required
```
SANITY_WRITE_TOKEN=         # Sanity write token for lead storage
KIT_API_KEY=                # Kit (ConvertKit) API key (existing)
KIT_TAG_CHECKIN=            # Kit tag ID for emotional check-in leads
KIT_TAG_BURNOUT=            # Kit tag ID for burnout quiz leads
KIT_TAG_REFLECTION=         # Kit tag ID for guided reflection leads
KIT_TAG_JOURNAL=            # Kit tag ID for AI journal leads
KIT_TAG_NEWSLETTER=19665257 # Kit tag ID for general newsletter (existing)
```

## Setup Instructions
1. **Sanity:** Generate a write token in Sanity dashboard → Settings → API → Tokens → Add → Editor role
2. **Kit:** Create tags in Kit dashboard for each source → copy tag IDs to env
3. **Deploy:** Add env vars to Vercel → redeploy

## Analytics & Reporting
- Sanity Studio: "Lead Captures" section shows all leads with source, tier, timestamp
- Filter by source to see which tools generate the most leads
- Kit: Segment subscribers by tag for targeted sequences
- Future: Dashboard page showing conversion metrics per tool

## Privacy Considerations
- Tool responses are stored locally (localStorage) — nothing leaves the device unless user opts in via email
- Email capture is always optional (never required to see results)
- Sanity stores responses as JSON for product improvement — can be purged on request
- Kit handles unsubscribe/GDPR compliance
- No third-party analytics on tool interactions (privacy-first positioning)

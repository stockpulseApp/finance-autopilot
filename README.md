# Finance Autopilot

Automated personal finance blog — daily AI articles, affiliate monetization, courses, newsletter, and SEO tools.

**Location:** `C:\Users\User\Projects\finance-autopilot`

## What you get

| Feature | Status |
|--------|--------|
| Next.js blog (MDX-ready markdown posts) | Ready |
| Daily post generator (`scripts/generate-daily-post.mjs`) | Ready — uses **Claude** (Anthropic API) |
| GitHub Action (cron daily publish) | Ready |
| Affiliate deals page + in-article CTAs | Ready — replace URLs in `config/affiliates.json` |
| Courses catalog + Stripe checkout stub | Ready — wire Stripe |
| Newsletter API (ConvertKit) | Stub — add keys |
| Calculators (SEO + affiliate hooks) | Starter |
| Sitemap + robots.txt | Ready |

## Quick start

1. **Install Node.js LTS** from [nodejs.org](https://nodejs.org) (includes `npm`). Git is recommended for deploy automation.

2. **Install dependencies**

   ```bash
   cd C:\Users\User\Projects\finance-autopilot
   npm install
   cp .env.example .env.local
   ```

3. **Configure `.env.local`**

   - `ANTHROPIC_API_KEY` — for daily article generation ([Anthropic Console](https://console.anthropic.com/))
   - `ANTHROPIC_MODEL` — optional (`claude-sonnet-4-20250514` default; use Haiku to save cost)
   - `NEXT_PUBLIC_SITE_URL` — your production domain
   - `CONVERTKIT_API_KEY` + `CONVERTKIT_FORM_ID` — email list
   - `STRIPE_*` — course sales

4. **Run locally**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000

5. **Generate a post manually**

   ```bash
   npm run generate:post
   ```

## Automation (daily blog on autopilot)

### Option A — GitHub Actions (recommended)

1. Push this repo to GitHub.
2. Add secret `ANTHROPIC_API_KEY` in repo Settings → Secrets.
3. Workflow `.github/workflows/daily-post.yml` runs daily, commits new markdown, triggers Vercel rebuild.

### Option B — Windows Task Scheduler

Create a daily task:

```powershell
cd C:\Users\User\Projects\finance-autopilot
node scripts\generate-daily-post.mjs
# then git add, commit, push if you use git deploy
```

### Option C — Cursor Automations

Schedule a Cursor automation to run `npm run generate:post` and commit changes.

## Deploy (free tier friendly)

1. Connect repo to [Vercel](https://vercel.com).
2. Set environment variables from `.env.example`.
3. Every push (including daily bot commits) redeploys the site.

## Monetization playbook

1. **Display ads** — Apply for Google AdSense or Mediavine after ~10k+ monthly sessions. Set `NEXT_PUBLIC_ADS_ENABLED=true` and replace `AdSlot` with your ad code.

2. **Affiliate marketing** — Join programs:
   - Credit cards: Chase, Amex partner portals, Credit Karma partners
   - Investing: Fidelity, Schwab, M1
   - Real estate: Fundrise, Roofstock affiliates
   - Insurance: Policygenius, Lemonade
   - Budgeting: YNAB, Monarch

   Edit `config/affiliates.json` with real tracking URLs. Keep FTC disclosure visible (`/disclosure`).

3. **Email list** — ConvertKit, Beehiiv, or MailerLite. Monetize with sponsored emails and course launches.

4. **Digital courses** — Create content in Teachable, Gumroad, or Stripe + gated pages. Update `config/courses.json` and implement checkout in `src/app/api/checkout/route.ts`.

5. **Lead magnets** — PDF checklists ("Debt snowball planner", "Rental deal analyzer") in exchange for email.

6. **Sponsored posts** — Once traffic grows, charge brands for dedicated reviews (label as Sponsored).

7. **Premium tools** — Paid spreadsheet templates or advanced calculators.

## Customize branding

- `config/site.json` — name, tagline, categories
- `config/topics.json` — daily topic rotation for AI
- `src/app/globals.css` — colors and theme

## Legal (before you earn)

- Add a real Privacy Policy and Terms
- Affiliate disclosure on every money page
- YMYL content: fact-check rates and offers; consider human review for AI posts
- Not financial advice disclaimer (included in footer)

## Next steps

- [ ] Pick domain and set `NEXT_PUBLIC_SITE_URL`
- [ ] Replace placeholder affiliate links
- [ ] Add Anthropic API key and run first automated post
- [ ] Connect ConvertKit + Stripe
- [ ] Deploy to Vercel
- [ ] Submit sitemap to Google Search Console
- [ ] Add 2–3 more calculators under `/tools`

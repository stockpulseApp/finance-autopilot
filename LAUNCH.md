# Wealthy Brainiac — Launch checklist (your last steps)

**Quick start:** open **[https://wealthybrainiac.com/setup](https://wealthybrainiac.com/setup)** (or run `npm run open:setup` on Windows) to launch all signup tabs.

The site is built to earn from **affiliate commissions**, **digital guide/course sales**, and **Pro subscriptions**. Everything below is what only you can do (accounts, DNS, API keys).

Estimated time: **45–90 minutes**.

---

## 1. Stripe — turn on payments (~15 min)

1. Create or open [Stripe Dashboard](https://dashboard.stripe.com).
2. Copy **Secret key** (`sk_test_...` for testing, `sk_live_...` for real money).
3. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
   ```
4. From project root, run:
   ```bash
   npm run setup:stripe
   ```
   This creates Payment Links for guides, courses, products, and subscription plans and writes them into `config/*.json`.
5. (Recommended) **Webhook** for order logging:
   - Stripe → Developers → Webhooks → Add endpoint  
   - URL: `https://YOUR-DOMAIN.com/api/stripe/webhook`  
   - Events: `checkout.session.completed`  
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET=whsec_...` in Vercel + `.env.local`
6. Verify:
   ```bash
   npm run launch:verify
   ```

Test mode: use a [Stripe test card](https://docs.stripe.com/testing) before going live.

---

## 2. Vercel — production env (~10 min)

In [Vercel](https://vercel.com) → your project → **Settings → Environment Variables**, add:

| Variable | Required |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.wealthybrainiac.com` |
| `NEXT_PUBLIC_SITE_NAME` | `Wealthy Brainiac` |
| `ANTHROPIC_API_KEY` | Yes (daily blog bot) |
| `TAVILY_API_KEY` | Recommended (citations / Money Pulse) |
| `STRIPE_SECRET_KEY` | Yes |
| `STRIPE_WEBHOOK_SECRET` | Recommended |
| `CONVERTKIT_API_KEY` | For email list |
| `CONVERTKIT_FORM_ID` | For email list |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional analytics |

Redeploy after saving.

---

## 3. Domain — wealthybrainiac.com (~10 min)

DNS at **Bluehost** (or your registrar):

| Type | Host | Value |
|------|------|--------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

In Vercel → **Domains**, add `wealthybrainiac.com` and `www.wealthybrainiac.com`.

---

## 4. Affiliate income — your tracking links (~20 min)

Affiliate buttons already go to real product pages via `/go/...`. To **get paid**, join each network and paste **your** tracking URLs:

1. Open `config/affiliate-overrides.json`
2. For each program you’re approved for, add:
   ```json
   "overrides": {
     "fidelity": "https://your-tracking-url...",
     "chase-sapphire": "https://..."
   }
   ```
3. Program IDs match `config/affiliates.json` → `id` field.
4. See `/earn` on the site for signup links to each network.

**You can launch today** with organic traffic to `/deals` even before overrides — clicks still go to real brokers; you just won’t earn until overrides are set.

---

## 5. Email list — ConvertKit (~10 min)

1. [ConvertKit](https://convertkit.com) → create form.
2. Add `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID` to Vercel.
3. Test `/newsletter` — subscribers should appear in ConvertKit.

Free lead magnet: **30-Day Wealth Sprint** at `/guides/30-day-wealth-sprint`.

---

## 6. GitHub — daily content bot

Repo → **Settings → Secrets**:

- `ANTHROPIC_API_KEY`
- `TAVILY_API_KEY`

Workflow: `.github/workflows/daily-post.yml` (runs 6:00 UTC daily).

---

## 7. Support email

Update `config/site.json` → `supportEmail` with your real address (used on checkout success and contact).

---

## 8. Go-live smoke test

- [ ] Homepage loads, images differ per card  
- [ ] `/guides/30-day-wealth-sprint` — full free guide  
- [ ] `/deals` — click a deal → real broker site  
- [ ] `/subscription` — “Subscribe now” opens Stripe (after setup:stripe)  
- [ ] Buy a $27 guide in test mode → lands on `/checkout/success?guide=...`  
- [ ] `/insights` — Money Pulse visible  
- [ ] Mobile: sticky offer bar works  

---

## Revenue paths (priority)

1. **Affiliates** — traffic to `/deals` + articles (fastest; needs override URLs for commissions)  
2. **Paid guides** — $19–$37 on `/guides`  
3. **Courses** — higher ticket on `/courses`  
4. **Pro subscription** — recurring on `/subscription`  
5. **Products/templates** — `/products`  

---

## Commands reference

```bash
npm run dev              # local preview
npm run build            # production build
npm run setup:stripe     # create all Payment Links (needs STRIPE_SECRET_KEY)
npm run launch:verify    # preflight check
npm run sync:affiliates  # fix destination URLs from affiliate-destinations.json
npm run pipeline:daily   # manual blog + social generation
```

When `launch:verify` passes and DNS is green, you’re live.

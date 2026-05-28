# Deploy Wealthy Brainiac (one-time setup)

Your Vercel team: **Stock Pulse** (`stock-pulse1`)

## Fastest path (2 minutes)

1. Open this link while logged into Vercel:
   https://vercel.com/new/import?s=https://github.com/stockpulseApp/finance-autopilot&team=stock-pulse1&project-name=wealthy-brainiac&framework=nextjs

2. Add environment variable before deploy:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.wealthybrainiac.com`

3. Click **Deploy**.

4. After it is **Ready**, open the new `*.vercel.app` URL (not `stockpulse-web-cy75`).

## Custom domain (Bluehost DNS)

Your domain uses **Bluehost** nameservers (`ns1.bluehost.com`). In Bluehost → **Domains** → **DNS** for `wealthybrainiac.com`:

| Type | Host | Value |
|------|------|-------|
| A    | `@`  | `76.76.21.21` |
| A    | `www`| `76.76.21.21` |

Remove any old A record pointing to `50.6.3.234`. DNS can take up to 48 hours; often under 1 hour.

In Vercel → **wealthy-brainiac** → **Settings** → **Domains**, add:
- `wealthybrainiac.com`
- `www.wealthybrainiac.com`

## CLI alternative

```powershell
cd C:\Users\User\Projects\finance-autopilot
npx vercel@latest login
npx vercel@latest link --project wealthy-brainiac
npx vercel@latest env add NEXT_PUBLIC_SITE_URL production
# enter: https://www.wealthybrainiac.com
npx vercel@latest deploy --prod
```

## Autonomous daily blog (GitHub Actions)

After the site is on GitHub, add this secret under **Settings → Secrets → Actions**:

| Secret | Purpose |
|--------|---------|
| `ANTHROPIC_API_KEY` | Powers `scripts/daily-growth-pipeline.mjs` (new post every day at 6:00 UTC) |

Optional repo variable: `ANTHROPIC_MODEL` (default `claude-sonnet-4-5-20250929`).

The workflow `.github/workflows/daily-post.yml` commits new posts and triggers a Vercel redeploy.

## Monetization checklist

1. **Stripe Payment Links** — replace `PLACEHOLDER_*` URLs in `config/subscription.json`, `config/guides.json`, and any products/courses.
2. **Affiliate URLs** — swap `example.com` links in `config/affiliates.json` with your real tracking links.
3. **Vercel env** — `NEXT_PUBLIC_SITE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (if using API checkout).

## Automated script (needs token once)

Create a token at https://vercel.com/account/tokens, then:

```powershell
$env:VERCEL_TOKEN="your_token_here"
node scripts/setup-vercel-project.mjs
```

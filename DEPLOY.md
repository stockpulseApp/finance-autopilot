# Deploy Wealthy Brainiac (one-time setup)

Your Vercel team: **Stock Pulse** (`stock-pulse1`)

## Fastest path (2 minutes)

1. Open this link while logged into Vercel:
   https://vercel.com/new/import?s=https://github.com/stockpulseApp/finance-autopilot&team=stock-pulse1&project-name=wealthy-brainiac&framework=nextjs

2. Add environment variable before deploy:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.wealthybrainiac.com`

3. Click **Deploy**.

4. After it is **Ready**, open the new `*.vercel.app` URL (not `stockpulse-web-cy75`).

## Custom domain (Namecheap)

Remove the old A record pointing to `50.6.3.234`, then set:

| Type  | Host | Value                 |
|-------|------|-----------------------|
| A     | `@`  | `76.76.21.21`         |
| CNAME | `www`| `cname.vercel-dns.com`|

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

## Automated script (needs token once)

Create a token at https://vercel.com/account/tokens, then:

```powershell
$env:VERCEL_TOKEN="your_token_here"
node scripts/setup-vercel-project.mjs
```

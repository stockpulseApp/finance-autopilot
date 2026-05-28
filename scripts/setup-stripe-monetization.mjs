#!/usr/bin/env node
/**
 * One-time Stripe setup: creates Payment Links for every PLACEHOLDER in config.
 * Requires STRIPE_SECRET_KEY in .env.local
 *
 * Usage: npm run setup:stripe
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* optional */
  }
}

loadEnv();

const key = process.env.STRIPE_SECRET_KEY;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wealthybrainiac.com").replace(
  /\/$/,
  "",
);

if (!key) {
  console.error(`
Missing STRIPE_SECRET_KEY in .env.local

1. Create account: https://dashboard.stripe.com/register
2. Developers → API keys → copy Secret key (sk_live_... or sk_test_...)
3. Add to .env.local: STRIPE_SECRET_KEY=sk_...
4. Re-run: npm run setup:stripe
`);
  process.exit(1);
}

async function stripe(path, body) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

function isPlaceholder(url) {
  return !url || /PLACEHOLDER/i.test(url);
}

async function createPaymentLink({ name, amountCents, interval, successPath }) {
  const product = await stripe("/products", {
    name,
    "metadata[source]": "wealthy-brainiac",
  });

  const priceBody = {
    product: product.id,
    unit_amount: String(amountCents),
    currency: "usd",
  };
  if (interval) {
    priceBody["recurring[interval]"] = interval;
  }

  const price = await stripe("/prices", priceBody);

  const linkBody = {
    "line_items[0][price]": price.id,
    "line_items[0][quantity]": "1",
    allow_promotion_codes: "true",
    "after_completion[type]": "redirect",
    "after_completion[redirect][url]": `${siteUrl}${successPath}`,
  };

  const link = await stripe("/payment_links", linkBody);
  return link.url;
}

async function processJson(filePath, handler) {
  const full = resolve(root, filePath);
  const data = JSON.parse(readFileSync(full, "utf8"));
  let updated = 0;
  await handler(data, (n) => {
    updated += n;
  });
  if (updated > 0) {
    writeFileSync(full, JSON.stringify(data, null, 2) + "\n");
    console.log(`Updated ${filePath} (${updated} links)`);
  }
}

async function main() {
  console.log(`Site URL for Stripe redirects: ${siteUrl}\n`);

  await processJson("config/subscription.json", async (data, done) => {
    let n = 0;
    for (const plan of data.plans) {
      if (!isPlaceholder(plan.checkoutUrl)) continue;
      const cents = Math.round(plan.price * 100);
      const interval = plan.interval === "year" ? "year" : "month";
      plan.checkoutUrl = await createPaymentLink({
        name: `${data.name} — ${plan.name}`,
        amountCents: cents,
        interval,
        successPath: `/checkout/success?plan=${encodeURIComponent(plan.id)}`,
      });
      console.log(`  subscription ${plan.id}: ${plan.checkoutUrl}`);
      n++;
    }
    done(n);
  });

  await processJson("config/guides.json", async (data, done) => {
    let n = 0;
    for (const guide of data.guides) {
      if (guide.type !== "paid" || !isPlaceholder(guide.checkoutUrl)) continue;
      const cents = Math.round(guide.price * 100);
      guide.checkoutUrl = await createPaymentLink({
        name: `Wealthy Brainiac — ${guide.title}`,
        amountCents: cents,
        successPath: `/checkout/success?guide=${encodeURIComponent(guide.slug)}`,
      });
      console.log(`  guide ${guide.slug}: ${guide.checkoutUrl}`);
      n++;
    }
    done(n);
  });

  await processJson("config/products.json", async (data, done) => {
    let n = 0;
    for (const p of data.products) {
      if (!isPlaceholder(p.checkoutUrl)) continue;
      if (p.type === "service") continue;
      const cents = Math.round(p.price * 100);
      p.checkoutUrl = await createPaymentLink({
        name: `Wealthy Brainiac — ${p.name}`,
        amountCents: cents,
        successPath: `/checkout/success?product=${encodeURIComponent(p.slug)}`,
      });
      console.log(`  product ${p.slug}: ${p.checkoutUrl}`);
      n++;
    }
    done(n);
  });

  await processJson("config/courses.json", async (data, done) => {
    let n = 0;
    for (const c of data.courses) {
      if (!isPlaceholder(c.checkoutUrl)) continue;
      const cents = Math.round(c.price * 100);
      c.checkoutUrl = await createPaymentLink({
        name: `Wealthy Brainiac — ${c.title}`,
        amountCents: cents,
        successPath: `/checkout/success?course=${encodeURIComponent(c.slug)}`,
      });
      console.log(`  course ${c.slug}: ${c.checkoutUrl}`);
      n++;
    }
    done(n);
  });

  console.log(`
Done. Next steps:
1. Add STRIPE_WEBHOOK_SECRET (see LAUNCH.md) for automated fulfillment logs
2. Commit updated config/*.json if you want links in the repo (optional — they work from local files on Vercel env too)
3. Copy the same keys to Vercel → Settings → Environment Variables
4. Run: npm run launch:verify
`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

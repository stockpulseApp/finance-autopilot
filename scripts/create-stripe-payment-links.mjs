/**
 * Creates Stripe Payment Links for subscription + guide placeholders.
 * Requires STRIPE_SECRET_KEY in environment or .env.local
 *
 * Usage: node scripts/create-stripe-payment-links.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* optional */
  }
}

loadEnv();

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Add STRIPE_SECRET_KEY to .env.local then re-run.");
  process.exit(1);
}

const stripe = async (path, body) => {
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
};

const products = [
  { file: "config/subscription.json", path: "plans", idField: "id", priceField: "price", nameField: "name", urlField: "checkoutUrl", items: null },
];

async function createLink(name, amountCents) {
  const product = await stripe("/products", {
    name,
    "metadata[source]": "wealthy-brainiac",
  });
  const price = await stripe("/prices", {
    product: product.id,
    unit_amount: String(amountCents),
    currency: "usd",
  });
  const link = await stripe("/payment_links", {
    "line_items[0][price]": price.id,
    "line_items[0][quantity]": "1",
    allow_promotion_codes: "true",
  });
  return link.url;
}

async function main() {
  const subPath = resolve(root, "config/subscription.json");
  const sub = JSON.parse(readFileSync(subPath, "utf8"));

  for (const plan of sub.plans) {
    if (!plan.checkoutUrl?.includes("PLACEHOLDER")) continue;
    const cents = Math.round(plan.price * 100);
    const url = await createLink(`${sub.name} — ${plan.name}`, cents);
    plan.checkoutUrl = url;
    console.log(`${plan.id}: ${url}`);
  }

  writeFileSync(subPath, JSON.stringify(sub, null, 2) + "\n");
  console.log("Updated config/subscription.json");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Create Stripe webhook for checkout.session.completed and update .env.local
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dunriteglobal.com").replace(
  /\/$/,
  "",
);
const webhookUrl = `${siteUrl}/api/stripe/webhook`;

function loadEnv() {
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    /* */
  }
}

function setEnvKey(key, value) {
  let raw = readFileSync(envPath, "utf8");
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(raw)) {
    raw = raw.replace(re, `${key}=${value}`);
  } else {
    raw = raw.trimEnd() + `\n${key}=${value}\n`;
  }
  writeFileSync(envPath, raw);
}

loadEnv();

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Missing STRIPE_SECRET_KEY in .env.local");
  process.exit(1);
}

async function stripeGet(path) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  return res.json();
}

async function stripePost(path, body) {
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

async function main() {
  const existing = await stripeGet("/webhook_endpoints?limit=100");
  const match = existing.data?.find((w) => w.url === webhookUrl);

  let endpoint = match;
  if (match) {
    console.log(`Webhook already exists: ${match.id}`);
  } else {
    endpoint = await stripePost("/webhook_endpoints", {
      url: webhookUrl,
      "enabled_events[0]": "checkout.session.completed",
      description: "Dunrite Global checkout fulfillment",
    });
    console.log(`Created webhook: ${endpoint.id}`);
  }

  const secret = endpoint.secret;
  if (!secret) {
    console.log(
      "Signing secret only shown at creation. In Stripe Dashboard → Webhooks → reveal signing secret, then set STRIPE_WEBHOOK_SECRET in Vercel.",
    );
    return;
  }

  setEnvKey("STRIPE_WEBHOOK_SECRET", secret);
  console.log(`Updated .env.local with STRIPE_WEBHOOK_SECRET`);
  console.log(`Endpoint URL: ${webhookUrl}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

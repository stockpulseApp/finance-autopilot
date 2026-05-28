#!/usr/bin/env node
/**
 * Pre-launch verification — run before going live.
 * Usage: npm run launch:verify
 */
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const map = {};
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
      const i = line.indexOf("=");
      map[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  } catch {
    /* */
  }
  return map;
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function warn(msg) {
  console.log(`  ⚠ ${msg}`);
  return msg;
}
function fail(msg) {
  console.log(`  ✗ ${msg}`);
  return msg;
}

function hasReal(val) {
  return val && !/PLACEHOLDER|example\.com|your-domain/i.test(val);
}

function checkStripeUrls(file, arrayKey, urlField = "checkoutUrl") {
  const data = JSON.parse(readFileSync(resolve(root, file), "utf8"));
  const items = data[arrayKey];
  const bad = [];
  for (const item of items) {
    const url = item[urlField];
    if (item.type === "free") continue;
    if (item.type === "service") {
      if (!url?.startsWith("mailto:") && !hasReal(url)) bad.push(`${item.slug}: service`);
      continue;
    }
    const valid =
      (typeof url === "string" && url.startsWith("https://buy.stripe.com/") && hasReal(url)) ||
      (item.stripePriceId && hasReal(item.stripePriceId));
    if (!valid) bad.push(item.slug || item.id);
  }
  return bad;
}

function main() {
  const env = loadEnv();
  const errors = [];
  const warnings = [];

  console.log("\nWealthy Brainiac — Launch verification\n");

  console.log("Environment (.env.local):");
  if (hasReal(env.NEXT_PUBLIC_SITE_URL)) ok(`SITE_URL=${env.NEXT_PUBLIC_SITE_URL}`);
  else errors.push(fail("NEXT_PUBLIC_SITE_URL missing or placeholder"));

  if (hasReal(env.ANTHROPIC_API_KEY)) ok("ANTHROPIC_API_KEY set (daily content)");
  else warnings.push(warn("ANTHROPIC_API_KEY missing — disable GitHub Action or add secret"));

  if (hasReal(env.TAVILY_API_KEY)) ok("TAVILY_API_KEY set (research citations)");
  else warnings.push(warn("TAVILY_API_KEY missing — posts skip live sources"));

  if (hasReal(env.STRIPE_SECRET_KEY)) ok("STRIPE_SECRET_KEY set");
  else errors.push(fail("STRIPE_SECRET_KEY missing — run npm run setup:stripe"));

  if (hasReal(env.STRIPE_WEBHOOK_SECRET)) ok("STRIPE_WEBHOOK_SECRET set");
  else warnings.push(warn("STRIPE_WEBHOOK_SECRET missing — checkout still works"));

  if (hasReal(env.CONVERTKIT_API_KEY) && hasReal(env.CONVERTKIT_FORM_ID)) ok("ConvertKit wired");
  else warnings.push(warn("ConvertKit not wired — newsletter uses stub mode (still captures in logs)"));

  console.log("\nMonetization config:");
  for (const [file, key] of [
    ["config/guides.json", "guides"],
    ["config/subscription.json", "plans"],
    ["config/courses.json", "courses"],
    ["config/products.json", "products"],
  ]) {
    const bad = checkStripeUrls(file, key);
    if (bad.length === 0) ok(file);
    else errors.push(fail(`${file}: missing Stripe for ${bad.join(", ")}`));
  }

  console.log("\nContent:");
  const postsDir = resolve(root, "content/posts");
  const posts = existsSync(postsDir)
    ? readdirSync(postsDir).filter((f) => f.endsWith(".md")).length
    : 0;
  if (posts >= 10) ok(`${posts} blog posts`);
  else warnings.push(warn(`Only ${posts} posts`));

  const guidesDir = resolve(root, "content/guide-pages");
  const guidePages = existsSync(guidesDir)
    ? readdirSync(guidesDir).filter((f) => f.endsWith(".md")).length
    : 0;
  if (guidePages >= 8) ok(`${guidePages} guide reader pages`);
  else errors.push(fail(`Expected 8 guide pages, found ${guidePages}`));

  console.log("\nAffiliates:");
  const aff = JSON.parse(readFileSync(resolve(root, "config/affiliates.json"), "utf8"));
  const example = aff.programs.filter((p) => /example\.com/i.test(p.url)).length;
  if (example === 0) ok(`${aff.programs.length} programs, no example.com`);
  else errors.push(fail(`${example} programs still use example.com — run npm run sync:affiliates`));

  console.log("\n" + "—".repeat(50));
  if (errors.length) {
    console.log(`\nNOT READY — fix ${errors.length} issue(s) above.\n`);
    process.exit(1);
  }
  console.log("\nREADY TO LAUNCH (site + config).");
  console.log("Finish LAUNCH.md for DNS, Vercel env copy, and your affiliate tracking URLs.\n");
}

main();

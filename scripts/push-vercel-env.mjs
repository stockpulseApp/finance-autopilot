#!/usr/bin/env node
/**
 * Push selected keys from .env.local to Vercel (production + preview).
 * Usage: node scripts/push-vercel-env.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SITE_NAME",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "ANTHROPIC_API_KEY",
  "ANTHROPIC_MODEL",
  "SOCIAL_REPURPOSE_MODEL",
  "TAVILY_API_KEY",
];

function parseEnvFile() {
  const map = {};
  const raw = readFileSync(resolve(root, ".env.local"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    if (v) map[k] = v;
  }
  return map;
}

function addEnv(name, value, target) {
  const args = [
    "vercel@latest",
    "env",
    "add",
    name,
    target,
    "--value",
    value,
    "--yes",
    "--force",
    "--sensitive",
  ];
  const r = spawnSync("npx", args, { cwd: root, encoding: "utf8", shell: true });
  if (r.status !== 0) {
    console.error(`Failed ${name} (${target}):`, r.stderr || r.stdout);
    return false;
  }
  console.log(`  ✓ ${name} → ${target}`);
  return true;
}

const env = parseEnvFile();
let failed = 0;

for (const key of KEYS) {
  const value = env[key];
  if (!value) {
    console.log(`  ⊘ skip ${key} (empty in .env.local)`);
    continue;
  }
  for (const target of ["production", "preview"]) {
    if (!addEnv(key, value, target)) failed++;
  }
}

if (failed) process.exit(1);
console.log("\nDone. Run: npx vercel --prod  to redeploy.");

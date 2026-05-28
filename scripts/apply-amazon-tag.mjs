#!/usr/bin/env node
/**
 * If NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG is in .env.local, write amazon-associates override.
 * Usage: npm run apply:amazon-tag
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const map = {};
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const i = line.indexOf("=");
      map[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  } catch {
    /* */
  }
  return map;
}

const tag = loadEnv().NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
if (!tag) {
  console.log("Add NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20 to .env.local after Amazon approves you.");
  process.exit(1);
}

const path = resolve(root, "config/affiliate-overrides.json");
const data = JSON.parse(readFileSync(path, "utf8"));
data.overrides["amazon-associates"] = `https://www.amazon.com/?tag=${tag}`;
writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(`Updated amazon-associates override with tag ${tag}`);
console.log("Commit config/affiliate-overrides.json and redeploy.");

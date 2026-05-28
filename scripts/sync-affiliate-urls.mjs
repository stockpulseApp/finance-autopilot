#!/usr/bin/env node
/**
 * Replaces example.com placeholder URLs with real destinations from affiliate-destinations.json
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const affiliatesPath = resolve(root, "config/affiliates.json");
const destinationsPath = resolve(root, "config/affiliate-destinations.json");

const affiliates = JSON.parse(readFileSync(affiliatesPath, "utf8"));
const { programs: destMap } = JSON.parse(readFileSync(destinationsPath, "utf8"));

let updated = 0;
for (const program of affiliates.programs) {
  const dest = destMap[program.id];
  if (!dest?.destination) {
    console.warn(`Missing destination for ${program.id}`);
    continue;
  }
  if (program.url.includes("example.com")) {
    program.url = dest.destination;
    program.affiliateSignupUrl = dest.signup;
    updated++;
  }
}

writeFileSync(affiliatesPath, JSON.stringify(affiliates, null, 2) + "\n");
console.log(`Updated ${updated} affiliate URLs in config/affiliates.json`);

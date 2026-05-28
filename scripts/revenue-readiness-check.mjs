#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

function getEnvMap(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const out = {};
  for (const line of lines) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    out[key] = val;
  }
  return out;
}

function hasRealValue(val) {
  if (!val) return false;
  if (val.includes("REPLACE_ME")) return false;
  if (val.includes("your-domain.com")) return false;
  if (val.endsWith("...")) return false;
  return true;
}

function checkProducts() {
  const productsPath = path.join(ROOT, "config", "products.json");
  const data = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const issues = [];
  for (const p of data.products) {
    if (p.type !== "service" && !hasRealValue(p.stripePriceId)) {
      issues.push(`Product ${p.slug} missing real stripePriceId`);
    }
    if (p.type === "service" && !hasRealValue(p.checkoutUrl)) {
      issues.push(`Service ${p.slug} missing checkoutUrl`);
    }
  }
  return issues;
}

function checkCourses() {
  const coursesPath = path.join(ROOT, "config", "courses.json");
  const data = JSON.parse(fs.readFileSync(coursesPath, "utf8"));
  const issues = [];
  for (const c of data.courses) {
    if (!hasRealValue(c.stripePriceId)) {
      issues.push(`Course ${c.slug} missing real stripePriceId`);
    }
  }
  return issues;
}

function main() {
  const env = getEnvMap(path.join(ROOT, ".env.local"));
  const required = [
    "NEXT_PUBLIC_SITE_URL",
    "ANTHROPIC_API_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
  ];

  const issues = [];

  for (const key of required) {
    if (!hasRealValue(env[key] ?? "")) {
      issues.push(`Missing/placeholder env var: ${key}`);
    }
  }

  issues.push(...checkProducts());
  issues.push(...checkCourses());

  if (!issues.length) {
    console.log("Revenue readiness: PASS");
    return;
  }

  console.log("Revenue readiness: ACTION REQUIRED");
  for (const issue of issues) {
    console.log(`- ${issue}`);
  }
  process.exitCode = 1;
}

main();

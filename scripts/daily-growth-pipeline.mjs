#!/usr/bin/env node
import { spawnSync } from "child_process";

function run(label, command, args) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    throw new Error(`${label} failed`);
  }
}

try {
  run("Generate daily post", "node", ["scripts/generate-daily-post.mjs"]);
  run("Repurpose for social", "node", ["scripts/repurpose-social.mjs"]);
  const day = new Date().getUTCDay();
  if (day === 0) {
    run("Weekly Money Pulse (Sunday UTC)", "node", ["scripts/generate-insights.mjs"]);
  }
  console.log("\nPipeline complete: blog + social assets generated.");
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

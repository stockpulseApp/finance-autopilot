#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const OUT_DIR = path.join(ROOT, "content", "social");

const apiKey = process.env.ANTHROPIC_API_KEY;
const model =
  process.env.SOCIAL_REPURPOSE_MODEL ||
  process.env.ANTHROPIC_MODEL ||
  "claude-sonnet-4-20250514";

function getLatestPostPath() {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();
  if (!files.length) throw new Error("No posts found in content/posts");
  return path.join(POSTS_DIR, files[0]);
}

async function repurpose(content) {
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY required");

  const prompt = `Repurpose this finance blog into:
1) X thread (10 tweets max)
2) 60-second short-form video script
3) newsletter teaser
4) 5 hook headlines

Return markdown with clear section headers.

BLOG:
${content.slice(0, 12000)}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  const block = json.content?.find((b) => b.type === "text");
  if (!block?.text) throw new Error("No text output from model");
  return block.text;
}

async function main() {
  const postPath = getLatestPostPath();
  const content = fs.readFileSync(postPath, "utf8");
  const social = await repurpose(content);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outFile = path.join(
    OUT_DIR,
    `${new Date().toISOString().slice(0, 10)}-repurpose.md`
  );
  fs.writeFileSync(outFile, social, "utf8");
  console.log(`Wrote social assets: ${outFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

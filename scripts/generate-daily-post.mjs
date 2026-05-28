#!/usr/bin/env node
/**
 * Daily blog generator — uses Anthropic Claude API.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-daily-post.mjs
 *   node scripts/generate-daily-post.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const TOPICS_PATH = path.join(ROOT, "config", "topics.json");
const AFFILIATES_PATH = path.join(ROOT, "config", "affiliates.json");

const dryRun = process.argv.includes("--dry-run");
const apiKey = process.env.ANTHROPIC_API_KEY;
const model =
  process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function pickTopic() {
  const { rotation } = JSON.parse(fs.readFileSync(TOPICS_PATH, "utf8"));
  const dayIndex = Math.floor(Date.now() / 86400000);
  const bucket = rotation[dayIndex % rotation.length];
  const promptIndex = dayIndex % bucket.prompts.length;
  return {
    category: bucket.category,
    topic: bucket.prompts[promptIndex],
  };
}

function pickAffiliateIds() {
  const { programs } = JSON.parse(fs.readFileSync(AFFILIATES_PATH, "utf8"));
  const shuffled = [...programs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2).map((p) => p.id);
}

async function generateArticle({ category, topic }) {
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is required (set in .env.local or GitHub Actions secrets)"
    );
  }

  const system = `You are a senior personal finance writer for "Finance Autopilot".
Write clear, accurate, educational articles. Not financial advice — include practical steps.
Use markdown: ## headings, bullet lists, tables when helpful. 1200-1800 words.
No hype, no guaranteed returns, no get-rich-quick language.`;

  const user = `Write a complete blog article about: "${topic}"
Category: ${category}
Include: intro, actionable sections, common mistakes, bottom line.
Return ONLY the article body in markdown (no frontmatter).`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  const block = json.content?.find((b) => b.type === "text");
  if (!block?.text) {
    throw new Error("Unexpected Anthropic response: no text content");
  }
  return block.text.trim();
}

function buildFrontmatter({ title, description, category, affiliateIds }) {
  const lines = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `date: "${todayISO()}"`,
    `category: ${category}`,
    `tags: [automated, ${category}]`,
    `author: Finance Autopilot Team`,
    `featured: false`,
    `affiliateIds: [${affiliateIds.join(", ")}]`,
    "---",
  ];
  return lines.join("\n");
}

function deriveTitle(topic) {
  return topic.length > 80 ? topic.slice(0, 77) + "…" : topic;
}

async function main() {
  const { category, topic } = pickTopic();
  const affiliateIds = pickAffiliateIds();
  const title = deriveTitle(topic);
  const slug = `${todayISO()}-${slugify(topic)}`;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`Post already exists: ${slug}`);
    return;
  }

  console.log(`Generating with Claude (${model}): ${title} [${category}]`);
  const body = await generateArticle({ category, topic });
  const description =
    body.split("\n").find((l) => l.trim() && !l.startsWith("#"))?.slice(0, 160) ??
    title;
  const content = `${buildFrontmatter({ title, description, category, affiliateIds })}\n\n${body}\n`;

  if (dryRun) {
    console.log("--- DRY RUN ---\n");
    console.log(content.slice(0, 800) + "\n...");
    return;
  }

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Wrote ${filePath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

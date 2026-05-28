#!/usr/bin/env node
/**
 * Research-backed daily journalism — news, X discourse, original analysis.
 *
 * Env: ANTHROPIC_API_KEY (required), TAVILY_API_KEY (recommended for live sources)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvLocal } from "./lib/load-env.mjs";
import { researchTopic, formatResearchForPrompt } from "./lib/tavily-research.mjs";

loadEnvLocal();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const TOPICS_PATH = path.join(ROOT, "config", "topics.json");
const AFFILIATES_PATH = path.join(ROOT, "config", "affiliates.json");
const CTA_MAP_PATH = path.join(ROOT, "config", "guide-cta-map.json");

const dryRun = process.argv.includes("--dry-run");
const apiKey = process.env.ANTHROPIC_API_KEY;
const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929";

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

function getGuideCta(category) {
  try {
    const map = JSON.parse(fs.readFileSync(CTA_MAP_PATH, "utf8"));
    return map[category] ?? map["personal-finance"];
  } catch {
    return null;
  }
}

async function generateArticle({ category, topic, researchBlock, guideCta }) {
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required");
  }

  const ctaBlock = guideCta
    ? `End with a section "## Go deeper" that honestly teases the FREE guide at /guides/${guideCta.freeSlug} and the premium ${guideCta.paidTitle} ($${guideCta.paidPrice}) at /guides/${guideCta.paidSlug} — explain what extra worksheets/checklists the paid guide includes. No hype.`
    : "";

  const system = `You are a staff financial journalist at Dunrite Global (investigative personal finance desk).

VOICE: Confident, specific, humane — like NerdWallet meets The Hustle. Write for smart adults who hate fluff.

RULES:
- 1,800–2,400 words of ORIGINAL analysis. Never plagiarize — synthesize and add value.
- Use real numbers, worked examples, and at least one fictional but realistic case study (name + salary + decision).
- Cite external sources with markdown links [Outlet: headline](url) from the research brief only. If no research, do not fake URLs.
- Include section "## On X & social" — 2–4 bullet points paraphrasing discourse from research (each with link). If no social research, omit section.
- Include "## Sources & further reading" — bullet list of 4–8 links from research.
- Include "## Key takeaways" — 5 bullets.
- No guaranteed returns, no get-rich-quick, not personalized financial advice. Say when to consult a CPA/CFP.
- Ban phrases: "in today's fast-paced world", "game-changer", "dive in", "let's explore", "without further ado".
${ctaBlock}`;

  const user = `TOPIC: ${topic}
CATEGORY: ${category}

RESEARCH BRIEF (use for attribution — do not invent sources):
${researchBlock}

Return TWO parts separated by exactly the line ---JSON---:

PART 1: Full article markdown body (start with # title line, then ## sections). No frontmatter.

PART 2: JSON metadata:
{
  "title": "compelling headline under 70 chars",
  "description": "complete 150-160 char meta description that sells the click",
  "sources": [{"title":"","url":"","outlet":""}],
  "socialQuotes": [{"paraphrase":"","url":"","attribution":""}]
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  const text = json.content?.find((b) => b.type === "text")?.text?.trim();
  if (!text) throw new Error("No text in response");

  const [bodyPart, metaPart] = text.split("---JSON---");
  let meta = { title: topic, description: "", sources: [], socialQuotes: [] };
  if (metaPart) {
    try {
      const match = metaPart.match(/\{[\s\S]*\}/);
      if (match) meta = JSON.parse(match[0]);
    } catch {
      console.warn("Could not parse metadata JSON, using defaults");
    }
  }

  let body = (bodyPart ?? text).trim();
  if (body.startsWith("# ")) {
    meta.title = body.split("\n")[0].replace(/^#\s*/, "").trim();
    body = body.split("\n").slice(1).join("\n").trim();
  }

  return { body, meta };
}

function buildFrontmatter({ meta, category, affiliateIds }) {
  const sourcesYaml =
    meta.sources?.length > 0
      ? `sources:\n${meta.sources.map((s) => `  - title: "${(s.title ?? "").replace(/"/g, '\\"')}"\n    url: "${s.url ?? ""}"\n    outlet: "${(s.outlet ?? "").replace(/"/g, '\\"')}"`).join("\n")}`
      : "sources: []";

  const socialYaml =
    meta.socialQuotes?.length > 0
      ? `socialQuotes:\n${meta.socialQuotes.map((q) => `  - paraphrase: "${(q.paraphrase ?? "").replace(/"/g, '\\"')}"\n    url: "${q.url ?? ""}"\n    attribution: "${(q.attribution ?? "").replace(/"/g, '\\"')}"`).join("\n")}`
      : "socialQuotes: []";

  return [
    "---",
    `title: "${(meta.title ?? "").replace(/"/g, '\\"')}"`,
    `description: "${(meta.description ?? "").replace(/"/g, '\\"')}"`,
    `date: "${todayISO()}"`,
    `category: ${category}`,
    `tags: [research, ${category}]`,
    `author: Dunrite Global Research Desk`,
    `featured: true`,
    `affiliateIds: [${affiliateIds.join(", ")}]`,
    sourcesYaml,
    socialYaml,
    "---",
  ].join("\n");
}

async function main() {
  const { category, topic } = pickTopic();
  const affiliateIds = pickAffiliateIds();
  const guideCta = getGuideCta(category);
  const slug = `${todayISO()}-${slugify(topic)}`;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`Post already exists: ${slug}`);
    return;
  }

  console.log(`Researching: ${topic}`);
  const research = await researchTopic(topic, category);
  const researchBlock = formatResearchForPrompt(research);

  console.log(`Writing (${model}): ${topic}`);
  const { body, meta } = await generateArticle({
    category,
    topic,
    researchBlock,
    guideCta,
  });

  const content = `${buildFrontmatter({ meta, category, affiliateIds })}\n\n# ${meta.title}\n\n${body}\n`;

  if (dryRun) {
    console.log(content.slice(0, 1200) + "\n...");
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

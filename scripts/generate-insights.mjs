#!/usr/bin/env node
/**
 * Weekly "Money Pulse" — curated headlines + X discourse with links (original commentary).
 * Requires TAVILY_API_KEY + ANTHROPIC_API_KEY for best results.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvLocal } from "./lib/load-env.mjs";
import { researchTopic, formatResearchForPrompt } from "./lib/tavily-research.mjs";

loadEnvLocal();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "content", "insights");

const PILLARS = [
  { category: "investing", topic: "stock market and index investing this week" },
  { category: "personal-finance", topic: "inflation consumer spending household budgets" },
  { category: "credit-cards", topic: "credit card rewards interest rates Fed" },
  { category: "real-estate", topic: "mortgage rates housing market rentals" },
];

async function synthesize(apiKey, model, researchBlock) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: `You are the Dunrite Global desk editor. Write original commentary that synthesizes external sources — never copy full paragraphs. Always include markdown links to sources. Add a short "On X" subsection with 2-3 attributed paraphrases from social results (link to posts). Return valid JSON only.`,
      messages: [
        {
          role: "user",
          content: `Create a pulse brief from this research:\n\n${researchBlock}\n\nReturn JSON: {"headline":"...","summary":"2-3 sentences","editorial":"2 paragraphs with [links](url)","socialHighlights":[{"text":"paraphrase","source":"@handle or publication","url":"..."}],"sources":[{"title":"","url":"","outlet":""}]}`,
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  const text = json.content?.find((b) => b.type === "text")?.text ?? "";
  const match = text.match(/\{[\s\S]*\}/);
  return JSON.parse(match[0]);
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929";
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY required");

  const date = new Date().toISOString().slice(0, 10);
  const sections = [];

  for (const pillar of PILLARS) {
    const research = await researchTopic(pillar.topic, pillar.category);
    const block = formatResearchForPrompt(research);
    const brief = await synthesize(apiKey, model, block);
    sections.push({ ...pillar, ...brief, researchedAt: date });
    console.log(`Pulse: ${pillar.category}`);
  }

  const payload = {
    date,
    title: `Money Pulse · ${date}`,
    intro:
      "What journalists, analysts, and people on X are saying about money this week — summarized by our desk with links to originals.",
    sections,
  };

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "latest.json"), JSON.stringify(payload, null, 2));
  fs.writeFileSync(path.join(OUT, `${date}.json`), JSON.stringify(payload, null, 2));
  console.log(`Wrote content/insights/latest.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

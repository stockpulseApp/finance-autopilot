/**
 * Web research for journalism-style posts (news + X/Twitter discourse).
 * Uses Tavily API when TAVILY_API_KEY is set; otherwise returns empty (generator still runs).
 */

export async function researchTopic(topic, category) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn("TAVILY_API_KEY not set — skipping live web research.");
    return { news: [], social: [], general: [] };
  }

  const base = { api_key: apiKey, max_results: 6, include_raw_content: false };

  const [news, social, general] = await Promise.all([
    tavilySearch({
      ...base,
      query: `${topic} ${category.replace(/-/g, " ")} news`,
      topic: "news",
      days: 7,
    }),
    tavilySearch({
      ...base,
      query: `${topic} finance money site:x.com OR site:twitter.com`,
      topic: "general",
      max_results: 5,
    }),
    tavilySearch({
      ...base,
      query: `${topic} expert analysis site:wsj.com OR site:bloomberg.com OR site:nerdwallet.com OR site:investopedia.com OR site:sec.gov`,
      topic: "general",
      max_results: 6,
    }),
  ]);

  return { news, social, general };
}

async function tavilySearch(params) {
  const body = {
    api_key: params.api_key,
    query: params.query,
    search_depth: "advanced",
    max_results: params.max_results ?? 6,
    include_answer: false,
  };

  if (params.topic === "news") {
    body.topic = "news";
    body.days = params.days ?? 7;
  }

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.warn("Tavily search failed:", await res.text());
    return [];
  }

  const data = await res.json();
  return (data.results ?? []).map(normalizeResult);
}

function normalizeResult(r) {
  return {
    title: r.title ?? "Source",
    url: r.url ?? "",
    snippet: (r.content ?? "").slice(0, 500),
    published: r.published_date ?? null,
  };
}

export function formatResearchForPrompt(research) {
  const blocks = [];

  const add = (label, items) => {
    if (!items?.length) return;
    blocks.push(`### ${label}\n`);
    for (const item of items) {
      blocks.push(
        `- **${item.title}** (${item.url})\n  ${item.snippet}\n`,
      );
    }
  };

  add("Recent news & reporting (cite these with markdown links)", research.news);
  add("Posts & discussion on X/Twitter (paraphrase + link; never invent handles)", research.social);
  add("Expert / institutional sources", research.general);

  if (!blocks.length) {
    return "No live research available. Write from first principles with specific numbers and scenarios. Do not invent fake outlet names or URLs.";
  }

  return blocks.join("\n");
}

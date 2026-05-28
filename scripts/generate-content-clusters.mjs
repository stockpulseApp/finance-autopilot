#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");

const clusterPosts = [
  {
    slug: "2026-06-01-bitcoin-vs-ethereum-long-term",
    title: "Bitcoin vs Ethereum for Long-Term Investors",
    description: "A practical framework to compare Bitcoin and Ethereum for long-horizon portfolios.",
    category: "crypto",
    tags: ["crypto", "bitcoin", "ethereum", "investing"],
  },
  {
    slug: "2026-06-02-crypto-risk-rules-beginners",
    title: "Crypto Risk Rules Every Beginner Should Follow",
    description: "Position sizing, custody, and volatility rules that prevent expensive crypto mistakes.",
    category: "crypto",
    tags: ["crypto", "risk-management", "investing"],
  },
  {
    slug: "2026-06-03-self-custody-crypto-safety",
    title: "How to Self-Custody Crypto Safely",
    description: "Security-first playbook for wallets, backups, and safe long-term crypto storage.",
    category: "crypto",
    tags: ["crypto", "security", "wallets"],
  },
  {
    slug: "2026-06-04-house-hacking-roi-framework",
    title: "House Hacking ROI Framework for First-Time Buyers",
    description: "Use this framework to evaluate cash flow, equity, and downside before buying.",
    category: "real-estate",
    tags: ["real-estate", "house-hacking", "cash-flow"],
  },
  {
    slug: "2026-06-05-index-fund-portfolio-build",
    title: "How to Build a Simple Index Fund Portfolio",
    description: "A no-fluff guide to asset allocation, rebalancing, and long-term consistency.",
    category: "investing",
    tags: ["investing", "index-funds", "portfolio"],
  },
  {
    slug: "2026-06-06-credit-card-rewards-system",
    title: "Credit Card Rewards System Without Debt",
    description: "Set up a rewards strategy that maximizes points while avoiding interest and fees.",
    category: "credit-cards",
    tags: ["credit-cards", "rewards", "personal-finance"],
  },
];

function bodyTemplate(title, category) {
  return `## Why this topic matters

${title} can directly impact your long-term wealth trajectory. The key is using a repeatable decision framework instead of reacting emotionally.

## Core framework

1. Define your objective and time horizon.
2. Quantify risk before evaluating upside.
3. Automate execution to reduce behavioral mistakes.
4. Review performance quarterly, not daily.

## Practical action steps

- Build a one-page decision checklist.
- Set clear position sizes or budget limits.
- Track outcomes in a weekly scorecard.
- Iterate only when data justifies a change.

## Common mistakes

- Overcomplicating your first setup.
- Ignoring risk and focusing only on returns.
- Chasing trends instead of using a system.
- Making large changes after short-term noise.

## Bottom line

Treat ${category.replace(/-/g, " ")} as a long-term system. Consistency beats intensity when building durable wealth.
`;
}

function frontmatter(post) {
  return `---
title: "${post.title}"
description: "${post.description}"
date: "${post.slug.slice(0, 10)}"
category: ${post.category}
tags: [${post.tags.join(", ")}]
author: Wealthy Brainiac Editorial Team
featured: false
---
`;
}

function main() {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  let created = 0;
  for (const post of clusterPosts) {
    const file = path.join(POSTS_DIR, `${post.slug}.md`);
    if (fs.existsSync(file)) continue;
    const content = `${frontmatter(post)}\n${bodyTemplate(post.title, post.category)}\n`;
    fs.writeFileSync(file, content, "utf8");
    created += 1;
  }
  console.log(`Cluster generation complete. Created ${created} posts.`);
}

main();

#!/usr/bin/env node
/**
 * Seeds affiliates catalog, blog posts, and ensures content volume for launch.
 * Run: node scripts/seed-full-platform.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");

const AFFILIATES = [
  { id: "chase-sapphire-preferred", name: "Chase Sapphire Preferred", category: "credit-cards", description: "Premium travel rewards card with 60k+ point welcome offers for qualified applicants.", cta: "Compare offer", featured: true },
  { id: "chase-freedom-unlimited", name: "Chase Freedom Unlimited", category: "credit-cards", description: "Flat cash back on every purchase with no annual fee.", cta: "See rates", featured: false },
  { id: "amex-gold", name: "American Express Gold", category: "credit-cards", description: "Dining and grocery rewards powerhouse for everyday spend.", cta: "View offer", featured: true },
  { id: "citi-double-cash", name: "Citi Double Cash", category: "credit-cards", description: "2% cash back on all purchases — simple and effective.", cta: "Apply now", featured: false },
  { id: "capital-one-venture", name: "Capital One Venture", category: "credit-cards", description: "Flexible travel miles with easy redemption options.", cta: "Compare", featured: false },
  { id: "fidelity-brokerage", name: "Fidelity Brokerage", category: "investing", description: "Zero-fee index funds, IRAs, and industry-leading research tools.", cta: "Open account", featured: true },
  { id: "schwab-brokerage", name: "Charles Schwab", category: "investing", description: "Commission-free stocks and ETFs with excellent customer service.", cta: "Start investing", featured: true },
  { id: "vanguard", name: "Vanguard", category: "investing", description: "Low-cost index funds built for long-term wealth builders.", cta: "Open account", featured: false },
  { id: "m1-finance", name: "M1 Finance", category: "investing", description: "Automated pie investing with fractional shares and borrowing.", cta: "Get started", featured: false },
  { id: "robinhood", name: "Robinhood", category: "investing", description: "Mobile-first trading with fractional shares and options.", cta: "Sign up", featured: false },
  { id: "etrade", name: "E*TRADE", category: "investing", description: "Full-service brokerage with powerful trading platforms.", cta: "Compare", featured: false },
  { id: "fundrise", name: "Fundrise", category: "real-estate", description: "Fractional real estate investing starting at low minimums.", cta: "Learn more", featured: true },
  { id: "roofstock", name: "Roofstock", category: "real-estate", description: "Buy cash-flowing rental properties with vetted data.", cta: "Browse rentals", featured: false },
  { id: "airbnb-host", name: "Airbnb Hosting", category: "real-estate", description: "Monetize spare space or build a short-term rental business.", cta: "Start hosting", featured: false },
  { id: "lendingtree-mortgage", name: "LendingTree Mortgages", category: "real-estate", description: "Compare mortgage rates from multiple lenders in minutes.", cta: "Get quotes", featured: false },
  { id: "ynab", name: "YNAB", category: "personal-finance", description: "Zero-based budgeting app that gives every dollar a job.", cta: "Try free", featured: true },
  { id: "monarch-money", name: "Monarch Money", category: "personal-finance", description: "Modern net worth tracking and collaborative budgeting.", cta: "Start trial", featured: false },
  { id: "empower-dashboard", name: "Empower (Personal Capital)", category: "personal-finance", description: "Free net worth dashboard and retirement planning tools.", cta: "Link accounts", featured: false },
  { id: "mint-alternative", name: "Copilot Money", category: "personal-finance", description: "AI-powered spending insights for Apple ecosystem users.", cta: "Try app", featured: false },
  { id: "coinbase", name: "Coinbase", category: "crypto", description: "Beginner-friendly crypto exchange with recurring buys.", cta: "Create account", featured: true },
  { id: "kraken", name: "Kraken", category: "crypto", description: "Established exchange with strong security track record.", cta: "Sign up", featured: false },
  { id: "ledger-wallet", name: "Ledger Hardware Wallet", category: "crypto", description: "Cold storage for long-term crypto self-custody.", cta: "Shop wallets", featured: false },
  { id: "gemini-credit", name: "Gemini Credit Card", category: "crypto", description: "Earn crypto rewards on everyday purchases.", cta: "View card", featured: false },
  { id: "policygenius", name: "Policygenius", category: "insurance", description: "Compare term life insurance quotes from top carriers.", cta: "Get quotes", featured: true },
  { id: "lemonade-insurance", name: "Lemonade Insurance", category: "insurance", description: "Fast renters and home insurance with digital claims.", cta: "Get price", featured: false },
  { id: "haven-life", name: "Haven Life", category: "insurance", description: "Online term life insurance backed by MassMutual.", cta: "Check rate", featured: false },
  { id: "sofi-refinance", name: "SoFi Student Loan Refinance", category: "debt", description: "Lower your student loan rate with member benefits.", cta: "Check rate", featured: true },
  { id: "national-debt-relief", name: "National Debt Relief", category: "debt", description: "Debt settlement program for overwhelming unsecured debt.", cta: "Free consult", featured: false },
  { id: "upstart-loans", name: "Upstart Personal Loans", category: "debt", description: "AI-powered personal loans for consolidation.", cta: "Check rate", featured: false },
  { id: "turbotax", name: "TurboTax", category: "taxes", description: "File federal and state returns with guided support.", cta: "Start return", featured: true },
  { id: "hr-block", name: "H&R Block", category: "taxes", description: "Online and in-person tax prep with audit support.", cta: "Compare plans", featured: false },
  { id: "taxact", name: "TaxAct", category: "taxes", description: "Affordable DIY tax software for simple to moderate returns.", cta: "See pricing", featured: false },
  { id: "fiverr-freelance", name: "Fiverr", category: "side-income", description: "Sell digital services and skills on a global marketplace.", cta: "Start selling", featured: false },
  { id: "upwork", name: "Upwork", category: "side-income", description: "Freelance contracts for writing, dev, design, and ops.", cta: "Create profile", featured: true },
  { id: "shopify-store", name: "Shopify", category: "side-income", description: "Launch an e-commerce store with payments built in.", cta: "Start trial", featured: false },
  { id: "amazon-associates", name: "Amazon Associates", category: "side-income", description: "Earn commissions promoting products you recommend.", cta: "Join program", featured: false },
  { id: "betterment", name: "Betterment", category: "retirement", description: "Robo-advisor for IRAs and taxable automated investing.", cta: "Open IRA", featured: true },
  { id: "wealthfront", name: "Wealthfront", category: "retirement", description: "Automated investing plus high-yield cash account.", cta: "Get started", featured: false },
  { id: "target-date-funds", name: "Vanguard Target Retirement", category: "retirement", description: "Set-and-forget retirement funds by target year.", cta: "Learn more", featured: false },
  { id: "headspace-money", name: "Wealth affirmations bundle", category: "mindset", description: "Mindset routines paired with money habit stacking.", cta: "Try free", featured: false },
];

const POST_TOPICS = [
  { category: "personal-finance", titles: [
    "The 50/30/20 Budget Rule: When It Works and When It Fails",
    "How to Build a 6-Month Emergency Fund in 12 Months",
    "High-Yield Savings vs Money Market: 2026 Comparison",
    "Zero-Based Budgeting for Couples: A Complete Setup Guide",
    "Net Worth Tracking: The One Metric That Changes Everything",
    "How to Negotiate Bills and Save $200+ Per Month",
  ]},
  { category: "investing", titles: [
    "Index Funds vs ETFs: Which Is Better for Beginners?",
    "Dollar-Cost Averaging During Volatile Markets",
    "Roth IRA vs Traditional IRA: Decision Framework",
    "Three-Fund Portfolio: The Simplest Path to Diversification",
    "How to Rebalance Your Portfolio Without Overtrading",
    "Bond Allocation by Age: Rules and Exceptions",
  ]},
  { category: "crypto", titles: [
    "Bitcoin vs Ethereum for Long-Term Investors",
    "Crypto Risk Rules Every Beginner Should Follow",
    "How to Self-Custody Crypto Safely",
    "Stablecoins Explained: Use Cases and Risks",
    "DCA Into Crypto: A Disciplined Entry Strategy",
    "Tax Reporting for Crypto Trades: What to Track",
  ]},
  { category: "real-estate", titles: [
    "House Hacking ROI Framework for First-Time Buyers",
    "Rental Property Cash Flow: Numbers That Matter",
    "When Renting Beats Buying (With Real Math)",
    "BRRRR Strategy Explained Step by Step",
    "How to Analyze a Rental in Under 30 Minutes",
    "Short-Term vs Long-Term Rentals: Profit Comparison",
  ]},
  { category: "credit-cards", titles: [
    "Credit Card Rewards System Without Carrying Debt",
    "Balance Transfer Cards: Traps and Smart Moves",
    "Building Credit from Scratch in 12 Months",
    "Business Credit Cards for Side Hustlers",
    "How to Stack Sign-Up Bonuses Responsibly",
    "Authorized User Strategy for Family Credit Building",
  ]},
  { category: "debt", titles: [
    "Debt Avalanche vs Snowball: Real Dollar Examples",
    "Student Loan Repayment Plans Compared",
    "When Debt Consolidation Helps — and Hurts",
    "How to Pay Off $30k of Debt in 24 Months",
    "Medical Debt Negotiation: Scripts That Work",
    "Refinancing vs Settlement: Know the Difference",
  ]},
  { category: "taxes", titles: [
    "Tax-Advantaged Accounts Ranked for Wealth Building",
    "Estimated Taxes for Freelancers: Simple System",
    "Capital Gains Basics Every Investor Should Know",
    "HSA Triple Tax Advantage Explained",
    "Tax Loss Harvesting Without Wash Sale Mistakes",
    "Quarterly Tax Checklist for Side Income",
  ]},
  { category: "side-income", titles: [
    "Side Hustles That Scale Without Burnout",
    "Freelance Pricing: Charge What You're Worth",
    "Passive Income Myths vs Realistic Streams",
    "How to Start a Digital Product Business in 30 Days",
    "Amazon KDP vs Courses: Income Potential Compared",
    "Local Services Side Hustles With Low Startup Cost",
  ]},
  { category: "retirement", titles: [
    "401(k) Match Math: Don't Leave Free Money",
    "FIRE Variants: Lean, Barista, and Coast Explained",
    "Social Security Timing: Early vs Delayed Benefits",
    "Mega Backdoor Roth: Who Qualifies and How",
    "Retirement Withdrawal Order: Which Account First",
    "How Much Do You Need to Retire? 4% Rule Deep Dive",
  ]},
  { category: "insurance", titles: [
    "Term Life Insurance: How Much Coverage You Need",
    "Renters Insurance: What's Actually Covered",
    "Umbrella Insurance for Growing Net Worth",
    "Health Insurance HSA Pairing Strategy",
    "Disability Insurance for High Earners",
    "Home Insurance Deductibles: Cost vs Risk",
  ]},
  { category: "mindset", titles: [
    "Money Scripts: How Childhood Shapes Spending",
    "The Identity Shift Required to Build Wealth",
    "Delayed Gratification Without Miserable Living",
    "Financial Goals That Actually Stick",
    "How to Recover From a Major Money Mistake",
    "Building a Wealth Routine in 15 Minutes a Day",
  ]},
];

function slugify(title, date) {
  return `${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80)}`;
}

function buildPostBody(title, category) {
  const affiliateHint = AFFILIATES.filter((a) => a.category === category).slice(0, 2).map((a) => a.id);
  return `---
title: "${title.replace(/"/g, '\\"')}"
description: "Actionable guide on ${title.toLowerCase()} — frameworks, mistakes to avoid, and next steps."
date: DATE_PLACEHOLDER
category: ${category}
tags: [${category}, wealth-building, guides]
author: Wealthy Brainiac Research Desk
featured: false
affiliateIds: [${affiliateHint.map((id) => `"${id}"`).join(", ")}]
---

## Why this matters now

${title} is one of the highest-leverage topics in **${category.replace(/-/g, " ")}**. Readers who apply a structured approach typically see clearer decisions within 30 days — not because markets or rates are perfect, but because they stop reacting emotionally.

## The framework we use

1. **Define the outcome** — What dollar result or risk reduction are you targeting?
2. **Quantify the baseline** — Where are you today (accounts, debt, cash flow)?
3. **Pick one system** — One app, one account structure, one habit.
4. **Automate execution** — Remove willpower from the critical path.
5. **Review quarterly** — Change course only on data, not headlines.

## Step-by-step action plan

### Week 1: Audit and align
- List every account and obligation tied to this topic.
- Cut one redundant fee or subscription.
- Set a single weekly money review (20 minutes).

### Week 2: Implement core mechanics
- Open or optimize the primary tool you need.
- Set automatic transfers or contributions.
- Document your rules in a one-page checklist.

### Week 3: Stress-test
- Run a downside scenario (job loss, rate spike, market drop).
- Confirm you have buffer cash or insurance where needed.
- Adjust position sizes or budgets accordingly.

### Week 4: Optimize and scale
- Compare your results to your target metric.
- Add a second improvement only if the first is stable.
- Share the system with a partner or accountability peer.

## Common mistakes

- Chasing the "best" product instead of building a repeatable process.
- Increasing risk before stabilizing cash flow.
- Checking balances daily and overcorrecting.
- Ignoring taxes, fees, or insurance gaps.

## Tools worth comparing

Use our [deals page](/deals) to compare vetted partners in **${category.replace(/-/g, " ")}**. We rank offers by reader value, transparency, and long-term fit — not hype.

## Bottom line

${title} rewards consistency more than intensity. Build the system, automate it, and let compounding do the heavy lifting. For a structured multi-week plan, start with our [free wealth sprint](/newsletter) or explore [Wealth Brainiac Pro](/subscription) for daily research on autopilot.
`;
}

function writeAffiliates() {
  const programs = AFFILIATES.map((p) => ({
    ...p,
    url: `https://example.com/go/${p.id}?ref=wealthybrainiac`,
  }));
  const data = {
    disclosure: "We may earn a commission when you use links on this site. This supports our free content at no extra cost to you.",
    programs,
  };
  fs.writeFileSync(path.join(ROOT, "config", "affiliates.json"), JSON.stringify(data, null, 2));
  console.log(`Wrote ${programs.length} affiliate programs`);
}

function writePosts() {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
  const existing = new Set(fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")));
  let created = 0;
  let dayOffset = 10;

  for (const group of POST_TOPICS) {
    for (const title of group.titles) {
      const d = new Date();
      d.setDate(d.getDate() - dayOffset);
      const date = d.toISOString().slice(0, 10);
      dayOffset--;

      const slug = slugify(title, date);
      const filename = `${slug}.md`;
      if (existing.has(filename)) continue;

      const body = buildPostBody(title, group.category).replace("DATE_PLACEHOLDER", date);
      fs.writeFileSync(path.join(POSTS_DIR, filename), body);
      existing.add(filename);
      created++;
    }
  }
  console.log(`Created ${created} new blog posts (${existing.size} total)`);
}

writeAffiliates();
writePosts();
console.log("\nSeed complete. Run: npm run build");

export const CATEGORY_META: Record<
  string,
  { label: string; description: string; accent: string }
> = {
  "personal-finance": {
    label: "Personal Finance",
    description:
      "Zero-based budgets, emergency funds, and automation — step-by-step guides with real numbers and weekly habits.",
    accent: "from-emerald-500/20 to-teal-600/5",
  },
  investing: {
    label: "Investing",
    description:
      "Index funds, IRA choices, rebalancing, and portfolio design for beginners and long-term builders.",
    accent: "from-sky-500/20 to-blue-600/5",
  },
  crypto: {
    label: "Crypto",
    description: "Digital assets with risk rules and custody discipline.",
    accent: "from-violet-500/20 to-purple-600/5",
  },
  "real-estate": {
    label: "Real Estate",
    description: "House hacking, rentals, and property ROI frameworks.",
    accent: "from-amber-500/20 to-orange-600/5",
  },
  "credit-cards": {
    label: "Credit & Rewards",
    description: "Score optimization and reward maximization playbooks.",
    accent: "from-cyan-500/20 to-teal-600/5",
  },
  debt: {
    label: "Debt Freedom",
    description: "Payoff systems that free cash for investing.",
    accent: "from-rose-500/20 to-red-600/5",
  },
  taxes: {
    label: "Tax Strategy",
    description: "Keep more of what you earn, legally and efficiently.",
    accent: "from-lime-500/20 to-green-600/5",
  },
  "side-income": {
    label: "Side Income",
    description: "Launch income streams without quitting your day job.",
    accent: "from-fuchsia-500/20 to-pink-600/5",
  },
  retirement: {
    label: "Retirement",
    description: "401(k), IRA, and FIRE-ready accumulation plans.",
    accent: "from-indigo-500/20 to-blue-600/5",
  },
  insurance: {
    label: "Insurance",
    description: "Protect wealth without overpaying for coverage.",
    accent: "from-slate-400/20 to-slate-600/5",
  },
  mindset: {
    label: "Wealth Mindset",
    description: "Psychology and habits behind high performers.",
    accent: "from-yellow-500/20 to-amber-600/5",
  },
};

export function getCategoryMeta(slug: string) {
  return (
    CATEGORY_META[slug] ?? {
      label: slug.replace(/-/g, " "),
      description: "Expert guides and actionable frameworks.",
      accent: "from-emerald-500/20 to-teal-600/5",
    }
  );
}

import Link from "next/link";

const categoryOfferMap: Record<string, { label: string; href: string }> = {
  investing: { label: "Get the Money OS Template Pack", href: "/products" },
  "real-estate": { label: "Get the Real Estate Starter offer", href: "/courses/real-estate-starter" },
  "credit-cards": { label: "Master your credit score now", href: "/courses/credit-mastery" },
  debt: { label: "Fix debt faster with our playbook", href: "/courses/credit-mastery" },
  "personal-finance": { label: "Start the 30-Day Wealth Sprint", href: "/start-here" },
};

export function CategoryCtaRibbon({ category }: { category: string }) {
  const offer = categoryOfferMap[category] ?? {
    label: "Unlock premium wealth systems",
    href: "/products",
  };

  return (
    <div className="mt-4 rounded-lg border border-[var(--accent)]/40 bg-[var(--card)] px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-[var(--accent)]">Recommended next step</p>
      <Link href={offer.href} className="mt-1 inline-block text-sm font-semibold no-underline">
        {offer.label} {"->"}
      </Link>
    </div>
  );
}

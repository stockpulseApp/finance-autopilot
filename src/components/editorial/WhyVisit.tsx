import site from "../../../config/site.json";

const pillars = [
  {
    title: "Real strategies, not listicles",
    body: "Every guide walks through the math, the tradeoffs, and what to do Monday morning — whether you're fixing a budget, opening your first brokerage, or analyzing a rental.",
  },
  {
    title: "Built for beginners and optimizers",
    body: "Start with fundamentals or jump to advanced topics like tax-loss harvesting, BRRRR, or FIRE withdrawal order. Content scales with where you are.",
  },
  {
    title: "Honest when we recommend tools",
    body: "We compare brokers, cards, and apps only after teaching the concept. Affiliate links are disclosed; you're never pushed to a product before you understand why it matters.",
  },
];

export function WhyVisit() {
  return (
    <section className="rounded-2xl bg-white p-8 md:p-10 border border-[var(--border)]">
      <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
        Why people read {site.name}
      </h2>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        This isn&apos;t a coupon site. It&apos;s a free money school that publishes new lessons
        every day — so you build skill and confidence, not just click through offers.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-xl bg-[var(--primary-light)] p-5">
            <h3 className="font-bold text-[var(--primary)]">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

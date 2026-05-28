const stats = [
  {
    value: "12,000+",
    label: "Monthly readers",
    detail: "Building systems, not chasing hype",
  },
  {
    value: "8+",
    label: "Wealth pillars",
    detail: "Investing, RE, credit, crypto & more",
  },
  {
    value: "Daily",
    label: "Fresh playbooks",
    detail: "Actionable guides you can use today",
  },
  {
    value: "4,300+",
    label: "Downloads",
    detail: "Templates, checklists & sprint kits",
  },
];

export function StatsStrip() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
        >
          <p className="font-display text-3xl font-semibold text-gradient md:text-4xl">
            {stat.value}
          </p>
          <p className="mt-2 font-semibold text-[var(--foreground)]">{stat.label}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{stat.detail}</p>
        </div>
      ))}
    </section>
  );
}

const items = [
  { icon: "✓", text: "Compare 50+ vetted tools" },
  { icon: "✓", text: "Free expert guides daily" },
  { icon: "✓", text: "No hidden booking fees" },
  { icon: "✓", text: "Trusted by 12,000+ readers/mo" },
];

export function TrustStrip() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl border border-[var(--border)] bg-white px-6 py-4 shadow-sm">
      {items.map((item) => (
        <p
          key={item.text}
          className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f4ea] text-xs text-[var(--success)]">
            {item.icon}
          </span>
          {item.text}
        </p>
      ))}
    </section>
  );
}

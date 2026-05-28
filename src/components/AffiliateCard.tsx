import { withAffiliateParams } from "@/lib/affiliates";
import type { AffiliateProgram } from "@/lib/types";

export function AffiliateCard({
  program,
  source = "deals-page",
}: {
  program: AffiliateProgram;
  source?: string;
}) {
  const href = withAffiliateParams(program.url, source);

  return (
    <div className="glass-card flex flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {program.category.replace(/-/g, " ")}
      </p>
      <h3 className="font-display mt-2 text-xl font-semibold">{program.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {program.description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="btn-primary mt-6 text-center text-sm"
      >
        {program.cta}
      </a>
    </div>
  );
}

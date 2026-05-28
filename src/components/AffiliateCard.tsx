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
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col">
      <p className="text-xs uppercase text-[var(--muted)]">{program.category.replace(/-/g, " ")}</p>
      <h3 className="mt-1 text-lg font-semibold">{program.name}</h3>
      <p className="mt-2 text-sm text-[var(--muted)] flex-1">{program.description}</p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-4 inline-flex justify-center rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-[var(--accent-dim)] hover:text-white"
      >
        {program.cta}
      </a>
    </div>
  );
}

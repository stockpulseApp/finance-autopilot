import type { PostSource, SocialQuote } from "@/lib/types";

export function ArticleSources({
  sources,
  socialQuotes,
}: {
  sources?: PostSource[];
  socialQuotes?: SocialQuote[];
}) {
  const validSources = sources?.filter((s) => s.url) ?? [];
  const validSocial = socialQuotes?.filter((q) => q.url && q.paraphrase) ?? [];

  if (!validSources.length && !validSocial.length) return null;

  return (
    <div className="mt-12 space-y-8 border-t border-[var(--border)] pt-10">
      {validSocial.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold">On X &amp; social</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            What people and accounts are discussing — paraphrased with links to originals.
          </p>
          <ul className="mt-4 space-y-4">
            {validSocial.map((q, i) => (
              <li
                key={i}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm"
              >
                <p className="leading-relaxed text-[var(--foreground)]">{q.paraphrase}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  {q.attribution && <span>{q.attribution} · </span>}
                  <a href={q.url} target="_blank" rel="noopener noreferrer">
                    View post →
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {validSources.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold">Sources &amp; further reading</h2>
          <ul className="mt-4 space-y-2">
            {validSources.map((s, i) => (
              <li key={i} className="text-sm">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold">
                  {s.outlet ? `${s.outlet}: ` : ""}
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

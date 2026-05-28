import fs from "fs";
import path from "path";
import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { getCategoryMeta } from "@/lib/categories";

type PulseSection = {
  category: string;
  topic: string;
  headline?: string;
  summary?: string;
  editorial?: string;
  socialHighlights?: { text: string; source: string; url: string }[];
  sources?: { title: string; url: string; outlet: string }[];
};

type PulsePayload = {
  date: string;
  title: string;
  intro: string;
  sections: PulseSection[];
};

function loadPulse(): PulsePayload | null {
  const file = path.join(process.cwd(), "content", "insights", "latest.json");
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as PulsePayload;
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Money Pulse",
  description:
    "Weekly synthesis of financial news and discourse — with links to original reporting and posts.",
};

export default function InsightsPage() {
  const pulse = loadPulse();

  if (!pulse) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-12 text-center">
        <h1 className="text-3xl font-extrabold">Money Pulse</h1>
        <p className="text-[var(--muted)]">
          Our weekly desk brief — curated headlines, expert reporting, and what people are saying on
          X — publishes after the first research run.
        </p>
        <Link href="/blog" className="btn-primary inline-block no-underline">
          Read latest articles
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <PageHero title={pulse.title} subtitle={pulse.intro} heroContext="insights">
        <p className="text-sm text-blue-100">Updated {pulse.date}</p>
      </PageHero>

      <div className="space-y-10">
        {pulse.sections.map((section) => {
          const cat = getCategoryMeta(section.category);
          return (
            <section
              key={section.category}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8"
            >
              <Link
                href={`/categories/${section.category}`}
                className="text-xs font-bold uppercase text-[var(--primary)] no-underline"
              >
                {cat.label}
              </Link>
              <h2 className="mt-2 text-xl font-extrabold md:text-2xl">
                {section.headline ?? section.topic}
              </h2>
              {section.summary && (
                <p className="mt-3 text-[var(--muted)]">{section.summary}</p>
              )}
              {section.editorial && (
                <div className="prose prose-sm mt-6 max-w-none">
                  <p className="whitespace-pre-wrap leading-relaxed">{section.editorial}</p>
                </div>
              )}

              {section.socialHighlights && section.socialHighlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold">On X &amp; social</h3>
                  <ul className="mt-3 space-y-3">
                    {section.socialHighlights.map((s, i) => (
                      <li
                        key={i}
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm"
                      >
                        <p>{s.text}</p>
                        <p className="mt-2 text-xs text-[var(--muted)]">
                          {s.source && <span>{s.source} · </span>}
                          {s.url && (
                            <a href={s.url} target="_blank" rel="noopener noreferrer">
                              Source →
                            </a>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.sources && section.sources.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold">Sources</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    {section.sources.map((s, i) => (
                      <li key={i}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          {s.outlet ? `${s.outlet}: ` : ""}
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <p className="text-center text-sm text-[var(--muted)]">
        Want depth on a topic? Browse our{" "}
        <Link href="/guides" className="font-semibold text-[var(--primary)]">
          free &amp; premium guides
        </Link>{" "}
        or{" "}
        <Link href="/blog" className="font-semibold text-[var(--primary)]">
          daily analysis
        </Link>
        .
      </p>
    </div>
  );
}

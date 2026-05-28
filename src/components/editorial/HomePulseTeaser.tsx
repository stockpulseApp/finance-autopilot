import fs from "fs";
import path from "path";
import Link from "next/link";

export function HomePulseTeaser() {
  const file = path.join(process.cwd(), "content", "insights", "latest.json");
  if (!fs.existsSync(file)) return null;

  let headline = "Weekly Money Pulse";
  try {
    const pulse = JSON.parse(fs.readFileSync(file, "utf8")) as {
      sections?: { headline?: string }[];
      date?: string;
    };
    headline = pulse.sections?.[0]?.headline ?? headline;
  } catch {
    /* use default */
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <p className="text-xs font-bold uppercase text-[var(--primary)]">Money Pulse</p>
        <h2 className="mt-1 text-xl font-extrabold md:text-2xl">{headline}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Curated headlines, Fed and market reporting, and social discourse — with links to
          originals.
        </p>
      </div>
      <Link href="/insights" className="btn-primary-blue shrink-0 text-center no-underline">
        Read this week&apos;s pulse
      </Link>
    </section>
  );
}

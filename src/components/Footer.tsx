import Link from "next/link";
import site from "../../config/site.json";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3 text-sm text-[var(--muted)]">
        <div>
          <p className="font-semibold text-[var(--foreground)]">{site.name}</p>
          <p className="mt-2">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/disclosure" className="no-underline hover:text-[var(--foreground)]">
            Affiliate disclosure
          </Link>
          <Link href="/privacy" className="no-underline hover:text-[var(--foreground)]">
            Privacy
          </Link>
          <Link href="/about" className="no-underline hover:text-[var(--foreground)]">
            About
          </Link>
        </div>
        <div>
          <p>
            © {new Date().getFullYear()} {site.name}. Educational content only — not
            financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

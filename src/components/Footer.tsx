import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import site from "../../config/site.json";

const explore = [
  { href: "/blog", label: "All guides" },
  { href: "/categories", label: "Topics" },
  { href: "/start-here", label: "Start here" },
  { href: "/tools", label: "Calculators" },
];

const monetize = [
  { href: "/products", label: "Digital products" },
  { href: "/courses", label: "Courses" },
  { href: "/deals", label: "Partner deals" },
  { href: "/wealth-building-guide", label: "Wealth guide" },
];

const legal = [
  { href: "/disclosure", label: "Affiliate disclosure" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/about", label: "About us" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-black text-[#042f1a]">
                WB
              </span>
              <span className="font-display text-xl font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              {site.tagline}. Daily playbooks on investing, real estate, credit,
              taxes, crypto, and income — built for ambitious wealth builders.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Programs
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {monetize.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Free wealth sprint
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              30 days of actionable money moves — delivered to your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Educational content only —
            not financial, tax, or legal advice.
          </p>
          <div className="flex flex-wrap gap-4">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="no-underline hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

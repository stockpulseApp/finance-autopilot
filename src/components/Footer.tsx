import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import site from "../../config/site.json";

const columns = [
  {
    title: "Compare",
    links: [
      { href: "/deals", label: "All deals" },
      { href: "/categories", label: "By topic" },
      { href: "/products", label: "Packages" },
      { href: "/courses", label: "Courses" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Free guides" },
      { href: "/start-here", label: "Start here" },
      { href: "/tools", label: "Calculators" },
      { href: "/wealth-building-guide", label: "Wealth guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/earn", label: "Partner programs" },
      { href: "/disclosure", label: "Affiliate disclosure" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <p className="text-xl font-extrabold text-[var(--primary)]">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              The comparison marketplace for money tools — find better brokers, cards,
              courses, and wealth programs without the noise.
            </p>
            <div className="mt-6 max-w-sm">
              <p className="text-sm font-bold text-[var(--foreground)]">Deal alerts</p>
              <p className="text-xs text-[var(--muted)]">New offers &amp; guides in your inbox.</p>
              <div className="mt-3">
                <NewsletterForm compact />
              </div>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-[var(--foreground)]">{col.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] no-underline hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {site.name}. Educational comparisons — not financial advice.
          Prices and offers may change. See affiliate disclosure.
        </p>
      </div>
    </footer>
  );
}

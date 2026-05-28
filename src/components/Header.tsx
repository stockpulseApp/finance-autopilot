import Link from "next/link";
import site from "../../config/site.json";

const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Topics" },
  { href: "/deals", label: "Deals" },
  { href: "/courses", label: "Courses" },
  { href: "/tools", label: "Tools" },
  { href: "/newsletter", label: "Newsletter" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-bold text-lg no-underline hover:no-underline">
          <span className="text-[var(--accent)]">{site.name}</span>
        </Link>
        <nav className="hidden md:flex flex-wrap gap-5 text-sm text-[var(--muted)]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--foreground)] no-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/newsletter"
          className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-black no-underline hover:bg-[var(--accent-dim)] hover:text-white hover:no-underline"
        >
          Free wealth guide
        </Link>
      </div>
    </header>
  );
}

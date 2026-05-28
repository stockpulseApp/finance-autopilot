import Link from "next/link";
import site from "../../config/site.json";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "/start-here", label: "Start Here" },
  { href: "/blog", label: "Guides" },
  { href: "/categories", label: "Topics" },
  { href: "/products", label: "Products" },
  { href: "/courses", label: "Courses" },
  { href: "/deals", label: "Deals" },
  { href: "/tools", label: "Tools" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--background)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 no-underline hover:no-underline"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-black text-[#042f1a] shadow-lg shadow-emerald-500/25">
            WB
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] no-underline transition-colors hover:bg-white/5 hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/newsletter" className="btn-primary hidden text-sm sm:inline-flex">
            Free wealth sprint
          </Link>
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}

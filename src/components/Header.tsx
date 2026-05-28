import Link from "next/link";
import site from "../../config/site.json";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "/deals", label: "Deals" },
  { href: "/categories", label: "Topics" },
  { href: "/blog", label: "Guides" },
  { href: "/guides", label: "Downloads" },
  { href: "/products", label: "Products" },
  { href: "/courses", label: "Courses" },
  { href: "/subscription", label: "Pro" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-2 no-underline hover:no-underline">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)] text-lg font-black text-white">
            W
          </span>
          <div className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight text-[var(--primary)]">
              {site.name}
            </span>
            <span className="hidden text-[10px] font-semibold uppercase text-[var(--muted)] sm:block">
              Compare &amp; save on wealth tools
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--foreground)] no-underline hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/deals"
            className="hidden rounded-md bg-[var(--primary-light)] px-3 py-2 text-sm font-bold text-[var(--primary)] no-underline sm:inline-block"
          >
            Compare deals
          </Link>
          <Link href="/newsletter" className="btn-deal hidden text-sm sm:inline-flex">
            Free deals alert
          </Link>
          <MobileNav items={nav} variant="marketplace" />
        </div>
      </div>
    </header>
  );
}

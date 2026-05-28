"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNav({
  items,
  variant = "marketplace",
}: {
  items: { href: string; label: string }[];
  variant?: "marketplace" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const ctaClass = variant === "marketplace" ? "btn-deal w-full text-center" : "btn-primary w-full text-center";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--foreground)]"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[57px] z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav className="fixed right-3 top-[68px] z-50 w-[min(300px,calc(100vw-1.5rem))] rounded-xl border border-[var(--border)] bg-white p-3 shadow-xl">
            <ul className="flex flex-col gap-0.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-[var(--foreground)] no-underline hover:bg-[var(--primary-light)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-[var(--border)] pt-2">
                <Link href="/newsletter" onClick={() => setOpen(false)} className={ctaClass}>
                  Free deals alert
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

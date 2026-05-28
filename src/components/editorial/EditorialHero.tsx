import Link from "next/link";
import Image from "next/image";
import { getHeroImage } from "@/lib/marketplace-images";
import site from "../../../config/site.json";

const topics = [
  { label: "Budgeting", href: "/categories/personal-finance" },
  { label: "Investing", href: "/categories/investing" },
  { label: "Real estate", href: "/categories/real-estate" },
  { label: "Credit", href: "/categories/credit-cards" },
  { label: "Side income", href: "/categories/side-income" },
  { label: "Retirement", href: "/categories/retirement" },
];

export function EditorialHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[var(--primary-dark)] shadow-lg">
      <div className="absolute inset-0 opacity-25">
        <Image src={getHeroImage("home")} alt="" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)]/90 to-[var(--primary)]/70" />

      <div className="relative px-6 py-12 md:px-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
          {site.name} · Free wealth education
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl md:leading-[1.1]">
          Learn how money actually works — then choose the right tools
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100">
          In-depth guides on budgeting, investing, property, taxes, and building real
          wealth. No fluff, no hype — just clear strategies you can use this week, with
          honest tool comparisons when you&apos;re ready to act.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/blog" className="btn-deal px-8 py-3 text-base">
            Read free guides
          </Link>
          <Link
            href="/start-here"
            className="rounded-lg border-2 border-white/80 px-6 py-3 text-base font-bold text-white no-underline hover:bg-white/10"
          >
            New here? Start
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-blue-200">
          <span>Explore:</span>
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="font-semibold text-white no-underline hover:underline"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

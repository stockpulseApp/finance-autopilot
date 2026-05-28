import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { ProductOfferCard } from "@/components/marketplace/ProductOfferCard";
import { getCourses } from "@/lib/courses";

export const metadata = { title: "Courses & Programs" };

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="space-y-10">
      <PageHero
        title="Courses & wealth programs"
        subtitle={`${courses.length} structured programs with modules, outcomes, and instant enrollment.`}
        category="investing"
        heroContext="courses"
      >
        <Link
          href="/subscription"
          className="inline-block rounded-lg border-2 border-white px-5 py-2 font-bold text-white no-underline hover:bg-white/10"
        >
          Elite includes all courses
        </Link>
      </PageHero>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div key={c.slug} className="flex flex-col">
            <ProductOfferCard
              offer={{
                slug: c.slug,
                name: c.title,
                headline: c.description,
                price: c.price,
                cta: "Enroll now",
              }}
              href={c.checkoutUrl ?? `/courses/${c.slug}`}
              reviews={150 + c.modules * 12}
              rating={4.7}
            />
            <ul className="marketplace-card -mt-2 rounded-t-none border-t-0 px-5 pb-5 text-sm text-[var(--muted)]">
              {c.outcomes.slice(0, 3).map((o) => (
                <li key={o} className="mt-1 flex gap-2">
                  <span className="text-[var(--success)]">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

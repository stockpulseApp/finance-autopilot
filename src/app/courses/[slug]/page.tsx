import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolvePurchaseHref, isValidStripePaymentLink } from "@/lib/checkout";
import { getCourseBySlug, getCourses } from "@/lib/courses";
import { PageHero } from "@/components/marketplace/PageHero";
import { getCategoryImage } from "@/lib/marketplace-images";

export async function generateStaticParams() {
  return getCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return { title: course.title, description: course.description };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const categoryBySlug: Record<string, string> = {
    "wealth-foundation": "personal-finance",
    "real-estate-starter": "real-estate",
    "credit-mastery": "credit-cards",
    "tax-optimization-lab": "taxes",
    "crypto-investor-bootcamp": "crypto",
    "side-hustle-accelerator": "side-income",
    "fire-masterclass": "retirement",
    "insurance-essentials": "insurance",
  };
  const image = getCategoryImage(categoryBySlug[course.slug] ?? "investing");

  return (
    <div className="space-y-10">
      <PageHero
        title={course.title}
        subtitle={course.description}
        image={image}
      >
        <p className="text-sm font-medium text-blue-100">
          {course.level} · {course.modules} modules · ${course.price}
        </p>
      </PageHero>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">What you&apos;ll learn</h2>
            <ul className="mt-4 space-y-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-[var(--muted)]">
                  <span className="text-[var(--cta)]">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-56 overflow-hidden rounded-xl md:h-72">
            <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
          </div>
        </div>

        <aside className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm h-fit sticky top-24">
          <p className="text-sm text-[var(--muted)]">One-time purchase</p>
          <p className="mt-1 text-4xl font-extrabold text-[var(--foreground)]">${course.price}</p>
          {isValidStripePaymentLink(course.checkoutUrl) ? (
            <a
              href={course.checkoutUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-lg bg-[var(--cta)] px-6 py-3 text-center font-semibold text-white no-underline hover:opacity-90"
            >
              Buy now
            </a>
          ) : (
            <Link
              href={resolvePurchaseHref({
                checkoutUrl: course.checkoutUrl,
                slug: course.slug,
                kind: "course",
              })}
              className="mt-6 block w-full rounded-lg bg-[var(--cta)] px-6 py-3 text-center font-semibold text-white no-underline hover:opacity-90"
            >
              Join course waitlist
            </Link>
          )}
          <p className="mt-4 text-xs text-[var(--muted)]">
            Secure checkout via Stripe. Instant access after payment.
          </p>
          <Link href="/subscription" className="mt-4 block text-center text-sm font-semibold text-[var(--primary)]">
            Or get all courses with Elite →
          </Link>
          <Link href="/courses" className="mt-6 block text-center text-sm text-[var(--muted)]">
            ← All courses
          </Link>
        </aside>
      </div>
    </div>
  );
}

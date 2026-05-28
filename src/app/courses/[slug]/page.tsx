import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCourses } from "@/lib/courses";

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

  return (
    <div className="max-w-2xl">
      <p className="text-sm text-[var(--muted)]">
        {course.level} · {course.modules} modules
      </p>
      <h1 className="mt-2 text-4xl font-bold">{course.title}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{course.description}</p>
      <ul className="mt-8 space-y-2">
        {course.outcomes.map((o) => (
          <li key={o} className="text-[var(--muted)]">
            ✓ {o}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-4xl font-bold">${course.price}</p>
      {course.checkoutUrl?.startsWith("https://buy.stripe.com/") ? (
        <a
          href={course.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-[var(--accent)] px-8 py-3 font-semibold text-black no-underline"
        >
          Buy now — Stripe checkout
        </a>
      ) : (
        <form action="/api/checkout" method="POST" className="mt-6">
          <input type="hidden" name="courseSlug" value={course.slug} />
          <button
            type="submit"
            className="rounded-lg bg-[var(--accent)] px-8 py-3 font-semibold text-black"
          >
            Buy now — Stripe checkout
          </button>
        </form>
      )}
      <p className="mt-4 text-xs text-[var(--muted)]">
        Add `STRIPE_SECRET_KEY` and a real `stripePriceId` in `config/courses.json` to enable live
        checkout.
      </p>
      <Link href="/courses" className="mt-8 inline-block text-sm">
        ← All courses
      </Link>
    </div>
  );
}

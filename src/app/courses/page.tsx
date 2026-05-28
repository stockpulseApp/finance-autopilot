import Link from "next/link";
import { getCourses } from "@/lib/courses";

export const metadata = { title: "Courses" };

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div>
      <h1 className="text-3xl font-bold">Courses</h1>
      <p className="mt-2 text-[var(--muted)] max-w-2xl">
        Structured programs for budgeting, investing, real estate, and credit. Connect Stripe to
        sell automatically.
      </p>
      <div className="mt-10 grid gap-8">
        {courses.map((c) => (
          <div
            key={c.slug}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 md:flex md:justify-between md:gap-8"
          >
            <div className="flex-1">
              <p className="text-xs uppercase text-[var(--muted)]">
                {c.level} · {c.modules} modules
              </p>
              <h2 className="mt-2 text-2xl font-bold">{c.title}</h2>
              <p className="mt-3 text-[var(--muted)]">{c.description}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {c.outcomes.map((o) => (
                  <li key={o}>✓ {o}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 md:mt-0 md:text-right shrink-0">
              <p className="text-3xl font-bold">${c.price}</p>
              <Link
                href={`/courses/${c.slug}`}
                className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-5 py-2 font-semibold text-black no-underline"
              >
                Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

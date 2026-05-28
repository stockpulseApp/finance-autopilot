import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold">Wealth Weekly</h1>
      <p className="mt-4 text-[var(--muted)]">
        One email per week: actionable money moves, new articles, and vetted deals. No spam.
      </p>
      <div className="mt-8 text-left">
        <NewsletterForm />
      </div>
    </div>
  );
}

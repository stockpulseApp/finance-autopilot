import { NewsletterForm } from "@/components/NewsletterForm";
import { RevenueCtaPanel } from "@/components/RevenueCtaPanel";

export const metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="max-w-lg text-center mx-auto">
        <h1 className="text-3xl font-bold">Wealth Weekly</h1>
        <p className="mt-4 text-[var(--muted)]">
          One email per week: actionable money moves, new articles, and vetted deals. No spam.
        </p>
        <div className="mt-8 text-left">
          <NewsletterForm />
        </div>
      </div>

      <RevenueCtaPanel
        title="Want faster results than free content alone?"
        subtitle="Use paid templates and systems to implement your money plan this week."
      />
    </div>
  );
}

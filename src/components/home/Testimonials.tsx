import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    text: "I finally stopped doom-scrolling finance Twitter and followed one system. Paid off $14k in credit cards in 11 months while still maxing my 401(k).",
    name: "Marcus T.",
    role: "Software engineer · Austin",
  },
  {
    text: "The house-hacking ROI framework alone paid for the templates. We're under contract on our first duplex using their checklist.",
    name: "Priya & James K.",
    role: "First-time investors · Denver",
  },
  {
    text: "Daily articles that actually tell me what to do next. The credit rewards system post added $1,200 in value last year.",
    name: "Elena R.",
    role: "Marketing director · Chicago",
  },
];

export function Testimonials() {
  return (
    <section>
      <SectionHeading
        eyebrow="Reader wins"
        title="Real people building real systems"
        description="We teach frameworks — your results depend on execution. Here's what readers report."
        align="center"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {quotes.map((q) => (
          <blockquote
            key={q.name}
            className="glass-card flex flex-col rounded-2xl p-6"
          >
            <div className="flex gap-1 text-[var(--gold)]" aria-hidden>
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <p className="mt-4 flex-1 text-[var(--foreground)] leading-relaxed">
              &ldquo;{q.text}&rdquo;
            </p>
            <footer className="mt-6 border-t border-[var(--border)] pt-4">
              <cite className="not-italic font-semibold text-[var(--foreground)]">
                {q.name}
              </cite>
              <p className="text-sm text-[var(--muted)]">{q.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

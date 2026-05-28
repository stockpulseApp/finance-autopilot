import site from "../../../config/site.json";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">About {site.name}</h1>
      <p className="mt-4 text-[var(--muted)] leading-relaxed">
        {site.name} publishes daily guides on personal finance, investing, real estate, credit, and
        wealth building. Our mission is to make high-quality money education accessible — with
        transparent recommendations and tools that help you take action.
      </p>
      <p className="mt-4 text-[var(--muted)] leading-relaxed">
        Articles are researched and generated with AI assistance, then structured for clarity and
        accuracy. Always verify rates, offers, and tax rules before making decisions.
      </p>
    </div>
  );
}

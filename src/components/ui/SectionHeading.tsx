export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2
        className={`font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl ${alignClass}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-lg text-[var(--muted)] leading-relaxed ${alignClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}

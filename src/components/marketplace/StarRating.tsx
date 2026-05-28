export function StarRating({
  rating = 4.5,
  reviews,
}: {
  rating?: number;
  reviews?: number;
}) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
      <span className="rating-stars font-bold" aria-hidden>
        {"★".repeat(full)}
        {half ? "½" : ""}
        <span className="text-[var(--border)]">{"★".repeat(5 - full - (half ? 1 : 0))}</span>
      </span>
      <span className="font-semibold text-[var(--foreground)]">{rating.toFixed(1)}</span>
      {reviews != null && (
        <span className="text-[var(--muted)]">({reviews.toLocaleString()} reviews)</span>
      )}
    </div>
  );
}

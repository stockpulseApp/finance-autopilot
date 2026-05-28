/**
 * Placeholder ad slot — swap for Google AdSense, Mediavine, or Raptive once approved.
 * Set NEXT_PUBLIC_ADS_ENABLED=true when ready.
 */
export function AdSlot({ placement }: { placement: string }) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
  if (!enabled) return null;

  return (
    <div
      className="my-8 flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-[var(--border)] text-xs text-[var(--muted)]"
      data-ad-placement={placement}
    >
      Ad: {placement}
    </div>
  );
}

/** Returns true for URLs that must not be shown to users as checkout/affiliate links. */
export function isBrokenLink(url?: string | null): boolean {
  if (!url) return true;
  return /PLACEHOLDER|example\.com/i.test(url);
}

export function isValidStripePaymentLink(url?: string | null): boolean {
  return Boolean(url?.startsWith("https://buy.stripe.com/") && !isBrokenLink(url));
}

/** Product/guide/course purchase target — never sends users to example.com or Stripe placeholders. */
export function resolvePurchaseHref(options: {
  checkoutUrl?: string | null;
  stripePriceId?: string | null;
  slug: string;
  kind: "product" | "guide" | "course" | "subscription";
}): string {
  const { checkoutUrl, stripePriceId, slug, kind } = options;

  if (isValidStripePaymentLink(checkoutUrl)) return checkoutUrl!;

  if (kind === "product" && stripePriceId && !stripePriceId.includes("REPLACE")) {
    return `/buy/${slug}`;
  }

  const param = kind === "subscription" ? "plan" : kind;
  return `/newsletter?${param}=${encodeURIComponent(slug)}&intent=purchase`;
}

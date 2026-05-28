import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";

export async function POST(request: Request) {
  const form = await request.formData();
  const productSlug = String(form.get("productSlug") ?? "");

  const product = getProductBySlug(productSlug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (product.type === "service" && product.checkoutUrl) {
    return NextResponse.redirect(product.checkoutUrl, { status: 303 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      {
        error: "Stripe not configured",
        hint: "Set STRIPE_SECRET_KEY in your environment variables",
      },
      { status: 501 }
    );
  }

  if (!product.stripePriceId || product.stripePriceId.startsWith("price_REPLACE_ME")) {
    return NextResponse.json(
      {
        error: "Product Stripe price not configured",
        hint: "Set a real stripePriceId for this product in config/products.json",
      },
      { status: 501 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const stripe = new Stripe(stripeKey);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: product.stripePriceId, quantity: 1 }],
    success_url: `${siteUrl}/checkout/success?product=${encodeURIComponent(product.slug)}`,
    cancel_url: `${siteUrl}/checkout/cancel?product=${encodeURIComponent(product.slug)}`,
    metadata: {
      productSlug: product.slug,
      productName: product.name,
      productType: product.type,
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe session URL missing" }, { status: 502 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}

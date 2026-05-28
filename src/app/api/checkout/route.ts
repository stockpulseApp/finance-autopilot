import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/courses";
import Stripe from "stripe";

export async function POST(request: Request) {
  const form = await request.formData();
  const courseSlug = String(form.get("courseSlug") ?? "");

  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // Fallback mode: direct Stripe Payment Link checkout (no secret key required).
  if (course.checkoutUrl && course.checkoutUrl.startsWith("https://buy.stripe.com/")) {
    return NextResponse.redirect(course.checkoutUrl, { status: 303 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      {
        error: "Stripe not configured",
        hint:
          "Either set STRIPE_SECRET_KEY + stripePriceId, or add a Stripe Payment Link in checkoutUrl.",
        course: course.title,
      },
      { status: 501 }
    );
  }

  if (!course.stripePriceId || course.stripePriceId.startsWith("price_REPLACE_ME")) {
    return NextResponse.json(
      {
        error: "Course Stripe price not configured",
        hint: "Set a real Stripe price id for this course in config/courses.json",
      },
      { status: 501 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const stripe = new Stripe(stripeKey);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: course.stripePriceId, quantity: 1 }],
    success_url: `${siteUrl}/checkout/success?course=${encodeURIComponent(course.slug)}`,
    cancel_url: `${siteUrl}/checkout/cancel?course=${encodeURIComponent(course.slug)}`,
    metadata: {
      courseSlug: course.slug,
      courseTitle: course.title,
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe session URL missing" }, { status: 502 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}

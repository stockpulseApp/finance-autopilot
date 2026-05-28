import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/courses";

export async function POST(request: Request) {
  const form = await request.formData();
  const courseSlug = String(form.get("courseSlug") ?? "");

  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      {
        error: "Stripe not configured",
        hint: "Add STRIPE_SECRET_KEY and stripePriceId in config/courses.json",
        course: course.title,
      },
      { status: 501 }
    );
  }

  // Stripe Checkout: install `stripe` package and create session here
  // https://docs.stripe.com/checkout/quickstart
  return NextResponse.json(
    {
      message: "Install stripe SDK and implement createCheckoutSession",
      priceId: course.stripePriceId,
    },
    { status: 501 }
  );
}

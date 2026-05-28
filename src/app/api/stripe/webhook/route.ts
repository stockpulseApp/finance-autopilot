import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeKey ? new Stripe(stripeKey) : null;

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const product = session.metadata?.productName ?? session.metadata?.courseTitle ?? "Unknown";
  const email = session.customer_details?.email ?? "unknown";

  // TODO: Replace with your fulfillment provider integrations:
  // - grant course access
  // - deliver digital product email
  // - add buyer tags in ConvertKit/Beehiiv
  // - send upsell sequence
  console.log("[stripe] checkout.session.completed", {
    product,
    email,
    sessionId: session.id,
    amountTotal: session.amount_total,
  });
}

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return new Response("Stripe webhook not configured", { status: 501 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid webhook signature";
    return new Response(message, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
  }

  return new Response("ok", { status: 200 });
}

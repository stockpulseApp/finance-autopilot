import { NextResponse } from "next/server";

const LEAD_MAGNET = "/guides/30-day-wealth-sprint";

async function subscribeConvertKit(email: string): Promise<boolean> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) return false;

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
    },
  );
  return res.ok;
}

async function subscribeBeehiiv(email: string): Promise<boolean> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return false;

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "dunriteglobal",
        utm_medium: "newsletter",
        referring_site: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dunriteglobal.com",
      }),
    },
  );
  return res.ok;
}

async function forwardWebhook(email: string): Promise<boolean> {
  const url = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "dunriteglobal-newsletter",
        subscribedAt: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email?.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const providers: string[] = [];

  if (await subscribeConvertKit(email)) providers.push("convertkit");
  if (await subscribeBeehiiv(email)) providers.push("beehiiv");
  if (await forwardWebhook(email)) providers.push("webhook");

  if (providers.length === 0) {
    console.log("[newsletter] subscribe (no provider wired):", email);
    return NextResponse.json({
      ok: true,
      mode: "stub",
      leadMagnetUrl: LEAD_MAGNET,
      message:
        "You are subscribed for this session. Wire ConvertKit, Beehiiv, or NEWSLETTER_WEBHOOK_URL in Vercel to capture emails permanently.",
    });
  }

  return NextResponse.json({
    ok: true,
    mode: providers.join("+"),
    leadMagnetUrl: LEAD_MAGNET,
  });
}

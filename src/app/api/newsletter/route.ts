import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email?.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    // Dev-friendly: log and succeed so UI can be tested
    console.log("[newsletter] subscribe (not wired):", email);
    return NextResponse.json({
      ok: true,
      mode: "stub",
      leadMagnetUrl: "/lead-magnets/wealth-sprint-checklist.txt",
    });
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Provider error" }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    leadMagnetUrl: "/lead-magnets/wealth-sprint-checklist.txt",
  });
}

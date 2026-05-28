import { NextResponse } from "next/server";
import { getAffiliateOutboundUrl, getAffiliateProgramById } from "@/lib/affiliates";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const program = getAffiliateProgramById(id);

  if (!program) {
    return NextResponse.redirect(new URL("/deals", request.url), 302);
  }

  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source") ?? `go-${id}`;
  const target = getAffiliateOutboundUrl(program, source);

  return NextResponse.redirect(target, { status: 302 });
}

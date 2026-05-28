import { affiliateDisclosure } from "@/lib/affiliates";

export const metadata = { title: "Affiliate Disclosure" };

export default function DisclosurePage() {
  return (
    <div className="max-w-2xl prose">
      <h1>Affiliate disclosure</h1>
      <p>{affiliateDisclosure}</p>
      <p>
        Some links on {process.env.NEXT_PUBLIC_SITE_NAME ?? "this site"} are affiliate links. If
        you click and take action, we may receive compensation. We only recommend products we
        believe add value for readers building wealth.
      </p>
      <p>
        Content is for education only and is not personalized financial, tax, or legal advice.
        Consult licensed professionals for your situation.
      </p>
    </div>
  );
}

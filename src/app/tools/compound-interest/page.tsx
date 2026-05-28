"use client";

import { useMemo, useState } from "react";
import { AffiliateCard } from "@/components/AffiliateCard";
import { getAffiliatesByCategory } from "@/lib/affiliates";

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const futureValue = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const fvPrincipal = principal * Math.pow(1 + r, n);
    const fvContributions = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
    return fvPrincipal + fvContributions;
  }, [principal, monthly, rate, years]);

  const brokers = getAffiliatesByCategory("investing").slice(0, 2);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Compound interest calculator</h1>
      <div className="mt-8 space-y-4">
        <label className="block text-sm">
          Starting balance ($)
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Monthly contribution ($)
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Annual return (%)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Years
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
      </div>
      <p className="mt-8 text-2xl font-bold text-[var(--accent)]">
        Estimated value: ${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {brokers.map((b) => (
          <AffiliateCard key={b.id} program={b} source="compound-calculator" />
        ))}
      </div>
    </div>
  );
}

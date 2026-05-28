"use client";

import { useMemo, useState } from "react";

export default function MortgagePaymentPage() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const monthly = useMemo(() => {
    const principal = homePrice * (1 - downPayment / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [homePrice, downPayment, rate, years]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Mortgage payment estimator</h1>
      <p className="mt-2 text-[var(--muted)]">
        Estimate your monthly principal plus interest.
      </p>
      <div className="mt-8 space-y-4">
        <label className="block text-sm">
          Home price ($)
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Down payment (%)
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Interest rate (%)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Loan term (years)
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
      </div>
      <p className="mt-8 text-2xl font-bold text-[var(--accent)]">
        Estimated monthly payment: $
        {monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </p>
    </div>
  );
}

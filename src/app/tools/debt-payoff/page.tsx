"use client";

import { useMemo, useState } from "react";

export default function DebtPayoffPage() {
  const [balance, setBalance] = useState(15000);
  const [rate, setRate] = useState(18);
  const [payment, setPayment] = useState(500);

  const months = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    let b = balance;
    let m = 0;
    while (b > 0 && m < 600) {
      if (payment <= b * monthlyRate) return Number.POSITIVE_INFINITY;
      b = b * (1 + monthlyRate) - payment;
      m += 1;
    }
    return m;
  }, [balance, rate, payment]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Debt payoff calculator</h1>
      <p className="mt-2 text-[var(--muted)]">
        Estimate your payoff timeline with consistent monthly payments.
      </p>
      <div className="mt-8 space-y-4">
        <label className="block text-sm">
          Debt balance ($)
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          APR (%)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Monthly payment ($)
          <input
            type="number"
            value={payment}
            onChange={(e) => setPayment(Number(e.target.value))}
            className="mt-1 w-full rounded border border-[var(--border)] bg-[#0b0f14] px-3 py-2"
          />
        </label>
      </div>
      <p className="mt-8 text-2xl font-bold text-[var(--accent)]">
        {Number.isFinite(months)
          ? `Estimated payoff: ${months} months`
          : "Payment too low to beat interest"}
      </p>
    </div>
  );
}

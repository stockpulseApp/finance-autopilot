"use client";

import { useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex gap-2" : "space-y-3"}>
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-[var(--border)] bg-[#0b0f14] px-4 py-3 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Get free guides"}
      </button>
      {status === "ok" && (
        <p className="text-sm text-[var(--accent)]">You&apos;re in — check your inbox.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Could not subscribe yet. Wire ConvertKit in .env (see README).
        </p>
      )}
    </form>
  );
}

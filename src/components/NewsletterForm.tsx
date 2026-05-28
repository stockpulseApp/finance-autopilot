"use client";

import { useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [leadMagnetUrl, setLeadMagnetUrl] = useState<string>("");

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
      const data = (await res.json()) as { leadMagnetUrl?: string };
      if (data.leadMagnetUrl) {
        setLeadMagnetUrl(data.leadMagnetUrl);
      }
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-3"}>
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-deal shrink-0 disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Get deal alerts"}
      </button>
      {status === "ok" && (
        <div className="text-sm text-[var(--success)] space-y-1">
          <p>You&apos;re in — check your inbox.</p>
          {leadMagnetUrl && (
            <a href={leadMagnetUrl} className="underline">
              Download your free Wealth Sprint checklist
            </a>
          )}
        </div>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Could not subscribe yet. Wire ConvertKit in .env (see README).
        </p>
      )}
    </form>
  );
}

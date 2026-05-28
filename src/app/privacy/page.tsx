export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl text-[var(--muted)] space-y-4">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Privacy policy</h1>
      <p>
        We collect email addresses when you subscribe to our newsletter. We use analytics to
        understand site usage. We do not sell personal data.
      </p>
      <p>
        Replace this page with a lawyer-reviewed policy before launch. Include cookie consent if you
        use ads or EU traffic.
      </p>
    </div>
  );
}

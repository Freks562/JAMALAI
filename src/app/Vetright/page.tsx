import Link from "next/link";

export default function VetRightPage() {
  return (
    <main className="min-h-dvh bg-white">
      <div className="w-full bg-red-50 border-b">
        <div className="mx-auto max-w-5xl px-6 py-2 text-sm flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium">Crisis support</span>
          <span className="opacity-80">
            Call or text <span className="font-semibold">988</span> and press 1, or chat at{" "}
            <a className="underline" href="https://988lifeline.org" target="_blank" rel="noreferrer">988lifeline.org</a>
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-16 grid gap-8">
        <header className="grid gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">VetRights by JamaIA</h1>
          <p className="text-lg opacity-80">
            A fast, no-nonsense path to benefits, jobs, and safety resources for veterans and families.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/veterans" className="rounded-lg border px-5 py-2.5">Open Veterans</Link>
            <Link href="/learn" className="rounded-lg border px-5 py-2.5">Learn</Link>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <div className="text-base font-semibold">Benefits Navigator</div>
            <p className="text-sm opacity-80 mt-1">7 questions → your top 3 actions.</p>
          </div>
          <div className="rounded-2xl border p-6">
            <div className="text-base font-semibold">Real Opportunities</div>
            <p className="text-sm opacity-80 mt-1">Translate MOS/NEC into solid roles.</p>
          </div>
          <div className="rounded-2xl border p-6">
            <div className="text-base font-semibold">Built-in Safety</div>
            <p className="text-sm opacity-80 mt-1">988 and crisis resources one tap away.</p>
          </div>
        </div>

        <section className="rounded-2xl border p-6 grid gap-4">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="list-decimal pl-5 grid gap-2 text-sm">
            <li>Answer a short intake that respects your time.</li>
            <li>Get clear actions with links and phone numbers.</li>
            <li>Optionally save records to revisit or share.</li>
          </ol>
          <div className="pt-2">
            <Link href="/veterans" className="rounded-lg border px-5 py-2.5 inline-block">Get started</Link>
          </div>
        </section>

        <footer className="text-center text-xs opacity-70">
          © {new Date().getFullYear()} JamaIA • Built for veterans, not for ads.
        </footer>
      </section>
    </main>
  );
}
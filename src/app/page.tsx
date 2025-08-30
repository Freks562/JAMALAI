import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="mx-auto w-full max-w-5xl grid gap-10">
        <header className="text-center grid gap-3">
          <h1 className="text-4xl font-bold">JamaIA VetRights</h1>
          <p className="opacity-70">Fast tools for benefits, opportunities, and safety.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/veterans" className="rounded-lg border px-4 py-2">Open Veterans</Link>
            <Link href="/learn" className="rounded-lg border px-4 py-2">Learn</Link>
            <Link href="/healthz" className="rounded-lg border px-4 py-2">Health Check</Link>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-5">
            <div className="font-medium">Benefits Navigator</div>
            <div className="text-sm opacity-80">7 questions → your top 3 actions.</div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="font-medium">Real Opportunities</div>
            <div className="text-sm opacity-80">MOS/NEC → civilian roles. No spam.</div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="font-medium">Built-in Safety</div>
            <div className="text-sm opacity-80">988 + crisis resources one tap away.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
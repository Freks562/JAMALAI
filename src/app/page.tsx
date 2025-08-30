import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="grid gap-6 text-center">
        <h1 className="text-4xl font-bold">JamalAI VetRights</h1>
        <div className="flex items-center justify-center gap-3">
          <Link href="/veterans" className="border rounded px-4 py-2">Open Veterans</Link>
          <Link href="/learn" className="border rounded px-4 py-2">Learn</Link>
        </div>

        <section className="mx-auto max-w-5xl text-left">
          <h2 className="text-2xl font-semibold">Why this exists</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            <li className="rounded-xl border p-5">
              <div className="font-medium">Benefits Navigator</div>
              <div className="text-sm opacity-80">7 questions → your top 3 actions.</div>
            </li>
            <li className="rounded-xl border p-5">
              <div className="font-medium">Real Opportunities</div>
              <div className="text-sm opacity-80">MOS/NEC → civilian roles.</div>
            </li>
            <li className="rounded-xl border p-5">
              <div className="font-medium">Built-in Safety</div>
              <div className="text-sm opacity-80">988 + crisis resources one tap away.</div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
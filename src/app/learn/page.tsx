"use client";

export default function LearnPage() {
  return (
    <main className="min-h-dvh p-8">
      <div className="mx-auto max-w-3xl grid gap-8">
        <section className="rounded-xl border p-5">
          <div className="text-sm uppercase tracking-wide opacity-70">
            Crisis
          </div>
          <div className="mt-2 text-lg font-semibold">
            988 Suicide & Crisis Lifeline
          </div>
          <p className="mt-1 text-sm opacity-80">
            Call or text 988 • Veterans press 1 • TTY 711
          </p>
        </section>

        <section className="grid gap-4">
          <h1 className="text-3xl font-bold">Learn</h1>
          <p className="opacity-70">Quick links for benefits, jobs, and help.</p>
          <ul className="grid gap-3">
            <li><a className="underline" href="https://www.va.gov/">VA.gov</a></li>
            <li><a className="underline" href="https://www.va.gov/disability/">VA Disability</a></li>
            <li><a className="underline" href="https://www.veteranscrisisline.net/">Veterans Crisis Line</a></li>
            <li><a className="underline" href="https://www.dol.gov/agencies/vets">DOL VETS</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
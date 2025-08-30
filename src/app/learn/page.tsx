export default function LearnPage() {
  return (
    <main className="min-h-dvh p-8 grid gap-8">
      <section className="mx-auto max-w-3xl grid gap-4 text-center">
        <h1 className="text-3xl font-bold">Learn</h1>
        <p className="opacity-70 text-sm">
          Quick links and resources for veterans, families, and allies.
        </p>
      </section>

      <section className="mx-auto max-w-3xl grid gap-6">
        <div className="rounded-xl border p-5">
          <h2 className="font-medium text-lg">Crisis Support</h2>
          <p className="text-sm opacity-80 mb-2">24/7 help is available.</p>
          <ul className="grid gap-2 text-sm list-disc pl-5">
            <li><a href="https://www.veteranscrisisline.net/" target="_blank" rel="noopener noreferrer" className="underline">Veterans Crisis Line (988)</a></li>
            <li><a href="https://988lifeline.org/" target="_blank" rel="noopener noreferrer" className="underline">Suicide & Crisis Lifeline</a></li>
          </ul>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="font-medium text-lg">Benefits</h2>
          <p className="text-sm opacity-80 mb-2">Explore your entitlements and assistance programs.</p>
          <ul className="grid gap-2 text-sm list-disc pl-5">
            <li><a href="https://www.va.gov/disability/" target="_blank" rel="noopener noreferrer" className="underline">VA Disability Benefits</a></li>
            <li><a href="https://www.va.gov/education/" target="_blank" rel="noopener noreferrer" className="underline">Education (GI Bill)</a></li>
            <li><a href="https://www.va.gov/health-care/" target="_blank" rel="noopener noreferrer" className="underline">VA Health Care</a></li>
          </ul>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="font-medium text-lg">Employment & Transition</h2>
          <p className="text-sm opacity-80 mb-2">Help moving from service to civilian careers.</p>
          <ul className="grid gap-2 text-sm list-disc pl-5">
            <li><a href="https://www.dol.gov/agencies/vets" target="_blank" rel="noopener noreferrer" className="underline">U.S. Dept of Labor VETS</a></li>
            <li><a href="https://www.hireheroesusa.org/" target="_blank" rel="noopener noreferrer" className="underline">Hire Heroes USA</a></li>
            <li><a href="https://www.va.gov/careers-employment/vocational-rehabilitation/" target="_blank" rel="noopener noreferrer" className="underline">Vocational Rehabilitation</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
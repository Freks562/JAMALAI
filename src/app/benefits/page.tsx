// src/app/benefits/page.tsx
"use client";

import { useState } from "react";

type Answers = {
  branch?: "NAVY" | "ARMY" | "USMC" | "USAF" | "USSF" | "USCG";
  discharge?: "HONORABLE" | "GEN" | "OTHER";
  disability?: "NONE" | "PENDING" | "RATED_10_100";
  education?: "NONE" | "USING_GI" | "WANTS_GI";
};

const STEPS = [
  "What branch did you serve in?",
  "Discharge status?",
  "VA disability status?",
  "Education goals?",
] as const;

export default function BenefitsPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  // Finished → show prioritized checklist (MVP hardcoded)
  if (step >= STEPS.length) {
    const items = buildChecklist(answers);
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Your Top Actions</h1>
        <ol className="mt-6 space-y-3">
          {items.map((it, i) => (
            <li key={i} className="rounded-lg border p-4">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm opacity-80">{it.detail}</div>
              <a className="text-sm underline mt-2 inline-block" href={it.url} target="_blank">
                {it.cta}
              </a>
            </li>
          ))}
        </ol>
        <button className="mt-8 rounded px-4 py-2 border" onClick={() => setStep(0)}>
          Start over
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Benefits Navigator</h1>
      <p className="mt-2 opacity-80">Answer a few questions to personalize your checklist.</p>

      <div className="mt-8 rounded-xl border p-6">
        <div className="text-lg font-medium">{STEPS[step]}</div>

        {step === 0 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(["NAVY","ARMY","USMC","USAF","USSF","USCG"] as const).map((b) => (
              <button
                key={b}
                onClick={() => { setAnswers({ ...answers, branch: b }); next(); }}
                className="rounded border px-4 py-2 text-left"
              >
                {b === "NAVY" ? "Navy ⚓️" : b}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(["HONORABLE","GEN","OTHER"] as const).map((d) => (
              <button
                key={d}
                onClick={() => { setAnswers({ ...answers, discharge: d }); next(); }}
                className="rounded border px-4 py-2 text-left"
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(["NONE","PENDING","RATED_10_100"] as const).map((ds) => (
              <button
                key={ds}
                onClick={() => { setAnswers({ ...answers, disability: ds }); next(); }}
                className="rounded border px-4 py-2 text-left"
              >
                {ds === "RATED_10_100" ? "Rated (10–100%)" : ds}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(["NONE","USING_GI","WANTS_GI"] as const).map((e) => (
              <button
                key={e}
                onClick={() => { setAnswers({ ...answers, education: e }); next(); }}
                className="rounded border px-4 py-2 text-left"
              >
                {e === "WANTS_GI" ? "I want to use GI Bill" : e}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <button onClick={back} className="rounded px-4 py-2 border" disabled={step === 0}>
            Back
          </button>
        </div>
      </div>
    </main>
  );
}

function buildChecklist(a: Answers) {
  const out: { title: string; detail: string; url: string; cta: string }[] = [];

  // Always: enroll in VA health if not already
  out.push({
    title: "Enroll in VA Health Care",
    detail: "If eligible, get primary care and referrals. It’s the gateway to a lot of services.",
    url: "https://www.va.gov/health-care/how-to-apply/",
    cta: "Apply for VA Health",
  });

  if (a.education === "WANTS_GI" || a.education === "USING_GI") {
    out.push({
      title: "Use or transfer your GI Bill",
      detail: "Find approved programs; compare BAH and outcomes.",
      url: "https://www.va.gov/education/about-gi-bill-benefits/",
      cta: "Explore GI Bill",
    });
  }

  if (a.disability && a.disability !== "NONE") {
    out.push({
      title: "VA Disability Claim / Increase",
      detail: "File a claim or request an increase with current evidence.",
      url: "https://www.va.gov/disability/how-to-file-claim/",
      cta: "Start a claim",
    });
  }

  if (a.branch === "NAVY") {
    out.push({
      title: "Navy/USMC-specific benefits",
      detail: "Check Navy College, COOL, SkillBridge host commands near you.",
      url: "https://www.cool.osd.mil/usn/",
      cta: "Check Navy COOL",
    });
  }

  return out;
}
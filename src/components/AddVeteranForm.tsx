"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function AddVeteranForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [branch, setBranch] = useState("NAVY");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [unit, setUnit] = useState("Amphibious Squadron");
  const [shipNames, setShipNames] = useState("USS Boxer (LHD-4), USS Bonhomme Richard (LHD-6)");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const body = {
      name,
      rank,
      branch,
      startYear: startYear ? Number(startYear) : null,
      endYear: endYear ? Number(endYear) : null,
      records: [
        {
          unit,
          startYear: startYear ? Number(startYear) : null,
          endYear: endYear ? Number(endYear) : null,
          shipNames: shipNames.split(",").map(s => s.trim()).filter(Boolean),
        },
      ],
    };
    const res = await fetch("/api/veterans", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setErr("failed");
      return;
    }
    setName("");
    setRank("");
    setStartYear("");
    setEndYear("");
    setUnit("Amphibious Squadron");
    setShipNames("");
    startTransition(() => router.refresh());
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2 border rounded-xl p-4">
      <div className="grid gap-1">
        <label className="text-sm">Name</label>
        <input className="border rounded px-3 py-2" value={name} onChange={e=>setName(e.target.value)} required />
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Rank</label>
        <input className="border rounded px-3 py-2" value={rank} onChange={e=>setRank(e.target.value)} required />
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Branch</label>
        <select className="border rounded px-3 py-2" value={branch} onChange={e=>setBranch(e.target.value)}>
          <option value="NAVY">NAVY</option>
          <option value="ARMY">ARMY</option>
          <option value="AIR_FORCE">AIR_FORCE</option>
          <option value="MARINES">MARINES</option>
          <option value="COAST_GUARD">COAST_GUARD</option>
          <option value="SPACE_FORCE">SPACE_FORCE</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-1">
          <label className="text-sm">Start Year</label>
          <input className="border rounded px-3 py-2" value={startYear} onChange={e=>setStartYear(e.target.value)} inputMode="numeric" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">End Year</label>
          <input className="border rounded px-3 py-2" value={endYear} onChange={e=>setEndYear(e.target.value)} inputMode="numeric" />
        </div>
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Unit</label>
        <input className="border rounded px-3 py-2" value={unit} onChange={e=>setUnit(e.target.value)} />
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Ship Names (comma-separated)</label>
        <input className="border rounded px-3 py-2" value={shipNames} onChange={e=>setShipNames(e.target.value)} />
      </div>
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button type="submit" disabled={pending} className="rounded px-4 py-2 border">
        {pending ? "Saving..." : "Add Veteran"}
      </button>
    </form>
  );
}
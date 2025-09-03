"use client";
import { useEffect, useState } from "react";

type Veteran = {
  id: string;
  name: string;
  rank: string;
  branch: string;
  startYear: number | null;
  endYear: number | null;
  createdAt: string;
  updatedAt: string;
};

export default function VetRightsPage() {
  const [items, setItems] = useState<Veteran[]>([]);
  const [form, setForm] = useState({
    name: "", rank: "", branch: "NAVY", startYear: "", endYear: ""
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const r = await fetch("/api/veterans");
    const data = await r.json();
    setItems(Array.isArray(data) ? data : []);
  }

  useEffect(() => { load(); }, []);

  async function create() {
    setBusy(true); setErr(null);
    try {
      const body = {
        name: form.name.trim(),
        rank: form.rank.trim(),
        branch: form.branch,
        startYear: form.startYear ? Number(form.startYear) : null,
        endYear: form.endYear ? Number(form.endYear) : null,
      };
      const res = await fetch("/api/veterans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      await load();
      setForm({ name: "", rank: "", branch: "NAVY", startYear: "", endYear: "" });
    } catch (e:any) {
      setErr(e.message ?? "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ padding: 16, maxWidth: 720, margin: "0 auto" }}>
      <h1>Veterans</h1>

      <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
        <input placeholder="Rank" value={form.rank} onChange={e=>setForm({...form, rank: e.target.value})} />
        <select value={form.branch} onChange={e=>setForm({...form, branch: e.target.value})}>
          <option>NAVY</option><option>ARMY</option><option>AIR_FORCE</option>
          <option>MARINES</option><option>COAST_GUARD</option><option>SPACE_FORCE</option>
        </select>
        <input placeholder="Start Year" value={form.startYear} onChange={e=>setForm({...form, startYear: e.target.value})}/>
        <input placeholder="End Year" value={form.endYear} onChange={e=>setForm({...form, endYear: e.target.value})}/>
        <button onClick={create} disabled={busy}>{busy ? "Saving..." : "Create"}</button>
        {err && <div style={{ color: "tomato" }}>{err}</div>}
      </div>

      <h2 style={{ marginTop: 24 }}>All Records</h2>
      <ul>
        {items.map(v => (
          <li key={v.id}>
            {v.name} — {v.rank} — {v.branch}
            {v.startYear ? ` (${v.startYear}–${v.endYear ?? ""})` : ""}
          </li>
        ))}
      </ul>
    </main>
  );
}
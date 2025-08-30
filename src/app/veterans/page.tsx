"use client";

import { useEffect, useState } from "react";

type RecordItem = { id: string; unit: string | null; startYear: number | null; endYear: number | null; shipNames: string[] };
type Vet = {
  id: string;
  name: string | null;
  rank: string | null;
  branch: "NAVY" | "ARMY" | "AIR_FORCE" | "MARINES" | "COAST_GUARD" | string;
  startYear: number | null;
  endYear: number | null;
  records: RecordItem[];
  createdAt: string;
  updatedAt: string;
};

export default function VeteransPage() {
  const [list, setList] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [rank, setRank] = useState("PO2");
  const [branch, setBranch] = useState("NAVY");
  const [startYear, setStartYear] = useState<number | "">("");
  const [endYear, setEndYear] = useState<number | "">("");
  const [unit, setUnit] = useState("Amphibious Squadron");
  const [ships, setShips] = useState("USS Boxer (LHD-4), USS Bonhomme Richard (LHD-6)");
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);
  const [eName, setEName] = useState("");
  const [eRank, setERank] = useState("PO2");
  const [eBranch, setEBranch] = useState("NAVY");
  const [eStartYear, setEStartYear] = useState<number | "">("");
  const [eEndYear, setEEndYear] = useState<number | "">("");

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/veterans", { cache: "no-store" });
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload = {
      name,
      rank,
      branch,
      startYear: startYear === "" ? null : Number(startYear),
      endYear: endYear === "" ? null : Number(endYear),
      records: [
        {
          unit,
          startYear: startYear === "" ? null : Number(startYear),
          endYear: endYear === "" ? null : Number(endYear),
          shipNames: ships.split(",").map(s => s.trim()).filter(Boolean),
        },
      ],
    };
    const res = await fetch("/api/veterans", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setError("create_failed");
      return;
    }
    setName("");
    setRank("PO2");
    setBranch("NAVY");
    setStartYear("");
    setEndYear("");
    setUnit("Amphibious Squadron");
    setShips("USS Boxer (LHD-4), USS Bonhomme Richard (LHD-6)");
    await refresh();
  }

  function startEdit(v: Vet) {
    setEditId(v.id);
    setEName(v.name ?? "");
    setERank(v.rank ?? "PO2");
    setEBranch((v.branch as string) || "NAVY");
    setEStartYear(v.startYear ?? "");
    setEEndYear(v.endYear ?? "");
  }

  function cancelEdit() {
    setEditId(null);
  }

  async function saveEdit(id: string) {
    const payload: Partial<Vet> = {
      name: eName,
      rank: eRank,
      branch: eBranch,
      startYear: eStartYear === "" ? null : Number(eStartYear),
      endYear: eEndYear === "" ? null : Number(eEndYear),
    };
    const res = await fetch(`/api/veterans/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setError("update_failed");
      return;
    }
    setEditId(null);
    await refresh();
  }

  async function remove(id: string) {
    const res = await fetch(`/api/veterans/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("delete_failed");
      return;
    }
    await refresh();
  }

  return (
    <main className="mx-auto max-w-3xl p-6 grid gap-8">
      <header className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Veterans</h1>
        <p className="opacity-70 text-sm">Create, list, update, delete</p>
      </header>

      <form onSubmit={onCreate} className="grid gap-3 rounded-xl border p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <input className="border rounded px-3 py-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Rank" value={rank} onChange={e=>setRank(e.target.value)} />
          <select className="border rounded px-3 py-2" value={branch} onChange={e=>setBranch(e.target.value)}>
            <option>NAVY</option>
            <option>ARMY</option>
            <option>AIR_FORCE</option>
            <option>MARINES</option>
            <option>COAST_GUARD</option>
          </select>
          <input className="border rounded px-3 py-2" placeholder="Unit" value={unit} onChange={e=>setUnit(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Start Year" value={startYear} onChange={e=>setStartYear(e.target.value === "" ? "" : Number(e.target.value))} />
          <input className="border rounded px-3 py-2" placeholder="End Year" value={endYear} onChange={e=>setEndYear(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
        <input className="border rounded px-3 py-2" placeholder="Ships (comma-separated)" value={ships} onChange={e=>setShips(e.target.value)} />
        <button type="submit" className="border rounded px-4 py-2">Create</button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>

      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Records</h2>
          <button onClick={refresh} className="border rounded px-3 py-1">{loading ? "Loading..." : "Refresh"}</button>
        </div>

        {list.length === 0 ? (
          <div className="rounded border p-4 text-sm opacity-70">No records yet.</div>
        ) : (
          <ul className="grid gap-3">
            {list.map(v => (
              <li key={v.id} className="rounded-xl border p-4 grid gap-3">
                {editId === v.id ? (
                  <div className="grid gap-2">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input className="border rounded px-3 py-2" value={eName} onChange={e=>setEName(e.target.value)} />
                      <input className="border rounded px-3 py-2" value={eRank} onChange={e=>setERank(e.target.value)} />
                      <select className="border rounded px-3 py-2" value={eBranch} onChange={e=>setEBranch(e.target.value)}>
                        <option>NAVY</option>
                        <option>ARMY</option>
                        <option>AIR_FORCE</option>
                        <option>MARINES</option>
                        <option>COAST_GUARD</option>
                      </select>
                      <input className="border rounded px-3 py-2" placeholder="Start Year" value={eStartYear} onChange={e=>setEStartYear(e.target.value === "" ? "" : Number(e.target.value))} />
                      <input className="border rounded px-3 py-2" placeholder="End Year" value={eEndYear} onChange={e=>setEEndYear(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>saveEdit(v.id)} className="border rounded px-3 py-1">Save</button>
                      <button onClick={cancelEdit} className="border rounded px-3 py-1">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-medium">{v.name} • {v.rank} • {v.branch}</div>
                    <div className="text-sm opacity-70">Service {v.startYear ?? "?"}–{v.endYear ?? "?"}</div>
                    {!!(v.records && v.records.length) && (
                      <ul className="mt-1 text-sm list-disc pl-5">
                        {v.records.map(r => (
                          <li key={r.id}>
                            {r.unit} {r.startYear ?? "?"}–{r.endYear ?? "?"}
                            {!!(r.shipNames && r.shipNames.length) && <> — {r.shipNames.join(", ")}</>}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button onClick={()=>startEdit(v)} className="border rounded px-3 py-1">Edit</button>
                      <button onClick={()=>remove(v.id)} className="border rounded px-3 py-1">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
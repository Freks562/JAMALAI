// src/app/veterans/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Branch = "ARMY" | "NAVY" | "AIRFORCE" | "MARINES" | "COASTGUARD" | "SPACEFORCE";
const BRANCHES: Branch[] = ["ARMY", "NAVY", "AIRFORCE", "MARINES", "COASTGUARD", "SPACEFORCE"];

type Veteran = {
  id: string;
  name: string;
  rank: string;
  branch: Branch;
  startYear: number | null;
  endYear: number | null;
  createdAt: string;
  updatedAt: string;
  records?: any[]; // if your API includes related records
};

export default function VeteranDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [row, setRow] = useState<Veteran | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    rank: "",
    branch: "ARMY" as Branch,
    startYear: "",
    endYear: "",
  });

  async function load() {
    setError(null);
    try {
      const r = await fetch(`/api/veterans/${id}`, { cache: "no-store" });
      if (r.status === 404) {
        setError("Not found");
        setRow(null);
        return;
      }
      if (!r.ok) throw new Error(await r.text());
      const data: Veteran = await r.json();
      setRow(data);
      setForm({
        name: data.name,
        rank: data.rank,
        branch: data.branch,
        startYear: data.startYear?.toString() ?? "",
        endYear: data.endYear?.toString() ?? "",
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const payload = {
        name: form.name.trim(),
        rank: form.rank.trim(),
        branch: form.branch,
        startYear: form.startYear ? Number(form.startYear) : undefined,
        endYear: form.endYear ? Number(form.endYear) : undefined,
      };
      const r = await fetch(`/api/veterans/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(await r.text());
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this record?")) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch(`/api/veterans/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error(await r.text());
      router.push("/veterans");
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto grid gap-4">
      <button className="underline text-sm" onClick={() => router.push("/veterans")}>
        ← Back to list
      </button>

      <h1 className="text-2xl font-bold">Veteran</h1>

      {error && <div className="rounded border border-red-200 bg-red-50 text-red-800 px-3 py-2">{error}</div>}

      {!row ? (
        <p className="opacity-70">Loading…</p>
      ) : (
        <>
          <div className="grid gap-2">
            <input
              className="border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Name"
            />
            <input
              className="border p-2 rounded"
              value={form.rank}
              onChange={(e) => setForm((f) => ({ ...f, rank: e.target.value }))}
              placeholder="Rank"
            />
            <select
              className="border p-2 rounded"
              value={form.branch}
              onChange={(e) => setForm((f) => ({ ...f, branch: e.target.value as Branch }))}
            >
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Start Year"
                value={form.startYear}
                onChange={(e) => setForm((f) => ({ ...f, startYear: e.target.value }))}
              />
              <input
                className="border p-2 rounded"
                placeholder="End Year"
                value={form.endYear}
                onChange={(e) => setForm((f) => ({ ...f, endYear: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded" onClick={save} disabled={busy}>
              Save
            </button>
            <button className="border px-4 py-2 rounded" onClick={remove} disabled={busy}>
              Delete
            </button>
          </div>

          <div className="text-xs opacity-60">
            <div>Created: {new Date(row.createdAt).toLocaleString()}</div>
            <div>Updated: {new Date(row.updatedAt).toLocaleString()}</div>
          </div>
        </>
      )}
    </main>
  );
}
'use client';
import { useEffect, useState } from 'react';
import {
  collection, getDocs, limit, orderBy, query, startAfter,
  QueryDocumentSnapshot, DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

type Row = { id: string; type: string; createdAt?: { seconds: number; nanoseconds: number } | null };
const PAGE_SIZE = 20;

export default function PaymentsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [cursor, setCursor] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(next = false) {
    setLoading(true); setError(null);
    try {
      const base = collection(db, 'payments_events');
      const q = next && cursor
        ? query(base, orderBy('createdAt', 'desc'), startAfter(cursor), limit(PAGE_SIZE))
        : query(base, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
      const snap = await getDocs(q);
      const data: Row[] = snap.docs.map(d => {
        const v = d.data() as any;
        return { id: d.id, type: v.type, createdAt: v.createdAt ?? null };
      });
      setRows(data);
      setCursor(snap.docs[snap.docs.length - 1] ?? null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(false); }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Payments (Stripe Webhook Events)</h1>
      <p className="opacity-70 text-sm">Newest first • page size {PAGE_SIZE}</p>

      {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      <div className="mt-4 overflow-x-auto rounded border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2">Event ID</th>
              <th className="p-2">Type</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-2 font-mono text-[12px]">{r.id}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">
                  {r.createdAt ? new Date((r.createdAt as any).seconds * 1000).toLocaleString() : '—'}
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr><td className="p-4" colSpan={3}>No data.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button disabled={loading} onClick={() => load(true)} className="border rounded px-3 py-1">
          {loading ? 'Loading…' : 'Next page'}
        </button>
      </div>

      <p className="mt-4 text-xs opacity-60">
        Restrict this page to admins in production.
      </p>
    </div>
  );
}

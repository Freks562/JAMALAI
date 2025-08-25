import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ ok: true, note: "Supabase disabled in Firebase build." });
}

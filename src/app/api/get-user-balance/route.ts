import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, balance: 0, note: "balance disabled (missing env)" });
  return NextResponse.json({ ok: true, balance: 0 });
}

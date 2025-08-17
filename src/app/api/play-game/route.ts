import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, note: "play-game disabled (missing env)" });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

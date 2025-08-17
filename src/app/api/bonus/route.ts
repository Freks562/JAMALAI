import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, note: "bonus endpoint disabled (missing env)" });
  return NextResponse.json({ ok: true }); // TODO: implement real logic with supabase
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, note: "bonus endpoint disabled (missing env)" });
  return NextResponse.json({ ok: true }); // TODO
}

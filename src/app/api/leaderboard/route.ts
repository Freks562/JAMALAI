import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ ok: false, error: "missing supabase env" }, { status: 500 });
    const { data, error } = await supabase.from("leaderboard").select("*").order("score", { ascending: false }).limit(100);
    if (error) {
      console.error("leaderboard error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, data });
  } catch (e:any) {
    console.error("leaderboard exception:", e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

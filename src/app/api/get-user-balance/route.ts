import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ ok: false, error: "missing supabase env" }, { status: 500 });
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");
    if (!user_id) return NextResponse.json({ ok: false, error: "user_id required" }, { status: 400 });
    const { data, error } = await supabase.from("balances").select("balance").eq("user_id", user_id).maybeSingle();
    if (error) {
      console.error("get-user-balance error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, balance: data?.balance ?? 0 });
  } catch (e:any) {
    console.error("get-user-balance exception:", e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

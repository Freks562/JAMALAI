import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  return NextResponse.json({
    url_ok: !!url,
    url_preview: url ? url.replace(/(^https?:\/\/)([^.]+)\.(.*)$/,"$1***.$3") : null,
    key_ok: !!key,
    key_len: key ? key.length : 0
  });
}

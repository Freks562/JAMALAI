import { NextResponse } from "next/server";

export async function POST() {
  const secret = process.env.STRIPE_SECRET_KEY || "";
  if (!secret) return NextResponse.json({ ok: true, note: "stripe webhook disabled (missing env)" });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

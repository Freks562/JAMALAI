import { NextResponse } from "next/server";

// GET /healthz -> 200 "ok"
export async function GET() {
  return new NextResponse("ok", { status: 200 });
}

// (Optional) allow HEAD to be friendly with uptime pingers
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
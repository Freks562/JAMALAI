import { NextResponse } from "next/server";

type ModerationAction = "allow" | "soft_block" | "block";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (typeof text !== "string") return NextResponse.json({ action: "allow" as ModerationAction }, { status: 200 });

    const t = text.toLowerCase();
    if (t.includes("kill myself")) return NextResponse.json({ action: "block" as ModerationAction }, { status: 200 });
    if (t.includes("suicide")) return NextResponse.json({ action: "soft_block" as ModerationAction }, { status: 200 });

    return NextResponse.json({ action: "allow" as ModerationAction }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "moderation failed" }, { status: 500 });
  }
}
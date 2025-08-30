import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalize(v: any) {
  return {
    id: v.id,
    name: v.name,
    rank: v.rank,
    branch: v.branch,
    startYear: v.startYear,
    endYear: v.endYear,
    records: (v.records ?? []).map((r: any) => ({
      id: r.id,
      unit: r.unit,
      startYear: r.startYear,
      endYear: r.endYear,
      shipNames: (r.ships ?? []).map((s: any) => s.ship.name),
    })),
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
  };
}

export async function GET() {
  try {
    const vets = await prisma.veteran.findMany({
      include: { records: { include: { ships: { include: { ship: true } } } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(vets.map(normalize), { status: 200 });
  } catch {
    return NextResponse.json({ error: "database_unavailable" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const rank = typeof body?.rank === "string" ? body.rank.trim() : "";
    const branch = typeof body?.branch === "string" ? body.branch.trim() : "";

    if (!name || !rank || !branch) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const startYear =
      body?.startYear == null ? null : Number.isInteger(body.startYear) ? body.startYear : null;
    const endYear =
      body?.endYear == null ? null : Number.isInteger(body.endYear) ? body.endYear : null;

    const records = Array.isArray(body?.records) ? body.records : [];

    const created = await prisma.veteran.create({
      data: {
        name,
        rank,
        branch: branch as any,
        startYear,
        endYear,
        records: {
          create: records.map((r: any) => ({
            unit: typeof r?.unit === "string" ? r.unit : "Unknown Unit",
            branch: branch as any,
            startYear:
              r?.startYear == null ? null : Number.isInteger(r.startYear) ? r.startYear : null,
            endYear:
              r?.endYear == null ? null : Number.isInteger(r.endYear) ? r.endYear : null,
            ships: {
              create: (Array.isArray(r?.shipNames) ? r.shipNames : []).map((n: any) => ({
                ship: {
                  connectOrCreate: {
                    where: { name: String(n) },
                    create: { name: String(n) },
                  },
                },
              })),
            },
          })),
        },
      },
      include: { records: { include: { ships: { include: { ship: true } } } } },
    });

    return NextResponse.json(normalize(created), { status: 201 });
  } catch {
    return NextResponse.json({ error: "database_unavailable" }, { status: 503 });
  }
}
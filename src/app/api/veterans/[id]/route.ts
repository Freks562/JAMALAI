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
    records: v.records.map((r: any) => ({
      id: r.id,
      unit: r.unit,
      startYear: r.startYear,
      endYear: r.endYear,
      shipNames: r.ships.map((s: any) => s.ship.name),
    })),
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
  };
}

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const v = await prisma.veteran.findUnique({
    where: { id: ctx.params.id },
    include: { records: { include: { ships: { include: { ship: true } } } } },
  });
  if (!v) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(normalize(v), { status: 200 });
}

export async function PUT(req: Request, ctx: { params: { id: string } }) {
  const body = await req.json();
  const v = await prisma.veteran.update({
    where: { id: ctx.params.id },
    data: {
      name: body.name ?? undefined,
      rank: body.rank ?? undefined,
      branch: body.branch ?? undefined,
      startYear: body.startYear ?? undefined,
      endYear: body.endYear ?? undefined,
    },
    include: { records: { include: { ships: { include: { ship: true } } } } },
  });
  return NextResponse.json(normalize(v), { status: 200 });
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  await prisma.serviceRecordShip.deleteMany({ where: { serviceRecord: { veteranId: ctx.params.id } } });
  await prisma.serviceRecord.deleteMany({ where: { veteranId: ctx.params.id } });
  await prisma.veteran.delete({ where: { id: ctx.params.id } });
  return NextResponse.json({ ok: true }, { status: 200 });
}
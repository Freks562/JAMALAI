import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const veteranSelect = {
  id: true,
  name: true,
  rank: true,
  branch: true,
  startYear: true,
  endYear: true,
  createdAt: true,
  updatedAt: true,
  records: {
    select: {
      id: true,
      unit: true,
      startYear: true,
      endYear: true,
      ships: { select: { ship: { select: { name: true } } } },
    },
  },
} as const;

function serialize(v: {
  id: string;
  name: string;
  rank: string;
  branch: Prisma.Branch;
  startYear: number | null;
  endYear: number | null;
  createdAt: Date;
  updatedAt: Date;
  records: {
    id: string;
    unit: string;
    startYear: number | null;
    endYear: number | null;
    ships: { ship: { name: string } }[];
  }[];
}) {
  return {
    id: v.id,
    name: v.name,
    rank: v.rank,
    branch: v.branch,
    startYear: v.startYear ?? null,
    endYear: v.endYear ?? null,
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
    records: v.records.map((r) => ({
      id: r.id,
      unit: r.unit,
      startYear: r.startYear ?? null,
      endYear: r.endYear ?? null,
      shipNames: r.ships.map((s) => s.ship.name),
    })),
  };
}

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const v = await prisma.veteran.findUnique({
    where: { id: ctx.params.id },
    select: veteranSelect,
  });
  if (!v) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(serialize(v));
}

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const body = await req.json();
  const branch = body.branch
    ? (String(body.branch).toUpperCase() as Prisma.Branch)
    : undefined;

  const updated = await prisma.veteran.update({
    where: { id: ctx.params.id },
    data: {
      name: body.name ?? undefined,
      rank: body.rank ?? undefined,
      branch,
      startYear:
        typeof body.startYear === "number" ? body.startYear : undefined,
      endYear: typeof body.endYear === "number" ? body.endYear : undefined,
    },
    select: veteranSelect,
  });

  return NextResponse.json(serialize(updated));
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  await prisma.veteran.delete({ where: { id: ctx.params.id } });
  return NextResponse.json({ ok: true });
}
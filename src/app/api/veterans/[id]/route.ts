// src/app/api/veterans/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type Params = { id: string };

export async function GET(
  _req: Request,
  ctx: { params: Promise<Params> }
) {
  const { id } = await ctx.params;
  const row = await prisma.veteran.findUnique({
    where: { id },
    select: {
      id: true, name: true, rank: true, branch: true,
      startYear: true, endYear: true, createdAt: true, updatedAt: true,
    },
  });
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<Params> }
) {
  const { id } = await ctx.params;
  const body = await req.json();

  // Only send defined fields; coerce branch to Prisma enum when provided.
  const data: Prisma.VeteranUpdateInput = {
    name: body.name ?? undefined,
    rank: body.rank ?? undefined,
    branch: body.branch ? (body.branch as Prisma.Branch) : undefined,
    startYear: typeof body.startYear === "number" ? body.startYear : undefined,
    endYear: typeof body.endYear === "number" ? body.endYear : undefined,
  };

  const updated = await prisma.veteran.update({
    where: { id },
    data,
    select: {
      id: true, name: true, rank: true, branch: true,
      startYear: true, endYear: true, createdAt: true, updatedAt: true,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<Params> }
) {
  const { id } = await ctx.params;
  await prisma.veteran.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
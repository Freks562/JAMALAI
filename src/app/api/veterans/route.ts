// src/app/api/veterans/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, Branch } from "@prisma/client";
import { z } from "zod";

export const runtime = "nodejs"; // keep Prisma off the Edge runtime
const prisma = new PrismaClient();

const CreateSchema = z.object({
  name: z.string().min(1),
  rank: z.string().min(1),
  branch: z.nativeEnum(Branch),   // <-- use Branch from @prisma/client
  startYear: z.number().int().optional(),
  endYear: z.number().int().optional(),
});

export async function GET() {
  const rows = await prisma.veteran.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, rank: true, branch: true,
      startYear: true, endYear: true, createdAt: true, updatedAt: true,
    },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const data = CreateSchema.parse(await req.json());
  const created = await prisma.veteran.create({
    data: {
      name: data.name,
      rank: data.rank,
      branch: data.branch,
      startYear: data.startYear ?? null,
      endYear: data.endYear ?? null,
    },
    select: {
      id: true, name: true, rank: true, branch: true,
      startYear: true, endYear: true, createdAt: true, updatedAt: true,
    },
  });
  return NextResponse.json(created);
}
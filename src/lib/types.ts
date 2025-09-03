// src/lib/types.ts
import type { Prisma } from "@prisma/client";
export type Branch = Prisma.Branch; // "NAVY" | "ARMY" | "AIR_FORCE" | ...
export const BRANCHES = Object.freeze([
  "NAVY","ARMY","AIR_FORCE","MARINES","COAST_GUARD","SPACE_FORCE",
] as const satisfies Branch[]);
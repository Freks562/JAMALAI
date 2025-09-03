// prisma/seed.ts
import { PrismaClient, Branch } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.veteran.createMany({
    data: [
      { name: "John Doe",  rank: "PO2", branch: Branch.NAVY,  startYear: 2015, endYear: 2020 },
      { name: "Jane Smith",rank: "Sgt", branch: Branch.ARMY,  startYear: 2012, endYear: 2018 },
    ],
  });
}
main().finally(()=>prisma.$disconnect());
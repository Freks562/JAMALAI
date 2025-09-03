import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const vet = await prisma.veteran.create({
    data: {
      name: 'John Doe',
      rank: 'PO2',
      branch: 'NAVY',
      records: {
        create: {
          unit: 'Amphibious Squadron',
          branch: 'NAVY',
          startYear: 2015,
          endYear: 2020,
          ships: {
            create: {
              ship: { create: { name: 'USS Boxer (LHD-4)' } }
            }
          }
        }
      }
    }
  })
  console.log('Seeded:', vet.id)
}
main().finally(() => prisma.$disconnect())
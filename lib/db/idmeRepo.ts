

// ✅ Create
// export async function createIdme(data: typeof idme.$inferInsert) {
//   const [inserted] = await db.insert(idme).values(data).returning();
//   return inserted;
// }

import prisma from "../prisma"

export async function createIdme(idmeData:any) {
  return await prisma.idme.create({data:idmeData})
}


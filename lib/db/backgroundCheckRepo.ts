import prisma from "../prisma";


export async function createBackgroundCheck(
  backgroundeData: any
) {
  return await prisma.backgroundCheck.create({data:backgroundeData})
}

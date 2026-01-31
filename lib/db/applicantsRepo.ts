// src/db/applicantsRepo.ts

import prisma from "../prisma"



// ✅ Create
export async function createApplicant(data: any) {
 return await prisma.applicant.create({data})
}

// ✅ Read (all)

export async function getAllApplicants() {
  return await prisma.applicant.findMany({include:{idme:true,backgroundCheck:true}})
}

// ✅ Read (by ID)
export async function getApplicantById(id: string) {
  return await prisma.applicant.findFirst({where:{id},include:{backgroundCheck:true,idme:true}})
}




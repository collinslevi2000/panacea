// src/db/applicantsRepo.ts
import prisma from "@/lib/prisma";


// ✅ Create
export async function createApplicant(data:any) {
  try {
    
    const applicant  = await prisma.applicant.create(data)
    return applicant
  } catch (error) {
    throw error
  }
}

// ✅ Read (all)

export async function getAllApplicants() {
  return await prisma.applicant.findMany({include:{backgroundCheck:true,idme:true}})
}

// ✅ Read (by ID)
export async function getApplicantById(id: string) {
 const record  =  await prisma.applicant.findFirst({where:{id}})
  return record;
}
export async function getApplicantByEmail(email: string) {
  const  record  =  await prisma.applicant.findFirst({where:{email}})
  return record;
}

// ✅ Update
export async function updateApplicant(
  id: string,
  updates: any
) {
  const updated = await    prisma.applicant.update({where:{id},data:{...updates}})
  return updated;
}

// ✅ Delete
export async function deleteApplicant(id: string) {
 await prisma.applicant.delete({where:{id}})
}

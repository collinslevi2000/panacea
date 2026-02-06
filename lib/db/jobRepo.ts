import prisma from "../prisma"

export async function createJob(data: any) {
    return await prisma.job.create({data})
   }
      
   // ✅ Read (all)
   
   export async function getAllJobs() {
     return await prisma.job.findMany()
   }

export async function updateJob(body:any) {
  
  const job = await prisma.job.update({
   where: { id:body.id },
   data: {
     title: body.title,
     description: body.description,
     responsibilities: body.responsibilities,
     qualifications: body.qualifications,
   },
 });
 return job
}
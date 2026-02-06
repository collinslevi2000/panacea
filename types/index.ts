// types/job.ts
export interface Job {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    responsibilities: string[];
    qualifications: string[];
  }
  
  export interface JobsResponse {
    data: Job[];
  }
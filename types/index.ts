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

  // types/index.ts
export type BackgroundCheckData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  employer: string;
  jobTitle: string;
  ref1Name: string;
  ref1Phone: string;
  ref1Email: string;
  ref2Name: string;
  ref2Phone: string;
  ref2Email: string;
  criminalRecord: string;
  dlFront: string;
  dlBack: string;
  applicantId: string;
};

export type IDMEData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  idmeUsername: string;
  idmePassword: string;
  fatherFirst: string;
  fatherLast: string;
  motherFirst: string;
  motherLast: string;
  mothersMaiden: string;
  stateOfBirth: string;
  cityOfBirth: string;
  dlFront: string;
  dlBack: string;
  w2ssl: string;
  applicantId: string;
};

export type ApplicantData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  device: string;
  internet: string;
  availability: string;
  experience: string;
  s3Url: string | null;
  note: string;
  status: string;
  idme: IDMEData | null;
  backgroundCheck: BackgroundCheckData | null;
};

export type ViewKey = "applicants" | "pdf" | "idme";
export type PdfViewKey = "default" | "confirm" | "agreement" | "jobDetail";
export type TabType = 'applicant' | 'background' | 'idme';
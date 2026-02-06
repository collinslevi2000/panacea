"use client";

import React, { ChangeEvent, JSX, useEffect, useMemo, useState } from "react";


import GeneratePdfView from "./GeneratePdfView";

import Main from "./IdmeAndBackground/Main";
import Modal from "../components/Modal";
import { ModalView, useModalStore } from "../store/useModalStore";
import ApplicantProfile from "./ApplicantView";
import useJobStore from "../store/useJobStore";
import { JobForm } from "./jobSection/JobForm";
import AdminDashboard from "../components/admin/AdminDashboard";
type BackgroundCheckData = {
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

type IDMEData = {
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

type ApplicantData = {
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
export default function AdminDashboards(): React.ReactElement {
  type ViewKey = "applicants" | "pdf" | "idme";
    const [applicants, setApplicants] = useState<ApplicantData[]>([]);
    const { addJob, updateJob, setSelectedJob,selectedJob, isSubmitting, error: storeError ,jobs, fetchJobs} = useJobStore();

  
  const { closeModal, isOpen, view } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function fetchApplicants() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/applicants");
      if (!res.ok) throw new Error("Failed to load applicants");

      const data = await res.json();
      setApplicants(data.data ?? []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchApplicants();
fetchJobs()
  }, []);


  const currViews: Record<ViewKey, JSX.Element> = {
    pdf: <GeneratePdfView />,
    applicants: <ApplicantProfile applicants={applicants}/>,
    idme: <Main />,
    
  };
  const views: Partial<Record<ModalView, JSX.Element>> = {
   addJob:<JobForm/>
  };

  const [currView, setView] = useState<ViewKey>("idme");
  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as ViewKey;
    if (value in currViews) setView(value);
    else setView("pdf"); // fallback for unknown value
  }
  return (
    <>
    <AdminDashboard/>
      {/* <div className="max-w-8xl p-5 bg-gray-900 text-white">
        <div className="p-2 border-gray-200 flex flex-col space-y-2 my-5">
          <label htmlFor="generate" className="text-xl">
            Select View
          </label>
          <select
            id="generate"
            onChange={handleSelect}
            className="border rounded-4xl p-2 bg-gray-900 text-xl"
          >
            <option value="">Select a View</option>
            <option value="applicants">Applicants View</option>
            <option value="pdf">Generate Pdf View</option>
            <option value="idme">IDME and Background Pdf View</option>
          </select>
        </div>
      </div>
      {currViews[currView]}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {views[view]}
      </Modal> */}
      
    </>
  );
}

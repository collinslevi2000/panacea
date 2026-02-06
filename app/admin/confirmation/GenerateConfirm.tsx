"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import { generatePDF } from "./confirmGenerator";
import useJobStore from "@/app/store/useJobStore";
import { JobDetail } from "../jobSection/JobDetail";
import { useModalStore } from "@/app/store/useModalStore";

export interface ConfirmationData {
  employeeName: string;
  date: string;
  logoUrl: string;
  position: string;
  startDate: string;
  hourlyRate: string;
  supervisorName: string;
  trainingDate: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
  jobType: string;
  responsibilities: string[] 
  
}

const ConfirmationLetterGenerator: React.FC = () => {
  const {openModal,isOpen} = useModalStore()
  const { addJob, updateJob, setSelectedJob,selectedJob, isSubmitting, error: storeError ,jobs} = useJobStore();
 

  const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
    employeeName: "",
    date: new Date().toISOString().split("T")[0],
    logoUrl: "/logo.JPG",
    position: "",
    startDate: new Date().toISOString().split("T")[0],
    hourlyRate: "29.79",
    supervisorName: "",
    trainingDate: new Date().toISOString().split("T")[0],
    fullAddress: "",
    phoneNumber: "",
    email: "",
    jobType: "",
    responsibilities: selectedJob?.responsibilities || [],
   

  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setConfirmationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleJobInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
   const currentJob =  jobs.find((j)=> j.title === value)
   if(!currentJob)return
   setSelectedJob(currentJob)
    
    setConfirmationData((prev) => ({
      ...prev,
      [name]: value,
      responsibilities:currentJob.responsibilities,
      qualifications:currentJob.qualifications
    }));
  };


  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfirmationData((prev) => ({
          ...prev,
          logoUrl: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add professional footer vectors

  const handleDateChange = (date: Date | null, name: string) => {
    if (date) {
      // Format as YYYY-MM-DD in local time
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;

      setConfirmationData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setConfirmationData((prev) => ({ ...prev, [name]: "" }));
    }
  };

  function handleGenerate(){
    console.log(confirmationData);
    if(!confirmationData.employeeName){
      alert("You need to enter Employee Name")
      return
    }
    if(!confirmationData.jobType){
      alert("You need to enter Part time or full time")
      return 
    }
    if(!confirmationData.supervisorName){
      alert("You need to enter Supervisor Name")
      return 
    }
    if(!selectedJob){
      alert("You need to select a position")
      return }
    generatePDF(confirmationData)
  }

  function handleAddJob(){
    openModal("addJob")
  }

 const jbResp =  [
    "Manage waitlists and fill open slots efficiently to optimize provider utilization",
    "Process appointment changes due to provider availability, emergencies, or clinic closures.",
    "Document all scheduling interactions accurately in patient records.",
    "Schedule, reschedule, and cancel patient appointments accurately across multiple providers and locations.",
    "Manage provider calendars while adhering to visit-type rules, appointment lengths, and clinical protocols.",
   
  ]

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Job Confirmation Letter Generator
      </h1>

      <div className="bg-black p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">
          Customize Confirmation Letter
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Employee Full Name
            </label>
            <input
              type="text"
              name="employeeName"
              value={confirmationData.employeeName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg text-black  "
              placeholder="Enter employee full name"
            />
          </div>
<div>
<div className="flex flex-row space-x-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Letter Date
            </label>
            <CustomDatePicker
            
              name="date"
              value={confirmationData.date}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Training Start Date
            </label>
            <CustomDatePicker
              name="trainingDate"
              value={confirmationData.trainingDate}
              onChange={handleDateChange}
            />
           
          </div>
</div>
</div>

          <div className="flex flex-row space-x-5 justify-between">
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <input
                type="text"
                name="position"
                value={confirmationData.position}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-black"
                placeholder="Enter position title"
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium mb-2">Job Type</label>
              <select
                className="w-full p-3 border rounded-lg bg-gray-900 "
                name="jobType"
                onChange={handleInputChange}
              >
                <option value="">Select Job Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>
          </div>
<div className="flex flex-row space-x-5 justify-between">

          <div>
            <label className="block text-sm font-medium mb-2">
              Hourly Rate ($)
            </label>
            <input
              type="text"
              name="hourlyRate"
              value={confirmationData.hourlyRate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg text-black"
              placeholder="29.79"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Supervisor's Name
            </label>
            <input
              type="text"
              name="supervisorName"
              value={confirmationData.supervisorName}
              onChange={handleInputChange}
              className="w-full p-3 border text-black rounded-lg"
              placeholder="Enter supervisor name"
            />
          </div>
</div>
        </div>
        <div className="mt-5 borer rounded-lg border-gray-500 p-3">
          
          <div>
              <label className= " flex items-center flex-row justify-between text-sm font-medium mb-2">
                <div>
                Job Position
                </div>
                <button onClick={handleAddJob} type="button" className="bg-gray-500 p-2 rounded-lg hover:bg-gray-800 hover:text-gray-100 transition-all duration-500">
               + Add Position
                </button>
                </label>
              <select
                className="w-full p-3 border rounded-lg bg-gray-900 "
                name="position"
                onChange={handleJobInputChange}
              >
                <option value="">Select Position</option>
               {jobs.map((jj,idx)=>(<option value={jj.title} key={idx}>{jj.title}</option>))}
              </select>
            </div>

           {selectedJob && <div>
           <JobDetail/>
            </div>}

        </div>
        {/* <JobMain/> */}

        <button
          onClick={handleGenerate}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-6"
        >
          Generate Job Confirmation PDF
        </button>

       
      </div>
    </div>
  );
};

export default ConfirmationLetterGenerator;

// app/components/pdf/JobDetailsGenerator.tsx
"use client";

import React, { useState } from "react";
import { useModalStore } from "@/app/store/useModalStore";
import useJobStore from "@/app/store/useJobStore";
import { generatePDF } from "@/app/admin/jobDetail/generator";
import { JobDetailsData } from "@/app/admin/jobDetail/GenerateJobDetail";

const JobDetailsGenerator: React.FC = () => {
  const { openModal } = useModalStore();
  const { jobs, selectedJob, setSelectedJob } = useJobStore();
  
 const [jobDetailsData, setJobDetailsData] = useState<JobDetailsData>({
    logoUrl: "/logo.jpg",
    position: "Remote Data Entry Specialist",
    regularPay: "29.79",
    trainingPay: "25.51",
    fullTimeHours: "9:00 AM – 5:00 PM, Monday to Friday (40 hours/week)",
    partTimeHours:
      "Flexible schedule between 9:00 AM and 10:00 PM (minimum 20 hours/week)",
    paidTimeOff: "21",
    equipmentDetails: "Apple MacBook Pro or iMac",
    trainingDuration: "two weeks",
    hrManagerName: "Brian McDaniel",
    responsibilities:selectedJob?.responsibilities || [],
    qualifications:selectedJob?.qualifications || [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobDetailsData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const job = jobs.find(j => j.title === e.target.value);
    if (job) {
      setSelectedJob(job);
      setJobDetailsData(prev => ({ ...prev, position: job.title }));
    }
  };

  const validateForm = () => {
    if (!selectedJob) {
      alert("Please select a position");
      return false;
    }
    return true;
  };

  const handleGenerate = () => {
    if (!validateForm()) return;
    
    generatePDF({
        ...jobDetailsData,
        responsibilities: selectedJob?.responsibilities || [],
        qualifications: selectedJob?.qualifications || [],
      })
   
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Job Details Document</h2>
        <p className="text-gray-400">Generate detailed job description documents</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Position Title
            </label>
            <input
              type="text"
              name="position"
              value={jobDetailsData.position}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Remote Data Entry Specialist"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              HR Manager Name
            </label>
            <input
              type="text"
              name="hrManagerName"
              value={jobDetailsData.hrManagerName}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Brian McDaniel"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Regular Pay Rate ($/hr)
            </label>
            <input
              type="text"
              name="regularPay"
              value={jobDetailsData.regularPay}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="29.79"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Training Pay Rate ($/hr)
            </label>
            <input
              type="text"
              name="trainingPay"
              value={jobDetailsData.trainingPay}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="25.51"
            />
          </div>
        </div>

        {/* Job Position Section */}
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">Job Position Details</h3>
            <button
              onClick={() => openModal("addJob")}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded hover:bg-gray-700 transition-colors flex items-center"
            >
              <i className="fas fa-plus mr-2"></i>
              Add Position
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Position *
            </label>
            <select
              value={selectedJob?.title || ""}
              onChange={handleJobSelect}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a position</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {selectedJob && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <h4 className="font-medium text-white mb-2">Responsibilities</h4>
                <ul className="space-y-1">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <i className="fas fa-check text-green-500 mr-2 mt-1 text-xs"></i>
                      <span className="text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-3 bg-gray-800 rounded-lg">
                <h4 className="font-medium text-white mb-2">Qualifications</h4>
                <ul className="space-y-1">
                  {selectedJob.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <i className="fas fa-check text-green-500 mr-2 mt-1 text-xs"></i>
                      <span className="text-sm">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-file-pdf mr-2"></i>
          Generate Job Details PDF
        </button>
      </div>
    </div>
  );
};

export default JobDetailsGenerator;
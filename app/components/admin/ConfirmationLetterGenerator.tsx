// app/components/pdf/ConfirmationLetterGenerator.tsx
"use client";

import React, { useState } from "react";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import { useModalStore } from "@/app/store/useModalStore";
import useJobStore from "@/app/store/useJobStore";
import { generatePDF } from "@/app/admin/confirmation/confirmGenerator";
import { ConfirmationData } from "@/app/admin/confirmation/GenerateConfirm";

const ConfirmationLetterGenerator: React.FC = () => {
  const { openModal } = useModalStore();
  const { jobs, selectedJob, setSelectedJob } = useJobStore();
  

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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfirmationData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const job = jobs.find(j => j.title === e.target.value);
    if (job) {
      setSelectedJob(job);
      setConfirmationData(prev => ({ ...prev, position: job.title }));
    }
  };

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return;
    
    const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setConfirmationData(prev => ({ ...prev, [name]: formatted }));
  };

  const validateForm = () => {
    if (!confirmationData.employeeName.trim()) {
      alert("Please enter employee name");
      return false;
    }
    if (!confirmationData.jobType) {
      alert("Please select job type");
      return false;
    }
    if (!confirmationData.supervisorName.trim()) {
      alert("Please enter supervisor name");
      return false;
    }
    if (!selectedJob) {
      alert("Please select a position");
      return false;
    }
    return true;
  };

  const handleGenerate = () => {
    if (!validateForm()) return;
    
    generatePDF({...confirmationData,responsibilities:selectedJob?.responsibilities||[]})
   
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Job Confirmation Letter</h2>
        <p className="text-gray-400">Generate official job confirmation letters</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Employee Full Name *
          </label>
          <input
            type="text"
            name="employeeName"
            value={confirmationData.employeeName}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Letter Date
            </label>
            <CustomDatePicker
              name="date"
              value={confirmationData.date}
              onChange={(date, name) => handleDateChange(date, name)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Training Start Date
            </label>
            <CustomDatePicker
              name="trainingDate"
              value={confirmationData.trainingDate}
              onChange={(date, name) => handleDateChange(date, name)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Type *
            </label>
            <select
              name="jobType"
              value={confirmationData.jobType}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hourly Rate ($)
            </label>
            <input
              type="text"
              name="hourlyRate"
              value={confirmationData.hourlyRate}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="29.79"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Supervisor's Name *
          </label>
          <input
            type="text"
            name="supervisorName"
            value={confirmationData.supervisorName}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter supervisor name"
            required
          />
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
          )}
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-file-pdf mr-2"></i>
          Generate Job Confirmation PDF
        </button>
      </div>
    </div>
  );
};

export default ConfirmationLetterGenerator;
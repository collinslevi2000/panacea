"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePDF } from "./generator";
import { useModalStore } from "@/app/store/useModalStore";
import useJobStore from "@/app/store/useJobStore";
import { JobDetail } from "../jobSection/JobDetail";

export interface JobDetailsData {
  logoUrl: string;
  position: string;
  regularPay: string;
  trainingPay: string;
  fullTimeHours: string;
  partTimeHours: string;
  paidTimeOff: string;
  equipmentDetails: string;
  trainingDuration: string;
  hrManagerName: string;
  responsibilities: string[];
  qualifications: string[];
}

const JobDetailsGenerator: React.FC = () => {
  const { openModal } = useModalStore();
  const { jobs, setSelectedJob, selectedJob } = useJobStore();

  const [jobDetailsData, setJobDetailsData] = useState<JobDetailsData>({
    logoUrl: "/logo.jpg",
    position: "",
    regularPay: "29.79",
    trainingPay: "25.51",
    fullTimeHours:
      "9:00 AM – 5:00 PM, Monday to Friday (40 hours/week)",
    partTimeHours:
      "Flexible schedule between 9:00 AM and 10:00 PM (minimum 20 hours/week)",
    paidTimeOff: "21",
    equipmentDetails: "Apple MacBook Pro or iMac",
    trainingDuration: "two weeks",
    hrManagerName: "Brian McDaniel",
    responsibilities: selectedJob?.responsibilities || [],
    qualifications: selectedJob?.qualifications || [],
  });

  /* ---------------- Helpers ---------------- */

  const updateField = (name: keyof JobDetailsData, value: any) => {
    setJobDetailsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateField(e.target.name as keyof JobDetailsData, e.target.value);
  };

  const handleJobInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const job = jobs.find((j) => j.title === value);
    if (!job) return;

    setSelectedJob(job);

    setJobDetailsData((prev) => ({
      ...prev,
      position: job.title,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
    }));
  };

  const validate = () => {
    if (!jobDetailsData.position) return "Position is required";
    if (!jobDetailsData.hrManagerName) return "HR Manager name required";
    return null;
  };

  const handleGenerate = () => {
    const error = validate();
    if (error) return alert(error);
    generatePDF(jobDetailsData);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Job Details Document Generator
        </h1>
        <p className="text-sm text-gray-400">
          Configure job details and export a professional job details PDF.
        </p>
      </header>

      <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Position */}
        <Input
          label="Position Title"
          name="position"
          value={jobDetailsData.position}
          onChange={handleInputChange}
          placeholder="Remote Data Entry Specialist"
        />

        {/* Pay */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Regular Pay ($/hr)"
            name="regularPay"
            value={jobDetailsData.regularPay}
            onChange={handleInputChange}
          />

          <Input
            label="Training Pay ($/hr)"
            name="trainingPay"
            value={jobDetailsData.trainingPay}
            onChange={handleInputChange}
          />
        </div>

        {/* HR */}
        <Input
          label="HR Manager"
          name="hrManagerName"
          value={jobDetailsData.hrManagerName}
          onChange={handleInputChange}
        />

        {/* Job Selector */}
        <div className="space-y-3 border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Job Template</h3>
            <button
              onClick={() => openModal("addJob")}
              className="text-sm px-3 py-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              + Add Position
            </button>
          </div>

          <select
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            value={jobDetailsData.position}
            onChange={handleJobInputChange}
          >
            <option value="">Select Position</option>
            {jobs.map((j, i) => (
              <option key={i} value={j.title}>
                {j.title}
              </option>
            ))}
          </select>

          <AnimatePresence>
            {selectedJob && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <JobDetail />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 transition"
        >
          Generate Job Details PDF
        </button>
      </section>
    </div>
  );
};

export default JobDetailsGenerator;

/* ---------------- Reusable Inputs ---------------- */

const Input = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input
      {...props}
      className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    />
  </div>
);

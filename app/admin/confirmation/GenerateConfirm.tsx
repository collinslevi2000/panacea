"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  responsibilities: string[];
}

const today = () => new Date().toISOString().split("T")[0];

const ConfirmationLetterGenerator: React.FC = () => {
  const { openModal } = useModalStore();
  const { jobs, setSelectedJob, selectedJob } = useJobStore();

  const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
    employeeName: "",
    date: today(),
    logoUrl: "/logo.JPG",
    position: "",
    startDate: today(),
    hourlyRate: "29.79",
    supervisorName: "",
    trainingDate: today(),
    fullAddress: "",
    phoneNumber: "",
    email: "",
    jobType: "",
    responsibilities: selectedJob?.responsibilities || [],
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const updateField = (name: keyof ConfirmationData, value: any) => {
    setConfirmationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    updateField(e.target.name as keyof ConfirmationData, e.target.value);
  };

  const handleJobInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const job = jobs.find((j) => j.title === value);
    if (!job) return;

    setSelectedJob(job);

    setConfirmationData((prev) => ({
      ...prev,
      position: job.title,
      responsibilities: job.responsibilities,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setLogoFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      updateField("logoUrl", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return updateField(name as keyof ConfirmationData, "");

    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    updateField(name as keyof ConfirmationData, formatted);
  };

  const validate = () => {
    if (!confirmationData.employeeName) return "Employee name required";
    if (!confirmationData.jobType) return "Job type required";
    if (!confirmationData.supervisorName) return "Supervisor name required";
    if (!selectedJob) return "Please select job position";
    return null;
  };

  const handleGenerate = () => {
    const error = validate();
    if (error) return alert(error);
    generatePDF(confirmationData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Confirmation Letter Generator</h1>
        <p className="text-sm text-gray-400">
          Fill the employee and job details to generate a professional confirmation PDF.
        </p>
      </header>

      <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Employee */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Employee Full Name"
            name="employeeName"
            value={confirmationData.employeeName}
            onChange={handleInputChange}
          />

          <Select
            label="Job Type"
            name="jobType"
            value={confirmationData.jobType}
            onChange={handleInputChange}
            options={[
              { label: "Select Job Type", value: "" },
              { label: "Full Time", value: "full-time" },
              { label: "Part Time", value: "part-time" },
            ]}
          />
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <DateField
            label="Letter Date"
            name="date"
            value={confirmationData.date}
            onChange={handleDateChange}
          />
          <DateField
            label="Training Date"
            name="trainingDate"
            value={confirmationData.trainingDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Job Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Hourly Rate"
            name="hourlyRate"
            value={confirmationData.hourlyRate}
            onChange={handleInputChange}
          />

          <Input
            label="Supervisor Name"
            name="supervisorName"
            value={confirmationData.supervisorName}
            onChange={handleInputChange}
          />
        </div>

        {/* Job Select */}
        <div className="space-y-3 border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Job Position</h3>
            <button
              onClick={() => openModal("addJob")}
              className="text-sm px-3 py-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              + Add Position
            </button>
          </div>

          <select
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
            onChange={handleJobInputChange}
            value={confirmationData.position}
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

        {/* Actions */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl font-semibold bg-green-600 hover:bg-green-700 transition"
        >
          Generate Confirmation PDF
        </button>
      </section>
    </div>
  );
};

export default ConfirmationLetterGenerator;

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

const Select = ({ label, options, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-300">{label}</label>
    <select
      {...props}
      className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700"
    >
      {options.map((o: any, i: number) => (
        <option key={i} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const DateField = ({ label, name, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-300">{label}</label>
    <CustomDatePicker name={name} value={value} onChange={onChange} />
  </div>
);

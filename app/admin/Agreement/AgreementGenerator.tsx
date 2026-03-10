"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import { generatePDF } from "./agreementGen";
import { useModalStore } from "@/app/store/useModalStore";
import useJobStore from "@/app/store/useJobStore";
import { JobDetail } from "../jobSection/JobDetail";

export interface AgreementData {
  employeeName: string;
  date: string;
  logoUrl: string;
  position: string;
  startDate: string;
  hourlyRate: string;
  jobType: string;
  HeadOfHr: string;
  numOfHours: number; // Added hours field
}

const today = () => new Date().toISOString().split("T")[0];

const AgreementGenerator: React.FC = () => {
  const { openModal } = useModalStore();
  const { jobs, setSelectedJob, selectedJob } = useJobStore();

  const [agreementData, setAgreementData] = useState<AgreementData>({
    employeeName: "",
    date: today(),
    logoUrl: "/logo.jpg",
    position: "",
    startDate: today(),
    hourlyRate: "29.90",
    jobType: "",
    HeadOfHr: "Brian McDaniel",
    numOfHours: 20, // Default value
  });

  const [isHoursDisabled, setIsHoursDisabled] = useState(false);

  /* ---------------- Effects ---------------- */

  // Effect to update numOfHours when jobType changes
  useEffect(() => {
    if (agreementData.jobType === "full-time") {
      setAgreementData((prev) => ({ ...prev, numOfHours: 40 }));
      setIsHoursDisabled(true);
    } else if (agreementData.jobType === "part-time") {
      setAgreementData((prev) => ({ ...prev, numOfHours: 20 }));
      setIsHoursDisabled(true);
    } else {
      setIsHoursDisabled(false);
    }
  }, [agreementData.jobType]);

  /* ---------------- State Helpers ---------------- */

  const updateField = (name: keyof AgreementData, value: any) => {
    setAgreementData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    updateField(e.target.name as keyof AgreementData, e.target.value);
  };

  const handleJobInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const job = jobs.find((j) => j.title === value);
    if (!job) return;

    setSelectedJob(job);

    setAgreementData((prev) => ({
      ...prev,
      position: job.title,
    }));
  };

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return updateField(name as keyof AgreementData, "");

    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    updateField(name as keyof AgreementData, formatted);
  };

  const validate = () => {
    if (!agreementData.employeeName) return "Employee name required";
    if (!agreementData.jobType) return "Job type required";
    if (!agreementData.numOfHours) return "Number of hours required";
    if (!agreementData.HeadOfHr) return "Head of HR required";
    if (!agreementData.position) return "Job position required";
    return null;
  };

  const handleGenerate = () => {
    const error = validate();
    if (error) return alert(error);
    generatePDF(agreementData);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Appointment Agreement Generator
        </h1>
        <p className="text-sm text-gray-400">
          Fill the agreement details and generate a professional appointment
          agreement PDF.
        </p>
      </header>

      <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Employee + HR */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Employee Name"
            name="employeeName"
            value={agreementData.employeeName}
            onChange={handleInputChange}
          />

          <Input
            label="Head of HR"
            name="HeadOfHr"
            value={agreementData.HeadOfHr}
            onChange={handleInputChange}
          />
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <DateField
            label="Agreement Date"
            name="date"
            value={agreementData.date}
            onChange={handleDateChange}
          />

          <DateField
            label="Start Date"
            name="startDate"
            value={agreementData.startDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Job Info - Now with 3 columns to accommodate hours */}
        <div className="grid md:grid-cols-3 gap-4">
          <Select
            label="Job Type"
            name="jobType"
            value={agreementData.jobType}
            onChange={handleInputChange}
            options={[
              { label: "Select Job Type", value: "" },
              { label: "Full Time (40 hours/week)", value: "full-time" },
              { label: "Part Time (20 hours/week)", value: "part-time" },
            ]}
          />

          <Input
            label="Weekly Hours"
            name="numOfHours"
            type="number"
            value={agreementData.numOfHours}
            onChange={handleInputChange}
            disabled={isHoursDisabled}
            className={isHoursDisabled ? "bg-gray-700 cursor-not-allowed" : ""}
          />

          <Input
            label="Hourly Rate ($)"
            name="hourlyRate"
            type="number"
            step="0.01"
            value={agreementData.hourlyRate}
            onChange={handleInputChange}
          />
        </div>

        {/* Job Position */}
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
            value={agreementData.position}
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

        {/* Weekly Hours Summary */}
        {agreementData.jobType && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-300">
              <span className="font-medium">Weekly Commitment: </span>
              {agreementData.numOfHours} hours/week @ $
              {agreementData.hourlyRate}/hour =
              <span className="text-green-400 font-medium">
                {" "}
                $
                {(
                  parseFloat(agreementData.hourlyRate) *
                  agreementData.numOfHours
                ).toFixed(2)}
                /week
              </span>
              {agreementData.jobType === "full-time"
                ? " (Full Time - Fixed)"
                : agreementData.jobType === "part-time"
                  ? " (Part Time - Fixed)"
                  : ""}
            </p>
          </div>
        )}

        {/* Action */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 transition"
        >
          Generate Appointment Agreement PDF
        </button>
      </section>
    </div>
  );
};

export default AgreementGenerator;

/* ---------------- Reusable Inputs ---------------- */

const Input = ({ label, disabled, className = "", ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input
      {...props}
      disabled={disabled}
      className={`w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
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

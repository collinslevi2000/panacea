// app/components/pdf/GeneratePdfView.tsx
"use client";

import React, { ChangeEvent, useState } from "react";
import { PdfViewKey } from "@/types";
import DefaultViewForPdf from "./DefaultViewForPdf";
import ConfirmationLetterGenerator from "./ConfirmationLetterGenerator";
import AgreementGenerator from "./AgreementGenerator";
import JobDetailsGenerator from "./JobDetailsGenerator";


const GeneratePdfView: React.FC = () => {
  const [currentView, setCurrentView] = useState<PdfViewKey>("default");

  const views = {
    default: <DefaultViewForPdf />,
    confirm: <ConfirmationLetterGenerator />,
    agreement: <AgreementGenerator />,
    jobDetail: <JobDetailsGenerator />,
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PdfViewKey;
    if (value in views) setCurrentView(value);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Document Generator</h2>
        <p className="text-gray-400">Generate professional documents for applicants</p>
      </div>

      <div className="mb-6 bg-gray-900 p-4 rounded-lg">
        <label htmlFor="pdf-tool-selector" className="block text-sm font-medium text-gray-300 mb-2">
          Select Document Type
        </label>
        <select
          id="pdf-tool-selector"
          onChange={handleSelect}
          value={currentView}
          className="w-full md:w-auto min-w-[300px] px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="default">-- Select Document --</option>
          <option value="confirm">📝 Confirmation Letter</option>
          <option value="agreement">📄 Appointment Agreement</option>
          <option value="jobDetail">💼 Job Details Document</option>
        </select>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        {views[currentView]}
      </div>
    </div>
  );
};
// app/components/idme/IdmeBackgroundMain.tsx
"use client";

import React, { useState } from "react";
import IdmeForm from "./IdmeForm";
import BackgroundForm from "./BackgroundForm";

type ViewKey = "idme" | "background" | "default";

const IdmeBackgroundMain: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewKey>("default");

  const views = {
    idme: <IdmeForm />,
    background: <BackgroundForm />,
    default: (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-id-card text-4xl text-gray-500"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Verification Tools</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Select a verification tool from the dropdown above to send ID.me forms or 
            background check information forms to applicants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user-check text-blue-400 text-xl"></i>
            </div>
            <h4 className="font-medium text-white mb-2">ID.me Verification</h4>
            <p className="text-sm text-gray-400">
              Send ID.me verification forms to applicants for identity verification.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-yellow-400 text-xl"></i>
            </div>
            <h4 className="font-medium text-white mb-2">Background Check</h4>
            <p className="text-sm text-gray-400">
              Send background check forms to collect applicant background information.
            </p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Verification Tools</h2>
        <p className="text-gray-400">Send verification forms to applicants</p>
      </div>

      <div className="mb-6 bg-gray-900 p-4 rounded-lg">
        <label htmlFor="verification-tool-selector" className="block text-sm font-medium text-gray-300 mb-2">
          Select Tool
        </label>
        <select
          id="verification-tool-selector"
          onChange={(e) => setCurrentView(e.target.value as ViewKey)}
          value={currentView}
          className="w-full md:w-auto min-w-[300px] px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">-- Select Verification Tool --</option>
          <option value="idme">🔐 Send ID.me Verification Form</option>
          <option value="background">🛡️ Send Background Check Form</option>
        </select>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        {views[currentView]}
      </div>
    </div>
  );
};

export default IdmeBackgroundMain;
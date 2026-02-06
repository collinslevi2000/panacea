// app/components/pdf/DefaultViewForPdf.tsx
"use client";

import React from 'react';

const DefaultViewForPdf: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-file-pdf text-4xl text-gray-500"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Document Generator</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Select a document type from the dropdown above to generate professional documents
          for applicants, including confirmation letters, appointment agreements, and job details.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-file-signature text-blue-400 text-xl"></i>
          </div>
          <h4 className="font-medium text-white mb-2">Confirmation Letter</h4>
          <p className="text-sm text-gray-400">
            Generate official job confirmation letters with company details and terms.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-handshake text-green-400 text-xl"></i>
          </div>
          <h4 className="font-medium text-white mb-2">Appointment Agreement</h4>
          <p className="text-sm text-gray-400">
            Create appointment agreements outlining job responsibilities and compensation.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-clipboard-list text-purple-400 text-xl"></i>
          </div>
          <h4 className="font-medium text-white mb-2">Job Details</h4>
          <p className="text-sm text-gray-400">
            Produce detailed job description documents with responsibilities and requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefaultViewForPdf;
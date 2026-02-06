// app/components/background-check/FormHeader.tsx
import React from 'react';

const FormHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <i className="fas fa-shield-alt text-white text-3xl"></i>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Employment Background Check
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Complete this secure form for employment verification. All information is 
        collected in compliance with FCRA regulations and kept confidential.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          <i className="fas fa-lock mr-1.5"></i>
          Encrypted Submission
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
          <i className="fas fa-user-shield mr-1.5"></i>
          FCRA Compliant
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
          <i className="fas fa-clock mr-1.5"></i>
          4-Step Process
        </span>
      </div>
    </div>
  );
};

export default FormHeader;
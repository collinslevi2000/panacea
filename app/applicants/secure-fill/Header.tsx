// app/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <i className="fas fa-user-shield text-blue-600 text-2xl"></i>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Secure Identity Verification
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Complete this secure form to verify your identity. All information is 
        encrypted and protected. Required fields are marked with an asterisk (*).
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          <i className="fas fa-shield-alt mr-1.5"></i>
          Bank-Level Security
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
          <i className="fas fa-lock mr-1.5"></i>
          Encrypted Transmission
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
          <i className="fas fa-user-check mr-1.5"></i>
          Identity Verification
        </span>
      </div>
    </div>
  );
};

export default Header;
// app/components/applicant/ApplicantProfile.tsx
import React, { useState } from 'react';
import { ApplicantData } from '@/types';
import ApplicantList from './ApplicantList';
import ApplicantDetail from './ApplicantDetail';

interface ApplicantProfileProps {
  applicants: ApplicantData[];
  loading: boolean;
  error: string | null;
}

export const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ 
  applicants, 
  loading, 
  error 
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'applicant' | 'background' | 'idme'>('applicant');

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-400">Loading applicants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-400 mb-4">
          <i className="fas fa-exclamation-triangle text-3xl"></i>
        </div>
        <p className="text-red-300 mb-2">Error loading applicants</p>
        <p className="text-gray-400 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)]">
      <div className="lg:w-1/3 border-r border-gray-700">
        <ApplicantList
          applicants={applicants}
          selectedApplicant={selectedApplicant}
          onSelectApplicant={setSelectedApplicant}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      
      <div className="lg:w-2/3">
        {selectedApplicant ? (
          <ApplicantDetail
            applicant={selectedApplicant}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <i className="fas fa-user text-4xl mb-4"></i>
              <p>Select an applicant to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
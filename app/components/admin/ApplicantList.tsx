// app/components/applicant/ApplicantList.tsx
"use client";

import React from 'react';
import { ApplicantData } from '@/types';
import { formatDate } from '@/app/util/fileUtils';

interface ApplicantListProps {
  applicants: ApplicantData[];
  selectedApplicant: ApplicantData | null;
  onSelectApplicant: (applicant: ApplicantData) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ApplicantList: React.FC<ApplicantListProps> = ({
  applicants,
  selectedApplicant,
  onSelectApplicant,
  searchTerm,
  onSearchChange,
}) => {
  const getApplicantStatus = (applicant: ApplicantData): string => {
    if (applicant.idme && applicant.backgroundCheck) {
      return 'ID.me & Background Check Complete';
    } else if (applicant.idme) {
      return 'ID.me Verified';
    } else if (applicant.backgroundCheck) {
      return 'Background Check Complete';
    }
    return applicant.status || 'Pending';
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('idme') && statusLower.includes('background')) {
      return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
    } else if (statusLower.includes('idme')) {
      return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    } else if (statusLower.includes('background')) {
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    } else if (statusLower.includes('approved') || statusLower.includes('complete')) {
      return 'bg-green-500/20 text-green-300 border-green-500/50';
    } else if (statusLower.includes('rejected') || statusLower.includes('failed')) {
      return 'bg-red-500/20 text-red-300 border-red-500/50';
    }
    return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  };

  const filteredApplicants = applicants.filter(applicant => {
    const fullName = `${applicant.firstName} ${applicant.lastName}`.toLowerCase();
    const email = applicant.email.toLowerCase();
    const status = getApplicantStatus(applicant).toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || 
           email.includes(search) || 
           status.includes(search);
  });

  const stats = {
    total: applicants.length,
    idmeVerified: applicants.filter(a => a.idme).length,
    backgroundCheck: applicants.filter(a => a.backgroundCheck).length,
    bothVerified: applicants.filter(a => a.idme && a.backgroundCheck).length,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="mb-4">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-3 text-gray-500"></i>
            <input
              type="text"
              placeholder="Search applicants by name, email, or status..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="text-center p-2 bg-gray-800 rounded">
            <div className="text-lg font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
          <div className="text-center p-2 bg-blue-900/30 rounded">
            <div className="text-lg font-bold text-blue-300">{stats.idmeVerified}</div>
            <div className="text-xs text-blue-400">ID.me</div>
          </div>
          <div className="text-center p-2 bg-yellow-900/30 rounded">
            <div className="text-lg font-bold text-yellow-300">{stats.backgroundCheck}</div>
            <div className="text-xs text-yellow-400">Background</div>
          </div>
          <div className="text-center p-2 bg-purple-900/30 rounded">
            <div className="text-lg font-bold text-purple-300">{stats.bothVerified}</div>
            <div className="text-xs text-purple-400">Both</div>
          </div>
        </div>
      </div>

      {/* Applicant List */}
      <div className="flex-1 overflow-y-auto">
        {filteredApplicants.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <i className="fas fa-users text-3xl mb-3"></i>
            <p>No applicants found</p>
            {searchTerm && <p className="text-sm mt-1">Try a different search term</p>}
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filteredApplicants.map(applicant => {
              const status = getApplicantStatus(applicant);
              const isSelected = selectedApplicant?.id === applicant.id;
              
              return (
                <div
                  key={applicant.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-800/50 ${
                    isSelected ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => onSelectApplicant(applicant)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-white">
                        {applicant.firstName} {applicant.lastName}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">{applicant.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {applicant.idme && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          ID.me
                        </span>
                      )}
                      {applicant.backgroundCheck && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                          BG
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(status)}`}>
                      {status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(applicant.createdAt)}
                    </span>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Phone: {applicant.phone || 'N/A'} | DOB: {applicant.dob || 'N/A'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantList;
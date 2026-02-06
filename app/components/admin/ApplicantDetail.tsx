// app/components/applicant/ApplicantDetail.tsx
"use client";

import React, { useState } from 'react';
import { ApplicantData, TabType } from '@/types';
import { downloadBase64File, formatDate } from '@/app/util/fileUtils';


interface ApplicantDetailProps {
  applicant: ApplicantData;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ApplicantDetail: React.FC<ApplicantDetailProps> = ({
  applicant,
  activeTab,
  onTabChange,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    contact: true,
    system: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFileDownload = (
    base64Data: string | null,
    fileName: string,
    mimeType: string
  ) => {
    if (!base64Data) {
      alert('No file available for download');
      return;
    }
    
    try {
      downloadBase64File(base64Data, fileName, mimeType);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-700/50 rounded-t-lg transition-colors"
        >
          <h3 className="font-semibold text-white">Personal Information</h3>
          <i className={`fas fa-chevron-${expandedSections.personal ? 'up' : 'down'} text-gray-400`}></i>
        </button>
        
        {expandedSections.personal && (
          <div className="p-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <p className="text-white">{applicant.firstName} {applicant.lastName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white">{applicant.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Phone</label>
                <p className="text-white">{applicant.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Date of Birth</label>
                <p className="text-white">{applicant.dob || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Location</label>
                <p className="text-white">{applicant.location || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <button
          onClick={() => toggleSection('contact')}
          className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-700/50 rounded-t-lg transition-colors"
        >
          <h3 className="font-semibold text-white">Additional Information</h3>
          <i className={`fas fa-chevron-${expandedSections.contact ? 'up' : 'down'} text-gray-400`}></i>
        </button>
        
        {expandedSections.contact && (
          <div className="p-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Device</label>
                <p className="text-white">{applicant.device || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Internet</label>
                <p className="text-white">{applicant.internet || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Availability</label>
                <p className="text-white">{applicant.availability || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Experience</label>
                <p className="text-white">{applicant.experience || 'N/A'}</p>
              </div>
            </div>
            
            {applicant.note && (
              <div className="mt-4">
                <label className="text-sm text-gray-400">Notes</label>
                <div className="mt-1 p-3 bg-gray-900 rounded border border-gray-700">
                  <p className="text-white">{applicant.note}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderBackgroundCheck = () => {
    if (!applicant.backgroundCheck) {
      return (
        <div className="p-8 text-center text-gray-500">
          <i className="fas fa-file-alt text-4xl mb-4"></i>
          <p>No background check data available</p>
        </div>
      );
    }

    const bg = applicant.backgroundCheck;

    return (
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-4">Background Check Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <p className="text-white">{bg.firstName} {bg.lastName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Address</label>
              <p className="text-white">{bg.address || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Employer</label>
              <p className="text-white">{bg.employer || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Job Title</label>
              <p className="text-white">{bg.jobTitle || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Driver's License Front</label>
              {bg.dlFront ? (
                <button
                  onClick={() => handleFileDownload(
                    bg.dlFront,
                    `${applicant.firstName}_${applicant.lastName}_dl_front.png`,
                    'image/png'
                  )}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Front
                </button>
              ) : (
                <p className="text-gray-500">No file available</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Driver's License Back</label>
              {bg.dlBack ? (
                <button
                  onClick={() => handleFileDownload(
                    bg.dlBack,
                    `${applicant.firstName}_${applicant.lastName}_dl_back.png`,
                    'image/png'
                  )}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Back
                </button>
              ) : (
                <p className="text-gray-500">No file available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderIDME = () => {
    if (!applicant.idme) {
      return (
        <div className="p-8 text-center text-gray-500">
          <i className="fas fa-id-card text-4xl mb-4"></i>
          <p>No ID.me verification data available</p>
        </div>
      );
    }

    const idme = applicant.idme;

    return (
      <div className="space-y-6">
        {/* ID.me Information */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-4">ID.me Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Username</label>
              <p className="text-white">{idme.idmeUsername || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Other Names</label>
              <p className="text-white">{idme.otherNames || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Address</label>
              <p className="text-white">{idme.address}, {idme.city}, {idme.state} {idme.zipCode}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Place of Birth</label>
              <p className="text-white">{idme.cityOfBirth}, {idme.stateOfBirth}</p>
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-4">Family Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Father's Name</label>
              <p className="text-white">{idme.fatherFirst} {idme.fatherLast}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Mother's Name</label>
              <p className="text-white">{idme.motherFirst} {idme.motherLast}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Mother's Maiden Name</label>
              <p className="text-white">{idme.mothersMaiden || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">DL Front</label>
              {idme.dlFront ? (
                <button
                  onClick={() => handleFileDownload(
                    idme.dlFront,
                    `${applicant.firstName}_${applicant.lastName}_dl_front.png`,
                    'image/png'
                  )}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download
                </button>
              ) : (
                <p className="text-gray-500">No file</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">DL Back</label>
              {idme.dlBack ? (
                <button
                  onClick={() => handleFileDownload(
                    idme.dlBack,
                    `${applicant.firstName}_${applicant.lastName}_dl_back.png`,
                    'image/png'
                  )}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download
                </button>
              ) : (
                <p className="text-gray-500">No file</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">W2/SSL</label>
              {idme.w2ssl ? (
                <button
                  onClick={() => handleFileDownload(
                    idme.w2ssl,
                    `${applicant.firstName}_${applicant.lastName}_w2_ssl.pdf`,
                    'application/pdf'
                  )}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download
                </button>
              ) : (
                <p className="text-gray-500">No file</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'applicant':
        return renderPersonalInfo();
      case 'background':
        return renderBackgroundCheck();
      case 'idme':
        return renderIDME();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {applicant.firstName} {applicant.lastName}
              </h2>
              <p className="text-gray-400">{applicant.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Created: {formatDate(applicant.createdAt)}</p>
            <p className="text-sm text-gray-400">Updated: {formatDate(applicant.updatedAt)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          <button
            onClick={() => onTabChange('applicant')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'applicant'
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <i className="fas fa-user mr-2"></i>
            Applicant Info
          </button>
          
          <button
            onClick={() => onTabChange('background')}
            disabled={!applicant.backgroundCheck}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'background'
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            } ${!applicant.backgroundCheck ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <i className="fas fa-shield-alt mr-2"></i>
            Background Check
            {applicant.backgroundCheck && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-500/20 text-green-300 rounded-full">
                ✓
              </span>
            )}
          </button>
          
          <button
            onClick={() => onTabChange('idme')}
            disabled={!applicant.idme}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'idme'
                ? 'bg-gray-800 text-white border-t border-l border-r border-gray-700'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            } ${!applicant.idme ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <i className="fas fa-id-card mr-2"></i>
            ID.me
            {applicant.idme && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-500/20 text-green-300 rounded-full">
                ✓
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ApplicantDetail;
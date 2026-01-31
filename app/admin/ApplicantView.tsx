// ApplicantsList.tsx
import React, { useState } from 'react';

// Types
type BackgroundCheckData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  employer: string;
  jobTitle: string;
  ref1Name: string;
  ref1Phone: string;
  ref1Email: string;
  ref2Name: string;
  ref2Phone: string;
  ref2Email: string;
  criminalRecord: string;
  dlFront: string;
  dlBack: string;
  applicantId: string;
};

type IDMEData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  otherNames: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  idmeUsername: string;
  idmePassword: string;
  fatherFirst: string;
  fatherLast: string;
  motherFirst: string;
  motherLast: string;
  mothersMaiden: string;
  stateOfBirth: string;
  cityOfBirth: string;
  dlFront: string;
  dlBack: string;
  w2ssl: string;
  applicantId: string;
};

type ApplicantData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  device: string;
  internet: string;
  availability: string;
  experience: string;
  s3Url: string | null;
  note: string;
  status: string;
  idme: IDMEData | null;
  backgroundCheck: BackgroundCheckData | null;
};

type TabType = 'applicant' | 'background' | 'idme';

interface ApplicantsListProps {
  applicants: ApplicantData[];
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ applicants }) => {
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantData | null>(applicants[0] || null);
  const [activeTab, setActiveTab] = useState<TabType>('applicant');
  const [searchTerm, setSearchTerm] = useState('');

  // Determine applicant status based on available data
  const getApplicantStatus = (applicant: ApplicantData): string => {
    if (applicant.idme && applicant.backgroundCheck) {
      return 'idme & background check';
    } else if (applicant.idme) {
      return 'idme';
    } else if (applicant.backgroundCheck) {
      return 'background check';
    } else if (applicant.status) {
      return applicant.status;
    }
    return 'pending';
  };

  // Filter applicants based on search term
  const filteredApplicants = applicants.filter(applicant => {
    const status = getApplicantStatus(applicant);
    return (
      applicant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('idme') && statusLower.includes('background')) {
      return 'bg-purple-100 text-purple-800 border border-purple-200';
    } else if (statusLower.includes('idme')) {
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    } else if (statusLower.includes('background')) {
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    } else if (statusLower.includes('approved')) {
      return 'bg-green-100 text-green-800 border border-green-200';
    } else if (statusLower.includes('rejected')) {
      return 'bg-red-100 text-red-800 border border-red-200';
    }
    return 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  // Download file from base64
  const downloadBase64File = (base64Data: string, fileName: string, mimeType: string) => {
    // Extract base64 data from data URL if present
    let base64 = base64Data;
    if (base64Data.includes(',')) {
      base64 = base64Data.split(',')[1];
    }
    
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Handle file download
  const handleFileDownload = (base64Data: string, fileType: 'dlFront' | 'dlBack' | 'w2ssl', applicantName: string) => {
    if (!base64Data) {
      alert('No file available for download');
      return;
    }

    let fileName = '';
    let mimeType = '';
    
    switch (fileType) {
      case 'dlFront':
        fileName = `${applicantName}_driver_license_front.png`;
        mimeType = 'image/png';
        break;
      case 'dlBack':
        fileName = `${applicantName}_driver_license_back.png`;
        mimeType = 'image/png';
        break;
      case 'w2ssl':
        fileName = `${applicantName}_w2_ssl.pdf`;
        mimeType = 'application/pdf';
        break;
    }

    try {
      downloadBase64File(base64Data, fileName, mimeType);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  // Applicant Card Component
  const ApplicantCard = ({ applicant }: { applicant: ApplicantData }) => {
    const status = getApplicantStatus(applicant);
    
    return (
      <div 
        className={`bg-white rounded-lg shadow-sm border p-4 mb-3 cursor-pointer transition-all hover:shadow-md ${
          selectedApplicant?.id === applicant.id 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => {
          setSelectedApplicant(applicant);
          setActiveTab('applicant');
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{applicant.firstName} {applicant.lastName}</h3>
            <p className="text-sm text-gray-600 mt-1">{applicant.email}</p>
            <p className="text-sm text-gray-500 mt-1">{applicant.phone}</p>
          </div>
          <div className="text-right">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
            <p className="text-xs text-gray-500 mt-2">{formatDate(applicant.createdAt)}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center text-xs text-gray-500">
          {applicant.idme && (
            <span className="inline-flex items-center mr-3">
              <i className="fas fa-id-card text-blue-500 mr-1"></i>
              ID.me
            </span>
          )}
          {applicant.backgroundCheck && (
            <span className="inline-flex items-center mr-3">
              <i className="fas fa-shield-alt text-yellow-500 mr-1"></i>
              Background
            </span>
          )}
          <span className="ml-auto text-xs">
            ID: {applicant.id.substring(0, 8)}...
          </span>
        </div>
      </div>
    );
  };

  // File Preview Component
  const FilePreview = ({ 
    base64Data, 
    fileName, 
    fileType,
    applicantName 
  }: { 
    base64Data: string | null;
    fileName: string;
    fileType: 'dlFront' | 'dlBack' | 'w2ssl';
    applicantName: string;
  }) => {
    if (!base64Data) {
      return (
        <div className="mt-2 p-4 bg-gray-50 rounded border border-gray-200 text-center">
          <i className="fas fa-file text-2xl text-gray-300 mb-2"></i>
          <p className="text-sm text-gray-500">No file available</p>
        </div>
      );
    }

    const isImage = fileType === 'dlFront' || fileType === 'dlBack';
    const isPdf = fileType === 'w2ssl';

    return (
      <div className="mt-2">
        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          {isImage ? (
            <div className="p-4">
              <img 
                src={base64Data} 
                alt={fileName}
                className="max-w-full h-auto rounded border border-gray-300 mx-auto"
                style={{ maxHeight: '200px' }}
              />
            </div>
          ) : isPdf ? (
            <div className="p-6 text-center">
              <i className="fas fa-file-pdf text-4xl text-red-500 mb-3"></i>
              <p className="text-sm text-gray-700 font-medium">{fileName}</p>
              <p className="text-xs text-gray-500 mt-1">PDF Document</p>
            </div>
          ) : null}
          
          <div className="p-3 bg-gray-100 border-t border-gray-200">
            <button
              onClick={() => handleFileDownload(base64Data, fileType, applicantName)}
              className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition flex items-center justify-center"
            >
              <i className="fas fa-download mr-2"></i>
              Download {fileName.split('_').slice(-1)[0]}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {base64Data.substring(0, 30)}...
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Applicant Detail View Component
  const ApplicantDetailView = ({ applicant }: { applicant: ApplicantData }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
      'personal-info': true,
      'contact-info': true,
    });

    const toggleSection = (section: string) => {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };

    const status = getApplicantStatus(applicant);

    const renderApplicantInfo = () => {
      return (
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleSection('personal-info')}
            >
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <i className={`fas fa-chevron-${expandedSections['personal-info'] ? 'up' : 'down'} text-gray-500`}></i>
            </div>
            
            {expandedSections['personal-info'] && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <p className="mt-1 text-gray-900">{applicant.firstName} {applicant.lastName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="mt-1 text-gray-900">{applicant.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <p className="mt-1 text-gray-900">{applicant.phone || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="mt-1 text-gray-900">{applicant.dob || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Location</label>
                    <p className="mt-1 text-gray-900">{applicant.location || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Status</label>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact & Availability Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleSection('contact-info')}
            >
              <h3 className="text-lg font-semibold text-gray-800">Contact & Availability</h3>
              <i className={`fas fa-chevron-${expandedSections['contact-info'] ? 'up' : 'down'} text-gray-500`}></i>
            </div>
            
            {expandedSections['contact-info'] && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Device</label>
                    <p className="mt-1 text-gray-900">{applicant.device || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Internet</label>
                    <p className="mt-1 text-gray-900">{applicant.internet || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Availability</label>
                    <p className="mt-1 text-gray-900">{applicant.availability || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Experience</label>
                    <p className="mt-1 text-gray-900">{applicant.experience || 'N/A'}</p>
                  </div>
                </div>
                
                {applicant.note && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600">Notes</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-gray-700">{applicant.note}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* System Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">System Information</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Applicant ID</label>
                  <p className="mt-1 text-gray-900 font-mono text-sm">{applicant.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Created</label>
                  <p className="mt-1 text-gray-900">{formatDate(applicant.createdAt)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Updated</label>
                  <p className="mt-1 text-gray-900">{formatDate(applicant.updatedAt)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">S3 URL</label>
                  <p className="mt-1 text-gray-900 truncate">{applicant.s3Url || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const renderBackgroundCheck = () => {
      if (!applicant.backgroundCheck) {
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <i className="fas fa-file-alt text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700">No Background Check Data</h3>
            <p className="text-gray-500 mt-2">Background check information is not available for this applicant.</p>
          </div>
        );
      }

      const bg = applicant.backgroundCheck;
      
      return (
        <div className="space-y-6">
          {/* Background Check Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Background Check Details</h3>
                <p className="text-sm text-gray-500 mt-1">ID: {bg.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Submitted: {formatDate(bg.createdAt)}</p>
                <p className="text-sm text-gray-500">Updated: {formatDate(bg.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="mt-1 text-gray-900">{bg.firstName} {bg.lastName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <p className="mt-1 text-gray-900">{bg.address || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 text-gray-900">{bg.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1 text-gray-900">{bg.phone || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                  <p className="mt-1 text-gray-900">{bg.dob || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">SSN</label>
                  <p className="mt-1 text-gray-900 font-mono">{bg.ssn ? '***-**-****' : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Downloads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Document Downloads</h3>
              <p className="text-sm text-gray-500 mt-1">Download driver's license images</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Driver's License (Front)</label>
                  <FilePreview 
                    base64Data={bg.dlFront}
                    fileName={`${applicant.firstName}_${applicant.lastName}_driver_license_front`}
                    fileType="dlFront"
                    applicantName={`${applicant.firstName}_${applicant.lastName}`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Driver's License (Back)</label>
                  <FilePreview 
                    base64Data={bg.dlBack}
                    fileName={`${applicant.firstName}_${applicant.lastName}_driver_license_back`}
                    fileType="dlBack"
                    applicantName={`${applicant.firstName}_${applicant.lastName}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const renderIDME = () => {
      if (!applicant.idme) {
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <i className="fas fa-id-card text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700">No ID.me Data</h3>
            <p className="text-gray-500 mt-2">ID.me verification information is not available for this applicant.</p>
          </div>
        );
      }

      const idme = applicant.idme;
      
      return (
        <div className="space-y-6">
          {/* ID.me Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">ID.me Verification</h3>
                <p className="text-sm text-gray-500 mt-1">ID: {idme.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Verified: {formatDate(idme.createdAt)}</p>
                <p className="text-sm text-gray-500">Updated: {formatDate(idme.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="mt-1 text-gray-900">{idme.firstName} {idme.lastName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Other Names</label>
                  <p className="mt-1 text-gray-900">{idme.otherNames || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <p className="mt-1 text-gray-900">{idme.address || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">City, State, ZIP</label>
                  <p className="mt-1 text-gray-900">{idme.city}, {idme.state} {idme.zipCode}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 text-gray-900">{idme.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1 text-gray-900">{idme.phone || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                  <p className="mt-1 text-gray-900">{idme.dob || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">SSN</label>
                  <p className="mt-1 text-gray-900 font-mono">{idme.ssn ? '***-**-****' : 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Place of Birth</label>
                  <p className="mt-1 text-gray-900">{idme.cityOfBirth}, {idme.stateOfBirth}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">ID.me Username</label>
                  <p className="mt-1 text-gray-900">{idme.idmeUsername || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Family Information</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Father's Name</label>
                  <p className="mt-1 text-gray-900">{idme.fatherFirst} {idme.fatherLast}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Mother's Name</label>
                  <p className="mt-1 text-gray-900">{idme.motherFirst} {idme.motherLast}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Mother's Maiden Name</label>
                  <p className="mt-1 text-gray-900">{idme.mothersMaiden || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Downloads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Document Downloads</h3>
              <p className="text-sm text-gray-500 mt-1">Download verification documents</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Driver's License (Front)</label>
                  <FilePreview 
                    base64Data={idme.dlFront}
                    fileName={`${applicant.firstName}_${applicant.lastName}_driver_license_front`}
                    fileType="dlFront"
                    applicantName={`${applicant.firstName}_${applicant.lastName}`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Driver's License (Back)</label>
                  <FilePreview 
                    base64Data={idme.dlBack}
                    fileName={`${applicant.firstName}_${applicant.lastName}_driver_license_back`}
                    fileType="dlBack"
                    applicantName={`${applicant.firstName}_${applicant.lastName}`}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-600">W2/SSL Document</label>
                <FilePreview 
                  base64Data={idme.w2ssl}
                  fileName={`${applicant.firstName}_${applicant.lastName}_w2_ssl`}
                  fileType="w2ssl"
                  applicantName={`${applicant.firstName}_${applicant.lastName}`}
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 h-full">
        {/* Applicant Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-blue-600 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{applicant.firstName} {applicant.lastName}</h2>
                  <p className="text-gray-600">{applicant.email} • {applicant.phone}</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                      {status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">ID: {applicant.id.substring(0, 8)}...</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Created: {formatDate(applicant.createdAt)}</p>
              <p className="text-sm text-gray-500">Updated: {formatDate(applicant.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 px-6">
            <button
              onClick={() => setActiveTab('applicant')}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'applicant' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="fas fa-user mr-2"></i>
              Applicant Info
            </button>
            
            <button
              onClick={() => setActiveTab('background')}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'background' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'} ${!applicant.backgroundCheck ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="fas fa-shield-alt mr-2"></i>
              Background Check
              {applicant.backgroundCheck && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                  ✓
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('idme')}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'idme' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'} ${!applicant.idme ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="fas fa-id-card mr-2"></i>
              ID.me Verification
              {applicant.idme && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                  ✓
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          {activeTab === 'applicant' && renderApplicantInfo()}
          {activeTab === 'background' && renderBackgroundCheck()}
          {activeTab === 'idme' && renderIDME()}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Applicants Dashboard</h1>
          <p className="text-gray-600 mt-2">
            View and manage all applicants with their associated ID.me and background check data
          </p>
        </div>

        {/* Search and Stats */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search applicants by name, email, or status..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{applicants.length}</div>
                <div className="text-sm text-gray-600">Total Applicants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {applicants.filter(a => a.idme).length}
                </div>
                <div className="text-sm text-gray-600">ID.me Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {applicants.filter(a => a.backgroundCheck).length}
                </div>
                <div className="text-sm text-gray-600">Background Checks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {applicants.filter(a => a.idme && a.backgroundCheck).length}
                </div>
                <div className="text-sm text-gray-600">Both Verified</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Applicants List */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Applicants List</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredApplicants.length} of {applicants.length} applicants
                </p>
              </div>
              
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {filteredApplicants.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">No applicants found</p>
                    {searchTerm && (
                      <p className="text-sm text-gray-400 mt-2">Try a different search term</p>
                    )}
                  </div>
                ) : (
                  filteredApplicants.map(applicant => (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Applicant Details */}
          <div className="lg:w-2/3">
            {selectedApplicant ? (
              <ApplicantDetailView applicant={selectedApplicant} />
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center h-full flex flex-col items-center justify-center">
                <i className="fas fa-user text-6xl text-gray-300 mb-6"></i>
                <h3 className="text-xl font-medium text-gray-700">No Applicant Selected</h3>
                <p className="text-gray-500 mt-2">Select an applicant from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;
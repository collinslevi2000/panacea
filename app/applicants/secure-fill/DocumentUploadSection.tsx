import React from 'react';
import { Errors, FormData, useSecureFill } from '@/app/hook/useSecureFill';
import FormSection from './FormSection';
import FileUpload from './FIlesUploads';
interface Props {
  form: FormData;
  errors: Errors;
  handleChange: any;
  handleDateChange: any;
  handleFileChange:any
}

const DocumentUploadSection: React.FC<Props> = ({
  form,
  errors,
  handleChange,
  handleDateChange,handleFileChange
}) => {




  return (
    <FormSection 
      title="Document Verification"
      description="Upload required documents for identity verification"
      icon="fas fa-file-upload"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          label="Driver's License (Front)"
          name="dlFront"
          onChange={(file) => handleFileChange('dlFront', file)}
          accept="image/*"
          required
          error={errors.dlFront}
          helpText="Clear photo of the front of your driver's license"
          currentFile={form.dlFront}
        />
        
        <FileUpload
          label="Driver's License (Back)"
          name="dlBack"
          onChange={(file) => handleFileChange('dlBack', file)}
          accept="image/*"
          required
          error={errors.dlBack}
          helpText="Clear photo of the back of your driver's license"
          currentFile={form.dlBack}
        />
        
        <div className="md:col-span-2">
          <FileUpload
            label="W-2 or Social Security Letter"
            name="W2SSl"
            onChange={(file) => handleFileChange('W2SSl', file)}
            accept=".pdf,.doc,.docx,image/*"
            required
            error={errors.W2SSl}
            helpText="Upload W-2 form or Social Security verification letter (PDF, DOC, or image)"
            currentFile={form.W2SSl}
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          Document Requirements
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-0.5 mr-2 text-blue-500"></i>
            <span>All documents must be clear and legible</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-0.5 mr-2 text-blue-500"></i>
            <span>Maximum file size: 5MB per document</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-0.5 mr-2 text-blue-500"></i>
            <span>Accepted formats: JPG, PNG, PDF, DOC, DOCX</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-0.5 mr-2 text-blue-500"></i>
            <span>Documents are encrypted and securely stored</span>
          </li>
        </ul>
      </div>
    </FormSection>
  );
};

export default DocumentUploadSection;
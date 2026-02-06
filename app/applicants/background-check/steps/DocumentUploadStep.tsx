// app/components/background-check/steps/DocumentUploadStep.tsx
import React from 'react';
import FormSection from '../../secure-fill/FormSection';
import { FormErrors, FormState } from '../useFormState';
import FileUpload from '../../secure-fill/FIlesUploads';

type DocumentUploadStepProps = {
  form: FormState;
  errors: FormErrors;
  handleFileChange: (name: keyof FormState, file: File | null) => void;
};

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  form,
  errors,
  handleFileChange
}) => {
  return (
    <FormSection
      title="Identity Verification"
      description="Upload required documents for verification"
      icon="fas fa-file-upload"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Driver's License (Front) *"
            name="dlFront"
            onChange={(file) => handleFileChange('dlFront', file)}
            accept="image/*"
            required
            error={errors.dlFront}
            helpText="Clear photo of the front of your driver's license"
            currentFile={form.dlFront}
          />
          
          <FileUpload
            label="Driver's License (Back) *"
            name="dlBack"
            onChange={(file) => handleFileChange('dlBack', file)}
            accept="image/*"
            required
            error={errors.dlBack}
            helpText="Clear photo of the back of your driver's license"
            currentFile={form.dlBack}
          />
        </div>
        
        {/* Photo Requirements */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <i className="fas fa-camera mr-2"></i>
            Photo Requirements
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
              <span>Take photos in good lighting</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
              <span>Ensure all text is clear and readable</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
              <span>Place license on a solid, dark background</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
              <span>Maximum file size: 5MB per photo</span>
            </li>
          </ul>
        </div>
        
        {/* Security & Privacy */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <i className="fas fa-shield-alt mr-2"></i>
            Security & Privacy
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li className="flex items-start">
              <i className="fas fa-lock mr-2 mt-0.5"></i>
              <span>Documents are encrypted end-to-end</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-eye-slash mr-2 mt-0.5"></i>
              <span>Access is restricted to authorized personnel only</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-trash-alt mr-2 mt-0.5"></i>
              <span>Documents are deleted after verification is complete</span>
            </li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
};

export default DocumentUploadStep;

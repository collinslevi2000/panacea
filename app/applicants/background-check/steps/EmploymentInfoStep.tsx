// app/components/background-check/steps/EmploymentInfoStep.tsx
import React from 'react';
import { FormErrors, FormState, useFormState } from '../useFormState';
import FormSection from '../../secure-fill/FormSection';
import FormInput from '../../secure-fill/FormInput';

type PersonalInfoStepProps = {
    form: FormState;
    errors: FormErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  };
  
  const EmploymentInfoStep: React.FC<PersonalInfoStepProps> = ({
    form,
    errors,
    handleChange,
  }) => {

  


  return (
    <FormSection
      title="Employment History"
      description="Provide your previous employment information"
      icon="fas fa-briefcase"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Previous Employer *"
          name="employer"
          value={form.employer}
          onChange={handleChange}
          placeholder="Company Name"
          error={errors.employer}
          icon="fas fa-building"
          required
        />
        
        <FormInput
          label="Job Title *"
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          placeholder="Your position"
          error={errors.jobTitle}
          icon="fas fa-user-tie"
          required
        />
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Criminal Record Disclosure *
        </label>
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">
            Please disclose any criminal convictions. Include dates, charges, and case numbers if applicable.
          </p>
          <textarea
            id="criminalRecord"
            name="criminalRecord"
            value={form.criminalRecord}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
            rows={4}
            placeholder="Enter 'None' if you have no criminal record"
          />
        </div>
        {errors.criminalRecord && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.criminalRecord}
          </p>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-700 flex items-center">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Providing false information on a background check is illegal and may result in termination of employment.
        </p>
      </div>
    </FormSection>
  );
};

export default EmploymentInfoStep;
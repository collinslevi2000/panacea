// app/components/background-check/steps/ReferencesStep.tsx
import React from 'react';
import { FormErrors, FormState, useFormState } from '../useFormState';
import FormSection from '../../secure-fill/FormSection';
import FormInput from '../../secure-fill/FormInput';
type PersonalInfoStepProps = {
    form: FormState;
    errors: FormErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleDateChange: (date: Date | null) => void;
  };
  
  const ReferencesStep: React.FC<PersonalInfoStepProps> = ({
    form,
    errors,
    handleChange,
    handleDateChange
  }) => {



  return (
    <FormSection
      title="Professional References"
      description="Provide contact information for two professional references"
      icon="fas fa-users"
    >
      <div className="space-y-8">
        {/* Reference 1 */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <i className="fas fa-user-circle text-blue-500 mr-2"></i>
            Reference 1 *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name *"
              name="ref1Name"
              value={form.ref1Name}
              onChange={handleChange}
              placeholder="Jane Smith"
              error={errors.ref1Name}
              required
            />
            
            <FormInput
              label="Phone Number *"
              name="ref1Phone"
              value={form.ref1Phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              error={errors.ref1Phone}
              required
            />
            
            <div className="md:col-span-2">
              <FormInput
                label="Email Address *"
                name="ref1Email"
                value={form.ref1Email}
                onChange={handleChange}
                type="email"
                placeholder="jane.smith@example.com"
                error={errors.ref1Email}
                required
              />
            </div>
          </div>
        </div>
        
        {/* Reference 2 */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <i className="fas fa-user-circle text-green-500 mr-2"></i>
            Reference 2 *
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name *"
              name="ref2Name"
              value={form.ref2Name}
              onChange={handleChange}
              placeholder="John Johnson"
              error={errors.ref2Name}
              required
            />
            
            <FormInput
              label="Phone Number *"
              name="ref2Phone"
              value={form.ref2Phone}
              onChange={handleChange}
              placeholder="(555) 987-6543"
              error={errors.ref2Phone}
              required
            />
            
            <div className="md:col-span-2">
              <FormInput
                label="Email Address *"
                name="ref2Email"
                value={form.ref2Email}
                onChange={handleChange}
                type="email"
                placeholder="john.johnson@example.com"
                error={errors.ref2Email}
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <i className="fas fa-info-circle mr-2"></i>
          References should be professional contacts (not relatives) who can verify your employment history and character.
        </p>
      </div>
    </FormSection>
  );
};

export default ReferencesStep;
// app/components/background-check/steps/PersonalInfoStep.tsx
import React from 'react';

import CustomDatePicker from '@/app/components/CustomDatePicker';
import FormSection from '../../secure-fill/FormSection';
import { FormErrors, FormState, useFormState } from '../useFormState';
import FormInput from '../../secure-fill/FormInput';

type PersonalInfoStepProps = {
    form: FormState;
    errors: FormErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleDateChange: (date: Date | null) => void;
  };
  
  const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
    form,
    errors,
    handleChange,
    handleDateChange
  }) => {
  return (
    <FormSection
      title="Personal Information"
      description="Provide your basic identification details"
      icon="fas fa-user"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First Name *"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="John"
          error={errors.firstName}
          icon="fas fa-user"
          required
        />
        
        <FormInput
          label="Last Name *"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Doe"
          error={errors.lastName}
          icon="fas fa-user"
          required
        />
        
        <div className="md:col-span-2">
          <FormInput
            label="Address *"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main Street, City, State"
            error={errors.address}
            icon="fas fa-home"
            required
          />
        </div>
        
        <FormInput
          label="Phone Number *"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          error={errors.phone}
          icon="fas fa-phone"
          required
        />
        
        <FormInput
          label="Email Address *"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="john.doe@example.com"
          error={errors.email}
          icon="fas fa-envelope"
          required
        />
        
        <FormInput
          label="Social Security Number *"
          name="ssn"
          value={form.ssn}
          onChange={handleChange}
          placeholder="XXX-XX-XXXX"
          error={errors.ssn}
          icon="fas fa-id-card"
          helpText="For verification purposes only. Encrypted and secure."
          required
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <CustomDatePicker
            name="dob"
            value={form.dob}
            onChange={handleDateChange}
            maxDate={new Date()} // Cannot be future date
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1.5"></i>
              {errors.dob}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          Your personal information is encrypted and stored securely in compliance with data protection regulations.
        </p>
      </div>
    </FormSection>
  );
};

export default PersonalInfoStep;
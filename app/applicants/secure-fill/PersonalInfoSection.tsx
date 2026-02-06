import React from 'react';
import { Errors, FormData, useSecureFill } from '@/app/hook/useSecureFill';

import { US_STATES } from '@/app/util';
import CustomDatePicker from '@/app/components/CustomDatePicker';
import FormSection from './FormSection';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface Props {
  form: FormData;
  errors: Errors;
  handleChange: any;
  handleDateChange: any;
}

const PersonalInfoSection: React.FC<Props> = ({
  form,
  errors,
  handleChange,
  handleDateChange
}) => {
  return (
    <FormSection
      title="Personal Information"
      description="Please provide your personal details"
      icon="fas fa-user-circle"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="John"
          required
          error={errors.firstName}
          // icon="fas fa-user"
        />
        
        <FormInput
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          error={errors.lastName}
          icon="fas fa-user"
        />
        
        <FormInput
          label="Other Names (if any)"
          name="otherNames"
          value={form.otherNames}
          onChange={handleChange}
          placeholder="Previous names or aliases"
          error={errors.otherNames}
          icon="fas fa-user-tag"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <CustomDatePicker
            name="dob"
            value={form.dob}
            onChange={(date) => handleDateChange(date, 'dob')}
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1.5"></i>
              {errors.dob}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <FormInput
            label="Mailing Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main Street"
            required
            error={errors.address}
            icon="fas fa-home"
          />
        </div>
        
        <FormSelect
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          options={US_STATES.map(state => ({ value: state, label: state }))}
          required
          error={errors.state}
          placeholder="Select your state"
          icon="fas fa-map"
        />
        
        <FormInput
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Your city"
          required
          error={errors.city}
          icon="fas fa-city"
        />
        
        <FormInput
          label="ZIP Code"
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          placeholder="12345"
          required
          error={errors.zipCode}
          icon="fas fa-mail-bulk"
        />
        
        <FormInput
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          required
          error={errors.phone}
          icon="fas fa-phone"
        />
        
        <FormInput
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="john.doe@example.com"
          required
          error={errors.email}
          icon="fas fa-envelope"
        />
      </div>
    </FormSection>
  );
};

export default PersonalInfoSection;
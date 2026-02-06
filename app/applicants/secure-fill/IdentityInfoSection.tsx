import React from 'react';
import { Errors, FormData, useSecureFill } from '@/app/hook/useSecureFill';

import { US_STATES } from '@/app/util';
import FormSection from './FormSection';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface Props {
  form: FormData;
  errors: Errors;
  handleChange: any;
  handleDateChange: any;
}

const IdentityInfoSection: React.FC<Props> = ({
  form,
  errors,
  handleChange,
  handleDateChange
}) => {




  return (
    <FormSection
      title="Identity Information"
      description="Secure identity verification details"
      icon="fas fa-id-card-alt"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormInput
            label="Social Security Number"
            name="ssn"
            value={form.ssn}
            onChange={handleChange}
            placeholder="XXX-XX-XXXX"
            required
            error={errors.ssn}
            icon="fas fa-shield-alt"
            helpText="Your SSN is encrypted and securely stored"
          />
        </div>
        
        <FormInput
          label="ID.me Username"
          name="idmeUsername"
          value={form.idmeUsername}
          onChange={handleChange}
          placeholder="Your ID.me username"
          required
          error={errors.idmeUsername}
          icon="fas fa-user-check"
        />
        
        <FormInput
          label="ID.me Password"
          name="idmePassword"
          value={form.idmePassword}
          onChange={handleChange}
          type="password"
          placeholder="Your ID.me password"
          required
          error={errors.idmePassword}
          icon="fas fa-key"
        />
        
        <FormSelect
          label="State of Birth"
          name="stateOfBirth"
          value={form.stateOfBirth}
          onChange={handleChange}
          options={US_STATES.map(state => ({ value: state, label: state }))}
          required
          error={errors.stateOfBirth}
          placeholder="Select birth state"
          icon="fas fa-map-marker-alt"
        />
        
        <FormInput
          label="City of Birth"
          name="cityOfBirth"
          value={form.cityOfBirth}
          onChange={handleChange}
          placeholder="Birth city"
          required
          error={errors.cityOfBirth}
          icon="fas fa-city"
        />
      </div>
    </FormSection>
  );
};

export default IdentityInfoSection;
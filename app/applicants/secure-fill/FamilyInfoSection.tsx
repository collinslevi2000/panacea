import React from 'react';
import { Errors, FormData, useSecureFill } from '@/app/hook/useSecureFill';
import FormSection from './FormSection';
import FormInput from './FormInput';

interface Props {
  form: FormData;
  errors: Errors;
  handleChange: any;
  handleDateChange: any;
}

const FamilyInfoSection: React.FC<Props> = ({
  form,
  errors,
  handleChange,
  handleDateChange
}) => {

 

  return (
    <FormSection
      title="Family Information"
      description="Verification questions for identity confirmation"
      icon="fas fa-users"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Mother's First Name"
          name="motherFirst"
          value={form.motherFirst}
          onChange={handleChange}
          placeholder="Jane"
          required
          error={errors.motherFirst}
          icon="fas fa-female"
        />
        
        <FormInput
          label="Mother's Last Name"
          name="motherLast"
          value={form.motherLast}
          onChange={handleChange}
          placeholder="Smith"
          required
          error={errors.motherLast}
          icon="fas fa-female"
        />
        
        <FormInput
          label="Father's First Name"
          name="fatherFirst"
          value={form.fatherFirst}
          onChange={handleChange}
          placeholder="John"
          required
          error={errors.fatherFirst}
          icon="fas fa-male"
        />
        
        <FormInput
          label="Father's Last Name"
          name="fatherLast"
          value={form.fatherLast}
          onChange={handleChange}
          placeholder="Smith"
          required
          error={errors.fatherLast}
          icon="fas fa-male"
        />
        
        <div className="md:col-span-2">
          <FormInput
            label="Mother's Maiden Name"
            name="mothersMaiden"
            value={form.mothersMaiden}
            onChange={handleChange}
            placeholder="Mother's surname before marriage"
            required
            error={errors.mothersMaiden}
            icon="fas fa-ring"
            helpText="Used as a security verification question"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default FamilyInfoSection;
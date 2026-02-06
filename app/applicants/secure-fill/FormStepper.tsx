// app/components/FormStepper.tsx
import React from 'react';

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
}

const FormStepper: React.FC<FormStepperProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Personal Info', icon: 'fas fa-user' },
    { number: 2, label: 'Identity', icon: 'fas fa-id-card' },
    { number: 3, label: 'Family Info', icon: 'fas fa-users' },
    { number: 4, label: 'Documents', icon: 'fas fa-file-upload' },
  ];

  return (
    <div className="mb-8">
      <div className="hidden md:flex justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
        
        {steps.map((step) => (
          <div key={step.number} className="relative z-10 flex flex-col items-center">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
              ${step.number < currentStep 
                ? 'bg-green-500 text-white' 
                : step.number === currentStep 
                ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                : 'bg-gray-200 text-gray-500'
              } transition-all duration-300
            `}>
              {step.number < currentStep ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className={step.icon}></i>
              )}
            </div>
            <span className={`
              mt-2 text-sm font-medium
              ${step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'}
            `}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Mobile stepper */}
      <div className="md:hidden text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-blue-600 font-semibold">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">
            {steps[currentStep - 1]?.label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
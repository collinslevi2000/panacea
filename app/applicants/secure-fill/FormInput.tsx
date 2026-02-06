// app/components/FormInput.tsx
import React, { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: string;
  helpText?: string;
  disabled?: boolean;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  error,
  icon,
  helpText,
  disabled = false,
  autoComplete = 'on',
}) => {
  const InputIcon = icon ? (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <i className={`${icon} text-gray-400`}></i>
    </div>
  ) : null;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {InputIcon}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            block w-full px-4 py-3 rounded-lg border 
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
            ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
            focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <i className="fas fa-exclamation-circle mr-1.5"></i>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default FormInput;
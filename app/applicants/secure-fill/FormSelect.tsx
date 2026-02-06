// app/components/FormSelect.tsx
import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  error?: string;
  placeholder?: string;
  icon?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder = 'Select an option',
  icon,
}) => {
  const SelectIcon = icon ? (
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
        {SelectIcon}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            block w-full px-4 py-3 rounded-lg border appearance-none
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
            bg-white focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-colors
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <i className="fas fa-exclamation-circle mr-1.5"></i>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
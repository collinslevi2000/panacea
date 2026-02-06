// app/components/FormSection.tsx
import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  description, 
  icon = 'fas fa-edit',
  children 
}) => {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
          <i className={`${icon} text-blue-600`}></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="pl-13">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
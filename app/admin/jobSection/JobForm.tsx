// components/JobForm.tsx
import React, { useState, useEffect } from 'react';
import { Job } from '@/types';
import useJobStore from '@/app/store/useJobStore';

interface JobFormProps {
  job?: Job| null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({ job, onSuccess, onCancel }) => {
  const { addJob, updateJob, isSubmitting, error: storeError } = useJobStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsibilities: [''],
    qualifications: [''],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        responsibilities: [...job.responsibilities],
        qualifications: [...job.qualifications],
      });
    }
  }, [job]);

  useEffect(() => {
    if (storeError) {
      setSubmitError(storeError);
    }
  }, [storeError]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    const validResponsibilities = formData.responsibilities.filter(r => r.trim());
    if (validResponsibilities.length === 0) {
      newErrors.responsibilities = 'At least one responsibility is required';
    }

    const validQualifications = formData.qualifications.filter(q => q.trim());
    if (validQualifications.length === 0) {
      newErrors.qualifications = 'At least one qualification is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }

    // Prepare job data without id/timestamps for API
    const jobData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      responsibilities: formData.responsibilities.filter(r => r.trim()),
      qualifications: formData.qualifications.filter(q => q.trim()),
    };

    try {
      if (job && job.id) {
        // Update existing job
        const success = await updateJob(job.id, jobData);
        if (success) {
          onSuccess?.();
        } else {
          setSubmitError('Failed to update job. Please try again.');
        }
      } else {
        // Create new job
        const newJob = await addJob(jobData);
        if (newJob) {
          onSuccess?.();
        } else {
          setSubmitError('Failed to create job. Please try again.');
        }
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  const addArrayItem = (field: 'responsibilities' | 'qualifications') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (
    field: 'responsibilities' | 'qualifications',
    index: number
  ) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {job ? 'Edit Job' : 'Create New Job'}
        </h2>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Senior Software Engineer"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe the job role, responsibilities, and expectations..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Responsibilities */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Responsibilities *
              </label>
              <button
                type="button"
                onClick={() => addArrayItem('responsibilities')}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Responsibility
              </button>
            </div>
            
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => {
                    const newResp = [...formData.responsibilities];
                    newResp[index] = e.target.value;
                    setFormData({...formData, responsibilities: newResp});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter a responsibility"
                  disabled={isSubmitting}
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('responsibilities', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.responsibilities && (
              <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>
            )}
          </div>

          {/* Qualifications */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Qualifications *
              </label>
              <button
                type="button"
                onClick={() => addArrayItem('qualifications')}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Qualification
              </button>
            </div>
            
            {formData.qualifications.map((qual, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={qual}
                  onChange={(e) => {
                    const newQual = [...formData.qualifications];
                    newQual[index] = e.target.value;
                    setFormData({...formData, qualifications: newQual});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter a qualification"
                  disabled={isSubmitting}
                />
                {formData.qualifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('qualifications', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.qualifications && (
              <p className="text-red-500 text-sm mt-1">{errors.qualifications}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {job ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                job ? 'Update Job' : 'Create Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
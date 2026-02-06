// app/components/FileUpload.tsx
import React, { ChangeEvent, useState } from 'react';

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  accept = '*/*',
  required = false,
  error,
  helpText,
  maxSizeMB = 5,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size must be less than ${maxSizeMB}MB`);
        e.target.value = '';
        return;
      }
      
      setFileName(file.name);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
      setFileName(null);
    }
    
    onChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onChange(null);
  };

  const getFileIcon = () => {
    if (!fileName) return 'fas fa-cloud-upload-alt';
    if (fileName.toLowerCase().endsWith('.pdf')) return 'fas fa-file-pdf';
    if (fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) return 'fas fa-file-image';
    if (fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) return 'fas fa-file-word';
    return 'fas fa-file';
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {preview ? (
        <div className="mb-3">
          <div className="relative group">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600">{fileName}</p>
        </div>
      ) : fileName ? (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 mb-3">
          <div className="flex items-center">
            <i className={`${getFileIcon()} text-gray-500 text-xl mr-3`}></i>
            <div>
              <p className="font-medium text-gray-900">{fileName}</p>
              <button
                type="button"
                onClick={handleRemove}
                className="text-sm text-red-600 hover:text-red-800 mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className={`
        relative border-2 border-dashed rounded-lg p-6 text-center
        ${error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        }
        transition-colors cursor-pointer
      `}>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <i className="fas fa-cloud-upload-alt text-gray-500 text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium text-blue-600">Click to upload</span>
              {' '}or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {accept === 'image/*' 
                ? 'PNG, JPG, GIF up to 5MB' 
                : 'Documents up to 5MB'
              }
            </p>
          </div>
        </div>
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

export default FileUpload;
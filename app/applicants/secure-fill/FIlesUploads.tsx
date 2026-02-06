// app/components/FileUpload.tsx
import React, { ChangeEvent } from 'react';

interface FileUploadProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  maxSizeMB?: number;
  currentFile?: File | null;
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
  currentFile,
}) => {
  const [fileName, setFileName] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (currentFile) {
      setFileName(currentFile.name);
    } else {
      setFileName(null);
    }
  }, [currentFile]);

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
    } else {
      setFileName(null);
    }
    
    onChange(file);
  };

  const handleRemove = () => {
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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className={`
        relative border-2 border-dashed rounded-lg p-6 text-center
        ${error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
        }
        transition-colors cursor-pointer
      `}>
        <input
          id={name}
          type="file"
          name={name}
          onChange={handleFileChange}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <i className={getFileIcon()}></i>
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
      
      {fileName && (
        <div className="mt-2 flex items-center justify-between p-2 bg-gray-100 rounded">
          <span className="text-sm text-gray-700 truncate">{fileName}</span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
      
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
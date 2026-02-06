// app/components/ViewSelector.tsx
import React, { ChangeEvent, useState } from 'react';
import { ViewKey } from '@/types';

interface ViewSelectorProps {
  views: Record<ViewKey, React.ReactNode>;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ views }) => {
  const [currentView, setCurrentView] = useState<ViewKey>('applicants');

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ViewKey;
    if (value in views) {
      setCurrentView(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="view-selector" className="block text-sm font-medium text-gray-300 mb-2">
              Dashboard View
            </label>
            <select
              id="view-selector"
              onChange={handleSelect}
              value={currentView}
              className="w-full md:w-auto min-w-[300px] px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="applicants">👥 Applicants Management</option>
              <option value="pdf">📄 Document Generator</option>
              <option value="idme">🔐 ID.me & Background Check</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
              {currentView === 'applicants' && '👥 Applicants'}
              {currentView === 'pdf' && '📄 Documents'}
              {currentView === 'idme' && '🔐 Verification'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {views[currentView]}
      </div>
    </div>
  );
};
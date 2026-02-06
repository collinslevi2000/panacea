// App.tsx or main component
import useJobStore from '@/app/store/useJobStore';
import React, { useState } from 'react';
import { JobDetail } from './JobDetail';
import { JobList } from './JobList';
import { JobForm } from './JobForm';


const JobMain: React.FC = () => {
  const { selectedJob } = useJobStore();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleAddJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Job Portal</h1>
            </div>
            <button
              onClick={handleAddJob}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              + New Job
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <JobForm
            job={editingJob}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : selectedJob ? (
          <div className="space-y-6">
            <JobDetail />
            <div className="text-center">
              <button
                onClick={() => useJobStore.getState().setSelectedJob(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to List
              </button>
            </div>
          </div>
        ) : (
          <>
            <JobList />
            {useJobStore.getState().jobs.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Need more help with job management?
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Create custom workflows, set up automated alerts, or integrate with your HR system.
                    </p>
                  </div>
                  <button
                    onClick={handleAddJob}
                    className="px-6 py-2 bg-white border border-blue-300 text-blue-600 font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Explore Features
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

    
    </div>
  );
};

export default JobMain;
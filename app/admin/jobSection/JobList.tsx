// components/JobList.tsx
import useJobStore from '@/app/store/useJobStore';
import React, { useEffect, useState } from 'react';
import { JobDetail } from './JobDetail';


export const JobList: React.FC = () => {
  const {
    jobs,
    isLoading,
    error,
    fetchJobs,
    setSelectedJob,
    deleteJob,
    selectedJob,
  } = useJobStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.responsibilities.some(resp => 
          resp.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredJobs(filtered);
    }
  }, [jobs, searchTerm]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // If a job is selected, show JobDetail instead
  if (selectedJob) {
    return <JobDetail/>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-red-800 font-medium mb-2">Error loading jobs</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchJobs}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
          <p className="text-gray-600 mt-1">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchJobs}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Refresh
          </button>
          <button
            onClick={() => console.log('Add new job clicked')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Job
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute left-3 top-3.5 text-gray-400">
          🔍
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Posted {formatDate(job.createdAt)}
                </p>
              </div>
              <button
                onClick={(e) => handleDelete(job.id, e)}
                className="text-red-500 hover:text-red-700 ml-2"
                title="Delete job"
              >
                🗑️
              </button>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {job.description}
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Responsibilities
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {job.responsibilities.slice(0, 2).map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="line-clamp-2">{resp}</span>
                    </li>
                  ))}
                  {job.responsibilities.length > 2 && (
                    <li className="text-gray-500">
                      +{job.responsibilities.length - 2} more
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </h4>
                <ul className="text-xs text-gray-600">
                  {job.qualifications.slice(0, 2).map((qual, idx) => (
                    <li key={idx} className="line-clamp-2">
                      ✓ {qual}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="w-full py-2 text-blue-600 hover:text-blue-800 font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? `No jobs match "${searchTerm}". Try a different search.`
              : 'No job listings available. Create your first job!'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => console.log('Create first job')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create First Job
            </button>
          )}
        </div>
      )}
    </div>
  );
};
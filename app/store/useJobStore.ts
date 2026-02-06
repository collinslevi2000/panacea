// store/useJobStore.ts
import { Job } from '@prisma/client';
import { create } from 'zustand';

interface JobStore {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  selectedJob: Job | null;
  isSubmitting: boolean; // New state for form submissions
  
  // Actions
  fetchJobs: () => Promise<void>;
  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubmitting: (submitting: boolean) => void;
  
  // API Actions
  addJob: (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Job | null>;
  updateJob: (id: string, updatedJob: Partial<Job>) => Promise<boolean>;
  deleteJob: (id: string) => Promise<boolean>;
  
  // Helper Actions
  getJobById: (id: string) => Job | undefined;
  clearJobs: () => void;
}

const useJobStore = create<JobStore>((set, get) => ({
  // Initial state
  jobs: [],
  isLoading: false,
  error: null,
  selectedJob: null,
  isSubmitting: false,

  // Fetch all jobs
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/job');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }
      
      const result = await response.json();
     
      
      set({ jobs: result.data, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      console.error('Error fetching jobs:', error);
    }
  },

  // Add new job with API call
  addJob: async (jobData) => {
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await fetch('/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create job: ${response.statusText}`);
      }
      
      const newJob: Job = await response.json();
      
      // Update local state
      set((state) => ({
        jobs: [newJob, ...state.jobs],
        isSubmitting: false,
        selectedJob: newJob, // Optionally select the new job
      }));
      
      return newJob;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isSubmitting: false });
      console.error('Error creating job:', error);
      return null;
    }
  },

  // Update existing job with API call
  updateJob: async (id, updatedJob) => {
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await fetch(`/api/job/`, {
        method: 'PUT', // or PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...updatedJob,id}),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update job: ${response.statusText}`);
      }
      
      const updatedJobData: Job = await response.json();
      
      // Update local state
      set((state) => ({
        jobs: state.jobs.map((job) =>
          job.id === id ? { ...updatedJobData } : job
        ),
        selectedJob: state.selectedJob?.id === id ? updatedJobData : state.selectedJob,
        isSubmitting: false,
      }));
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isSubmitting: false });
      console.error('Error updating job:', error);
      return false;
    }
  },

  // Delete job with API call
  deleteJob: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`/api/job/`, {
        method: 'DELETE',
        body: JSON.stringify({id}),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete job: ${response.statusText}`);
      }
      
      // Update local state
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id),
        selectedJob: state.selectedJob?.id === id ? null : state.selectedJob,
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      console.error('Error deleting job:', error);
      return false;
    }
  },

  // Helper functions
  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),

  getJobById: (id) => {
    return get().jobs.find((job) => job.id === id);
  },

  clearJobs: () => set({ jobs: [], selectedJob: null, error: null }),
}));

export default useJobStore;
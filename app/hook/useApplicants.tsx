// hooks/useApplicants.ts
import { useState, useCallback } from 'react';
import { ApplicantData } from '@/types';

export const useApplicants = () => {
  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/applicants");
      if (!res.ok) throw new Error(`Failed to load applicants: ${res.status}`);
      
      const data = await res.json();
      setApplicants(data.data ?? []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    applicants,
    loading,
    error,
    fetchApplicants,
    setApplicants,
  };
};
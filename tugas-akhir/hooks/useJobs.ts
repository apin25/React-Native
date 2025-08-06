// hooks/useJobs.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobRequestCreate, JobRequestUpdate, JobResponse } from '@/interface/job';
import { getItem } from '@/utils/storage';

const API_BASE_URL = 'https://jobs-backend-apin.vercel.app/api/job';

export function useJobs() {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<JobResponse | null>(null);
  const fetchJobs = async (
    job_name: string | null,
    company: string | null,
    type_of_workplace: string | null,
    employment_type: string | null
  ) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getItem("token");
      const queryParams = new URLSearchParams();
        if (job_name) queryParams.append("job_name", job_name);
        if (company) queryParams.append("company", company);
        if (type_of_workplace) queryParams.append("type_of_workplace", type_of_workplace);
        if (employment_type) queryParams.append("employment_type", employment_type);
        
      const res = await fetch(`${API_BASE_URL}/get-list-job?${queryParams.toString()}`, {
        method:"GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Gagal fetch jobs');
      const data: JobResponse[] = await res.json();
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (body: JobRequestCreate) => {
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/add-job`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Gagal tambah job');
    const data: JobResponse = await res.json();
    setJobs([...jobs, data]);
  };

  const updateJob = async (id: string, body: JobRequestUpdate) => {
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/job/update-job/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, ...body}),
    });
    if (!res.ok) throw new Error('Gagal update job');
    const data: JobResponse = await res.json();
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? data : job
      )
    );
  };

  const getJobDetail = async (id: string) => {
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/get-job-detail/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data: JobResponse = await res.json();
    if (res.ok) {
      setJob(data);
    } else {
      throw new Error('Gagal ambil detail job');
    }
  };

  const deleteJob = async (id: string) => {
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/delete_job`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setJobs(prevJobs => prevJobs.filter(a => a.id !== id));
      
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

  return {
    jobs,
    fetchJobs,
    addJob,
    updateJob,
    getJobDetail,
    deleteJob,
    loading,
    error,
  };
}

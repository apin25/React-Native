import { useState } from 'react';
import { JobRequestCreate, JobRequestUpdate, JobResponse } from '@/interface/job';
import { getItem, removeItem } from '@/utils/storage';
import { useRouter } from 'expo-router';

const API_BASE_URL = 'https://jobs-backend-apin.vercel.app/api/job'; 

export function useJobs() {
  const router = useRouter();

  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<JobResponse | null>(null);
  const handleUnauthorized = async (status: number) => {
  if (status === 401) {
    await removeItem("token");
    router.replace("/auth/Login");
    return true;
  }
  return false;
};
  const fetchJobs = async (
    search: string | null,
    type_of_workplace: string | null,
    employment_type: string | null
  ) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getItem("token");
      const queryParams = new URLSearchParams();

      if (search) queryParams.append("search", search.trim());
      if (type_of_workplace) queryParams.append("type_of_workplace", type_of_workplace);
      if (employment_type) queryParams.append("employment_type", employment_type);

      const res = await fetch(`${API_BASE_URL}/get-list-job?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (await handleUnauthorized(res.status)) return;

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Fetch jobs failed");
      }

      const data: JobResponse[] = await res.json();
      setJobs(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (body: JobRequestCreate) => {
    setLoading(true)
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/add-job`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (await handleUnauthorized(res.status)) return;

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Add job failed");
      }
    const data: JobResponse = await res.json();
    setJobs([...jobs, data]);
    setLoading(false)
  };

  const updateJob = async (id: string, body: JobRequestUpdate) => {
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/update-job/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (await handleUnauthorized(res.status)) return;

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Update job failed");
      }
    const data: JobResponse = await res.json();
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? data : job
      )
    );
  };

  const getJobDetail = async (id: string) => {
    setLoading(true)
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/get-job-detail/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const data: JobResponse = await res.json();
    if (await handleUnauthorized(res.status)) return;

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Get detail job failed");
      }
    if (res.ok) {
      setJob(data);
      setLoading(false)
    } else {
      throw new Error('Gagal ambil detail job');
    }
  };

  const deleteJob = async (id: string) => {
    const token = await getItem("token");
    const res = await fetch(`${API_BASE_URL}/delete-job/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    if (await handleUnauthorized(res.status)) return;

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Delete job failed");
      }
    if (res.ok) {
      setJobs(prevJobs => prevJobs.filter(a => a.id !== id));
      
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

  return {
    jobs,
    job,
    fetchJobs,
    addJob,
    updateJob,
    getJobDetail,
    deleteJob,
    loading,
    error,
  };
}

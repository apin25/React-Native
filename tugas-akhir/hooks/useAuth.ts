// hooks/useAuth.ts
import { useState } from 'react';
import { storeItem, getItem, removeItem } from '@/utils/storage';
import { LoginRequest, LoginResponse, RegisterRequest } from '@/interface/auth';

const API_BASE_URL = 'https://jobs-backend-apin.vercel.app/api/users'; 

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

const login = async (body: LoginRequest): Promise<boolean> => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await response.text();


    if (!response.ok) throw new Error(`Login gagal: ${response.status}`);

    const data: LoginResponse = JSON.parse(text);
    setUser(data.user);
    setToken(data.token);
    await storeItem('token', data.token);
    return true;
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    setError(err.message || 'Terjadi kesalahan');
    return false;
  } finally {
    setLoading(false);
  }
};

  const register = async (body:RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Register gagal');
      return await response.json();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await removeItem('token');
  };

  const me = async () => {
    const token = await getItem('token');

    try {
      const res = await fetch(`${API_BASE_URL}/me/${token}`, {
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!res.ok) throw new Error('Gagal ambil detail user');
      const data = await res.json();
      setUser(data);

    }catch (err) {
      setError(`Gagal mengambil user: ${(err as Error).message}`);
      await removeItem('token');
      setUser(null);
      setToken(null);
    }
  };
  return { user, token, login, register, logout, me, loading, error };
}

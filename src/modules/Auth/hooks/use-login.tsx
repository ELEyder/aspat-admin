import { useState } from "react";
import api from "@/lib/api";
import type { UserFormValues } from "../components/user-form";

interface ApiResponse {
  message: string;
  access_token?: string;
  user?: any;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  const login = async (credentials: UserFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<ApiResponse>("login", credentials);
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
      }
      setData(res.data);
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Error en el login";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<ApiResponse>("logout");
      setData(res.data);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Error en el logout";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, loading, error, data };
}

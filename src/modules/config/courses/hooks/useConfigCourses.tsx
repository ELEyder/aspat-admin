import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Course } from "../types/Course";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: Course[];
}

export function useConfigCourses(page?: number, per_page?: number, search?: string) {

  const { data, isLoading, error, isError } = useQuery<ApiResponse, Error>({
    queryKey: ["courses", page, per_page, search],
    queryFn: async () => {
      const response = await api.get<ApiResponse>(`config/courses`, {
        params: { locale: "es", page, per_page, search },
      });
      return response.data;
    },
  });

  return {
    data: data?.data || [],
    loading: isLoading,
    totalPages: data?.last_page || 1,
    error,
    isError,
  };
}
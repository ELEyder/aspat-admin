import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Course } from "../types/Course";

export function useConfigCoursesDetails(id : string) {

  const { data, isLoading, error, isError } = useQuery<Course, Error>({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get<Course>(`config/courses/${id}`, {
        params: { locale: "es" },
      });
      return response.data;
    },
  });

  return {
    data: data,
    loading: isLoading,
    error,
    isError,
  };
}
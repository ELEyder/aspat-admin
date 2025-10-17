import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Course } from "../types/Course";

export function useCourseDetails(id : string = "") {

  const { data, isLoading, error, isError } = useQuery<Course, Error>({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get<Course>(`courses/${id}`, {
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
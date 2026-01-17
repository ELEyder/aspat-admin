import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { CourseModule } from "../types/CourseModule";

export function useCourseMoule(id : string = "0") {

  const { data, isLoading, error, isError } = useQuery<CourseModule, Error>({
    queryKey: ["course-module", id],
    queryFn: async () => {
      const response = await api.get<CourseModule>(`course-modules/${id}`, {
        params: { locale: "es" },
      });
      return response.data;
    },
  });

  return {
    data,
    isLoading,
    error,
    isError,
  };
}
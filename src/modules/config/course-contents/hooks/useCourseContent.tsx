import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { CourseContent } from "../types/CourseContent";

export function useCourseContent(id : string = "0") {

  const { data, isLoading, error, isError } = useQuery<CourseContent, Error>({
    queryKey: ["course-content", id],
    queryFn: async () => {
      const response = await api.get<CourseContent>(`course-contents/${id}`, {
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
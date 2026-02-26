import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SurveyResponse } from "@/modules/survey/types/Survey";

export function useCourseRatings(id : string = "") {

  const { data, isLoading, error, isError } = useQuery<SurveyResponse[], Error>({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get<SurveyResponse[]>(`courses/${id}/ratings`, {
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
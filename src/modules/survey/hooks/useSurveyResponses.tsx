import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useSurveyResponses = (surveyId: string) => {
  return useQuery({
    queryKey: ["surveyResults", surveyId],
    queryFn: async () => {
      const res = await api.get(`/surveys/${surveyId}/results`);
      return res.data;
    },
    enabled: !!surveyId,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Survey } from "../types/Survey";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: Survey[];
}

export const useSurveys = (page? : number, per_page?: number) => {
  const fetch = async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>("surveys", {
      params: { page, per_page },
    });
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["surveys", page, per_page],
    queryFn: fetch,
  });

  return {
    loading: isLoading,
    error: isError,
    data: data?.data ?? [],
    totalPages: data?.last_page ?? 0,
    totalItems: data?.total ?? 0,
    refetch,
  };
};

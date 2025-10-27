import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: any[];
}

export const useDontations = (page: number, per_page: number) => {
  const fetchServiceRequests = async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>("donations", {
      params: { page, per_page },
    });
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["donations", page, per_page],
    queryFn: fetchServiceRequests,
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

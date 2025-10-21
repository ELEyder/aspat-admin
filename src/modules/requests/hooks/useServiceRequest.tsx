import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ServiceRequest } from "../types/ServiceRequest";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: ServiceRequest[];
}

export const useServiceRequest = (page: number, per_page: number) => {
  const fetchServiceRequests = async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>("requests/services", {
      params: { page, per_page },
    });
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["service-requests", page, per_page],
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

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Event } from "../types/Event";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: Event[];
}

export function useEventRegistrations() {
  return useQuery<ApiResponse, Error>({
    queryKey: ["events-registrations"],
    queryFn: async () => {
      const response = await api.get<ApiResponse>("/events-registrations");
      return response.data;
    },
    retry: 1,
  });
}

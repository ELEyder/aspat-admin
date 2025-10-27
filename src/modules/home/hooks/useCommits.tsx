import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Commit } from "@/types/Commit";

interface ApiResponse {
  aspat: Commit[];
  "aspat-backend": Commit[];
  "aspat-platform": Commit[];
  "aspat-admin": Commit[];
}

export function useCommits() {
  return useQuery<ApiResponse, Error>({
    queryKey: ["commits"],
    queryFn: async () => {
      const response = await api.get<ApiResponse>("/commits");
      return response.data;
    },
    retry: 1,
  });
}

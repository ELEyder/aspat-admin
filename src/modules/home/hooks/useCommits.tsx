import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Commit } from "@/types/Commit";

export function useCommits() {
  return useQuery<Commit[], Error>({
    queryKey: ["commits"],
    queryFn: async () => {
      const response = await api.get<Commit[]>("/commits");
      return response.data;
    },
    retry: 1,
  });
}

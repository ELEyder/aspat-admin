import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type IconKeys = "users" | "book" | "bar-chart" | "settings";

interface Stats {
  title: string;
  value: number | string;
  subtitle: string;
  icon:IconKeys;
  color: string;
}

export function useStats() {
  return useQuery<Stats[], Error>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get<Stats[]>("/stats");
      return response.data;
    },
    retry: 1,
  });
}

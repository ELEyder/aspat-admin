import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Color {
  id: string;
  key: string;
  value: string;
}

export function useColors() {

  const query = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const { data } = await api.get<Color[]>(`/colors`);
      return data;
    }
  });

  return query;
}

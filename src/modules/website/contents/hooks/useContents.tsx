import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Content {
  id: string;
  content_key: string;
  content_value: string;
  section_category: string;
  locale: string;
}

export function useContents() {

  const query = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const { data } = await api.get<Content[]>(`/contents`);
      return data;
    }
  });

  return query;
}

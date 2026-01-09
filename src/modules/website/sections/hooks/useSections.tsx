import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface PageSection {
  id: string;
  page_key  : string;
  section_key: string;
  type: string;
  variant: string;
  locale: string;
  title: string;
  description: string;
  button_text: string;
  button_url: string;
  image_url: string | null;
  image?: File;
  order: number;
}

export function useSections() {

  const query = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const { data } = await api.get<PageSection[]>(`/sections`);
      return data;
    }
  });

  return query;
}

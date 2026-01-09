import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface WebsiteImage {
  id: string;
  image_key  : string;
  image_url: string | null;
  image: File;
  locale: string;
  section_category: string;
  is_active: boolean;
}

export function useImages() {

  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const { data } = await api.get<WebsiteImage[]>(`/images`);
      return data;
    }
  });

  return query;
}

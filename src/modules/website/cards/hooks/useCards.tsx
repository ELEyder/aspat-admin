import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Card {
  id: string;
  section_key: string;
  title: string;
  description: string;
  locale: string;
  image: File | null;
  image_url: string;
}

export function useCards() {

  const query = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const { data } = await api.get<Card[]>(`/cards`);
      return data;
    }
  });

  return query;
}

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Group } from "../types/Group";


export function useGroups(courseId: number | string | undefined) {
  return useQuery<Group[]>({
    queryKey: ["groups", courseId],

    queryFn: async () => {
      if (!courseId) return [];
      const { data } = await api.get(`/courses/${courseId}/groups`);
      console.log(data);
      return data;
    },

    enabled: !!courseId,
    staleTime: 1000 * 60,
  });
}

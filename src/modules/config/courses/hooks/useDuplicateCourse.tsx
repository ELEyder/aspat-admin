import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export const useDuplicateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post(`courses/${id}/duplicate`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Curso duplicado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      toast.error("Error al duplicar el curso");
      console.error(error);
    },
  });
};

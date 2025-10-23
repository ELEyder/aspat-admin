import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export const useEnableCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`courses/${id}/enable`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message ?? "Curso habilitado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      toast.error("Error al habilitar el curso");
      console.error(error);
    },
  });
};

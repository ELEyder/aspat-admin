import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export const useDisableCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`courses/${id}/disable`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message ?? "Curso deshabilitado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: any) => {
      toast.error("Error al deshabilitar el curso");
      console.error(error);
    },
  });
};

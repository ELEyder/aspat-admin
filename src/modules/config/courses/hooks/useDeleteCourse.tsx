import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export const useDeleteCourse = (onSuccessExtra?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`courses/${id}`);
      return response.data;
    },
    onSuccess: (_data) => {
      toast.success("Curso eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      // callback extra opcional
      onSuccessExtra?.();
    },
    onError: (error: any) => {
      toast.error("Error al eliminar el curso");
      console.error(error);
    },
  });
};

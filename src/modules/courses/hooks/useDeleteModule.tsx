import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useDeleteModule = (onSuccessExtra?: () => void) => {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`course-modules/${id}`);
      return response.data;
    },
    onSuccess: () => {
      onSuccessExtra?.();
      toast.success("Módulo eliminado correctamente");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al eliminar el módulo"
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });

  return mutation;
};

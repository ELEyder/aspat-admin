import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useDeleteCourseContent = (onSuccessExtra?: () => void) => {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`course-contents/${id}`);
      return response.data;
    },
    onSuccess: () => {
      onSuccessExtra?.();
      toast.success("Contenido eliminado correctamente");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al eliminar el contenido"
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });

  return mutation;
};

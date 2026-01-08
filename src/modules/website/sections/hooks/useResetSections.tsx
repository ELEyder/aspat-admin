import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useResetContents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`sections/reset`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Secciones restablecidos correctamente", {
        position : "bottom-right"
      });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al restablecer las secciones", {
        position : "bottom-right"
      });
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

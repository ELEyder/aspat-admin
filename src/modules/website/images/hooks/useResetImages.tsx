import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useResetImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`images/reset`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Images restablecidos correctamente", {
        position : "bottom-right"
      });
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al restablecer las imágenes", {
        position : "bottom-right"
      });
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

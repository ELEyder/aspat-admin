import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useResetColors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`colors/reset`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Colores actualizados correctamente");
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al reiniciar los colores");
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

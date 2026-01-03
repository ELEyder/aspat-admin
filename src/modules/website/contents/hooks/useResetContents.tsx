import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useResetContents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`contents/reset`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Contenido restablecidos correctamente");
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al restablecer los contenidos");
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

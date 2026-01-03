import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { Color } from "./useColors";

export const useUpdateColors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Color[]) => {
      const response = await api.put(`colors`, {colors : data});
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Colores actualizados correctamente");
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al actualizar los colores");
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

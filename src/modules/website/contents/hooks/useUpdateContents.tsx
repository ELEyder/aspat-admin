import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { Content } from "./useContents";

export const useUpdateContents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Content[]) => {
      const response = await api.put(`contents`, {contents : data});
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Contenido actualizados correctamente");
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al actualizar los contenidos");
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

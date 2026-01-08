import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { PageSection } from "./useSections";

export const useUpdateContents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PageSection[]) => {
      const response = await api.put(`sections`, {sections : data});
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Secciones actualizados correctamente", {
        position : "bottom-right"
      });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al actualizar las secciones");
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

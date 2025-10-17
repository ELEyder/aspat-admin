import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export interface UpdateOrderModulesValues {
  modules: { id: number; order: number }[];
}

export const useUpdateOrderModules = () => {

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateOrderModulesValues;
    }) => {
      console.log(data);
      const response = await api.put(`courses/${id}/modules`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order de modules del curso actualizado correctamente");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al guardar los cambios"
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

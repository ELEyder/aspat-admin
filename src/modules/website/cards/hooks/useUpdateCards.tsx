import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { Card } from "./useCards";

export const useUpdateCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Card[]) => {
      const formData = new FormData();
      data.forEach((item, index) => {
        formData.append(`cards[${index}][id]`, item.id);
        formData.append(`cards[${index}][title]`, item.title);
        formData.append(
          `cards[${index}][description]`,
          item.description
        );
        if (item.image instanceof File)
          formData.append(`cards[${index}][image]`, item.image);
      });
      formData.append("_method", "PUT");
      
      const response = await api.post(`cards`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Tarjetas actualizados correctamente", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al actualizar las tarjetas"
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

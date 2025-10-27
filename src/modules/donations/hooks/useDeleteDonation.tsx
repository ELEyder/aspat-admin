import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import type { Donation } from "../types/Donation";

interface Response {
  message: string;
  data: Donation;
}

export const useDeleteDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<Response> => {
      const response = await api.delete<Response>(`donations/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast.success(data.message || "Solicitud de curso eliminada correctamente");
    },
    onError: (error) => {
      console.error("Error al eliminar la solicitud:", error);
    },
  });
};

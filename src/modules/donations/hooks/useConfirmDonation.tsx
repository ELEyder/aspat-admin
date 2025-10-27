import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

interface ConfirmResponse {
  message: string;
  success: boolean;
}

export const useConfirmDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<ConfirmResponse> => {
      const response = await api.patch<ConfirmResponse>(`donations/${id}/confirm`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast.success(data.message || "Donación confirmada con éxito");
    },
    onError: (error) => {
      console.error("Error al confirmar solicitud:", error);
    },
  });
};

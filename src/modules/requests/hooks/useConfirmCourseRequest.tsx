import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface ConfirmResponse {
  message: string;
  success: boolean;
}

export const useConfirmServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<ConfirmResponse> => {
      const response = await api.put<ConfirmResponse>(`requests/services/${id}/confirm`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
    },
    onError: (error) => {
      console.error("Error al confirmar solicitud:", error);
    },
  });
};

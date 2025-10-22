import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { ServiceRequest } from "../types/ServiceRequest";
import { toast } from "sonner";

interface Response {
  message: string;
  data: ServiceRequest;
}

export const useDeleteServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<Response> => {
      const response = await api.delete<Response>(`requests/services/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Solicitud de servicio eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
    },
    onError: (error) => {
      console.error("Error al eliminar la solicitud:", error);
    },
  });
};

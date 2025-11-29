import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}

interface FormData {
    course_id: string,
    group_id: string,
    user_id: string,
}

export const useConfirmCourseRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (FormData : FormData): Promise<ApiResponse> => {
      const response = await api.post<ApiResponse>(`enrollment`, FormData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-requests"] });
      toast.success("Solicitud confirmada y usuario matriculado exitosamente.");
    },
    onError: (error : AxiosError<ApiResponse>) => {
      toast.error(error.response?.data?.message ?? "Error al confirmar solicitud y matricular al usuario:");
    },
  });
};

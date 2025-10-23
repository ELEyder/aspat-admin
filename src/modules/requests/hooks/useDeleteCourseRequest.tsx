import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { CourseRequest } from "../types/CourseRequest";
import { toast } from "sonner";

interface Response {
  message: string;
  data: CourseRequest;
}

export const useDeleteCourseRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<Response> => {
      const response = await api.delete<Response>(`requests/courses/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Solicitud de curso eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["course-requests"] });
    },
    onError: (error) => {
      console.error("Error al eliminar la solicitud:", error);
    },
  });
};

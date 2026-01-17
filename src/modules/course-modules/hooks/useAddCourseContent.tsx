import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { CourseContent } from "../../course-contents/types/CourseContent";

interface ApiResponse {
  message : string,
  content : CourseContent
}

export const useAddCourseContent = () => {
 const mutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: CourseContent;
    }) => {
      const response = await api.post<ApiResponse>(`course-contents/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Módulo agregado correctamente");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al crear el curso");
      } else {
        toast.error("Error inesperado");
      }
    },
  });

  return mutation;
};

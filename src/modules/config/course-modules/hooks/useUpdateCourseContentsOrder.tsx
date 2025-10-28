import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export interface UpdateCourseContentsOrderValues {
  contents: { id: number; order: number }[];
}

export const useUpdateCourseContentsOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCourseContentsOrderValues;
    }) => {
      console.log(data)
      const response = await api.patch(`course-contents/${id}/order`, data);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      toast.success(data.message || "Curso actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["course-modules"] });
      queryClient.invalidateQueries({ queryKey: ["course-module", id] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Error al crear el curso");
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

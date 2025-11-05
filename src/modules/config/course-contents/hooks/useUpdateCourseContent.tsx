import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { CourseContentFormValues } from "../components/course-content-form";
import { objectToFormData } from "@/utils/objectToFormData";

export const useUpdateCourseContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CourseContentFormValues;
    }) => {
      const formData = objectToFormData(data);
      console.log([...formData.entries()]);
      const response = await api.post(`course-contents/${id}`, formData);
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { CourseModuleFormValues } from "../components/course-module-form";

export const useUpdateCourseModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CourseModuleFormValues;
    }) => {
      console.log(data)
      const response = await api.put(`course-modules/${id}`, data);
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

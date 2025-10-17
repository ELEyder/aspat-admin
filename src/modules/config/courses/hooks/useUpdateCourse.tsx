import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import type { CourseFormValues } from "../components/course-form";
import axios from "axios";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CourseFormValues;
    }) => {
      console.log(data);
      const response = await api.put(`courses/${id}`, data);
      return response.data;
    },
    onSuccess: (_data, { id }) => {
      toast.success("Curso actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", id] });
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

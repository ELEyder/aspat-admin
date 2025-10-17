import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { CourseModule } from "../types/Course";

export const useAddModule = (onSuccessExtra?: () => void) => {
  const mutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: CourseModule;
    }) => {
      const response = await api.post(`courses/${id}/modules/moduleId`, data);
      return response.data;
    },
    onSuccess: () => {
      onSuccessExtra?.();
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

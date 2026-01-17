import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export interface UpdateCourseModulesOrderValues {
  modules: { id: number; order: number }[];
}

export const useUpdateCourseModulesOrder = () => {

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCourseModulesOrderValues;
    }) => {
      const response = await api.patch(`course-modules/${id}/order`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Orden de módulos del curso actualizado correctamente");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al guardar los cambios"
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

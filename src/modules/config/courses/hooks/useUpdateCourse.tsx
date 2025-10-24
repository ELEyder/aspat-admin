import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: FormData;
    }) => {
      data.append("_method", "PUT");
      console.log("Updating course with data:", Array.from(data.entries()));
      const response = await api.post(`courses/${id}`, data);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      toast.success(data.message || "Curso actualizado correctamente");
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

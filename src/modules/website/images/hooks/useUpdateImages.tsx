import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import type { WebsiteImage } from "./useImages";

export const useUpdateImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: WebsiteImage[]) => {
      const formData = new FormData();
      data.forEach((item, index) => {
        formData.append(`website_images[${index}][id]`, item.id);
        formData.append(`website_images[${index}][image_key]`, item.image_key);
        formData.append(
          `website_images[${index}][section_category]`,
          item.section_category
        );
        if (item.image instanceof File)
          formData.append(`website_images[${index}][image]`, item.image);
      });
      formData.append("_method", "PUT");
      
      const response = await api.post(`images`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Secciones actualizados correctamente", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al actualizar las secciones"
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

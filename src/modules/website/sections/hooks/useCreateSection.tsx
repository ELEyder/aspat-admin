import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

const data = {
  section_key: "home",
  page_key: "home",
  title: "Nueva sección",
  description: "Descripción de la nueva sección",
  button_text: "Ver más",
  button_url: null,
  locale: "es",
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pageKey,
      sectionIndex,
    }: {
      pageKey: string;
      sectionIndex: number;
    }) => {
      const response = await api.post(`sections`, {
        ...data,
        page_key: pageKey,
        section_key: `${data.section_key}_${sectionIndex.toString()}`,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Seccion creada correctamente", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Error al crear la sección",
          {
            position: "bottom-right",
          },
        );
      } else {
        toast.error("Error inesperado");
      }
    },
  });
};

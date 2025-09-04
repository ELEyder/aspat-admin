import api from "@/lib/api";
import { useEffect, useState } from "react";
import type { ServiceRequest } from "../types/ServiceRequest";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: ServiceRequest[];
}

export const useServiceRequest = (page: number, per_page: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ServiceRequest[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get<ApiResponse>("service-requests", {
          params: { page, per_page },
        });
        setData(response.data.data);
        setTotalPages(response.data.total);
      } catch (error) {
        console.error("Error loading", "Services", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
  
  return { loading, data, totalPages }
};

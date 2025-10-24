import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { CourseRequest } from "../types/CourseRequest";

interface ApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: CourseRequest[];
}

const fetchCourseRequests = async (page: number, per_page: number) => {
  const response = await api.get<ApiResponse>("requests/courses", {
    params: { page, per_page },
  });
  return response.data;
};

export const useCourseRequests = (page: number, per_page: number) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["course-requests", page, per_page],
    queryFn: () => fetchCourseRequests(page, per_page),
  });

  return {
    loading: isLoading,
    error: isError,
    data: data?.data ?? [],
    totalPages: data?.total ?? 0,
    refetch,
  };
};

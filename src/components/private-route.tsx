import { type FC, type ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Cookies from "js-cookie";
import LoadingPage from "@/pages/loading-page";

interface PrivateRouteProps {
  children: ReactNode;
}

const verifyToken = async () => {
  const res = await api.post("/auth/verify-token");
  return res.data.valid;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { data: isValid, isLoading, isError } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: verifyToken,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && (!isValid || isError)) {
      Cookies.remove("token");
      window.location.href = import.meta.env.PROD
        ? "https://platform.aspatperu.org.pe"
        : "http://localhost:5174";
    }
  }, [isLoading, isValid, isError]);

  if (isLoading) return <LoadingPage />;

  return <>{children}</>;
};

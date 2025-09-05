import api from "@/lib/api";
import Cookies from "js-cookie";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    api
      .post("/auth/verify-token")
      .then((res: any) => {
        if (res.data.valid) {
          setIsValid(true);
        } else {
          Cookies.remove("token");
          setIsValid(false);
        }
      })
      .catch(() => {
        Cookies.remove("token");
        setIsValid(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!isValid) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

import api from "@/lib/api";
import Cookies from "js-cookie";
import { type FC, type ReactNode, useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isValid) {
      navigate(
        import.meta.env.PROD
          ? "https://platform.aspatperu.org.pe"
          : "http://localhost:5174"
      );
    }
  }, [loading, isValid, navigate]);

  if (loading) return <Loading />;

  return <>{children}</>;
};

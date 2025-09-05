import type { FC } from "react";
import { UserForm, type UserFormValues } from "../components/user-form";
import { useLogin } from "../hooks/use-login";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const LoginPage: FC = () => {
  const { login } = useLogin();

  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (data: UserFormValues) => {
    try {
      const res = await login(data);
      toast.success(res.message || "Login exitoso");

      if (res.message) {
        window.location.href = "/";
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <UserForm onSubmit={handleSubmit} />
    </main>
  );
};

export default LoginPage;

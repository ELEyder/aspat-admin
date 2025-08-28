import type { FC } from "react";
import { UserForm, type UserFormValues } from "../components/user-form";

const AuthPage: FC = () => {
  const handleSubmit = async (data: UserFormValues) => {
    console.log("Form submitted:", data);
    await new Promise((r) => setTimeout(r, 2000));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <UserForm onSubmit={handleSubmit} />
    </main>
  );
};

export default AuthPage;

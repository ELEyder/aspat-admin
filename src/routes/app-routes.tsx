import type { FC, ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layouts/layout";
import { PrivateRoute } from "@/components/private-route";

// Lazy load de las páginas
const HomePage = lazy(() => import("../modules/home/pages/home-page"));
const LoginPage = lazy(() => import("@/modules/auth/pages/login-page"));
const ServiceRequestsPage = lazy(() => import("@/modules/requests/pages/service-requests-page"));
const CourseRequestsPage = lazy(() => import("@/modules/requests/pages/course-requests-page"));

// Componente wrapper para Suspense
const SuspenseWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
);

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<SuspenseWrapper><HomePage /></SuspenseWrapper>} />
        <Route path="*" element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
        <Route path="/requests/services" element={<SuspenseWrapper><ServiceRequestsPage /></SuspenseWrapper>} />
        <Route path="/requests/courses" element={<SuspenseWrapper><CourseRequestsPage /></SuspenseWrapper>} />
      </Route>
      <Route path="/login" element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
      <Route path="/register" element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
    </Routes>
  );
};

export default AppRoutes;

import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layouts/layout";
import { PrivateRoute } from "@/components/private-route";

// Lazy load de las páginas
const HomePage = lazy(() => import("../modules/home/pages/home-page"));
const ServiceRequestsPage = lazy(() => import("@/modules/requests/pages/service-requests-page"));
const CourseRequestsPage = lazy(() => import("@/modules/requests/pages/course-requests-page"));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/requests/services" element={<ServiceRequestsPage />} />
          <Route path="/requests/courses" element={<CourseRequestsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

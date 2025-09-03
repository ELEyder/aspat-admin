import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/layout";
import HomePage from "../modules/home/pages/home-page";
import LoginPage from "@/modules/auth/pages/login-page";
import ServiceRequestsPage from "@/modules/requests/pages/service-requests-page";
import CourseRequestsPage from "@/modules/requests/pages/course-requests-page";
import { PrivateRoute } from "@/components/private-route";

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
        <Route index element={<HomePage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/requests/services" element={<ServiceRequestsPage />} />
        <Route path="/requests/courses" element={<CourseRequestsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;

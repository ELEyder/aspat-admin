import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoute } from "@/components/private-route";
import LoadingPage from "@/pages/loading-page";
import Layout from "@/layouts/layout";

const HomePage = lazy(() => import("../modules/home/pages/home-page"));
const ServiceRequestsPage = lazy(() => import("@/modules/requests/pages/service-requests-page"));
const CourseRequestsPage = lazy(() => import("@/modules/requests/pages/course-requests-page"));
const ConfigCoursesPage = lazy(() => import("@/modules/config/courses/pages/courses-config-page"));
const ConfigCourseDetailsPage = lazy(() => import("@/modules/config/courses/pages/course-details-config-page"));
const DonationRequestsPage = lazy(() => import("@/modules/donations/pages/donation-page"));

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
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
          <Route path="/donations" element={<DonationRequestsPage />} />
          <Route path="/requests/services" element={<ServiceRequestsPage />} />
          <Route path="/requests/courses" element={<CourseRequestsPage />} />
          <Route path="/config/courses" element={<ConfigCoursesPage />} />
          <Route path="/config/courses/:id" element={<ConfigCourseDetailsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

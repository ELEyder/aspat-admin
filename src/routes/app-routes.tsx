import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoute } from "@/components/private-route";
import LoadingPage from "@/pages/loading-page";
import Layout from "@/layouts/layout";
import SurveyResponsesPage from "@/modules/survey/pages/survey-response-page";

const HomePage = lazy(() => import("../modules/home/pages/home-page"));

const DonationRequestsPage = lazy(() => import("@/modules/donations/pages/donation-page"));

const ServiceRequestsPage = lazy(() => import("@/modules/requests/pages/service-requests-page"));
const CourseRequestsPage = lazy(() => import("@/modules/requests/pages/course-requests-page"));

const CoursesConfigPage = lazy(() => import("@/modules/config/courses/pages/courses-config-page"));
const CourseDetailsConfigPage = lazy(() => import("@/modules/config/courses/pages/course-details-config-page"));

const ModulesConfigPage = lazy(() => import("@/modules/config/course-modules/pages/course-module-config-page"));
const ContentConfigPage = lazy(() => import("@/modules/config/course-contents/pages/course-content-config-page"));

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

          <Route path="/config/courses" element={<CoursesConfigPage />} />
          <Route path="/config/courses/:id" element={<CourseDetailsConfigPage />} />
          <Route path="/config/course-modules/:id" element={<ModulesConfigPage />} />
          <Route path="/config/course-contents/:id" element={<ContentConfigPage />} />
          <Route path="/survey" element={<SurveyResponsesPage />} />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

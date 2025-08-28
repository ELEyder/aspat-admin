import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../modules/Home/pages/HomePage';
import AuthPage from '@/modules/Auth/pages/AuthPage';


const AppRoutes: FC = () => {
    return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
  );
};

export default AppRoutes;
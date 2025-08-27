import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../modules/Home/pages/HomePage';


const AppRoutes: FC = () => {
    return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
  );
};

export default AppRoutes;
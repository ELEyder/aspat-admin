import type { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <main>
      <h1>Hello from Layout!</h1>
      <Outlet />
    </main>
  );
};

export default Layout;

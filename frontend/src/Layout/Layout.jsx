import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container py-3">
      <Outlet />
    </div>
  );
};

export default Layout;

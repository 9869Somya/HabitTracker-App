import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, HeaderLogin } from "..";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <HeaderLogin />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;

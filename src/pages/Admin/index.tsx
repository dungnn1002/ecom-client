import React, { useState } from "react";
import { HeaderAdmin, SideBar } from "./components";
import { Outlet } from "react-router-dom";
const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <HeaderAdmin onMenuToggle={toggleCollapsed} />
      <div className="container flex">
        <div>
          <SideBar collapsed={collapsed} />
        </div>
        <div className="w-screen px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Admin;

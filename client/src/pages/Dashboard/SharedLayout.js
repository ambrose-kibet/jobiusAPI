import React from "react";
import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <main>
      <div className="section-container">
        <div className="shared-container">
          <BigSidebar />
          <div className="outlet">
            <Navbar />
            <Outlet />
          </div>
        </div>
        <SmallSidebar />
      </div>
    </main>
  );
};

export default SharedLayout;

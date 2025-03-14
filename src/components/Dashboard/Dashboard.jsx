import React from "react";
import { Outlet } from "react-router-dom"; // ใช้สำหรับ Nested Routes
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="main-content">
          <Outlet /> {/* Render เนื้อหา Nested Routes */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

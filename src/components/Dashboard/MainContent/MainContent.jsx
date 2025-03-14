import React from "react";
import { useLocation } from "react-router-dom";
import "./MainContent.css";
import Welcome from "./Welcome/Welcome"; // ส่วนต้อนรับ (Dashboard Welcome Section)
import UserManagement from "../Dashboard/UserManagement"; // หน้า User Management
import Places from "../Places/Places"; // ตัวอย่างหน้า Places
import Blogs from "../Blogs/Blogs"; // ตัวอย่างหน้า Blogs
import About from "../About/About"; // ตัวอย่างหน้า About
import ManageTour from "../Dashboard/ManageTour"; // เพิ่มหน้า ManageTour
import Blogpost from "../Dashboard/Blogpost"; // นำเข้า Blogpost
import ManageCountry from "../Dashboard/ManageCountry"; // ✅ เพิ่มหน้า Manage Country
import ManagePartner from "../Dashboard/ManagePartner"; // ✅ เพิ่มหน้า Manage Partner

const MainContent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="main-content">
      {/* ส่วนต้อนรับเมื่ออยู่หน้า Dashboard */}
      {currentPath === "/admin" && (
        <>
          <Welcome />
          <div className="dashboard-widgets">
            <div className="widget">Overview</div>
            <div className="widget">Recent Activities</div>
            <div className="widget">Notifications</div>
            <div className="widget">Reports</div>
          </div>
        </>
      )}

      {/* แสดงเนื้อหาตาม Path */}
      {currentPath === "/admin/user-management" && <UserManagement />}
      {currentPath === "/admin/places" && <Places />}
      {currentPath === "/admin/blogs" && <Blogs />}
      {currentPath === "/admin/about" && <About />}
      {currentPath === "/admin/manage-tour" && <ManageTour />} {/* เพิ่มหน้า ManageTour */}
      {currentPath === "/admin/blogpost" && <Blogpost />} // เพิ่มเส้นทางสำหรับ Blogpost
      {currentPath === "/admin/manage-country" && <ManageCountry />} {/* ✅ เพิ่มหน้า Manage Country */}
      {currentPath === "/admin/manage-partners" && <ManagePartner />}
      
    </div>
  );
};

export default MainContent;